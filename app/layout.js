import PromotionsCarousel from "@/components/layoutComponents/PromotionsCarousel";
import "./globals.css";
import React from "react";
import Navbar from "@/components/layoutComponents/Navbar";
import Footer from "@/components/layoutComponents/Footer";
import BreadCrumb from "@/components/layoutComponents/BreadCrumb";
import { CartProvider } from "./CartContext";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import SocialMedia from "@/components/layoutComponents/SocialMedia";
import Script from "next/script";

export const metadata = {
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
					<Script
						src="https://www.googletagmanager.com/gtag/js?id=G-5LFRR61BGK"
						strategy="afterInteractive"
					/>
					<Script
						id="google-analytics"
						strategy="afterInteractive"
						dangerouslySetInnerHTML={{
							__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
              });
            `,
						}}
					/>
					<PromotionsCarousel />
					<Navbar />
					<BreadCrumb />
					<SocialMedia />
					{children}
					<Footer />
					<Analytics />
					<SpeedInsights />
				</CartProvider>
			</body>
		</html>
	);
}
