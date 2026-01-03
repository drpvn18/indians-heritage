import React, { Suspense } from "react";
import UpdateProduct from "@/components/store/update_product/UpdateProduct";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UpdateProduct />
        </Suspense>
    );
}