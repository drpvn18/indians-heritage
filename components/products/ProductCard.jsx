import Image from "next/image";
import React, { useContext, useState } from "react";
import styles from "./../../styles/products/ProductCard.module.css"
import loading_styles from "./../../styles/Loading.module.css";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "@/app/CartContext";
import Cart from "../cart/Cart";

export default function ProductCard({ productDetails }) {
    const { addProductToCart } = useContext(CartContext);
    const [addingProduct, setAddingProduct] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    const getCurrencySymbol = (currency) => {
        if (currency === 'EUR') {
            return '€';
        } else if (currency === 'USD') {
            return '$';
        } else {
            return '₹';
        }
    }

    const getDiscountedPrice = (price, discount) => {
        if (discount) {
            if (discount?.type === "percentage") {
                return parseFloat(price - (price * (discount?.value / 100)))?.toFixed(2);
            } else if (discount?.type === "amount") {
                return parseFloat(price - discount?.value)?.toFixed(2);
            }
        } else {
            return parseFloat(price)?.toFixed(2);
        }
    }

    const handleProductRedirect = () => {
        if (!productDetails?.id)
            return;
        window.location.href = `/product?pid=${productDetails?.id}`;
    }

    const handleAddProductToCart = (product) => {
        if (addingProduct)
            return;
        try {
            setAddingProduct(true);
            let temp_product = {
                "product_key": `${product?.id}`,
                "product": {
                    "cart_item_id": product?.id,
                    "product_count": 1,
                    "name": product?.name,
                    "price": product?.variation?.price,
                    "category": product?.category,
                    "slug": product?.slug,
                    "images": product?.images,
                    "discount": product?.discount,
                    "stock_available": product?.variation?.stock
                }
            };
            addProductToCart(temp_product);

            setAddingProduct(false);
            setOpenCart(true);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="w-[150px] sm:w-[250px] mx-auto">
            <div onClick={handleProductRedirect} className="cursor-pointer">
                <div className="relative mx-auto h-[150px] sm:h-[250px]">
                    {
                        (productDetails?.images?.length > 0 && productDetails?.images[0]?.url) && (
                            <Image src={`${productDetails?.images[0]?.url}`} alt={`${productDetails?.images[0]?.alt}`} width={150} height={150} priority className="w-[100%] h-[100%]" />
                        )
                    }
                    {
                        (productDetails?.discount?.value && parseFloat(productDetails?.discount?.value) !== 0) ? (
                            <div className="absolute top-[10px] right-[10px] bg-[#EA5F28] rounded-md text-white px-[5px] py-[5px] text-[14px]">
                                <span>{productDetails?.discount?.value}% Off</span>
                            </div>
                        ) : ""
                    }
                    <div className={`absolute bottom-0 left-0 right-0 text-center py-1 ${productDetails?.status === "Out of Stock" ? 'bg-orange-300' : ""} ${productDetails?.status === "Launch soon" ? 'bg-gray-300' : ""}`}>
                        {productDetails?.status !== "Active" ? productDetails?.status : ""}
                    </div>
                </div>
                {/* {
                    (productDetails?.product_type?.id) ? (
                        <div className="absolute top-[10px] left-[10px] bg-[#2CA966] rounded-md text-white px-[5px] py-[5px] text-[15px]">
                            <span>{productDetails?.product_type?.id?.toUpperCase()}</span>
                        </div>
                    ) : ""
                } */}
            </div>
            <div className="py-[5px] px-[5px] cursor-pointer relative">
                <p className={styles.product_name} onClick={handleProductRedirect}>
                    {productDetails?.name}
                </p>
                <p className="text-[14px] sm:text-[16px] text-gray-700 tracking-wider py-[4px] font-medium" onClick={handleProductRedirect}>
                    {productDetails?.variation?.weight_label}
                </p>
                <p className="py-[2px]" onClick={handleProductRedirect}>
                    <span className="pr-[2px] text-[16px] sm:text-[20px]">
                        {getCurrencySymbol(productDetails?.variation?.price?.currency)}
                    </span>
                    <span className="pr-[5px] text-[16px] sm:text-[20px]">
                        {getDiscountedPrice(productDetails?.variation?.price?.amount, productDetails?.discount)}
                    </span>
                    {
                        productDetails?.discount?.value && parseFloat(productDetails?.discount?.value) !== 0 ? (
                            <span className="line-through text-gray-600 text-[16px]">
                                {parseFloat(productDetails?.variation?.price?.amount || 0)?.toFixed(2)}
                            </span>
                        ) : (
                            ""
                        )
                    }
                </p>
                <div className="absolute right-[10px] bottom-[10px]">
                    <button onClick={() => handleAddProductToCart(productDetails)} className="border-2 text-white bg-[#EA5F28] border-[#EA5F28] px-2 py-2 rounded-md cursor-pointer flex gap-[5px] flex-nowrap justify-center items-center" style={{ cursor: productDetails?.status === "Active" ? 'allowed' : 'not-allowed' }} disabled={productDetails?.status !== "Active"}>
                        {
                            addingProduct ? (
                                <div className={loading_styles.loader} />
                            ) : (
                                <ShoppingCart size={22} />
                            )
                        }
                    </button>
                </div>
            </div>
            {
                openCart && (
                    <Cart openCart={openCart} setOpenCart={setOpenCart} />
                )
            }
        </div>
    );
}