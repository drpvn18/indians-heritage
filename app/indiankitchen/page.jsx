"use client";

import React, { useEffect } from "react";
import styles from "./../../styles/indiankitchen/IndianKitchen.module.css";
import Image from "next/image";
import Link from "next/link";
import "./../../styles/home/IndianKitchenCarousel.css";

export default function IndianKitchen() {
    useEffect(() => {
        document.title = "Indian Kitchen - Indian Heritage | Europe's first Indian GI tagged & organic store";
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.indian_kitchen}>
                <div className={styles.summary_para}>
                    Discover the <span className={styles.highlighted_part1}>“Indian Kitchen”</span> on wheels! 1st South Indian Food Truck in Luxembourg authentic dishes made with traditional spices and fresh ingredients. From sizzling samosas to rich curries, Hyderabad biryani, every bite brings you closer to India. Fast, flavourful, and freshly cooked with love - perfect for lunch, dinner, or a quick snack. Come find us and enjoy a taste of India, wherever you are!
                </div>

                <Image className="my-[20px] mx-auto drop-shadow-xl px-[10px] py-[10px] rounded-2xl" src="https://firebasestorage.googleapis.com/v0/b/indiansheriatge.firebasestorage.app/o/indian_kitchen_1.PNG?alt=media&token=c1e611ae-451f-47bd-84fb-6909c2c479c4" alt="food court menu" width={600} height={600} priority />

                <div>
                    <h1 className="w-full bg-[#E2E2E2] text-[28px] text-center py-[5px]">
                        Menu
                    </h1>
                    <div className={`${styles.summary_para} text-center`}>
                        <span className={styles.highlighted_part2}>
                            Check out our delicious South Indian menu!
                        </span>
                        From crispy dosas to flavorful curries, biryanis, every item is crafted with authentic taste and love.
                    </div>
                    <Image className="my-[20px] mx-auto drop-shadow-xl px-[10px] py-[10px] rounded-2xl border-2 border-gray-400" src="https://firebasestorage.googleapis.com/v0/b/indiansheriatge.firebasestorage.app/o/menu-1.PNG?alt=media&token=0caebb60-0cff-441b-81ba-6d3c26eee378" alt="food court menu" width={550} height={550} priority />

                    <div className={`${styles.summary_para} text-center`}>
                        Food Allergen : Please refer to our food allergy chart to make informed choices and enjoy your meal with confidence.
                    </div>

                    <Image className="my-[20px] mx-auto drop-shadow-xl px-[10px] py-[10px] rounded-2xl" src="https://firebasestorage.googleapis.com/v0/b/indiansheriatge.firebasestorage.app/o/menu.JPG?alt=media&token=d4aa3024-6cc7-4423-930e-93e5d18116af" alt="food court menu" width={800} height={800} priority />
                </div>
                <div className="my-[30px]">
                    <h1 className="w-full bg-[#E2E2E2] text-[28px] text-center py-[5px]">
                        Where to find us?
                    </h1>
                    <div className={styles.time_table}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Day</td>
                                    <td>Time</td>
                                    <td>Location</td>
                                </tr>
                                <tr>
                                    <td>Monday</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Tuesday</td>
                                    <td>11 AM to 3 PM</td>
                                    <td>Schifflange Commune</td>
                                </tr>
                                <tr>
                                    <td>Wednesday</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Thursday</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Friday</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="my-[30px]">
                    <h1 className="w-full bg-[#E2E2E2] text-[28px] text-center py-[5px]">
                        Private Events & Catering
                    </h1>
                    <div className={styles.summary_para}>
                        Hosting a special occasion and need flavorful South Indian food your guests will love? <span className={styles.highlighted_part1}>“Indian Kitchen”</span>, Luxembourg&apos;s first South Indian food truck, is here to serve you! We bring the authentic taste of the South to your events with freshly prepared dosas, idlis, vadas, sambar, veg and non-veg curries, Hyderabad biryanis, Andhra thalis, chants, pani puri, bread halwa and many more - all made with traditional recipes and quality ingredients.
                    </div>
                    <div className={styles.summary_para}>
                        Whether it&apos;s a birthday, office gathering, or family celebration, we tailor our catering to match your needs and dietary choices.
                    </div>
                    <div className={styles.summary_para}>
                        With warm service and delicious food, we&apos;re ready to make your event memorable.
                        Get in touch with <span className={styles.highlighted_part1}>“Indian Kitchen”</span> today and let us take care of the taste!
                    </div>
                </div>
                <div className="my-[30px]">
                    <h1 className="w-full bg-[#E2E2E2] text-[28px] text-center py-[5px]">
                        Indian Heritage in media
                    </h1>
                    <div>
                        <div className="flex justify-start items-center gap-[20px] border-b-2 border-dashed border-[#d5d5d5] my-[30px] flex-wrap md:flex-nowrap">
                            <Image onClick={() => window?.open("https://chronicle.lu/category/dining-out-1/55402-indian-heritage-food-truck-launches-in-schifflange", "_blank")} className="w-[100%] max-w-[200px] h-[75px] my-[20px] mx-auto rounded-md cursor-pointer" src="/images/indian_kitchen/chronicle_logo.png" alt="food court menu" width={200} height={200} priority />
                            <div>
                                <div className="text-[24px] font-[450]">
                                    Indian Heritage Food Truck Launches in Schifflange
                                </div>
                                <div className="text-[16px] text-gray-800 font-[400] my-[5px] text-justify">
                                    The Indian Heritage food truck opened in front of the Hotel de Ville in the south-west of the Grand Duchy, operated by Indian Super Market and Foods Sarl-S. The entrepreneur behind the project, Neelima Vummadisetty, talked with Chronicle.lu and explained that she arrived in...
                                    <Link href="https://chronicle.lu/category/dining-out-1/55402-indian-heritage-food-truck-launches-in-schifflange" target="_blank" className="text-blue-700 pl-2 hover:underline">read more</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}