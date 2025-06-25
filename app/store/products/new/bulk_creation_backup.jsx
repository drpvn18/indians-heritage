"use client";

import React, { useEffect, useState } from "react";
import { BadgePlus, Check, Loader } from "lucide-react";
import productFields from "./../../../../public/data/product_fields.json";
import { v4 as uuidv4 } from 'uuid';
import { AdditionalInfo, Dimmenssions, GeneralInfo, ManufacturerInfo, PricingStockDetails, TagsField, UploadMedia, CreateNewBrand, CreateNewCategory, CreateNewSubCategory } from "@/components/store/new_product";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import { useRouter } from "next/navigation";
// import productsList from "@/public/data/products.json";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -70%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function NewProduct() {
    // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const [formData, setFormData] = useState({});
    const [newCategoryPopup, setNewCategoryPopup] = useState(false);
    const [newSubCategoryPopup, setNewSubCategoryPopup] = useState(false);
    const [newBrandPopup, setNewBrandPopup] = useState(false);
    const [newProductAddingStatus, setNewProductAddingStatus] = useState(false);
    // const [categoriesList, setCategoriesList] = useState([]);
    const router = useRouter();
    const [newProductCreated, setNewProductCreated] = useState({
        status: false,
        message: null
    });

    useEffect(() => {
        setFormData(productFields);
    }, []);

    const handleFormValidation = () => {
        if (!formData?.name || !formData?.description || !formData?.slug || !formData?.product_type?.id || !formData?.category?.id || !formData?.category?.main_category?.id) {
            return false;
        } else if (!formData?.variation?.weight_label || !formData?.variation?.absolute_weight) {
            return false;
        } else if (!formData?.variation?.price?.amount || !formData?.variation?.stock?.quantity || !formData?.discount?.value || !formData?.discount?.type) {
            return false;
        } else if (!formData?.status) {
            return false;
        }
        return true;
    }

    const handleProductAddition = async () => {
        if (!handleFormValidation()) return alert("Please fill all the required fields");

        setNewProductAddingStatus(true);
        const product_id = uuidv4();
        const created_at = Date.now();

        const new_product = {
            ...formData,
            id: product_id,
            created_at: created_at,
        }

        const res = await fetch("/api/new_product", {
            method: "POST",
            body: JSON.stringify(new_product)
        });

        if (res.status !== 200) {
            setNewProductCreated({
                status: true,
                message: "success"
            });
        } else {
            setNewProductCreated({
                status: true,
                message: "failed"
            })
        }

        console.log(res);
        router.refresh();
        setNewProductAddingStatus(false);
    }

    const handleClose = () => {
        setNewCategoryPopup(false);
        setNewBrandPopup(false);
        setNewSubCategoryPopup(false);
    };

    // const handleFetchAllCategories = async () => {
    //     const response = await fetch("/api/fetch_sub_categories", {
    //         method: "GET"
    //     });
    //     const data = await response.json();

    //     let temp_categories_list = data?.data || {};
    //     const temp = Object.values(temp_categories_list || {})?.map(category => ({
    //         name: category.name,
    //         slug: category.slug,
    //         id: category?.category_id,
    //         parent_category: {
    //             id: category?.parent_category?.id,
    //             name: category?.parent_category?.label,
    //             slug: category?.parent_category?.value
    //         },
    //         product_type: category?.product_type
    //     }));

    //     setCategoriesList(temp || []);
    // }

    // useEffect(() => {
    //     handleFetchAllCategories();
    // }, [])

    // const fetchCategoryDetails = (currentJSON) => {
    //     let temp = {};
    //     categoriesList?.map((category) => {
    //         if (category?.slug === currentJSON?.category?.slug && currentJSON?.product_type?.slug === category?.product_type?.slug) {
    //             temp = category;
    //         }
    //     })
    //     return temp;
    // }

    // const getProductJsonFormat = (currentJSON, index) => {
    //     let product_category = fetchCategoryDetails(currentJSON);

    //     if (!product_category?.id) {
    //         console.log(`${index} - ${currentJSON?.name} - category not found`);

    //         product_category = {
    //             id: "others",
    //             name: "Others",
    //             slug: "others",
    //             parent_category: {
    //                 id: 'c6d5758e-a44c-42c6-a7cc-68eb0b5dbd2c',
    //                 name: 'Others',
    //                 slug: 'others'
    //             },
    //         }
    //     }

    //     let required_format = {
    //         id: uuidv4(),
    //         name: currentJSON?.name,
    //         slug: currentJSON?.slug,
    //         description: currentJSON?.description,
    //         brand: {
    //             id: currentJSON?.brand?.id || "",
    //             name: currentJSON?.brand?.name || ""
    //         },
    //         product_type: {
    //             id: currentJSON?.product_type?.id,
    //             name: currentJSON?.product_type?.name,
    //             slug: currentJSON?.product_type?.slug
    //         },
    //         category: {
    //             id: product_category?.slug,
    //             name: product_category?.name,
    //             main_category: product_category?.parent_category
    //         },
    //         origin: {
    //             country: currentJSON?.origin?.country,
    //             state: currentJSON?.origin?.state,
    //             manufacturer: currentJSON?.origin?.manufacturer
    //         },
    //         images: [],
    //         variation: {
    //             attributes: {
    //                 color: currentJSON?.variation?.attributes?.color
    //             },
    //             price: {
    //                 currency: "EUR",
    //                 amount: currentJSON?.variation?.price?.amount
    //             },
    //             stock: {
    //                 quantity: currentJSON?.variation?.stock?.quantity
    //             },
    //             weight_label: currentJSON?.variation?.weight_label,
    //             absolute_weight: currentJSON?.variation?.absolute_weight,
    //             dimensions: {
    //                 length: currentJSON?.variation?.dimensions?.length,
    //                 width: currentJSON?.variation?.dimensions?.width,
    //                 height: currentJSON?.variation?.dimensions?.height
    //             }
    //         },
    //         discount: {
    //             type: currentJSON?.discount?.type,
    //             value: currentJSON?.discount?.value
    //         },
    //         tags: currentJSON?.tags,
    //         status: currentJSON?.status,
    //         created_at: Date.now()
    //     }
    //     return required_format;
    // }

    // const handleProductCreation = async (product, index) => {
    //     const required_format = getProductJsonFormat(product, index);
    //     if (!required_format)
    //         return;

    //     try {
    //         const res = await fetch("/api/new_product", {
    //             method: "POST",
    //             body: JSON.stringify(required_format)
    //         });
    //         console.log(`${index} - ${required_format?.name} is saved to firebase`, res)
    //     } catch (error) {
    //         console.log(`${index} - ${required_format?.name} -  error while saving product to firebase`, error);
    //     }
    // }

    // const handleBulkCreate = async () => {
    //     for (const [index, product] of productsList.entries()) {
    //         handleProductCreation(product, index);
    //         await sleep(1000);
    //     };
    // }

    return (
        <div className="w-[100%]">
            <div className="max-w-[1400px] px-[15px] mx-auto my-[40px]">
                <div>
                    <div className="flex justify-between items-center gap-2 my-[15px]">
                        <div className="flex items-center gap-2 text-xl">
                            <BadgePlus />Add New Product
                        </div>
                        <div className="flex justify-end items-center gap-4">
                            <button className="flex justify-center items-center gap-[4px] border border-[var(--main-bg)] rounded-sm p-2 cursor-pointer bg-[var(--main-bg)] text-white min-w-[100px]" onClick={handleProductAddition}>
                                {
                                    newProductAddingStatus ? (
                                        <div className="w-6 h-6 animate-spin text-white">
                                            <Loader />
                                        </div>
                                    ) : (
                                        <span className="flex items-center gap-[4px] text-xl">
                                            <Check /> Add Product
                                        </span>
                                    )
                                }
                            </button>
                        </div>
                    </div>

                    <div className="border border-[#B3B3B3] rounded-sm p-[15px]">
                        <GeneralInfo formData={formData} setFormData={setFormData} newBrandPopup={newBrandPopup} newCategoryPopup={newCategoryPopup} setNewBrandPopup={setNewBrandPopup} setNewCategoryPopup={setNewCategoryPopup} newSubCategoryPopup={newSubCategoryPopup} setNewSubCategoryPopup={setNewSubCategoryPopup} />

                        <UploadMedia formData={formData} setFormData={setFormData} />
                        <Dimmenssions formData={formData} setFormData={setFormData} />
                        <PricingStockDetails formData={formData} setFormData={setFormData} />
                        <TagsField formData={formData} setFormData={setFormData} />
                        <AdditionalInfo formData={formData} setFormData={setFormData} />
                        <ManufacturerInfo formData={formData} setFormData={setFormData} />
                    </div>

                    <div className="flex justify-between items-center gap-2 my-[15px]">
                        <div></div>
                        <div className="flex justify-end items-center gap-4">
                            <button className="flex justify-center items-center gap-[4px] border border-[var(--main-bg)] rounded-sm p-2 cursor-pointer bg-[var(--main-bg)] text-white min-w-[100px]" onClick={handleProductAddition}>
                                {
                                    newProductAddingStatus ? (
                                        <div className="w-6 h-6 animate-spin text-white">
                                            <Loader />
                                        </div>
                                    ) : (
                                        <span className="flex items-center gap-[4px] text-xl">
                                            <Check /> Add Product
                                        </span>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={newCategoryPopup || newBrandPopup || newSubCategoryPopup || newProductCreated?.status}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={newCategoryPopup || newBrandPopup || newSubCategoryPopup || newProductCreated?.status}>
                    <Box sx={style}>
                        {
                            newBrandPopup && (
                                <CreateNewBrand newBrandPopup={newBrandPopup} setNewBrandPopup={setNewBrandPopup} />
                            )
                        }
                        {
                            newCategoryPopup && (
                                <CreateNewCategory newCategoryPopup={newCategoryPopup} setNewCategoryPopup={setNewCategoryPopup} />
                            )
                        }
                        {
                            newSubCategoryPopup && (
                                <CreateNewSubCategory newSubCategoryPopup={newSubCategoryPopup} setNewSubCategoryPopup={setNewSubCategoryPopup} />
                            )
                        }
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}