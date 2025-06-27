"use client";

import React, { useEffect, useState } from "react";
import { BadgePlus, Check, Loader, Power } from "lucide-react";
import productFields from "./../../../../public/data/product_fields.json";
import { v4 as uuidv4 } from 'uuid';
import { AdditionalInfo, Dimmenssions, GeneralInfo, ManufacturerInfo, PricingStockDetails, TagsField, UploadMedia, CreateNewBrand, CreateNewCategory, CreateNewSubCategory } from "@/components/store/new_product";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import NewProductCreatedPopup from "@/components/store/new_product/NewProductCreatedPopup";
import Login from "@/components/layoutComponents/Login";
import UserIcon from "@/components/icons/UserIcon";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -65%)',
    width: '95%',
    maxWidth: '400px',
    bgcolor: 'background.paper',
    border: '2px solid #2CA966',
    borderRadius: '4px',
    outline: 'none',
    boxShadow: 24,
    p: "20px",
    zIndex: 9999
};

export default function NewProduct() {
    const [formData, setFormData] = useState({});
    const [newCategoryPopup, setNewCategoryPopup] = useState(false);
    const [newSubCategoryPopup, setNewSubCategoryPopup] = useState(false);
    const [newBrandPopup, setNewBrandPopup] = useState(false);
    const [newProductAddingStatus, setNewProductAddingStatus] = useState(false);
    const [newProductCreated, setNewProductCreated] = useState({
        status: false,
        message: null
    });
    const [showLoginPopup, setShowLoginPopup] = useState(true);
    const [userAuthenticated, setUserAuthenticated] = useState(null);
    const [logoutStatus, setLogoutStatus] = useState(false);

    useEffect(() => {
        document.title = `Create new product | Admin store - Indian Heritage | Europe's first Indian GI tagged & organic store`;
    }, []);

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
        setFormData(productFields);
        fetchUserDetails();
    }, [])

    useEffect(() => {
        if (userAuthenticated) {
            setShowLoginPopup(false);
        } else {
            setShowLoginPopup(true);
        }
    }, [userAuthenticated]);

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
        setNewProductAddingStatus(false);
    }

    const handleClose = () => {
        setNewCategoryPopup(false);
        setNewBrandPopup(false);
        setNewSubCategoryPopup(false);
    };

    const handleLogout = () => {
        setLogoutStatus(true);
        setTimeout(() => {
            document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            setLogoutStatus(false);
            window.location.href = window.location.pathname;
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
            <div className="max-w-[1400px] px-[15px] mx-auto my-[40px]">
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
                                <div className="flex justify-between items-center flex-wrap gap-[10px] my-[20px]">
                                    <div className="text-gray-600">
                                        Hey,
                                        <span className="text-[20px] px-2 text-black">
                                            {getFormattedEmail(userAuthenticated?.email)}
                                        </span>
                                    </div>
                                    <div>
                                        <button className="border-2 border-[#F9F5F0] hover:border-red-600 rounded-sm px-[10px] py-[5px] cursor-pointer hover:bg-red-600 text-red-600 hover:text-white text-xl" onClick={handleLogout}>
                                            {
                                                logoutStatus ? (
                                                    <div className="w-6 h-6 animate-spin ">
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
                                <div className="border border-[#B3B3B3] rounded-sm p-[15px]">
                                    <div className="flex justify-between items-center gap-2 my-[10px]">
                                        <div className="flex items-center gap-2 text-xl">
                                            <BadgePlus />Add New Product
                                        </div>

                                        <div className="flex justify-end items-center gap-4">
                                            <button className="flex justify-center items-center gap-[4px] border border-[var(--secondary-bg)] rounded-sm p-2 cursor-pointer bg-[var(--secondary-bg)] text-white min-w-[100px]" onClick={handleProductAddition}>
                                                {
                                                    newProductAddingStatus ? (
                                                        <div className="w-6 h-6 animate-spin text-white">
                                                            <Loader />
                                                        </div>
                                                    ) : (
                                                        <span className="flex items-center gap-[4px] text-xl">
                                                            <Check /> Create
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

                                <div className="flex justify-end items-center gap-2 my-[15px]">
                                    <div className="flex justify-end items-center gap-4">
                                        <button className="flex justify-center items-center gap-[4px] border border-[var(--main-bg)] rounded-sm p-2 cursor-pointer bg-[var(--main-bg)] text-white min-w-[100px]" onClick={handleProductAddition}>
                                            {
                                                newProductAddingStatus ? (
                                                    <div className="w-6 h-6 animate-spin text-white">
                                                        <Loader />
                                                    </div>
                                                ) : (
                                                    <span className="flex items-center gap-[4px] text-xl">
                                                        <Check /> Create
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
                        {
                            newProductCreated?.status && (
                                <NewProductCreatedPopup formData={formData} newProductCreated={newProductCreated} setNewProductCreated={setNewProductCreated} />
                            )
                        }
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}