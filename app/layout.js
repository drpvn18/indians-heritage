import PromotionsCarousel from "@/components/layoutComponents/PromotionsCarousel";
import "./globals.css";
import React from "react";
import Navbar from "@/components/layoutComponents/Navbar";
import Footer from "@/components/layoutComponents/Footer";
import BreadCrumb from "@/components/layoutComponents/BreadCrumb";
import { CartProvider } from "./CartContext";
import { Analytics } from '@vercel/analytics/next';
import SocialMedia from "@/components/layoutComponents/SocialMedia";

export const metadata = {
	title: "Indian Heritage | Europe's first Indian GI tagged & organic store",
	description: "Shop for all Indian GI tagged and organic products in Europe at the best price",
	icons: {
		icon: "/title_logo.jpg",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body suppressHydrationWarning>
				<CartProvider>
					<PromotionsCarousel />
					<Navbar />
					<BreadCrumb />
					<SocialMedia />
					{children}
					<Footer />
					<Analytics />
				</CartProvider>
			</body>
		</html>
	);
}
