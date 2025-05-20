"use client";

import React from "react";
import styles from "./../../styles/layoutComponents/Navbar.module.css";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function DetailedCategory({ dropdown_data }) {

    return (
        <div className={styles.detailed_category_container}>
            {
                dropdown_data?.categories?.map((category) => {
                    return (
                        <ul className={styles.block} key={category?.id}>
                            <li className="font-semibold mb-[15px] text-xl">
                                {category?.title}
                            </li>
                            {
                                category?.sub_categories?.map(sub_category => {
                                    return (
                                        <li className={styles.block_element} key={sub_category?.id}>
                                            <ChevronRight size={18} />
                                            <Link href={`${dropdown_data?.endpoint}/${sub_category?.endpoint}`}>{sub_category?.title}</Link>
                                        </li>
                                    );
                                })
                            }
                            <li className={styles.block_element}>
                                <Link href={category?.endpoint}>view all</Link>
                            </li>
                        </ul>
                    );
                })
            }
        </div>
    );
}