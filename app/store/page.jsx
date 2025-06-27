"use client";

import UserIcon from "@/components/icons/UserIcon";
import Login from "@/components/layoutComponents/Login";
import { CreateNewBrand, CreateNewCategory, CreateNewSubCategory } from "@/components/store/new_product";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import { Loader, Power } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import styles from "./../../styles/store/Dashboard.module.css";

const modal_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -65%)',
    width: '95%',
    maxWidth: '400px',
    bgcolor: 'background.paper',
    border: '2px solid #2CA966',
    borderRadius: '4px',
    outline: 'none',
    boxShadow: 24,
    p: "20px",
    zIndex: 9999
};

export default function Store() {
    const [showLoginPopup, setShowLoginPopup] = useState(true);
    const [userAuthenticated, setUserAuthenticated] = useState(null);
    const [logoutStatus, setLogoutStatus] = useState(false);
    const [newCategoryPopup, setNewCategoryPopup] = useState(false);
    const [newSubCategoryPopup, setNewSubCategoryPopup] = useState(false);
    const [newBrandPopup, setNewBrandPopup] = useState(false);
    const [productsCount, setProductsCount] = useState(0);
    const [subCategoriesCount, setSubCategoriesCount] = useState(0);
    const [categoriesCount, setCategoriesCount] = useState(0);
    const [brandsCount, setBrandsCount] = useState(0);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [loadingSubCategories, setLoadingSubCategories] = useState(false);
    const [loadingBrands, setLoadingBrands] = useState(false);

    useEffect(() => {
        document.title = `Admin store - Indian Heritage | Europe's first Indian GI tagged & organic store`;
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoadingProducts(true);
            try {
                const response = await fetch('/api/fetch_products');
                const res = await response.json();

                let temp_products_list = res?.data;

                setProductsCount(Object.keys(temp_products_list || {})?.length || 0);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            setLoadingProducts(false);
        };

        const fetchSubCategories = async () => {
            setLoadingSubCategories(true);
            const response = await fetch("/api/fetch_sub_categories", {
                method: "GET"
            });
            const data = await response.json();

            let temp_sub_categories_list = data?.data || {};

            setSubCategoriesCount(Object.keys(temp_sub_categories_list)?.length || 0);
            setLoadingSubCategories(false);
        }

        const fetchCategories = async () => {
            setLoadingCategories(true);

            const response = await fetch("/api/fetch_categories", {
                method: "GET"
            });
            const data = await response.json();

            let temp_categories_list = data?.data || {};

            setCategoriesCount(Object.keys(temp_categories_list)?.length || 0);
            setLoadingCategories(false);
        }

        const fetchBrands = async () => {
            setLoadingBrands(true);

            const response = await fetch("/api/fetch_brands", {
                method: "GET"
            });
            const data = await response.json();

            let temp_brands_list = data?.data;

            setBrandsCount(Object.keys(temp_brands_list)?.length || 0);
            setLoadingBrands(false);
        }

        fetchProducts();
        fetchCategories();
        fetchSubCategories();
        fetchBrands();
    }, []);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = document.cookie.split('; ')?.find(row => row?.startsWith('token='));

            if (token) {
                const jwt_token = token.split('=')[1];

                const token_validation_res = await fetch("/api/verify_token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "jwt_token": jwt_token
                    })
                });

                const data = await token_validation_res.json();

                const payload = data?.payload;
                setUserAuthenticated(payload || null);
            } else {
                setUserAuthenticated(null);
            }
        }
        fetchUserDetails();
    }, [])

    useEffect(() => {
        if (userAuthenticated) {
            setShowLoginPopup(false);
        } else {
            setShowLoginPopup(true);
        }
    }, [userAuthenticated]);

    const handleLogout = () => {
        setLogoutStatus(true);
        setTimeout(() => {
            document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            setLogoutStatus(false);
            window.location.href = window.location.pathname;
        }, 1000);
    }

    const handleClose = () => {
        setNewCategoryPopup(false);
        setNewBrandPopup(false);
        setNewSubCategoryPopup(false);
    };

    const getFormattedEmail = (email) => {
        if (email) {
            const parts = email.split('@');
            const username = parts[0];
            const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1);
            return `${formattedUsername}`;
        }
    }

    return (
        <div className="w-[100%]">
            <div className="max-w-[1400px] px-[10px] mx-auto my-[20px]">
                {
                    showLoginPopup ? (
                        <div>
                            <Login showLoginPopup={showLoginPopup} setShowLoginPopup={setShowLoginPopup} />
                        </div>
                    ) : ""
                }

                <div>
                    {
                        (!userAuthenticated || !userAuthenticated?.email) ? (
                            <div className="flex flex-col justify-center items-center text-center text-[18px] my-[100px]">
                                <UserIcon />
                                <p className="text-[24px] font-[500] text-[#1C274C] mt-[5px] mb-[10px]">
                                    Login to continue
                                </p>
                                <div>
                                    click here to <span className="cursor-pointer text-blue-600 text-[20px] px-1 hover:underline underline-offset-2" onClick={() => setShowLoginPopup(true)}>login</span>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="flex justify-between items-center flex-wrap gap-[10px] my-[20px]">
                                    <div className="text-gray-600">
                                        Hey,
                                        <span className="text-[20px] px-2 text-black">
                                            {getFormattedEmail(userAuthenticated?.email)}
                                        </span>
                                    </div>
                                    <div>
                                        <button className="border-2 border-red-600 rounded-sm px-[10px] py-[5px] cursor-pointer hover:bg-red-600 text-red-600 hover:text-white text-xl" onClick={handleLogout}>
                                            {
                                                logoutStatus ? (
                                                    <div className="w-6 h-6 animate-spin ">
                                                        <Loader />
                                                    </div>
                                                ) : (
                                                    <span className="flex justify-center items-center gap-[6px]">
                                                        <Power />
                                                    </span>
                                                )
                                            }
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.cardSection}>
                                    <div className={styles.cardItem}>
                                        <div className={styles.title}>
                                            Products
                                        </div>
                                        {
                                            loadingProducts ? (
                                                <div className="flex flex-col justify-center items-center" >
                                                    <div className="w-6 h-6 animate-spin text-black">
                                                        <Loader />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={styles.count}>
                                                    <CountUp start={0} end={productsCount} duration={2} />
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className={styles.cardItem}>
                                        <div className={styles.title}>
                                            Categories
                                        </div>
                                        {
                                            loadingCategories ? (
                                                <div className="flex flex-col justify-center items-center" >
                                                    <div className="w-6 h-6 animate-spin text-black">
                                                        <Loader />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={styles.count}>
                                                    <CountUp start={0} end={categoriesCount} duration={2} />
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className={styles.cardItem}>
                                        <div className={styles.title}>
                                            Sub-Categories
                                        </div>
                                        {
                                            loadingSubCategories ? (
                                                <div className="flex flex-col justify-center items-center" >
                                                    <div className="w-6 h-6 animate-spin text-black">
                                                        <Loader />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={styles.count}>
                                                    <CountUp start={0} end={subCategoriesCount} duration={2} />
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className={styles.cardItem}>
                                        <div className={styles.title}>
                                            Brands
                                        </div>
                                        {
                                            loadingBrands ? (
                                                <div className="flex flex-col justify-center items-center" >
                                                    <div className="w-6 h-6 animate-spin text-black">
                                                        <Loader />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={styles.count}>
                                                    <CountUp start={0} end={brandsCount} duration={2} />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div>
                                    <span>Quick links:</span>
                                    <Link href="/store/products/new" target="_blank" className="text-blue-600 px-2 underline-offset-2 hover:underline cursor-pointer">
                                        Create new product
                                    </Link>|
                                    <Link href="/store/products" target="_blank" className="text-blue-600 px-2 underline-offset-2 hover:underline cursor-pointer">
                                        All products
                                    </Link>|
                                    <span className="text-blue-600 px-2 underline-offset-2 hover:underline cursor-pointer" onClick={() => setNewCategoryPopup(true)}>
                                        Create new category
                                    </span>|
                                    <span className="text-blue-600 px-2 underline-offset-2 hover:underline cursor-pointer" onClick={() => setNewSubCategoryPopup(true)}>
                                        Create new sub-category
                                    </span>|
                                    <span className="text-blue-600 px-2 underline-offset-2 hover:underline cursor-pointer" onClick={() => setNewBrandPopup(true)}>
                                        Create new brand
                                    </span>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={newCategoryPopup || newBrandPopup || newSubCategoryPopup}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={newCategoryPopup || newBrandPopup || newSubCategoryPopup}>
                    <Box sx={modal_style}>
                        {
                            newBrandPopup && (
                                <CreateNewBrand newBrandPopup={newBrandPopup} setNewBrandPopup={setNewBrandPopup} />
                            )
                        }
                        {
                            newCategoryPopup && (
                                <CreateNewCategory newCategoryPopup={newCategoryPopup} setNewCategoryPopup={setNewCategoryPopup} />
                            )
                        }
                        {
                            newSubCategoryPopup && (
                                <CreateNewSubCategory newSubCategoryPopup={newSubCategoryPopup} setNewSubCategoryPopup={setNewSubCategoryPopup} />
                            )
                        }
                    </Box>
                </Fade>
            </Modal>
        </div >
    );
}