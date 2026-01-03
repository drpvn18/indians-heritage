"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./../../../styles/store/NewProduct.module.css";
import Image from "next/image";
import { FileImage } from "lucide-react";

export default function UploadMedia({ formData, setFormData }) {
    const fileInputRef = useRef(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [file, setFile] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [productImages, setProductImages] = useState({
        url: "",
        alt: "",
        mediaType: ""
    })
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (formData?.images && formData?.images?.length > 0 && !file) {
            setProductImages(formData?.images[0])
        }

        console.log(formData);
    }, [formData])

    const handleFileChange = (e) => {
        const image = e.target.files?.[0];
        if (!image) return;

        const reader = new FileReader();

        reader.onload = () => {
            setImageSrc(reader.result);
        };

        reader.readAsDataURL(image);
        setFile(e.target.files?.[0] || null);
    };

    const handleUpload = async () => {
        try {
            setUploading(true);
            if (!file) {
                setUploading(false);
                return;
            }
            const temp = new FormData();
            temp.append('file', file);

            const res = await fetch('/api/upload_file', {
                method: 'POST',
                body: temp,
            });

            const data = await res.json();
            setUploading(false);
            setFormData((prev) => ({
                ...prev,
                images: [{
                    url: data?.url,
                    alt: file?.name,
                    mediaType: file?.type,
                }],
            }))

            if (res?.status === 200) {
                setSuccessMessage("Image successfully uploaded...!")
            } else {
                setErrorMessage("Error while uploading image...!")
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("Error while uploading image...!")
        }
    };

    const handleEditFile = () => {
        setSuccessMessage("");
        setErrorMessage("");
        setFile(null);
        setImageSrc(null);
        setProductImages({
            url: "",
            alt: "",
            mediaType: ""
        });
        fileInputRef.current.click();
    }

    return (
        <div>
            <div className={styles.section_title}>
                Upload Media
            </div>
            <div className={styles.form_sub_container}>
                {
                    (!file && !productImages?.url) && (
                        <label htmlFor="product_media_upload" className="flex flex-col justify-center  items-center w-fit cursor-pointer">
                            <FileImage size={60} strokeWidth={1.25} />
                            <p className="text-md my-2">
                                Click here to upload img
                            </p>
                        </label>
                    )
                }
                <input id="product_media_upload" type="file" name="main_image" onChange={handleFileChange} className="border-2 border-[#B3B3B3] rounded-sm px-[10px] py-[10px] h-[46px] my-[4px] focus:bg-white hidden" ref={fileInputRef} />
                <div>
                    {
                        (file && imageSrc) && (
                            <div>
                                <Image
                                    src={imageSrc}
                                    alt="Uploaded"
                                    width={225}
                                    height={225}
                                    priority
                                />
                            </div>
                        )
                    }
                    {
                        (!file && productImages?.url) && (
                            <div>
                                <Image
                                    src={productImages?.url}
                                    alt="Uploaded"
                                    width={225}
                                    height={225}
                                    priority
                                />
                            </div>
                        )
                    }
                    {
                        (file || productImages?.url) && (
                            <div className="flex gap-[20px] flex-wrap items-center mt-[20px]">
                                {
                                    ((file || productImages?.url) && !uploading) && (
                                        <button type="button" onClick={handleEditFile} disabled={uploading} className="border border-[var(--main-bg)] rounded-sm p-2 cursor-pointer bg-[var(--main-bg)] text-white">
                                            Edit
                                        </button>
                                    )
                                }
                                {
                                    file && (
                                        <button type="button" onClick={handleUpload} disabled={uploading} className="border border-[var(--main-bg)] rounded-sm p-2 cursor-pointer bg-[var(--main-bg)] text-white">
                                            {uploading ? 'Uploading...' : 'Upload'}
                                        </button>
                                    )
                                }
                            </div>
                        )
                    }
                    {
                        successMessage && (
                            <div className="text-left text-[18px] text-green-700 mt-[25px]">
                                {successMessage}
                            </div>
                        )
                    }
                    {
                        errorMessage && (
                            <div className="text-left text-[18px] text-red-800 mt-[25px]">
                                {errorMessage}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}