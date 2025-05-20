"use client";

import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Backdrop } from '@mui/material';
import styles from "./../../styles/layoutComponents/ProductSearch.module.css";
import { ShoppingCart, X } from 'lucide-react';
import products from "@/public/data/products.json";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CartContext } from '@/app/CartContext';
import loading_styles from "./../../styles/Loading.module.css";
import Cart from '../cart/Cart';

export default function ProductSearch({ openSearchPopup, setOpenSearchPopup }) {
    const router = useRouter();
    const inputRef = useRef(null);
    const { addProductToCart } = useContext(CartContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [mobileScreenDetected, setMobileScreenDetected] = useState(0);
    const [addingProduct, setAddingProduct] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    const [modalStyle, setModalStyle] = useState({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -65%)',
        width: '95%',
        maxWidth: '400px',
        bgcolor: 'background.paper',
        border: '2px solid #00879E',
        borderRadius: '4px',
        outline: 'none',
        boxShadow: 24,
        p: "20px",
    });

    useEffect(() => {
        setMobileScreenDetected(window.innerWidth <= 640)
        const handleResize = () => {
            setMobileScreenDetected(window.innerWidth <= 640);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (!mobileScreenDetected) {
            setModalStyle({ ...modalStyle, "maxWidth": 650 });
        }
    }, [mobileScreenDetected])

    function handleClose() {
        setSearchTerm("");
        setOpenSearchPopup(false);
    }

    useEffect(() => {
        if (openSearchPopup) {
            setTimeout(() => {
                inputRef.current.focus();
            }, 250);
        }
    }, [openSearchPopup])

    useEffect(() => {
        if (searchTerm) {
            const temp = products.filter((product) => {
                const term = (product?.name || "") + " " + (product?.category?.name || "") + " " + (product?.description || "");
                return (term || "").toLowerCase().includes(searchTerm.toLowerCase())
            });
            setFilteredProducts(temp);
        } else {
            setFilteredProducts([]);
        }
    }, [searchTerm])

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

    const getCurrencySymbol = (currency) => {
        if (currency === 'EUR') {
            return '€';
        } else if (currency === 'USD') {
            return '$';
        } else {
            return '₹';
        }
    }

    const handleProductRedirect = (product) => {
        router?.push(`/product/${product?.category?.slug}/${product?.slug}`);
        setOpenSearchPopup(false);
        return;
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
    return (
        <Fragment>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openSearchPopup}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 250,
                        sx: { backgroundColor: "rgba(0, 0, 0, 0.6)" }
                    },
                }}
            >
                <Box sx={modalStyle}>
                    <div className={styles.productSearch}>
                        <div className={styles.searchInput}>
                            <input ref={inputRef} placeholder='Search for Products...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                        <div className={styles.close} onClick={handleClose}>
                            <X size={32} />
                        </div>
                    </div>
                    <div className={styles.filteredProductsList}>
                        <div>
                            {
                                (searchTerm?.length === 0) ? (
                                    <div className={styles.noProductFound}>
                                        Type to search for products.
                                    </div>
                                ) : (
                                    (filteredProducts.length === 0) && (
                                        <div className={styles.noProductFound}>
                                            No Product Found.
                                        </div>
                                    )
                                )
                            }
                        </div>
                        {
                            filteredProducts?.map((product, index) => {
                                return (
                                    <div key={index} className="grid grid-cols-12 gap-[5px] px-[5px] py-[10px] border-b border-[#2CA966] select-none">
                                        <div className="col-span-3"
                                            onClick={() => handleProductRedirect(product)}
                                        >
                                            <Image src={`${product?.images[0]?.url || ""}`} alt={`${product?.images[0]?.alt || product?.name}`} width={100} height={100} priority className="w-[75px] mx-auto h-[75px] cursor-pointer" />
                                        </div>
                                        <div className="col-span-9 relative">
                                            <p className={styles.product_name} onClick={() => handleProductRedirect(product)}>
                                                {product?.name}
                                            </p>
                                            <p className="py-[2px]">
                                                <span className="pr-[5px] text-[22px]">
                                                    {getCurrencySymbol(product?.variation?.price?.currency)}
                                                </span>
                                                <span className="pr-[5px] text-[22px]">
                                                    {getDiscountedPrice(product?.variation?.price?.amount, product?.discount)}
                                                </span>
                                                <span className="line-through text-[16px] text-gray-700">
                                                    {product?.variation?.price?.amount}
                                                </span>
                                            </p>
                                            <button onClick={() => handleAddProductToCart(product)} className="text-white bg-[#EA5F28] p-2 rounded-md cursor-pointer flex gap-[5px] flex-nowrap justify-center items-center absolute right-0 bottom-0">
                                                {
                                                    addingProduct ? (
                                                        <div className={loading_styles.loader} />
                                                    ) : (
                                                        <ShoppingCart size={24} />
                                                    )
                                                }
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    {
                        openCart && (
                            <Cart openCart={openCart} setOpenCart={setOpenCart} />
                        )
                    }
                </Box>
            </Modal>
        </Fragment>
    );
}