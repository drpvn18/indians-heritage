"use client";

import React, { useEffect, useState } from "react";
import styles from "./../../../styles/store/NewProduct.module.css";
import dynamic from "next/dynamic";

const Select = dynamic(() => import('react-select'), { ssr: false });

const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Out of Stock', label: 'Out of Stock' },
    { value: 'Launch soon', label: 'Launch soon' },
]

export default function AdditionalInfo({ formData, setFormData }) {
    const [selectedProductStatus, setSelectedProductStatus] = useState(
        { value: null, label: 'Select status' }
    );

    useEffect(() => {
        if (formData?.status && !selectedProductStatus?.value) {
            statusOptions?.map(option => {
                if (option?.value === formData?.status) {
                    setSelectedProductStatus(option);
                }
            })
        }
    }, [formData])

    const handleProductStatusChange = (selectedOption) => {
        setSelectedProductStatus(selectedOption);
        setFormData({
            ...formData,
            status: selectedOption.label,
        });
    };

    return (
        <div>
            <div className={styles.section_title}>
                Additioal Information
            </div>
            <div className={styles.form_sub_container}>
                <div className={styles.form_element}>
                    <label>Status of the product</label> <span className="text-red-600 pl-[2px]">*</span><br />
                    <Select
                        placeholder="Select a status"
                        options={statusOptions}
                        value={selectedProductStatus}
                        onChange={handleProductStatusChange}
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
            </div>
        </div>
    );
}