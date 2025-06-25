"use client";

import React from "react";
import { Loader, Trash2, X } from "lucide-react";

export default function ProductDeletionConfirmation({ formData, productDeletionStatus, deleteConfirmationPopup, setDeleteConfirmationPopup, handleProductDelete }) {
    return (
        <div>
            <div className="text-[20px] mb-[10px] font-[350]">
                Do you want to delete this product?
            </div>
            <div className="my-[20px] text-[20px] font-[400] text-[var(--main-bg)]">
                — {formData?.name}
            </div>
            <div className="mt-[10px] flex flex-wrap justify-end gap-[15px]">
                <button className="flex justify-center items-center gap-[4px] border-2 border-green-600 rounded-sm p-2 cursor-pointer hover:bg-green-600 text-green-600 hover:text-white" onClick={() => {
                    setDeleteConfirmationPopup(!deleteConfirmationPopup);
                    window.location.reload();
                }}>
                    <X /> Cancel
                </button>
                <button className="border-2 border-red-600 text-red-600 rounded-sm p-2 cursor-pointer hover:bg-red-600 hover:text-white" onClick={handleProductDelete}>
                    {
                        productDeletionStatus ? (
                            <div className="w-6 h-6 animate-spin">
                                <Loader />
                            </div>
                        ) : (
                            <span className="flex justify-center items-center gap-[4px]">
                                <Trash2 /> Delete
                            </span>
                        )
                    }
                </button>
            </div>
        </div>
    );
}