from decimal import Decimal
import requests
from bs4 import BeautifulSoup
import re
import json
from datetime import date, timedelta, datetime
from selenium import webdriver
from django.core.management.base import BaseCommand
from hostels.models import *
from django.contrib.gis.geos.point import Point



class Command(BaseCommand):

    def handle(self, *args, **options):
        def getLocations():
            url = 'https://www.hostelworld.com/hostels/Scotland'
            url_regex = re.compile(
                "^https:\/\/www.hostelworld.com\/((hostels\/[A-Za-z-]*$)|(findabed.php\/ChosenCity.[A-Za-z-]*\/ChosenCountry.Scotland$))")
            response = requests.get(url)
            html = response.content

            soup = BeautifulSoup(html)
            res = soup.findAll('a', href=True)

            links = set()
            for link in res:
                if url_regex.match(link['href']):
                    links.add(link['href'])

            pattern_php = re.compile(
                "^https:\/\/www.hostelworld.com\/findabed.php\/ChosenCity.[A-Za-z-]*\/ChosenCountry.Scotland$")
            pattern_direct = re.compile("^https:\/\/www.hostelworld.com\/hostels\/[A-Za-z-]*$")
            locations = []
            for link in links:
                location = ""
                if pattern_php.match(link):
                    location = link[52:-23]
                elif pattern_direct.match(link):
                    location = link[36:]
                if location != "europe" and location != "Scotland":
                    locations.append(location)
            return locations


        def decomposeRooms(room_description):
            room_data = room_description.split()
            for x in range(len(room_data)):
                if room_data[x] == "Double" or re.match("^(?:[2-9]|\d\d\d*)$", room_data[x]):
                    if room_data[x] == "Double":
                        room_size = 1
                    else:
                        room_size = int(room_data[x])
                    x += 1
                elif room_data[x] in ["Single", "Twin"]:
                    if room_data[x] == "Single":
                        room_size = 1
                    else:
                        room_size = 2
                elif room_data[x] in ["Private", "Apartment", "Family", "Tent"]:
                    room_type = "Private"
                elif room_data[x] == "Mixed":
                    room_type = "Mixed"
                elif room_data[x] == "Female":
                    room_type = "Female"
                elif room_data[x] == "Male":
                    room_type = "Male"
                else:
                    print("Error handling " + room_data[x])
            return {"room_size": room_size, "room_type": room_type}

        def getRooms(url, browser,hostel):
            from_date = datetime.now().date()
            duration_delta = timedelta(days=365)
            end_date = from_date + duration_delta
            delta = timedelta(days=1)

            while from_date < end_date:
                from_date_str = from_date.strftime('%Y-%m-%d')
                to_date_str = (from_date + delta).strftime('%Y-%m-%d')
                query = "?dateFrom=" + from_date_str + "&dateTo=" + to_date_str + "&number_of_guests=1"
                from_date = from_date + delta
                query_url = url + query

                browser.get(query_url)
                soup = BeautifulSoup(browser.page_source, "html.parser")
                room_elements = soup.findAll('tr', attrs={'class': 'room-tr'})
                for e in room_elements:
                    room_title = e.find("span", attrs={'class': 'room-title'}).text
                    price = e.find('span', attrs={'class', 'rate-type-price'}).text
                    room = decomposeRooms(room_title)

                    if not RoomTypes.objects.filter(type=room['room_type']):
                        RoomTypes.objects.create(type=room['room_type'])
                    if not RoomSizes.objects.filter(size=room['room_size']):
                        RoomSizes.objects.create(size=room['room_size'])
                    if not Prices.objects.filter(hostel_id=Hostel.objects.get(name=hostel).id,
                                          from_date=from_date_str,
                                          to_date=to_date_str,
                                          price=float(re.sub(r'[^\d.]', '', price)),
                                          room_size_id=RoomSizes.objects.get(size=room['room_size']).id,
                                          room_type_id=RoomTypes.objects.get(type=room['room_type']).id).exists():
                        Prices.objects.create(hostel_id=Hostel.objects.get(name=hostel).id,
                                              from_date=from_date_str,
                                              to_date=to_date_str,
                                              price=float(re.sub(r'[^\d.]', '', price)),
                                              room_size_id=RoomSizes.objects.get(size=room['room_size']).id,
                                              room_type_id=RoomTypes.objects.get(type=room['room_type']).id)


        def getReviews(url, browser,hostel):
            browser.get(url + "#reviews")
            soup = BeautifulSoup(browser.page_source, "html.parser")
            section = soup.find("section", attrs={"name": "ms-reviews"})
            if section:
                rating_tags = section.find_all("p", attrs={"class": "rating-label"})
                for rating_tag in rating_tags:
                    rating = rating_tag.contents[0]
                    score = float(rating_tag.contents[1].text)


                    if not RatingCategories.objects.filter(category=rating):
                        RatingCategories.objects.create(category=rating)
                    if not RatingsHostel.objects.filter(rating_category_id=RatingCategories.objects.get(category=rating).id,
                                                        hostel_id=Hostel.objects.get(name=hostel).id,
                                                        rating=score).exists():
                        RatingsHostel.objects.create(rating_category_id=RatingCategories.objects.get(category=rating).id,
                                                     hostel_id=Hostel.objects.get(name=hostel).id,
                                                     rating=score)
            next_flag = True
            while next_flag:
                review_wrapper = soup.find("div", attrs={"class": "reviews-overlay-content"})
                if review_wrapper:
                    review_tags = review_wrapper.find_all("div", attrs={"class": "review-info"})
                    for review_tag in review_tags:
                        review = review_tag.find("div", attrs={"class": "notes"}).text.replace("\r", " ").strip()
                        date = review_tag.find("div", attrs={"class": "date"}).contents[2].text
                        rating = review_tag.find("div", attrs={"class": "score"}).text.strip()

                        # if not Reviews.objects.filter(hostel_id=Hostel.objects.get(name=hostel).id,
                        #                               rating=rating,
                        #                               review=review,
                        #                               date=date).exists():
                        #     Reviews.objects.create(hostel_id=Hostel.objects.get(name=hostel).id,
                        #                            rating=rating,
                        #                            review=review,
                        #                            date=date)


                    next = soup.find("div", attrs={"class": "pagination-next"})
                    if not next or 'disabled' in next.attrs['class']:
                        next_flag = False
                    else:
                        browser.find_element_by_class_name("pagination-next").click()
                        soup = BeautifulSoup(browser.page_source)

        def getPolicies(url, browser, hostel):
            browser.get(url + "#houserules")
            soup = BeautifulSoup(browser.page_source, "html.parser")
            section = soup.find("section", attrs={"name": "ms-house-rules-policies"})
            if section:
                for tag in section.find_all("li"):
                    policy = tag.contents[1].strip()
                    if not Policies.objects.filter(policy=policy).exists():
                        Policies.objects.create(policy=policy)
                    if not PoliciesHostel.objects.filter(hostel=Hostel.objects.get(name=hostel).id,
                                                         policy=Policies.objects.get(policy=policy).id).exists():
                        PoliciesHostel.objects.create(hostel_id=Hostel.objects.get(name=hostel).id,
                                                      policy_id=Policies.objects.get(policy=policy).id)

        def getHostelData(url, browser):
            browser.get(url)
            soup = BeautifulSoup(browser.page_source, "html.parser")
            name = soup.find('h1', attrs={'class': 'main-title'})['data-name']
            address = soup.find('span', attrs={'class': 'adddress'}).text
            address = re.sub("\n[ ]*", "", address)
            location = geocode(address)
            description = soup.find('div', attrs={'class': 'text'}).text.strip()[:-17]

            if not Hostel.objects.filter(name=name,
                                         location=location,
                                         description=description).exists():
                Hostel.objects.create(name=name,
                                      location=location,
                                      description=description)

            for f in soup.findAll('li', attrs={'class': 'facility'}):
                facility = f.text.strip()
                if not Facilities.objects.filter(facilities=facility).exists():
                    Facilities.objects.create(facilities=facility)
                if not FacilitiesHostel.objects.filter(hostel_id=Hostel.objects.get(name=name).id,
                                                       facility_id=Facilities.objects.get(
                                                           facilities=facility).id).exists():
                    FacilitiesHostel.objects.create(hostel_id=Hostel.objects.get(name=name).id,
                                                    facility_id=Facilities.objects.get(facilities=facility).id)
            getPolicies(url, browser, name)
            getReviews(url, browser,name)
            getRooms(url, browser,name)


        def geocode(address):
            response = requests.get(
                "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&region=uk&key=AIzaSyAC1fGnwPFHXDQXlBeRVuVkEHHDI_Vc_FE")
            data = response.json()
            location = data['results'][0]['geometry']['location']
            return Point(location['lng'],location['lat'])

        with open('data/hostel-links.txt', 'r') as f:
            links = f.readlines()
            links = [l.strip() for l in links]
        browser = webdriver.Chrome('/home/marc/Downloads/chromedriver')
        for link in links:
            with open("data/hostels/" + link[46:].replace("/", "-") + ".json", "w+") as h:
                getHostelData(link, browser)

        browser.quit()

