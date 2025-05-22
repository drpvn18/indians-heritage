"use client";

import React from "react";
import styles from "./../../styles/layoutComponents/Navbar.module.css";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function DetailedCategory({ dropdown_data, setMouseOnDropdown }) {
    return (
        <div className={styles.detailed_category_container} onMouseLeave={() => setMouseOnDropdown(false)}>
            {
                dropdown_data?.categories?.map((category) => {
                    return (
                        <ul className={styles.block} key={category?.id}>
                            <li className={`${styles.block_title}`}>
                                <Link href={`/${dropdown_data?.endpoint}/${category?.endpoint}`}>
                                    {category?.title}
                                </Link>
                            </li>
                            {
                                category?.sub_categories?.map(sub_category => {
                                    return (
                                        <li className={styles.block_element} key={sub_category?.id}>
                                            <ChevronRight size={18} />
                                            <Link href={`/${dropdown_data?.endpoint}/${sub_category?.endpoint}`}>{sub_category?.title}</Link>
                                        </li>
                                    );
                                })
                            }
                            <li className={styles.block_element}>
                                <ChevronRight size={18} />
                                <Link href={`/${dropdown_data?.endpoint}/${category?.endpoint}/others`}>Others</Link>
                            </li>
                        </ul>
                    );
                })
            }
        </div>
    );
}