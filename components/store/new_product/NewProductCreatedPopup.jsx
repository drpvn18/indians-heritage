"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NewProductCreatedPopup({ formData, newProductCreated, setNewProductCreated }) {
    const [timeToRedirect, setTimeToRedirect] = useState(7000);
    const router = useRouter();

    useEffect(() => {
        let timer;

        if (newProductCreated?.status) {
            if (timeToRedirect <= 0) {
                setNewProductCreated({
                    status: false,
                    message: ""
                });
                handleRedirect()
                return;
            }

            timer = setTimeout(() => {
                setTimeToRedirect((prev) => prev - 1000);
            }, 1000);
        }

        return () => clearTimeout(timer);
    }, [timeToRedirect]);

    const handleRedirect = () => {
        setNewProductCreated({
            status: false,
            message: ""
        });
        router.push("/store/products");
    }

    const handleStayHere = () => {
        router.refresh();
        setNewProductCreated({
            status: false,
            message: ""
        });
    }

    return (
        <div>
            <div>
                <div className='text-[18px] text-center my-2 text-gray-800'>
                    Hey, Product <span className="text-[24px] font-[400] px-[4px] text-[var(--main-bg)]">{`"${formData?.name}"`}</span> created successfully...!
                    <br />
                </div>

                <div className='flex justify-center items-center'>
                    <button type='button' className='w-fit mt-4 outline-none border-[#2CA966] bg-[#2CA966] text-white cursor-pointer py-2 px-4 rounded-md hover:bg-[#EF5D29] hover:border-[#EF5D29]' onClick={handleStayHere}>
                        Continue create
                    </button>
                </div>
                <div className='text-center mt-4 text-gray-500 font-medium'>
                    Redirecting to products page in {timeToRedirect / 1000} seconds
                </div>
            </div>
        </div>
    );
}