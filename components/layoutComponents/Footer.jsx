"use client";

import React from "react";
import styles from "./../../styles/layoutComponents/Footer.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation"
import { FacebookSVG, InstagramSVG, PhoneSVG, WhatsAppSVG } from "../icons";
import Link from "next/link";
import { ChevronRight, Mail, Phone } from "lucide-react";


export default function Footer() {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.footer}>
                <ul className={styles.block}>
                    <li>
                        <Image src="/logos/Indian-heritage-3.png" alt="indian heritage logo" width={150} height={150} className="h-[75px] w-[125px] rounded-md cursor-pointer mb-[10px]" onClick={() => router?.push("/")} />
                    </li>
                    <li className={styles.block_element}>
                        <div>
                            <p>INDIAN SUPER MARKET AND FOODS S.A R.L.-S</p>
                            <p>VAT number - LU35204853</p>
                        </div>
                    </li>
                    <li className={styles.block_element}>
                        <Phone />
                        <p onClick={() => window.location.href = "tel:+352 661 499 599"} className="pl-3 cursor-pointer"> +352 661 499 599</p>
                    </li>
                    <li className={styles.block_element}>
                        <Mail />
                        <p onClick={() => window.location.href = "mailto:indianheritage.eu@gmail.com"} className="pl-3 cursor-pointer text-wrap">indianheritage.eu@gmail.com</p>
                    </li>
                </ul>
                <ul className={styles.block}>
                    <li className="mb-[15px] text-xl">
                        Categories
                    </li>
                    <li className={styles.block_element}>
                        <ChevronRight size={18} /><Link href="/category/gi-products">GI Tagged Products</Link>
                    </li>
                    <li className={styles.block_element}>
                        <ChevronRight size={18} /><Link href="/category/organic-products">Organic Products</Link>
                    </li>
                    {/* <li className={styles.block_element}>
                        <ChevronRight size={18} /><Link href="/category/non-gi-products">Non-GI Products</Link>
                    </li> */}
                </ul>
                <ul className={styles.block}>
                    <li className="mb-[15px] text-xl">
                        Quick Links
                    </li>
                    <li className={styles.block_element}>
                        <ChevronRight size={18} /><Link href="/shipping-policy">Shipping Policy</Link>
                    </li>
                    <li className={styles.block_element}>
                        <ChevronRight size={18} /><Link href="/privacy-policy">Privacy Policy</Link>
                    </li>
                    <li className={styles.block_element}>
                        <ChevronRight size={18} /><Link href="/terms-conditions">Terms & Conditions</Link>
                    </li>
                    <li className={styles.block_element}>
                        <ChevronRight size={18} /><Link href="/refund-return-policy">Refund/Return Policy</Link>
                    </li>
                </ul>
            </div>
            <div className={styles.social_media}>
                <ul className="flex justify-center flex-wrap items-center mx-auto gap-[25px]">
                    <li>
                        <InstagramSVG height={42} width={42} />
                    </li>
                    <li>
                        <WhatsAppSVG height={35} width={35} />
                    </li>
                    <li>
                        <FacebookSVG height={42} width={42} />
                    </li>
                    <li>
                        <PhoneSVG height={35} width={35} />
                    </li>
                </ul>
            </div>
        </div >
    );
}