FROM python:3.6
ENV PYTHONUNBUFFERED 1
RUN apt-get update ; apt-get --assume-yes install binutils libproj-dev gdal-bin

RUN wget http://download.osgeo.org/geos/geos-3.7.1.tar.bz2
RUN tar -xjf geos-3.7.1.tar.bz2
RUN cd geos-3.7.1 && ./configure && make && make install && cd ..

RUN wget https://download.osgeo.org/proj/proj-5.2.0.tar.gz
RUN wget https://download.osgeo.org/proj/proj-datumgrid-1.8.tar.gz
RUN tar xzf proj-5.2.0.tar.gz && cd proj-5.2.0/nad && tar xzf ../../proj-datumgrid-1.8.tar.gz && cd .. && ./configure && make && make install && cd ..

RUN wget http://download.osgeo.org/gdal/2.4.0/gdal-2.4.0.tar.gz
RUN tar -xzf gdal-2.4.0.tar.gz
RUN cd gdal-2.4.0 && ./configure && make && make install && cd ..

RUN mkdir /code
WORKDIR /code
ADD server/requirements.txt /code
RUN pip3 install -r requirements.txt
ADD . /code/