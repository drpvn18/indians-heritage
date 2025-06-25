"use client";

import React, { useEffect, useState } from "react";
import styles from "./../../../styles/store/NewProduct.module.css";
import dynamic from "next/dynamic";
import countriesList from "@/public/data/countries.json";
import indianStates from "@/public/data/indianStates.json";

const Select = dynamic(() => import('react-select'), { ssr: false });

export default function ManufacturerInfo({ formData, setFormData }) {
    const [states, setStates] = useState([]);

    useEffect(() => {
        const states = Object.keys(indianStates || {}).map((state_code) => {
            return {
                value: state_code,
                label: indianStates[state_code]?.name
            }
        })
        setStates(states);
    }, [indianStates])

    const [selectedCountry, setSelectedCountry] = useState(
        { value: '', label: 'Select country' }
    );

    const [selectedState, setSelectedState] = useState(
        { value: null, label: 'Select state' }
    );

    useEffect(() => {
        if (formData?.origin?.country && !selectedCountry?.value) {
            const country = countriesList.find((country) => country?.value === formData?.origin?.country)
            setSelectedCountry(country);
        }
        if (formData?.origin?.state && !selectedState?.value) {
            const state = states.find((state) => state?.value === formData?.origin?.state);
            setSelectedState(state);
        }
    }, [formData])

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
        setFormData((prev) => ({
            ...prev,
            origin: {
                ...prev?.origin,
                country: selectedOption?.label
            }
        }))
    };

    const handleStateChange = (selectedOption) => {
        setSelectedState(selectedOption);
        setFormData((prev) => ({
            ...prev,
            origin: {
                ...prev?.origin,
                state: selectedOption?.value || ""
            }
        }))
    };

    return (
        <div>
            <div className={styles.section_title}>
                Manufacturer Information
            </div>
            <div className={styles.form_sub_container}>
                <div className={styles.form_element}>
                    <label>Company Name</label><br />
                    <input type="text" name="manufacturer" placeholder="Manufacturer name" value={formData?.origin?.manufacturer || ""} onChange={(e) => setFormData((prev) => ({
                        ...prev,
                        origin: {
                            ...prev?.origin,
                            manufacturer: e.target?.value || ""
                        }
                    }))} />
                </div>
                <div className={styles.form_element}>
                    <label>Country</label> <span className="text-red-600 pl-[2px]">*</span><br />
                    <Select
                        placeholder="Select a country"
                        options={countriesList}
                        value={selectedCountry}
                        onChange={handleCountryChange}
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
                {
                    selectedCountry?.value === "IN" && (
                        <div className={styles.form_element}>
                            <label>State</label><br />
                            <Select
                                placeholder="Select a State"
                                options={states}
                                value={selectedState}
                                onChange={handleStateChange}
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
                    )
                }
            </div>
        </div>
    );
}