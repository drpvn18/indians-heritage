"use client";

import React, { useState, useEffect } from "react";
import styles from "./../../styles/layoutComponents/BreadCrumb.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadCrumb() {
    const pathname = usePathname();
    const [breadCrumb, setBreadCrumb] = useState([]);

    const format = (item) => {
        let temp = decodeURIComponent(item).replace(/-/g, " ");
        return temp?.charAt(0)?.toUpperCase() + temp?.slice(1);
    }

    useEffect(() => {
        const list = pathname?.split("/");
        var temp = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i] === "" && i === 0) {
                temp.push({
                    label: "Home",
                    link: "/",
                    lastPart: false
                });
            } else if (list[i] !== "" && list[i] === "product") {
                i++;
                temp.push({
                    label: format(list[i]),
                    link: `/category/${list[i]}`,
                    lastPart: false,
                });
            } else if (list[i] !== "" && list[i] === "category") {
                temp.push({
                    label: "Category",
                    link: "",
                    lastPart: false,
                });
            } else if (list[i] !== "") {
                temp.push({
                    label: format(list[i]),
                    link: "",
                    lastPart: i === list.length - 1,
                });
            }
        }
        setBreadCrumb(temp);
    }, [pathname]);

    return (
        <div className={styles.container}>
            {
                breadCrumb?.length > 1 ? (
                    <div className={styles.breadCrumb}>
                        <ul className={styles.breadCrumbContent}>
                            {
                                breadCrumb?.map((item, index) => {
                                    return (
                                        <li key={index} className={`${index === breadCrumb.length - 1 && styles.activePart} flex flex-nowrap`}>
                                            <Link className={styles.breadCrumbPart} href={item?.link}>{item?.label}</Link>
                                            {
                                                index !== breadCrumb.length - 1 && (
                                                    <span className="px-2">{">"}</span>
                                                )
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                ) : (
                    ""
                )
            }
        </div>
    );
}