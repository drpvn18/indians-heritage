import React from "react";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import FeaturesCarousel from "@/components/home/FeaturesCarousel";
import PopularProducts from "@/components/home/PopularProducts";
import StateReports from "@/components/home/StateReports";
import WhyIndianHeritage from "@/components/home/WhyIndianHeritage";

export default function Home() {
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