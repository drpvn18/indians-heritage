"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import products from "@/public/data/products.json";
import ProductCard from "@/components/products/ProductCard";
import loading_styles from "@/styles/Loading.module.css";

const Select = dynamic(() => import('react-select'), { ssr: false });

const filterOptions = [
    { value: 'Featured', label: 'Featured' },
    { value: 'Alphabetically, A-Z', label: 'alphabetically, a-z' },
    { value: 'Alphabetically, Z-A', label: 'alphabetically, z-a' },
    { value: 'Price, low to high', label: 'price, low to high' },
    { value: 'Price, high to low', label: 'price, high to low' },
    { value: 'Discount, low to high', label: 'Discount, low to high' },
    { value: 'Discount, high to low', label: 'Discount, high to low' },
];

export default function ProductCategory({ params }) {
    const { slug } = React.use(params);
    const [selectedFilter, setSelectedFilter] = useState({ value: 'Featured', label: 'Featured' });
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [productsList, setProductsList] = useState([]);
    const [filteredProductsCount, setFilteredProductsCount] = useState(0);

    useEffect(() => {
        try {
            let temp = [];
            if (slug === "all") {
                temp = products;
            } else {
                temp = products.filter((item) => item.category?.slug?.includes(slug));
            }
            setProductsList(temp);
        } catch (error) {
            setProductsList([]);
            console.log(error);
        }
    }, [slug, products])

    useEffect(() => {
        setLoadingProducts(true);
        let temp_sorted_products = [];

        if (selectedFilter.value === 'Featured')
            temp_sorted_products = productsList;

        else if (selectedFilter.value === 'Alphabetically, A-Z')
            temp_sorted_products = [...productsList].sort((a, b) => a.name.localeCompare(b.name));

        else if (selectedFilter.value === 'Alphabetically, Z-A')
            temp_sorted_products = [...productsList].sort((a, b) => b.name.localeCompare(a.name));

        else if (selectedFilter.value === 'Price, low to high')
            temp_sorted_products = [...productsList].sort((a, b) => a?.variation?.price?.amount - b?.variation?.price?.amount);

        else if (selectedFilter.value === 'Price, high to low')
            temp_sorted_products = [...productsList].sort((a, b) => b?.variation?.price?.amount - a?.variation?.price?.amount);

        else if (selectedFilter.value === 'Discount, low to high')
            temp_sorted_products = [...productsList].sort((a, b) => parseFloat(a?.discount?.value) - parseFloat(b?.discount?.value));

        else if (selectedFilter.value === 'Discount, high to low')
            temp_sorted_products = [...productsList].sort((a, b) => parseFloat(b?.discount?.value) - parseFloat(a?.discount?.value));

        setFilteredProducts(temp_sorted_products);
        setLoadingProducts(false);
    }, [selectedFilter, productsList])

    useEffect(() => {
        setFilteredProductsCount(filteredProducts?.length);
    }, [filteredProducts])

    const handleFilterChange = (selectedOption) => {
        setSelectedFilter(selectedOption);
    };

    useEffect(() => {
        setFilteredProductsCount(filteredProducts?.length || 0);
    }, [filteredProducts])

    return (
        <div className="w-[100%]">
            <div className="max-w-[1400px] px-[10px] mx-auto my-[20px]">
                {
                    loadingProducts ? (
                        <div className="w-full flex justify-center items-center my-[150px]" >
                            <div className={loading_styles.loader}></div>
                        </div>
                    ) : (
                        <div className="flex">
                            <div className="grow">
                                <div className="flex justify-between items-center gap-1 flex-wrap text-gray-600">
                                    {
                                        filteredProductsCount !== 0 ? (
                                            <p className="">showing {filteredProductsCount || 0} products</p>
                                        ) : ""
                                    }

                                    <div className="flex justify-start items-center gap-2 flex-nowrap">
                                        sort by:
                                        <Select
                                            placeholder="Select a filter"
                                            options={filterOptions}
                                            value={selectedFilter}
                                            onChange={handleFilterChange}
                                            styles={{
                                                control: (baseStyles) => ({
                                                    ...baseStyles,
                                                    fontSize: '14px',
                                                    border: '2px solid #dedede',
                                                    minWidth: '200px'
                                                }),
                                            }}
                                        />
                                    </div>
                                </div>
                                {
                                    productsList?.length === 0 ? (
                                        <div className="text-center py-[100px]">
                                            <p className="p-[10px] tracking-wide text-[20px]">
                                                No products found from this category {`"${slug}"`}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] mt-[16px] mb-[48px]">
                                            {
                                                filteredProducts?.map((product, index) => {
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
                    )
                }
            </div>
        </div>
    );
}