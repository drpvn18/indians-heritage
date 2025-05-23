"use client";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./../../styles/layoutComponents/MenuSidebar.module.css";
import { ChevronRight, ChevronUp, X } from 'lucide-react';
import categories from "./../../public/data/categories.json";
import Image from 'next/image';
import Link from 'next/link';

export default function MenuSidebar({ openSidebar, setOpenSidebar }) {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState("");

    const toggleDrawer = (newOpen) => () => {
        setOpenSidebar(newOpen);
    };

    const menuItems = [
        {
            "id": "gi",
            "title": "GI Tagged Products",
            "endpoint": "/category/gi-products"
        },
        // {
        //     "id": "non-gi",
        //     "title": "Non GI Products",
        //     "endpoint": "/category/non-gi-products"
        // },
        {
            "id": "organic",
            "title": "Organic Products",
            "endpoint": "/category/organic-products"
        },
        // {
        //     "id": "about-us",
        //     "title": "About Us",
        //     "endpoint": "/about-us"
        // },
        // {
        //     "id": "contact-us",
        //     "title": "Contact Us",
        //     "endpoint": "/contact-us"
        // }
    ];

    const MenuList = (
        <Box sx={{ width: 300, fontFamily: 'Lexend' }} role="presentation">
            <div className='h-[100vh]'>
                <div className='bg-[#FFFFFF] w-full flex justify-between gap-[10px] items-center border-b-2 border-[#c5c5c5] py-[10px] px-[10px]'>
                    <Image src="/logos/Indian-heritage-3.png" width={75} height={75} alt="indian heritage logo" className="h-[65px] w-[110px] rounded-md cursor-pointer" onClick={() => router?.push("/")} />
                    <p onClick={() => setOpenSidebar(!openSidebar)} className='cursor-pointer'>
                        <X />
                    </p>
                </div>
                <div className={styles.menuList}>
                    {
                        menuItems?.map((item) => {
                            return (
                                <div key={item?.id}>
                                    <div onClick={() => setActiveCategory(activeCategory === item?.id ? "" : item?.id)}
                                        className={`${activeCategory === item?.id && styles.active_category} ${styles.category_item}`}>
                                        <p onClick={() => router.push(`${item?.endpoint}`)}>
                                            <Link href={`${item?.endpoint}`}>
                                                {item?.title}
                                            </Link>
                                        </p>
                                        {
                                            (categories[item?.id]?.categories?.length !== 0) ? (
                                                <p className={`${activeCategory === item?.id ? 'rotate-180' : 'rotate-90'}`}>
                                                    <ChevronUp color='gray' />
                                                </p>
                                            ) : ""
                                        }
                                    </div>
                                    {
                                        (activeCategory === item?.id) ? (
                                            categories[activeCategory]?.categories?.map((category) => {
                                                return (
                                                    <ul className={styles.block} key={category?.id}>
                                                        <li className={styles.block_title}>
                                                            <Link href={`/${categories[activeCategory]?.endpoint}/${category?.endpoint}`}>
                                                                {category?.title}
                                                            </Link>
                                                        </li>
                                                        {
                                                            category?.sub_categories?.map(sub_category => {
                                                                return (
                                                                    <li className={styles.block_element} key={sub_category?.id}>
                                                                        <ChevronRight size={18} />
                                                                        <Link href={`/${categories[activeCategory]?.endpoint}/${sub_category?.endpoint}`}>{sub_category?.title}</Link>
                                                                    </li>
                                                                );
                                                            })
                                                        }
                                                    </ul>
                                                );
                                            })
                                        ) : ""
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Box>
    );

    return (
        <div>
            <Drawer open={openSidebar} onClose={toggleDrawer(false)}>
                {MenuList}
            </Drawer>
        </div>
    );
}