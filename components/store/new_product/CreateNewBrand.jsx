"use client";

import React, { useEffect, useState } from "react";
import styles from "./../../../styles/store/NewProduct.module.css";
import { v4 as uuidv4 } from 'uuid';
import { Check, Loader, X } from "lucide-react";

export default function CreateNewBrand({ newBrandPopup, setNewBrandPopup }) {
    const [creatingNewBrand, setCreatingNewBrand] = useState(false);

    const [newBrandData, setNewBrandData] = useState({
        brand_id: "",
        name: "",
        slug: "",
    })

    const handleNewBrandData = (e) => {
        setNewBrandData({
            ...newBrandData,
            [e.target.name]: e.target.value,
        })
    }

    useEffect(() => {
        const name = newBrandData?.name;
        let temp = (name || "").replace(/[^a-zA-Z0-9-]/g, '-');
        temp = temp.replace(/-+/g, '-');
        temp = temp.replace(/^-|-$/g, '');
        temp = temp.toLowerCase();
        setNewBrandData({
            ...newBrandData,
            slug: temp,
        });
    }, [newBrandData?.name])

    const handleCreateNewBrand = async () => {
        if (newBrandData?.name === "")
            return alert("Please fill all the fields");

        setCreatingNewBrand(true);
        let temp_newbrand = { ...newBrandData, brand_id: uuidv4() };
        const res = await fetch("/api/new_brand", {
            method: "POST",
            body: JSON.stringify(temp_newbrand)
        });
        console.log(res);
        setNewBrandPopup(false);
        setCreatingNewBrand(false);
    }

    return (
        <div>
            <div className={styles.form_element}>
                <label>Brand Name</label><br />
                <input type="text" name="name" placeholder="Enter brand name" onChange={handleNewBrandData} value={newBrandData?.name || ""} />
            </div>
            <div className={styles.form_element}>
                <label>Brand Endpoint</label><br />
                <input type="text" name="slug" placeholder="Enter brand endpoint" onChange={handleNewBrandData} value={newBrandData?.slug || ""} readOnly style={{ cursor: 'not-allowed' }} />
            </div>
            <div className="mt-[10px] flex justify-end flex-wrap gap-[10px]">
                <button className="flex justify-center items-center gap-[4px] border border-red-500 rounded-sm p-2 cursor-pointer bg-red-500 text-white" onClick={() => setNewBrandPopup(!newBrandPopup)}>
                    <X /> Cancel
                </button>
                <button className="border border-[varvar(--secondary-bg)] rounded-sm p-2 cursor-pointer bg-[var(--secondary-bg)] text-white" onClick={handleCreateNewBrand}>
                    {
                        creatingNewBrand ? (
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