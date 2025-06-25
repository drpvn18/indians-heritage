"use client";

import React, { useEffect, useState } from "react";
import styles from "./../../../styles/store/NewProduct.module.css";
import dynamic from "next/dynamic";
import { Loader } from "lucide-react";

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

export default function GeneralInfo({ formData, setFormData, newBrandPopup, newCategoryPopup, setNewBrandPopup, setNewCategoryPopup, newSubCategoryPopup, setNewSubCategoryPopup }) {
    const [categoriesList, setCategoriesList] = useState([]);
    const [subCategoriesList, setSubCategoriesList] = useState([]);
    const [productBrands, setProductBrands] = useState([]);

    const [brandsLoading, setBrandsLoading] = useState(false);
    const [categoriesLoading, setCategoriesLoading] = useState(false);
    const [subCategoriesLoading, setSubCategoriesLoading] = useState(false);

    const [selectedProductType, setSelectedProductType] = useState(
        { value: null, label: 'Select type', slug: null }
    );
    const [selectedProductCategory, setSelectedProductCategory] = useState(
        { value: null, label: 'Select category' }
    );
    const [selectedProductSubCategory, setSelectedProductSubCategory] = useState(
        { value: null, label: 'Select sub category' }
    );
    const [selectedProductBrand, setSelectedProductBrand] = useState(
        { value: null, label: 'Select brand' }
    );

    useEffect(() => {
        if (formData?.brand?.id && !selectedProductBrand?.value) {
            setSelectedProductBrand({
                value: formData?.brand?.id,
                label: formData?.brand?.name
            })
        }

        if (formData?.product_type?.id && !selectedProductType?.value) {
            setSelectedProductType({
                value: formData?.product_type?.id,
                label: formData?.product_type?.name,
                slug: formData?.product_type?.slug
            })
        }
        if (formData?.category?.main_category?.id && !selectedProductCategory?.value) {
            setSelectedProductCategory({
                value: formData?.category?.main_category?.slug,
                label: formData?.category?.main_category?.name,
            });
        }
        if (formData?.category?.id && !selectedProductSubCategory?.value) {
            setSelectedProductSubCategory({
                value: formData?.category?.id,
                label: formData?.category?.name,
            });
        }
    }, [formData]);

    useEffect(() => {
        if (selectedProductType?.value)
            handleFetchAllCategories();
    }, [selectedProductType])

    useEffect(() => {
        if (selectedProductCategory?.value)
            handleFetchAllSubCategories();
    }, [selectedProductCategory])

    useEffect(() => {
        setCategoriesList([]);
        setProductBrands([]);
        setSubCategoriesList([]);

        handleFetchAllBrands();
    }, []);

    const handleProductTypeChange = (selectedOption) => {
        setSelectedProductType(selectedOption);
        setFormData({
            ...formData,
            product_type: {
                id: selectedOption?.value,
                name: selectedOption?.label,
                slug: selectedOption?.slug
            },
        });
    };

    const handleProductCategoryChange = (selectedOption) => {
        setSelectedProductCategory(selectedOption);
        setFormData((prev) => ({
            ...prev,
            category: {
                ...prev?.category,
                main_category: {
                    id: selectedOption?.value,
                    name: selectedOption?.label,
                }
            },
        }))
    };

    const handleProductBrandChange = (selectedOption) => {
        setSelectedProductBrand(selectedOption);
        setFormData((prev) => ({
            ...prev,
            brand: {
                ...prev?.brand,
                id: selectedOption?.value,
                name: selectedOption?.label
            },
        }))
    };

    const handleProductSubCategoryChange = (selectedOption) => {
        setSelectedProductSubCategory(selectedOption);
        setFormData((prev) => ({
            ...prev,
            category: {
                ...prev?.category,
                id: selectedOption?.value,
                name: selectedOption?.label
            },
        }))
    };

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        const name = formData?.name;
        let temp = (name || "").replace(/[^a-zA-Z0-9-]/g, '-');
        temp = temp.replace(/-+/g, '-');
        temp = temp.replace(/^-|-$/g, '');
        temp = temp.toLowerCase();
        setFormData({
            ...formData,
            slug: temp,
        });
    }, [formData?.name])

    const handleFetchAllBrands = async () => {
        setBrandsLoading(true);

        const response = await fetch("/api/fetch_brands", {
            method: "GET"
        });
        const data = await response.json();

        let temp_brands_list = data?.data;
        const formattedOptions = Object.values(temp_brands_list || {})?.map(brand => ({
            label: brand.name,
            value: brand.slug
        }));

        setProductBrands(formattedOptions);
        setBrandsLoading(false);
    }

    const handleFetchAllCategories = async () => {
        if (!selectedProductType || !selectedProductType?.value)
            return alert("Please select a product type");

        setCategoriesLoading(true);

        const response = await fetch("/api/fetch_categories", {
            method: "GET"
        });
        const data = await response.json();

        let temp_categories_list = data?.data || {};
        const temp = Object.values(temp_categories_list || {})?.map(category => ({
            label: category.name,
            value: category.slug,
            id: category?.category_id,
            parent_category: {
                id: category?.parent_category?.id,
                name: category?.parent_category?.name,
                slug: category?.parent_category?.slug
            }
        }));

        let formattedOptions = temp?.filter((category) => category?.parent_category?.id === selectedProductType?.value)

        setCategoriesList(formattedOptions);
        setCategoriesLoading(false);
    }

    const handleFetchAllSubCategories = async () => {
        if (!selectedProductCategory?.value)
            return alert("Please select a category");

        setSubCategoriesLoading(true);
        const response = await fetch("/api/fetch_sub_categories", {
            method: "GET"
        });
        const data = await response.json();

        let temp_sub_categories_list = data?.data || {};
        const formattedOptions = Object.values(temp_sub_categories_list || {})?.map(sub_category => ({
            label: sub_category.name,
            value: sub_category.slug,
            id: sub_category?.sub_category_id,
            parent_category: sub_category?.parent_category
        }));

        let temp_sub_categories = formattedOptions?.filter((sub_category) => sub_category?.parent_category?.value === selectedProductCategory?.value && sub_category?.parent_category?.parent_category?.id === selectedProductType?.value)

        setSubCategoriesList(temp_sub_categories);
        setSubCategoriesLoading(false);
    }

    return (
        <div>
            <div className={styles.section_title}>
                General Information
            </div>
            <div className={styles.form_sub_container}>
                <div className={styles.form_element}>
                    <label>Name product</label> <span className="text-red-600 pl-[2px]">*</span><br />
                    <input type="text" name="name" placeholder="Enter product name" onChange={handleFormChange} value={formData?.name || ""} />
                </div>
                <div className={styles.form_element}>
                    <label>Product endpoint (url)</label> <span className="text-red-600 pl-[2px]">*</span><br />
                    <input type="text" name="slug" placeholder="product url (or) slug" onChange={handleFormChange} value={formData?.slug || ""} readOnly style={{ cursor: 'not-allowed' }} />
                </div>
                <div className={styles.form_element}>
                    <div className="flex gap-[10px] flex-wrap">
                        <label>Product Brand</label>
                        {
                            brandsLoading ? (
                                <div className="w-6 h-6 animate-spin text-gray-500">
                                    <Loader />
                                </div>
                            ) : (
                                <div onClick={handleFetchAllBrands} className="text-blue-800 cursor-pointer hover:underline underline-offset-2">
                                    refresh
                                </div>
                            )
                        }
                    </div>
                    <Select
                        placeholder="Select brand"
                        options={productBrands}
                        value={selectedProductBrand}
                        onChange={handleProductBrandChange}
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
                    <button type="button" className="text-blue-800 cursor-pointer hover:underline underline-offset-2 pl-[5px]" onClick={() => setNewBrandPopup(!newBrandPopup)}>add new brand</button>
                </div>
                <div className={styles.form_element}>
                    <label>Product Type</label> <span className="text-red-600 pl-[2px]">*</span><br />
                    <Select
                        placeholder="Select type"
                        options={productTypes}
                        value={selectedProductType}
                        onChange={handleProductTypeChange}
                        styles={{
                            control: (baseStyles) => ({
                                ...baseStyles,
                                border: '2px solid #dedede',
                                minWidth: '225px',
                                minHeight: '46px',
                                paddingTop: 0,
                                paddingBottom: 0,
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
                                paddingTop: 0,
                                paddingBottom: 0,
                                height: '46px',
                            }),
                        }}
                    />
                </div>
                <div className={styles.form_element}>
                    <div className="flex gap-[10px] flex-wrap">
                        <label>Product Category <span className="text-red-600 pl-[2px]">*</span></label>
                        {
                            categoriesLoading ? (
                                <div className="w-6 h-6 animate-spin text-gray-500">
                                    <Loader />
                                </div>
                            ) : (
                                <div onClick={handleFetchAllCategories} className="text-blue-800 cursor-pointer hover:underline underline-offset-2">
                                    refresh
                                </div>
                            )
                        }
                    </div>
                    <Select
                        placeholder="Select category"
                        options={categoriesList}
                        value={selectedProductCategory}
                        onChange={handleProductCategoryChange}
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
                    <button type="button" className="text-blue-800 cursor-pointer hover:underline underline-offset-2 pl-[5px]" onClick={() => setNewCategoryPopup(!newCategoryPopup)}>add new category</button>
                </div>
                <div className={styles.form_element}>
                    <div className="flex gap-[10px] flex-wrap">
                        <label>Product Sub Category <span className="text-red-600 pl-[2px]">*</span></label>
                        {
                            subCategoriesLoading ? (
                                <div className="w-6 h-6 animate-spin text-gray-500">
                                    <Loader />
                                </div>
                            ) : (
                                <div onClick={handleFetchAllSubCategories} className="text-blue-800 cursor-pointer hover:underline underline-offset-2">
                                    refresh
                                </div>
                            )
                        }
                    </div>
                    <Select
                        placeholder="Select sub category"
                        options={subCategoriesList}
                        value={selectedProductSubCategory}
                        onChange={handleProductSubCategoryChange}
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
                    <button type="button" className="text-blue-800 cursor-pointer hover:underline underline-offset-2 pl-[5px]" onClick={() => setNewSubCategoryPopup(!newSubCategoryPopup)}>add new sub-category</button>
                </div>
                <div className={styles.form_element}>
                    <label>Product Description</label> <span className="text-red-600 pl-[2px]">*</span><br />
                    <textarea type="text" name="description" placeholder="Enter product description" rows={3} onChange={handleFormChange} value={formData?.description || ""} />
                </div>
            </div>
        </div >
    );
}