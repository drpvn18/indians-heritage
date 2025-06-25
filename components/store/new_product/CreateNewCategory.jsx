"use client";

import React, { useEffect, useState } from "react";
import styles from "./../../../styles/store/NewProduct.module.css";
import { v4 as uuidv4 } from 'uuid';
import { Check, Loader, X } from "lucide-react";
import dynamic from "next/dynamic";

const Select = dynamic(() => import('react-select'), { ssr: false });

const productTypes = [
    {
        value: "gi",
        label: "GI Product",
        slug: "gi-products"
    },
    {
        value: "non-gi",
        label: "Non GI Product",
        slug: "non-gi-products"
    },
    {
        value: "organic",
        label: "Organic Product",
        slug: "organic-products"
    },
    {
        value: "indian-jewellery",
        label: "Indian Jewellery",
        slug: "indian-jewellery"
    }
]
export default function CreateNewCategory({ newCategoryPopup, setNewCategoryPopup }) {
    const [creatingNewCategoryStatus, setCreatingCategoryStatus] = useState(false);
    const [selectedProductType, setSelectedProductType] = useState(
        { value: null, label: 'Select type', slug: null }
    );

    const [newCategoryData, setNewCategoryData] = useState({
        category_id: "",
        name: "",
        slug: "",
        parent_category: {}
    })

    const handleNewCategoryData = (e) => {
        setNewCategoryData({
            ...newCategoryData,
            [e.target.name]: e.target.value,
        })
    }

    useEffect(() => {
        const name = newCategoryData?.name;
        let temp = (name || "").replace(/[^a-zA-Z0-9-]/g, '-');
        temp = temp.replace(/-+/g, '-');
        temp = temp.replace(/^-|-$/g, '');
        temp = temp.toLowerCase();
        setNewCategoryData({
            ...newCategoryData,
            slug: temp,
        });
    }, [newCategoryData?.name])

    const handleCreateNewCategory = async () => {
        if (newCategoryData?.name === "")
            return alert("Please fill all the fields");

        setCreatingCategoryStatus(true);
        let temp_newcategory = { ...newCategoryData, category_id: uuidv4() };
        const res = await fetch("/api/new_category", {
            method: "POST",
            body: JSON.stringify(temp_newcategory)
        });
        console.log(res);
        setNewCategoryPopup(false);
        setCreatingCategoryStatus(false);
    }

    const handleProductTypeChange = (selectedOption) => {
        setSelectedProductType(selectedOption);
        setNewCategoryData({
            ...newCategoryData,
            parent_category: {
                id: selectedOption?.value,
                name: selectedOption?.label,
                slug: selectedOption?.slug
            },
        });
    };

    return (
        <div>
            <div className={styles.form_element}>
                <label>Category Name</label><br />
                <input type="text" name="name" placeholder="Enter category name" onChange={handleNewCategoryData} value={newCategoryData?.name || ""} />
            </div>
            <div className={styles.form_element}>
                <label>Category Endpoint</label><br />
                <input type="text" name="slug" placeholder="Enter category endpoint" onChange={handleNewCategoryData} value={newCategoryData?.slug || ""} readOnly style={{ cursor: 'not-allowed' }} />
            </div>
            <div className={styles.form_element}>
                <div className="flex gap-[10px] flex-wrap">
                    <label>Category falls under which type</label>
                </div>
                <Select
                    placeholder="Select category"
                    options={productTypes}
                    value={selectedProductType}
                    onChange={handleProductTypeChange}
                    styles={{
                        control: (baseStyles) => ({
                            ...baseStyles,
                            border: '2px solid #dedede',
                            minWidth: '225px',
                            minHeight: '46px',
                            height: '46px',
                            margin: '4px 0'
                        }),
                        valueContainer: (base) => ({
                            ...base,
                            paddingTop: 0,
                            paddingBottom: 0,
                            height: '46px',
                        }),
                        indicatorsContainer: (base) => ({
                            ...base,
                            height: '46px',
                        }),
                    }}
                />
            </div>
            <div className="mt-[10px] flex justify-end flex-wrap gap-[10px]">
                <button className="flex justify-center items-center gap-[4px] border border-red-500 rounded-sm p-2 cursor-pointer bg-red-500 text-white" onClick={() => setNewCategoryPopup(!newCategoryPopup)}>
                    <X /> Cancel
                </button>
                <button className="border border-[varvar(--secondary-bg)] rounded-sm p-2 cursor-pointer bg-[var(--secondary-bg)] text-white" onClick={handleCreateNewCategory}>
                    {
                        creatingNewCategoryStatus ? (
                            <div className="w-6 h-6 animate-spin text-gray-500">
                                <Loader color="#FFF" />
                            </div>
                        ) : (
                            <span className="flex justify-center items-center gap-[4px]">
                                <Check /> Create
                            </span>
                        )
                    }
                </button>
            </div>
        </div>
    );
}