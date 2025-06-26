"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./../../styles/layoutComponents/Navbar.module.css";
import Image from "next/image";
import { Menu, ShoppingCart, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import DetailedCategory from "./DetailedCategory";
import Categories from "./../../public/data/categories.json";
import Cart from "../cart/Cart";
import { CartContext } from "@/app/CartContext";
import MenuSidebar from "./MenuSidebar";
import ProductSearch from "./ProductSearch";
import Link from "next/link";
import FoodTruck from "../icons/FoodTruck";

export default function Navbar() {
    const pathname = usePathname();
    const { getCartCount } = useContext(CartContext);
    const [activeCategory, setActiveCategory] = useState("");
    const [mouseOnNavbar, setMouseOnNavbar] = useState(false);
    const [mouseOnDropdown, setMouseOnDropdown] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openSearchPopup, setOpenSearchPopup] = useState(false);

    useEffect(() => {
        if (!mouseOnNavbar && !mouseOnDropdown)
            setActiveCategory("");
    }, [mouseOnNavbar, mouseOnDropdown]);

    useEffect(() => {
        setActiveCategory("");
        setOpenSidebar(false);
    }, [pathname]);

    return (
        <div className={styles.container}>
            <nav className={styles.navbar} onMouseLeave={() => setActiveCategory("")}>
                <div className="flex justify-start items-center gap-[10px]">
                    <div className={styles.menuItem} onClick={() => setOpenSidebar(true)}>
                        <Menu strokeWidth={2} size={28} color='#FFFFFF' />
                    </div>
                    {
                        openSearchPopup ? (
                            <ProductSearch openSearchPopup={openSearchPopup} setOpenSearchPopup={setOpenSearchPopup} />
                        ) : (
                            ""
                        )
                    }
                    {
                        openSidebar ? (
                            <MenuSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                        ) : (
                            ""
                        )
                    }
                    <Link href="/">
                        <Image src="/logos/Indian-heritage-3.png" width={75} height={75} alt="indian heritage logo" className="h-[65px] w-[110px] rounded-[5px] cursor-pointer" />
                    </Link>
                </div>

                <div className="h-[76px] flex align-middle" onMouseLeave={() => setMouseOnNavbar(false)}>
                    <div className="my-auto" onMouseEnter={() => setMouseOnNavbar(true)}>
                        <div className={styles.categoryList}>
                            <div>
                                <Link href="/category/gi-products" className={`${activeCategory === "gi" && styles.active_category} ${styles.category_item}`} onMouseEnter={() => setActiveCategory("gi")}>
                                    GI Tagged Products
                                </Link>
                            </div>

                            {/* <div>
                                <Link href="/category/non-gi-products" className={`${activeCategory === "non-gi" && styles.active_category} ${styles.category_item}`} onMouseEnter={() => setActiveCategory("non-gi")}>
                                    Non-GI Products
                                </Link>
                            </div> */}

                            <div>
                                <Link href="/category/organic-products" className={`${activeCategory === "organic" && styles.active_category} ${styles.category_item}`} onMouseEnter={() => setActiveCategory("organic")}>
                                    Organic Products
                                </Link>
                            </div>
                            <div>
                                <Link href="https://www.instagram.com/indianheritage.eu/" target="_blank" className={`${activeCategory === "indian-jewellery" && styles.active_category} ${styles.category_item}`} onMouseEnter={() => setActiveCategory("indian-jewellery")}>
                                    Indian Jewellery
                                </Link>
                            </div>
                            <div className="flex justify-center items-center gap-[5px]">
                                <Link href="/indiankitchen" target="_blank" className={`${activeCategory === "indian-kitchen" && styles.active_category} ${styles.category_item}`} onMouseEnter={() => setActiveCategory("indian-kitchen")}>
                                    Indian Kitchen
                                </Link>
                                <FoodTruck height={32} width={32} color="#FFFFFF" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start gap-[10px] items-center">
                    <Link className={styles.foodtruck} href="/indiankitchen" target="_blank">
                        <FoodTruck height={32} width={32} color="#FFFFFF" />
                    </Link>

                    <div onClick={() => setOpenSearchPopup(true)} className="cursor-pointer">
                        <Search strokeWidth={2} size={28} color='#FFFFFF' />
                    </div>
                    <div className="relative">
                        <ShoppingCart color="white" strokeWidth={2} size={28} className="cursor-pointer" onClick={() => setOpenCart(!openCart)} />
                        <div className={`absolute flex items-center justify-center top-[-18px] right-[-8px] font-medium text-sm bg-[#FFFFFF] rounded-full text-[#2CA966]`}>
                            <div className="h-[26px] w-[26px] text-center p-[2px]">
                                {getCartCount() > 9 ? "9+" : getCartCount()}
                            </div>
                        </div>
                    </div>
                </div>
                {
                    activeCategory !== "" && Categories[activeCategory]?.categories?.length !== 0 && (
                        <div className={styles.detailed_category} onMouseEnter={() => setMouseOnDropdown(true)} onMouseLeave={() => setMouseOnDropdown(false)}>
                            <DetailedCategory dropdown_data={Categories[activeCategory]} setMouseOnDropdown={setMouseOnDropdown} />
                        </div>
                    )
                }
            </nav>
            {
                openCart && (
                    <Cart openCart={openCart} setOpenCart={setOpenCart} />
                )
            }
        </div>
    );
}