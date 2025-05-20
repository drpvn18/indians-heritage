import CategoryCarousel from "@/components/home/CategoryCarousel";
import FeaturesCarousel from "@/components/home/FeaturesCarousel";
import InstagramEmbed from "@/components/home/InstgramVideo";
import PopularProducts from "@/components/home/PopularProducts";
import StateReports from "@/components/home/StateReports";
import React from "react";

export default function Home() {
	return (
		<div>
			<FeaturesCarousel />
			<CategoryCarousel />
			<StateReports />
			<PopularProducts />
			<InstagramEmbed />
		</div>
	);
}