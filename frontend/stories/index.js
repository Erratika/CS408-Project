import React from "react";
import {storiesOf} from "@storybook/react";
import HistogramRangeSlider from "../src/componenets/dashboard/HistogramRangeSlider";

storiesOf("Controls", module)
	.add("HistogramRangeSlider", () => (
		<HistogramRangeSlider> </HistogramRangeSlider>
	));