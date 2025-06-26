"use client";

import UserIcon from "@/components/icons/UserIcon";
import Login from "@/components/layoutComponents/Login";
import StoreProductCard from "@/components/products/StoreProductCard";
import StoreProductSearch from "@/components/store/products/ProductSearch";
import { Loader, Plus, Power, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function StoreProducts() {
    const [products, setProducts] = useState([]);
    const [productsCount, setProductsCount] = useState(0);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const router = useRouter();
    const [showLoginPopup, setShowLoginPopup] = useState(true);
    const [userAuthenticated, setUserAuthenticated] = useState(null);
    const [logoutStatus, setLogoutStatus] = useState(false);
    const [openSearchPopup, setOpenSearchPopup] = useState(false);

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
                setUserAuthenticated(payload || {});
            } else {
                setUserAuthenticated(null);
            }
        }
        fetchUserDetails();
    }, []);

    useEffect(() => {
        if (userAuthenticated) {
            setShowLoginPopup(false);
        } else {
            setShowLoginPopup(true);
        }
    }, [userAuthenticated]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoadingProducts(true);
            try {
                const response = await fetch('/api/fetch_products');
                const res = await response.json();

                let temp_products_list = res?.data;

                setProducts(temp_products_list || {});
                setProductsCount(Object.keys(temp_products_list || {})?.length || 0);
            } catch (error) {
                setProducts([]);
                console.error('Error fetching products:', error);
            }
            setLoadingProducts(false);
        };
        fetchProducts();
    }, []);

    const handleLogout = () => {
        setLogoutStatus(true);
        setTimeout(() => {
            document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            setLogoutStatus(false);
            window.location.reload();
        }, 1000);
    }

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
                                <div className="flex justify-between items-center flex-wrap gap-[10px] mt-[10px] mb-[20px]">
                                    <div className="text-gray-600">
                                        Hey,
                                        <span className="text-[20px] px-2 text-black">
                                            {getFormattedEmail(userAuthenticated?.email)}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="rounded-sm px-[10px] py-[10px] cursor-pointer hover:bg-red-600 text-red-600 hover:text-white text-xl" onClick={handleLogout}>
                                            {
                                                logoutStatus ? (
                                                    <div className="w-6 h-6 animate-spin">
                                                        <Loader />
                                                    </div>
                                                ) : (
                                                    <span>
                                                        <Power strokeWidth={3} />
                                                    </span>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                {
                                    loadingProducts ? (
                                        <div className="flex flex-col justify-center items-center my-[15%]">
                                            <div className="w-6 h-6 animate-spin text-black">
                                                <Loader />
                                            </div>
                                            <p className="text-[18px] mt-[5px]">
                                                Loading products
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="border border-[#B3B3B3] rounded-sm p-[15px]">
                                            <div className="flex justify-between items-center gap-1 flex-wrap text-gray-600 mt-[5px] mb-[15px]">
                                                <p>Showing {productsCount || 0} products</p>
                                                <div className="flex justify-end gap-[15px] items-center text-[var(--main-bg)]">
                                                    <div className="rounded-sm px-[6px] py-[4px] cursor-pointer hover:bg-[var(--main-bg)] hover:text-white" onClick={() => setOpenSearchPopup(true)}>
                                                        <Search strokeWidth={2} size={32} />
                                                    </div>
                                                    <div className="border-2 border-[var(--main-bg)] rounded-sm px-[6px] py-[4px] cursor-pointer hover:bg-[var(--main-bg)] hover:text-white flex justify-center items-center gap-[2px] text-[18px]" onClick={() => router.push("/store/products/new")}>
                                                        <Plus strokeWidth={3} /> Create
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] mt-[16px] mb-[48px]">
                                                {
                                                    Object?.keys(products)?.map((product_key, index) => {
                                                        return (
                                                            <div key={index} className="border-2 border-[#E1F5EB] bg-[#FFFFFF] hover:shadow-2xl">
                                                                <StoreProductCard productDetails={products[product_key]} product_key={product_key} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                                {
                                                    [1, 2, 3, 4, 5]?.slice(productsCount)?.map((index) =>
                                                        <div key={index} />
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
            {
                openSearchPopup && (
                    <StoreProductSearch openSearchPopup={openSearchPopup} setOpenSearchPopup={setOpenSearchPopup} />
                )
            }
        </div>
    );
}