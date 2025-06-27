"use client";

import React, { useEffect } from "react";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import FeaturesCarousel from "@/components/home/FeaturesCarousel";
import PopularProducts from "@/components/home/PopularProducts";
import StateReports from "@/components/home/StateReports";
import WhyIndianHeritage from "@/components/home/WhyIndianHeritage";

export default function Home() {
	useEffect(() => {
		document.title = "Indian Heritage | Europe's first Indian GI tagged & organic store"
	}, []);

	return (
		<div>
			<FeaturesCarousel />
			<CategoryCarousel />
			<StateReports />
			<PopularProducts />
			<WhyIndianHeritage />
		</div>
	);
}