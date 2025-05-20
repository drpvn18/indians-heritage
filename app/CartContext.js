"use client";

import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartUpdateStatus, setCartUpdateStatus] = useState({
        status: "",
        product_details: {
            name: "",
            price: 0,
            weight: "",
            quantity: 0,
        },
        cart_update_status: false
    });

    useEffect(() => {
        const storedCart = localStorage.getItem("cartItems");
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            setCartItems(parsedCart);
        }

        const handleStorage = (event) => {
            if (event.key === "cartItems") {
                const updatedCart = JSON.parse(event.newValue) || [];
                setCartItems(updatedCart);
            }
        };

        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    const addProductToCart = (item) => {
        let updatedCart = {};

        if (item?.product_key in cartItems) {
            const updatedItemCount = cartItems[item?.product_key]?.product_count + item?.product?.product_count;
            const temp_updated_item = { ...cartItems[item?.product_key], "product_count": updatedItemCount };
            updatedCart = { ...cartItems, [item?.product_key]: temp_updated_item }
        } else {
            updatedCart = { ...cartItems, [item?.product_key]: item?.product };
        }

        setCartItems(updatedCart);
        setCartUpdateStatus({
            status: "add",
            product_details: {
                name: item?.product?.product_name,
                price: item?.product?.product_varient?.price,
                weight: item?.product?.product_varient?.weight,
                quantity: item?.product?.product_count,
            },
            cart_update_status: true
        });
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    };

    const updateProductCount = (item) => {
        let updatedCart = {};

        if (item?.product_key in cartItems) {
            const updatedItemCount = item?.product?.product_count;
            const temp_updated_item = { ...cartItems[item?.product_key], "product_count": updatedItemCount };
            updatedCart = { ...cartItems, [item?.product_key]: temp_updated_item }
        } else {
            updatedCart = { ...cartItems, [item?.product_key]: item?.product };
        }

        setCartItems(updatedCart);
        setCartUpdateStatus({
            status: "add",
            product_details: {
                name: item?.product?.product_name,
                price: item?.product?.product_varient?.price,
                weight: item?.product?.product_varient?.weight,
                quantity: item?.product?.product_count,
            },
            cart_update_status: true
        });
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    };

    const deleteItemStatus = (item_deleted) => {
        setCartUpdateStatus({
            status: "delete",
            product_details: {
                name: item_deleted?.product?.name,
                price: item_deleted?.product?.varient?.price,
                weight: item_deleted?.product?.varient?.weight,
                quantity: item_deleted?.product?.product_count,
            },
            cart_update_status: true
        });
    }

    const removeFromCart = (itemId) => {
        let updatedCart = {};
        let item_deleted = { status: false, product: {} };
        Object.keys(cartItems).forEach((key) => {
            if (key !== itemId) {
                updatedCart[key] = cartItems[key];
            } else {
                item_deleted = { status: true, product: cartItems[key] };
            }
        });
        setCartItems(updatedCart);

        if (item_deleted?.status) {
            deleteItemStatus(item_deleted);
        }

        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    };

    const getCartCount = () => {
        let total = 0;
        // Object.keys(cartItems).forEach((key) => {
        //     total += cartItems[key].product_count;
        // });

        Object.keys(cartItems).forEach(() => {
            total += 1; // cartItems[key].product_count;
        });
        return total || 0;
    };

    const clearCart = () => {
        setCartItems({});
        setCartUpdateStatus({
            status: "clear_cart",
            product_details: {
                name: "",
                price: 0,
                weight: "",
                quantity: 0,
            },
            cart_update_status: true
        });
        localStorage.setItem("cartItems", JSON.stringify({}));
    };

    const clearCartUpdateStatus = () => {
        if (cartUpdateStatus?.cart_update_status || cartUpdateStatus?.status !== "") {
            setCartUpdateStatus({
                status: "",
                product_details: {
                    name: "",
                    price: 0,
                    weight: "",
                    quantity: 0,
                },
                cart_update_status: false
            });
        }
    }

    return (
        <CartContext.Provider value={{ cartItems, getCartCount, addProductToCart, updateProductCount, removeFromCart, clearCart, cartUpdateStatus, clearCartUpdateStatus }}>
            {children}
        </CartContext.Provider>
    );
};