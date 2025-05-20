import PromotionsCarousel from "@/components/layoutComponents/PromotionsCarousel";
import "./globals.css";
import React from "react";
import Navbar from "@/components/layoutComponents/Navbar";
import Footer from "@/components/layoutComponents/Footer";
import BreadCrumb from "@/components/layoutComponents/BreadCrumb";
import { CartProvider } from "./CartContext";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
	title: "Indian Heritage",
	description: "The taste of indian tradition",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body suppressHydrationWarning>
				<CartProvider>
					<PromotionsCarousel />
					<Navbar />
					<BreadCrumb />
					{children}
					<Footer />
					<Analytics />
				</CartProvider>
			</body>
		</html>
	);
}
