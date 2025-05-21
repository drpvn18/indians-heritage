"use client";

import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { HeartCrack, Minus, Plus, Trash2, Truck, X } from "lucide-react"
import { LinearProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from "./../../styles/cart/Cart.module.css";
import Checkout from './Checkout';
import { CartContext } from '@/app/CartContext';

export default function Cart({ openCart, setOpenCart }) {
    const router = useRouter();
    const [addingProduct, setAddingProduct] = useState(false);
    const { cartItems, removeFromCart, addProductToCart, getCartCount, updateProductCount } = useContext(CartContext);
    const [openPlaceOrderPopup, setOpenPlaceOrderPopup] = useState(false);
    const [progress, setProgress] = useState(0);
    const [productsList, setProductsList] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [originalCartTotal, setOriginalCartTotal] = useState(0);

    const toggleDrawer = (newOpen) => () => {
        setOpenCart(newOpen);
    };

    const handleUpdateProductCount = (product, count, updateType) => {
        if (addingProduct)
            return;
        try {
            setAddingProduct(true);
            let temp_product = {
                "product_key": `${product?.cart_item_id}`,
                "product": { ...product, "product_count": count || 1 }
            };

            if (updateType === "inputChange")
                updateProductCount(temp_product);
            else
                addProductToCart(temp_product);
            setAddingProduct(false);
            setOpenCart(true);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (cartTotal > 50)
            setProgress(100);
        else {
            let percentage = 100 - ((50 - cartTotal) / 50) * 100;
            setProgress(percentage);
        }
    }, [cartTotal])

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

    useEffect(() => {
        let temp = [];
        let temp_cart_total = 0;
        let temp_original_cart_total = 0;

        Object.keys(cartItems)?.map((key) => {
            let discount_price = getDiscountedPrice(cartItems[key]?.price?.amount, cartItems[key]?.discount);
            temp_cart_total += parseFloat(discount_price) * parseInt(cartItems[key]?.product_count);
            temp_original_cart_total += parseFloat(cartItems[key]?.price?.amount) * parseInt(cartItems[key]?.product_count);
            temp.push(cartItems[key]);
        })
        setOriginalCartTotal(temp_original_cart_total?.toFixed(2));
        setCartTotal(temp_cart_total?.toFixed(2));
        setProductsList(temp);
    }, [cartItems])

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
    }

    const handleCountChange = (product_key, operation) => {
        if (operation === "minus" && cartItems[product_key]?.product_count > 1) {
            handleUpdateProductCount(cartItems[product_key], - 1);
        } else if (operation === "plus") {
            handleUpdateProductCount(cartItems[product_key], 1);
        }
    }

    const handleInputChange = (product_key, count) => {
        console.log(product_key, count);
        if (parseInt(count) && parseInt(count) > 0) {
            handleUpdateProductCount(cartItems[product_key], parseInt(count), "inputChange");
        } else {
            handleUpdateProductCount(cartItems[product_key], 1, "inputChange");
        }
    }

    const MenuList = (
        <Box sx={{ width: '100%', maxWidth: '450px', position: 'relative', backgroundColor: '#F9F5F0' }} role="presentation">
            <div className="flex flex-col h-[100vh] w-[100%]">
                <div className='sticky bg-[#FFFFFF] top-0 right-0 w-full flex justify-between gap-[10px] items-center border-b-2 border-[#E2ECF7] py-[20px] px-[10px] select-none shrink-0'>
                    <p className='text-[20px]'>
                        My Cart
                        <span className='text-gray-500 text-[18px] px-1'>
                            ({getCartCount() || 0} items)
                        </span>
                    </p>
                    <p onClick={() => setOpenCart(!openCart)} className='cursor-pointer'>
                        <X />
                    </p>
                </div>
                <div className={`${styles.cartItems} h-[95vh] overflow-y-scroll`}>
                    <div className='bg-[#E2ECF7] select-none py-[5px]'>
                        <div className='pt-2 mx-[10px]'>
                            {
                                (cartTotal < 50) ? (
                                    <p className="text-center bg-[#FFFFFF] mx-auto px-2 py-[2px] rounded-xl font-medium w-[98%]">
                                        Add items worth <span className='font-medium'>€ {cartTotal}</span> to Free Shipping!
                                    </p>
                                ) : (
                                    <p className="text-center bg-[#FFFFFF] mx-auto px-2 py-[2px] rounded-xl font-medium text-wrap w-[98%]">
                                        Congratulations! You have unlocked Free Shipping!
                                    </p>
                                )
                            }
                        </div>
                        <div className="px-[20px] grid grid-cols-12 items-center py-[10px]">
                            <div className='col-span-10'>
                                <LinearProgress variant="determinate" value={progress} sx={{
                                    height: 14,
                                    width: '100%',
                                    margin: 'auto',
                                    borderRadius: '10px 0 0 10px',
                                    backgroundColor: '#FFFFFF',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: '#2CA966',
                                    },
                                }} />
                            </div>
                            <div className="col-span-2 text-center relative">
                                <div className='left-[5px] w-min p-2 rounded-full' style={{ border: `2px solid ${progress < 100 ? '#FFFFFF' : '#2CA966'}` }}>
                                    <Truck size={32} strokeWidth={1.5} color={progress < 100 ? '#000000' : '#2CA966'} />
                                </div>
                                {/* <div className='absolute right-[100px] inline-block text-nowrap' style={{ color: progress < 100 ? '#000000' : '#2CA966' }}>Free Shipping</div> */}
                            </div>
                        </div>
                    </div>
                    {
                        (productsList?.length === 0) ? (
                            <div className="flex flex-nowrap justify-center items-center gap-[10px] my-[15%] py-[10px] w-full">
                                <div className="text-center">
                                    <p className="flex justify-center">
                                        <HeartCrack strokeWidth={1} size={56} />
                                    </p>
                                    <p className="text-[22px] py-[2px]">Your cart is empty</p>
                                    <p className="text-gray-500 text-[18px] py-[2px]">Add products to unlock free delivery</p>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full">
                                {
                                    productsList?.map((product, index) => {
                                        return (
                                            <div key={index} className="grid grid-cols-12 gap-[5px] px-[5px] py-[20px] border-b border-[#2CA966] select-none">
                                                <div className="col-span-4"
                                                    onClick={() => handleProductRedirect(product)}
                                                >
                                                    <Image src={`${product?.images[0]?.url || ""}`} alt={`${product?.images[0]?.alt || product?.name}`} width={150} height={150} priority className="w-[100px] mx-auto h-[100px] cursor-pointer" />
                                                </div>
                                                <div className="col-span-7">
                                                    <p className={styles.product_name}>
                                                        {product?.name}
                                                    </p>
                                                    <p className="py-[2px]" onClick={() => handleProductRedirect(product)}>
                                                        <span className="pr-[5px] text-[22px]">
                                                            {getCurrencySymbol(product?.price?.currency)}
                                                        </span>
                                                        <span className="pr-[5px] text-[22px]">
                                                            {getDiscountedPrice(product?.price?.amount, product?.discount)}
                                                        </span>
                                                        {
                                                            product?.discount?.value && parseFloat(product?.discount?.value) !== 0 ? (
                                                                <span className="line-through text-gray-600 text-[16px]">
                                                                    {product?.variation?.price?.amount?.toFixed(2)}
                                                                </span>
                                                            ) : (
                                                                ""
                                                            )
                                                        }
                                                    </p>

                                                    <div className="flex flex-nowrap justify-start w-fit mt-[10px]">
                                                        <div
                                                            onClick={() => handleCountChange(product?.cart_item_id, "minus", product?.product_count)}
                                                            className="border-2 rounded-full border-[#EA5F28] py-1 px-1 cursor-pointer hover:bg-[#EA5F28] hover:text-white"
                                                        >
                                                            <Minus />
                                                        </div>
                                                        <input
                                                            value={product?.product_count || 1}
                                                            onChange={(e) => handleInputChange(product?.cart_item_id, e.target.value)}
                                                            className={styles.productCountInput}
                                                            type="text"
                                                        />
                                                        <div onClick={() => handleCountChange(product?.cart_item_id, "plus", product?.product_count)} className="border-2 rounded-full border-[#EA5F28] py-1 px-1 cursor-pointer hover:bg-[#EA5F28] hover:text-white">
                                                            <Plus />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-1">
                                                    <p className='cursor-pointer px-2' onClick={() => removeFromCart(product?.cart_item_id)}>
                                                        <Trash2 color='red' strokeWidth={2} />
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        )
                    }
                </div>
                <div className="shrink-0 sticky bg-[#FFFFFF] shadow-2xl drop-shadow-2xl bottom-0 right-0 w-full py-[10px] px-[10px] tracking-wider">
                    <div className='flex justify-between items-center gap-[10px] py-[5px] text-[18px]'>
                        <p>Subtotal</p>
                        <p>
                            {
                                (originalCartTotal !== cartTotal) && (
                                    <span className="line-through text-[16px] text-gray-500 font-light">
                                        €{originalCartTotal || 0}
                                    </span>
                                )
                            }
                            <span className="text-[18px] pl-[10px] text-[#2CA966]">
                                €{cartTotal || 0}
                            </span>
                        </p>
                    </div>
                    <div className='flex justify-between items-center gap-[10px] py-[5px] text-[18px]'>
                        <p>Shipping</p>
                        {
                            (cartTotal < 50) ? (
                                <p className="text-[18px]">
                                    €{productsList?.length === 0 ? 0 : 5}
                                </p>
                            ) : (
                                <p>
                                    <span className="line-through text-[16px] text-gray-500 font-light">
                                        €5
                                    </span>
                                    <span className="text-[18px] pl-[10px] text-[#2CA966]">
                                        {'FREE'}
                                    </span>
                                </p>
                            )
                        }
                    </div>
                    <div>
                        <button onClick={() => setOpenPlaceOrderPopup(true)} className='bg-[#EE5B2F] text-[#FFFFFF] w-full mt-[10px] mb-[5px] py-[10px] tracking-widest rounded-md cursor-pointer'>
                            Checkout
                        </button>
                    </div>
                </div>
            </div >
        </Box >
    );

    return (
        <div>
            <Drawer sx={{ width: '100%', zIndex: 99 }} anchor="right" open={openCart} onClose={toggleDrawer(false)}>
                {MenuList}
            </Drawer>
            {
                openPlaceOrderPopup && (
                    <Checkout openPlaceOrderPopup={openPlaceOrderPopup} setOpenPlaceOrderPopup={setOpenPlaceOrderPopup} />
                )
            }
        </div>
    );
}