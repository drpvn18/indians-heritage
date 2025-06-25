"use client";

import React from "react";
import styles from "./../../../styles/store/NewProduct.module.css";

export default function Dimmenssions({ formData, setFormData }) {
    return (
        <div>
            <div className={styles.section_title}>
                Dimmenssions
            </div>
            <div className={styles.form_sub_container}>
                <div className={styles.form_element}>
                    <label>Weight Label</label> <span className="text-red-600 pl-[2px]">*</span><br />
                    <input type="text" name="weight_label" placeholder="Eg: 250 gms" value={formData?.variation?.weight_label || ""} onChange={(e) => {
                        setFormData((prev) => ({
                            ...prev,
                            variation: {
                                ...prev.variation,
                                weight_label: e.target.value
                            }
                        }))
                    }}
                    />
                </div>
                <div className={styles.form_element}>
                    <label>Absolute Weight (in grams)</label> <span className="text-red-600 pl-[2px]">*</span><br />
                    <input type="number" min={0} name="weight" placeholder="Eg: 250" value={formData?.variation?.absolute_weight || ""} onChange={(e) => {
                        setFormData((prev) => ({
                            ...prev,
                            variation: {
                                ...prev.variation,
                                absolute_weight: e.target.value
                            }
                        }))
                    }}
                    />
                </div>
                <div className={styles.form_element}>
                    <label>Length (in cm)</label><br />
                    <input type="number" min={0} name="length" placeholder="Eg: 12" value={formData?.variation?.dimensions?.length || ""} onChange={(e) => {
                        setFormData((prev) => ({
                            ...prev,
                            variation: {
                                ...prev.variation,
                                dimensions: {
                                    ...prev?.variation?.dimensions,
                                    length: e.target.value
                                }
                            }
                        }))
                    }}
                    />
                </div>
                <div className={styles.form_element}>
                    <label>Height (in cm)</label><br />
                    <input type="number" min={0} name="height" placeholder="Eg: 12" value={formData?.variation?.dimensions?.height || ""} onChange={(e) => {
                        setFormData((prev) => ({
                            ...prev,
                            variation: {
                                ...prev.variation,
                                dimensions: {
                                    ...prev?.variation?.dimensions,
                                    height: e.target.value
                                }
                            }
                        }))
                    }}
                    />
                </div>
                <div className={styles.form_element}>
                    <label>Width (in cm)</label><br />
                    <input type="number" min={0} name="width" placeholder="Eg: 12" value={formData?.variation?.dimensions?.width || ""} onChange={(e) => {
                        setFormData((prev) => ({
                            ...prev,
                            variation: {
                                ...prev.variation,
                                dimensions: {
                                    ...prev?.variation?.dimensions,
                                    width: e.target.value
                                }
                            }
                        }))
                    }}
                    />
                </div>
                <div className={styles.form_element}>
                    <label>Color</label><br />
                    <input type="text" name="color" className="h-[50px] my-[4px]" placeholder="Eg: Balck" value={formData?.variation?.attributes?.color || ""} onChange={(e) => {
                        setFormData((prev) => ({
                            ...prev,
                            variation: {
                                ...prev.variation,
                                attributes: {
                                    ...prev?.variation?.attributes,
                                    color: e.target.value
                                }
                            }
                        }))
                    }}
                    />
                </div>
            </div>
        </div>
    );
}