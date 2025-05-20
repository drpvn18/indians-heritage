"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../products/ProductCard";
import products from "@/public/data/products.json";

export default function PopularProducts() {
    const [productsList, setProductsList] = useState([]);
    const [filteredProductsCount, setFilteredProductsCount] = useState(0);

    useEffect(() => {
        try {
            setProductsList(products);
            setFilteredProductsCount(products?.length);
        }
        catch (error) {
            setProductsList([]);
            console.log(error);
        }
    }, [])

    return (
        <div className="w-[100%]">
            <div className="max-w-[1400px] px-[10px] mx-auto my-[50px]">
                <div className="text-[#F26C36] text-[32px] mb-[20px]">
                    Popular products
                </div>
                <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] mt-[16px] mb-[48px]">
                    {
                        productsList?.slice(0, 12)?.map((product, index) => {
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
            </div>
        </div>
    );
}