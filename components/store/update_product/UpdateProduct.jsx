"use client";

import React, { useEffect, useState } from "react";
import { BadgePlus, Loader, Power, Save, Trash2 } from "lucide-react";
import { AdditionalInfo, Dimmenssions, GeneralInfo, ManufacturerInfo, PricingStockDetails, TagsField, UploadMedia, CreateNewBrand, CreateNewCategory, CreateNewSubCategory } from "@/components/store/new_product";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import ProductDeletionConfirmation from "@/components/store/update_product/ProductDeletionConfirmation";
import ProductUpdatedPopup from "@/components/store/update_product/ProductUpdatedPopup";
import Login from "@/components/layoutComponents/Login";
import UserIcon from "@/components/icons/UserIcon";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -70%)',
    width: 450,
    maxWidth: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function UpdateProduct() {
    const searchParams = useSearchParams();
    const pid = searchParams.get("pid");

    const [productKey, setProductKey] = useState("");
    const [formData, setFormData] = useState({});
    const [newCategoryPopup, setNewCategoryPopup] = useState(false);
    const [newSubCategoryPopup, setNewSubCategoryPopup] = useState(false);
    const [newBrandPopup, setNewBrandPopup] = useState(false);
    const [deleteConfirmationPopup, setDeleteConfirmationPopup] = useState(false);
    const [newProductAddingStatus, setNewProductAddingStatus] = useState(false);
    const [productDeletionStatus, setProductDeletionStatus] = useState(false);
    const [productDetailsFetchingStatus, setProductDetailsFetchingStatus] = useState(false);
    const [productUpdated, setProductUpdated] = useState({
        status: false,
        message: ""
    });
    const router = useRouter();
    const [showLoginPopup, setShowLoginPopup] = useState(true);
    const [userAuthenticated, setUserAuthenticated] = useState(null);
    const [logoutStatus, setLogoutStatus] = useState(false);

    useEffect(() => {
        document.title = `${formData?.name ? formData?.name : "update"} | Admin store - Indian Heritage | Europe's first Indian GI tagged & organic store`;
    }, [formData]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = document.cookie.split('; ')?.find(row => row?.startsWith('token='));

            if (token) {
                const jwt_token = token.split('=')[1];

                const token_validation_res = await fetch("/api/verify_token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "jwt_token": jwt_token
                    })
                });

                const data = await token_validation_res.json();

                const payload = data?.payload;
                setUserAuthenticated(payload || null);
            } else {
                setUserAuthenticated(null);
            }
        }
        fetchUserDetails();
    }, [])

    useEffect(() => {
        if (userAuthenticated) {
            setShowLoginPopup(false);
        } else {
            setShowLoginPopup(true);
        }
    }, [userAuthenticated]);

    useEffect(() => {
        const handleFetchProductDetails = async () => {
            setProductDetailsFetchingStatus(true);
            try {
                const response = await fetch('/api/fetch_products');
                const res = await response.json();

                let temp_products_list = res?.data;
                let temp_product_key = "";

                let temp_product = {};
                for (const product_key in temp_products_list) {
                    const product = temp_products_list[product_key];

                    if (product?.id === pid) {
                        temp_product = product;
                        temp_product_key = product_key;
                        break;
                    }
                }

                if (temp_product?.id && temp_product_key) {
                    setFormData(temp_product);
                    setProductKey(temp_product_key);
                } else {
                    router.push("/store/products");
                    return;
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            setProductDetailsFetchingStatus(false);
        }
        handleFetchProductDetails();
    }, []);

    const handleFormValidation = () => {
        if (!formData?.name || !formData?.description || !formData?.slug) return false;
        return true;
    }

    const handleProductUpdate = async () => {
        if (!handleFormValidation()) return alert("Please fill all the required fields");

        setNewProductAddingStatus(true);
        const created_at = Date.now();

        const new_product = {
            ...formData,
            id: pid,
            created_at: created_at,
        }

        const body = {
            product_id: productKey,
            new_product: new_product
        }

        const res = await fetch("/api/update_product", {
            method: "POST",
            body: JSON.stringify(body)
        });

        if (res?.status === 200) {
            setProductUpdated({
                status: true,
                message: "success"
            })
        } else {
            setProductUpdated({
                status: true,
                message: "failed"
            })
        }
        console.log(res);
        setNewProductAddingStatus(false);
    }

    const handleClose = () => {
        setNewCategoryPopup(false);
        setNewBrandPopup(false);
        setNewSubCategoryPopup(false);
        setDeleteConfirmationPopup(false);
    };

    const handleProductDelete = async () => {
        setProductDeletionStatus(true);
        const body = {
            product_id: productKey
        }

        const res = await fetch("/api/delete_product", {
            method: "POST",
            body: JSON.stringify(body)
        });

        console.log(res);
        if (res?.status === 200) {
            router.push("/store/products");
        } else {
            router.refresh();
        }
        setProductDeletionStatus(false);
    }

    const handleLogout = () => {
        setLogoutStatus(true);
        setTimeout(() => {
            document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            setLogoutStatus(false);
            window.location.reload();
        }, 1000);
    }

    const getFormattedEmail = (email) => {
        if (email) {
            const parts = email.split('@');
            const username = parts[0];
            const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1);
            return `${formattedUsername}`;
        }
    }

    return (
        <div className="w-[100%]">
            <div className="max-w-[1400px] px-[15px] mx-auto my-[20px]">
                {
                    showLoginPopup ? (
                        <div>
                            <Login showLoginPopup={showLoginPopup} setShowLoginPopup={setShowLoginPopup} />
                        </div>
                    ) : ""
                }
                <div>
                    {
                        (!userAuthenticated || !userAuthenticated?.email) ? (
                            <div className="flex flex-col justify-center items-center text-center text-[18px] my-[100px]">
                                <UserIcon />
                                <p className="text-[24px] font-[500] text-[#1C274C] mt-[5px] mb-[10px]">
                                    Login to continue
                                </p>
                                <div>
                                    click here to <span className="cursor-pointer text-blue-600 text-[20px] px-1 hover:underline underline-offset-2" onClick={() => setShowLoginPopup(true)}>login</span>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div>
                                    <div className="flex justify-between items-center flex-wrap gap-[10px] my-[20px]">
                                        <div className="text-gray-600">
                                            Hey,
                                            <span className="text-[20px] px-2 text-black">
                                                {getFormattedEmail(userAuthenticated?.email)}
                                            </span>
                                        </div>
                                        <div>
                                            <button className="border-2 border-red-600 rounded-sm px-[10px] py-[5px] cursor-pointer hover:bg-red-600 text-red-600 hover:text-white text-xl" onClick={handleLogout}>
                                                {
                                                    logoutStatus ? (
                                                        <div className="w-6 h-6 animate-spin">
                                                            <Loader />
                                                        </div>
                                                    ) : (
                                                        <span className="flex justify-center items-center gap-[6px]">
                                                            <Power />
                                                        </span>
                                                    )
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    {
                                        productDetailsFetchingStatus ? (
                                            <div className="flex flex-col justify-center items-center my-[15%]">
                                                <div className="w-6 h-6 animate-spin text-black">
                                                    <Loader />
                                                </div>
                                                <p className="text-[18px] mt-[5px]">
                                                    Loading products
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="border border-[#B3B3B3] rounded-sm p-[15px]">
                                                    <div className="flex justify-between items-center gap-2 my-[5px]">
                                                        <div className="flex items-center gap-2 text-xl">
                                                            <BadgePlus />Add New Product
                                                        </div>
                                                        <div className="flex justify-end items-center gap-4">
                                                            <button className="flex justify-center items-center gap-[4px] border-2 border-red-600 rounded-sm p-2 cursor-pointer bg-white hover:bg-red-600 text-red-600 hover:text-white min-w-[100px]" onClick={() => setDeleteConfirmationPopup(true)}>
                                                                {
                                                                    productDeletionStatus ? (
                                                                        <div className="w-6 h-6 animate-spin text-white">
                                                                            <Loader />
                                                                        </div>
                                                                    ) : (
                                                                        <span className="flex items-center gap-[4px] text-xl">
                                                                            <Trash2 /> Delete
                                                                        </span>
                                                                    )
                                                                }
                                                            </button>
                                                            <button className="flex justify-center items-center gap-[4px] border border-[var(--secondary-bg)] rounded-sm p-2 cursor-pointer bg-[var(--secondary-bg)] text-white min-w-[100px]" onClick={handleProductUpdate}>
                                                                {
                                                                    newProductAddingStatus ? (
                                                                        <div className="w-6 h-6 animate-spin text-white">
                                                                            <Loader />
                                                                        </div>
                                                                    ) : (
                                                                        <span className="flex items-center gap-[4px] text-xl">
                                                                            <Save /> Update
                                                                        </span>
                                                                    )
                                                                }
                                                            </button>
                                                        </div>
                                                    </div>
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
                                                        <button className="flex justify-center items-center gap-[4px] border-2 border-red-600 rounded-sm p-2 cursor-pointer bg-white hover:bg-red-600 text-red-600 hover:text-white min-w-[100px]" onClick={() => setDeleteConfirmationPopup(true)}>
                                                            {
                                                                productDeletionStatus ? (
                                                                    <div className="w-6 h-6 animate-spin text-white">
                                                                        <Loader />
                                                                    </div>
                                                                ) : (
                                                                    <span className="flex items-center gap-[4px] text-xl">
                                                                        <Trash2 /> Delete
                                                                    </span>
                                                                )
                                                            }
                                                        </button>
                                                        <button className="flex justify-center items-center gap-[4px] border border-[var(--main-bg)] rounded-sm p-2 cursor-pointer bg-[var(--main-bg)] text-white min-w-[100px]" onClick={handleProductUpdate}>
                                                            {
                                                                newProductAddingStatus ? (
                                                                    <div className="w-6 h-6 animate-spin text-white">
                                                                        <Loader />
                                                                    </div>
                                                                ) : (
                                                                    <span className="flex items-center gap-[4px] text-xl">
                                                                        <Save /> Update
                                                                    </span>
                                                                )
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>

                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={newCategoryPopup || newBrandPopup || newSubCategoryPopup || deleteConfirmationPopup || productUpdated?.status}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    slots={{ backdrop: Backdrop }}
                                    slotProps={{
                                        backdrop: {
                                            timeout: 500,
                                        },
                                    }}
                                >
                                    <Fade in={newCategoryPopup || newBrandPopup || newSubCategoryPopup || deleteConfirmationPopup || productUpdated?.status}>
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
                                            {
                                                deleteConfirmationPopup && (
                                                    <ProductDeletionConfirmation formData={formData} productDeletionStatus={productDeletionStatus} setProductDeletionStatus={setProductDeletionStatus} deleteConfirmationPopup={deleteConfirmationPopup} setDeleteConfirmationPopup={setDeleteConfirmationPopup} handleProductDelete={handleProductDelete} />
                                                )
                                            }
                                            {
                                                productUpdated?.status && (
                                                    <ProductUpdatedPopup formData={formData} productUpdated={productUpdated} setProductUpdated={setProductUpdated} />
                                                )
                                            }
                                        </Box>
                                    </Fade>
                                </Modal>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}