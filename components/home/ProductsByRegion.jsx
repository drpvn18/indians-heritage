"use client";

import React, { useContext, useEffect, useState } from "react";
import productsList from "./../../public/data/products.json";
import indianStates from "./../../public/data/indianStates.json";
import { MapPin, ShoppingCart, Sparkles } from "lucide-react";
import styles from "./../../styles/home/ProductsByRegion.module.css";
import loading_styles from "./../../styles/Loading.module.css";
import { useRouter } from "next/navigation";
import { CartContext } from "@/app/CartContext";
import Image from "next/image";
import Cart from "../cart/Cart";
import Link from "next/link";

export default function ProductsByRegion({ stateSelected }) {
    const router = useRouter();
    const [filteredList, setFilteredList] = useState([]);
    const [filteredProductsCount, setFilteredProductsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [addingProduct, setAddingProduct] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const { addProductToCart } = useContext(CartContext);

    const handleAddProductToCart = (product) => {
        if (addingProduct)
            return;
        try {
            setAddingProduct(true);
            let temp_product = {
                "product_key": `${product?.id}`,
                "product": {
                    "cart_item_id": product?.id,
                    "product_count": 1,
                    "name": product?.name,
                    "price": product?.variation?.price,
                    "category": product?.category,
                    "slug": product?.slug,
                    "images": product?.images,
                    "discount": product?.discount,
                    "stock_available": product?.variation?.stock
                }
            };
            addProductToCart(temp_product);

            setAddingProduct(false);
            setOpenCart(true);

        } catch (e) {
            console.log(e);
        }
    }

    const getCurrencySymbol = (currency) => {
        if (currency === 'EUR') {
            return '€';
        } else if (currency === 'USD') {
            return '$';
        } else {
            return '₹';
        }
    }

    const handleProductRedirect = (product) => {
        router?.push(`/product/${product?.category?.slug}/${product?.slug}`);
        return;
    }

    const getDiscountedPrice = (price, discount) => {
        if (discount) {
            if (discount?.type === "percentage") {
                return parseFloat(price - (price * (discount?.value / 100)))?.toFixed(2);
            } else if (discount?.type === "amount") {
                return parseFloat(price - discount?.value)?.toFixed(2);
            }
        } else {
            return parseFloat(price)?.toFixed(2);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        const handleFilterProducts = () => {
            const filteredList = productsList.filter((product) => (product?.origin?.state === stateSelected && product?.product_type?.id === "gi"));
            setFilteredList(filteredList);
        };

        handleFilterProducts();
        setIsLoading(false);
    }, [stateSelected, productsList])

    useEffect(() => {
        setFilteredProductsCount(filteredList?.length || 0);
    }, [filteredList])

    return (
        <div className="w-[100%] h-[100%] py-[10px]">
            {
                openCart && (
                    <Cart openCart={openCart} setOpenCart={setOpenCart} />
                )
            }
            {
                isLoading ? (
                    <div className="flex flex-col text-center justify-center items-center pt-[40%]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-900"></div>
                    </div>
                ) : (
                    stateSelected ? (
                        <div>
                            <div className="flex flex-nowrap justify-start items-center gap-[20px] pb-[10px]">
                                <div>
                                    <Sparkles size={40} color={`${indianStates[stateSelected]?.color || "#000"}`} />
                                </div>
                                <div style={{ color: indianStates[stateSelected]?.color || '#000' }}>
                                    <p className={`text-2xl font-semibold text-[${indianStates[stateSelected]?.color}]`}>{indianStates[stateSelected]?.name}</p>
                                    <p className="pt-2">{indianStates[stateSelected]?.description}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center flex-wrap gap-2 my-[20px]">
                                {
                                    filteredProductsCount > 0 ? (
                                        <div className="text-gray-500 text-center text-[18px]">
                                            {
                                                filteredProductsCount <= 5 ? (
                                                    `Showing ${filteredProductsCount || 0} products`
                                                ) : `showing 5 of ${filteredProductsCount || 0} products`
                                            }

                                        </div>
                                    ) : ""
                                }
                                {
                                    filteredProductsCount > 0 ? (
                                        <Link style={{ backgroundColor: `${indianStates[stateSelected]?.color}` || '#F26C36' }}
                                            className="text-[#FFFFFF] px-2 py-1 rounded-md"
                                            href={`/category/gi-products?state=${stateSelected}`}
                                        >view all</Link>
                                    ) : ""
                                }
                            </div>
                            <div className={styles.regionWiseProducts} style={{ '--scroll-color': indianStates[stateSelected]?.color || "#000" }}>
                                {
                                    filteredList?.slice(0, 5)?.map((product, index) => {
                                        return (
                                            <div key={index} className="grid grid-cols-12 gap-[5px] px-[5px] py-[5px] select-none bg-[#F9F5F0] max-w-[650px] border-2 border-[#E1F5EB]">
                                                <div className="col-span-3" onClick={() => handleProductRedirect(product)}>
                                                    <Image src={`${product?.images[0]?.url || ""}`} alt={`${product?.images[0]?.alt || product?.name}`} width={100} height={100} priority className="w-[100%] h-[125px] cursor-pointer" />
                                                </div>

                                                <div className="col-span-9 pl-[10px] relative">
                                                    <p className={styles.product_name} onClick={() => handleProductRedirect(product)}>
                                                        {product?.name}
                                                    </p>
                                                    <p className="text-[16px] text-gray-600 tracking-wider py-[5px] font-medium" onClick={handleProductRedirect}>
                                                        {product?.variation?.weight_label}
                                                    </p>
                                                    <p className="py-[2px]">
                                                        <span className="pr-[3px] text-[22px]">
                                                            {getCurrencySymbol(product?.variation?.price?.currency)}
                                                        </span>
                                                        <span className="pr-[7px] text-[22px]">
                                                            {getDiscountedPrice(product?.variation?.price?.amount, product?.discount)}
                                                        </span>
                                                        {
                                                            product?.discount?.value && parseFloat(product?.discount?.value) !== 0 ? (
                                                                <span className="line-through text-gray-600 text-[16px]">
                                                                    {product?.variation?.price?.amount?.toFixed(2)}
                                                                </span>
                                                            ) : (
                                                                ""
                                                            )
                                                        }
                                                    </p>
                                                    <button onClick={() => handleAddProductToCart(product)} className="text-white bg-[#EA5F28] p-2 rounded-md cursor-pointer flex gap-[5px] flex-nowrap justify-center items-center absolute right-[5px] bottom-0">
                                                        {
                                                            addingProduct ? (
                                                                <div className={loading_styles.loader} />
                                                            ) : (
                                                                <ShoppingCart size={24} />
                                                            )
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {
                                filteredProductsCount === 0 && (
                                    <div className="text-center pt-[25px]">
                                        <p style={{ color: indianStates[stateSelected]?.color || '#000' }} className="p-[10px] tracking-wide text-[20px] max-w-[500px]">
                                            No products found from this region.
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <div className="flex flex-col text-center justify-center items-center pt-[40%]">
                            <MapPin color="#D1D5DB" strokeWidth={2.25} size={56} />
                            <div className="py-[10px]">
                                <p className="text-[24px] text-gray-500 font-semibold">Select a Region</p>
                                <p className="py-[10px] text-gray-700 tracking-wide text-[16px] max-w-[500px]">
                                    Click on a region from the map to discover unique products from different parts of India.
                                </p>
                            </div>
                        </div>
                    )
                )
            }
        </div >
    );
}