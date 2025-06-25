"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../products/ProductCard";
import { Loader } from "lucide-react";

export default function PopularProducts() {
    const [productsList, setProductsList] = useState([]);
    const [filteredProductsCount, setFilteredProductsCount] = useState(0);
    const [loadingProducts, setLoadingProducts] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoadingProducts(true);
            try {
                const response = await fetch('/api/fetch_products');
                const res = await response.json();

                let temp_products_list = res?.data;
                const temp_products = Object.values(temp_products_list || []);

                setProductsList(temp_products || []);
                setFilteredProductsCount(temp_products?.length || 0);
            } catch (error) {
                setProductsList([]);
                setFilteredProductsCount(0);
                console.error('Error fetching products:', error);
            }
            setLoadingProducts(false);
        };
        fetchProducts();
    }, []);

    return (
        <div className="w-[100%]">
            <div className="max-w-[1400px] px-[10px] mx-auto my-[50px]">
                <div className="text-[#F26C36] text-[32px] mb-[20px]">
                    Popular products
                </div>
                {
                    loadingProducts ? (
                        <div className="flex flex-col justify-center items-center my-[150px]">
                            <div className="w-6 h-6 animate-spin text-black">
                                <Loader />
                            </div>
                            <p className="text-[18px] mt-[5px]">
                                Loading products
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] mt-[16px] mb-[48px]">
                            {
                                productsList?.slice(0, 15)?.map((product, index) => {
                                    return (
                                        <div key={index} className="border-2 border-[#E1F5EB] bg-[#FFFFFF] hover:shadow-2xl">
                                            <ProductCard productDetails={product} />
                                        </div>
                                    )
                                })
                            }
                            {
                                [1, 2, 3, 4, 5]?.slice(filteredProductsCount)?.map((index) =>
                                    <div key={index} />
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
}