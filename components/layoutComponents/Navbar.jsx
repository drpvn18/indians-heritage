"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./../../styles/layoutComponents/Navbar.module.css";
import Image from "next/image";
import { Menu, ShoppingCart, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import DetailedCategory from "./DetailedCategory";
import Categories from "./../../public/data/categories.json";
import Cart from "../cart/Cart";
import { CartContext } from "@/app/CartContext";
import MenuSidebar from "./MenuSidebar";
import ProductSearch from "./ProductSearch";

export default function Navbar() {
    const router = useRouter();
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
        console.log(pathname);
        setActiveCategory("");
    }, [pathname])

    return (
        <div className={styles.container}>
            <div className={styles.navbar} onMouseLeave={() => setActiveCategory("")}>
                <div className="flex justify-start items-center gap-[10px]">
                    <div className={styles.menuItem} onClick={() => setOpenSidebar(true)}>
                        <Menu strokeWidth={2} size={32} color='#FFFFFF' />
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
                    <Image src="/logos/Indian-heritage-3.png" width={75} height={75} alt="indian heritage logo" className="h-[65px] w-[110px] rounded-md cursor-pointer" onClick={() => router?.push("/")} />
                </div>

                <div className="h-[78px] flex align-middle" onMouseLeave={() => setMouseOnNavbar(false)}>
                    <div className="my-auto" onMouseEnter={() => setMouseOnNavbar(true)}>
                        <div className={styles.categoryList}>
                            <div className={`${activeCategory === "gi" && styles.active_category} ${styles.category_item}`}
                                onMouseEnter={() => setActiveCategory("gi")}
                                onClick={() => router.push("/category/gi-products")}
                            >
                                GI Tagged Products
                            </div>

                            {/* <div className={`${activeCategory === "non-gi" && styles.active_category} ${styles.category_item}`} onMouseEnter={() => setActiveCategory("non-gi")} onClick={() => router.push("/category/non-gi-products")}>
                                Non-GI Products
                            </div> */}

                            <div className={`${activeCategory === "organic" && styles.active_category} ${styles.category_item}`}
                                onMouseEnter={() => setActiveCategory("organic")}
                                onClick={() => router.push("/category/organic-products")}
                            >
                                Organic Products
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start gap-[15px] items-center">
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
            </div>
            {
                openCart && (
                    <Cart openCart={openCart} setOpenCart={setOpenCart} />
                )
            }
        </div>
    );
}