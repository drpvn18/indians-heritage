"use client"

import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic";
import styles from "./../../../styles/store/NewProduct.module.css";

const Select = dynamic(() => import('react-select'), { ssr: false });

const discountTypes = [
    { value: 'percentage', label: 'Percentage' },
    { value: 'amount', label: 'Amount' },
];

export default function PricingStockDetails({ formData, setFormData }) {
    const [selectedDiscountType, setSelectedDiscountType] = useState(
        { value: null, label: 'Select discount type' }
    );

    useEffect(() => {
        if (formData?.discount?.type && !selectedDiscountType?.value) {
            discountTypes?.map((type) => {
                if (type?.value === formData?.discount?.type) {
                    setSelectedDiscountType(type);
                }
            })
        }
    }, [formData])

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            discount: {
                ...prev?.discount,
                type: selectedDiscountType?.value
            }
        }))
    }, [selectedDiscountType])

    const handleDiscountTypeChange = (selectedOption) => {
        setSelectedDiscountType(selectedOption);
        setFormData((prev) => ({
            ...prev,
            discount: {
                ...prev?.discount,
                type: selectedOption?.value
            }
        }))
    }

    return (
        <div>
            <div className={styles.section_title}>
                Pricing and Stock
            </div>
            <div className={styles.form_sub_container}>
                <div className={styles.form_element}>
                    <label>Base price (€)</label> <span className="text-red-600 pl-[2px]">*</span><br />
                    <input type="text" name="price" placeholder="Enter product price" value={formData?.variation?.price?.amount || ""} onChange={(e) => {
                        setFormData((prev) => ({
                            ...prev,
                            variation: {
                                ...prev.variation,
                                price: {
                                    ...prev?.variation?.price,
                                    amount: e.target.value
                                }
                            }
                        }))
                    }}
                    />
                </div>
                <div className={styles.form_element}>
                    <label>Stock</label> <span className="text-red-600 pl-[2px]">*</span><br />
                    <input type="number" min={0} name="stock" placeholder="Enter product count" value={formData?.variation?.stock?.quantity || ""} onChange={(e) => {
                        setFormData((prev) => ({
                            ...prev,
                            variation: {
                                ...prev.variation,
                                stock: {
                                    ...prev?.variation?.stock,
                                    quantity: e.target.value
                                }
                            }
                        }))
                    }}
                    />
                </div>
                <div className={styles.form_element}>
                    <label>Discount</label> <span className="text-red-600 pl-[2px]">*</span><br />
                    <input type="number" min={0} name="discount" placeholder="Enter discount rate" value={formData?.discount?.value || ""} onChange={(e) => {
                        setFormData((prev) => ({
                            ...prev,
                            discount: {
                                ...prev?.discount,
                                value: e.target.value
                            }
                        }))
                    }}
                    />
                </div>
                <div className={styles.form_element}>
                    <label>Discount Type</label> <span className="text-red-600 pl-[2px]">*</span><br />
                    <Select
                        placeholder="Select a filter"
                        options={discountTypes}
                        value={selectedDiscountType}
                        onChange={handleDiscountTypeChange}
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