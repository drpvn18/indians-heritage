"use client";

import React, { useState, useEffect } from "react";
import styles from "./../../styles/layoutComponents/BreadCrumb.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Loader } from "lucide-react";

export default function BreadCrumb() {
    const [pid, setPid] = useState("");
    const pathname = usePathname();
    const [breadCrumb, setBreadCrumb] = useState([]);
    const [productDetails, setProductDetails] = useState({});
    const [productDetailsFetchingStatus, setProductDetailsFetchingStatus] = useState(false);

    const format = (item) => {
        let temp = decodeURIComponent(item).replace(/-/g, " ");
        return temp?.charAt(0)?.toUpperCase() + temp?.slice(1);
    }

    useEffect(() => {
        const handleFetchProductDetails = async (pid) => {
            setProductDetailsFetchingStatus(true);
            try {
                const response = await fetch('/api/fetch_products');
                const res = await response.json();

                let temp_products_list = res?.data;

                let temp_product = {};
                for (const product_key in temp_products_list) {
                    const product = temp_products_list[product_key];

                    if (product?.id === pid) {
                        temp_product = product;
                        break;
                    }
                }

                if (temp_product?.id) {
                    setProductDetails(temp_product);
                } else {
                    setProductDetails({})
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            setProductDetailsFetchingStatus(false);
        }
        let temp_pid = window.location.href.split("?pid=")[1];
        temp_pid && setPid(temp_pid);
        temp_pid && handleFetchProductDetails(temp_pid);
    }, [])

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
                    link: `/product/${list[i]}`,
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
                        {
                            pid ? (
                                <ul className={styles.breadCrumbContent}>
                                    <li className={`flex flex-nowrap`}>
                                        <Link className={styles.breadCrumbPart} href={`/`}>Home</Link>
                                        <span className="px-2">{">"}</span>
                                    </li>
                                    <li className={`flex flex-nowrap`}>
                                        <Link className={styles.breadCrumbPart} href={`product?pid=${productDetails?.id}`}>product</Link>
                                        <span className="px-2">{">"}</span>
                                    </li>
                                    <li className={styles.activePart}>
                                        {
                                            productDetailsFetchingStatus ? (
                                                <div className="flex flex-col justify-center items-center" >
                                                    <div className="w-6 h-6 animate-spin text-black">
                                                        <Loader />
                                                    </div>
                                                </div>
                                            ) : (
                                                <Link className={styles.breadCrumbPart} href={`product?pid=${productDetails?.id}`}>
                                                    {productDetails?.name}
                                                </Link>
                                            )
                                        }
                                    </li>
                                </ul>
                            ) : (
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
                            )
                        }
                    </div>
                ) : (
                    ""
                )
            }
        </div >
    );
}