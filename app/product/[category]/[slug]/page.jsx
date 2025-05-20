"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./../../../../styles/products/Product.module.css";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { CircleChevronDown, Minus, Plus, ShoppingCart } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import products from "@/public/data/products.json";
import { CartContext } from "@/app/CartContext";
import { useRouter } from "next/navigation";
import { WhatsAppSVG } from "@/components/icons";
import Cart from "@/components/cart/Cart";

export default function Product({ params }) {
    const { addProductToCart } = useContext(CartContext);
    const [addingProduct, setAddingProduct] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const router = useRouter();
    const { slug } = React.use(params);
    const [pageUrl, setPageUrl] = useState("");
    const [productDetails, setProductDetails] = useState({});
    const [mainImage, setMainImage] = useState({});
    const [productCount, setProductCount] = useState(1);
    const [relatedProductsList, setRelatedProductsList] = useState([]);
    const [relatedProductsCount, setRelatedProductsCount] = useState(0);
    const [mobileScreenDetected, setMobileScreenDetected] = useState(0);

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
        setPageUrl(window?.location?.href);
        const product = products.find((item) => item?.slug === slug);
        setMainImage(product?.images[0]);
        setProductDetails(product);
    }, []);

    useEffect(() => {
        if (productDetails?.category?.slug) {
            const temp = products?.filter((item) => item?.category?.slug === productDetails?.category?.slug);
            setRelatedProductsList(temp);
            setRelatedProductsCount(temp?.length);
        }
    }, [productDetails])

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
    });

    const [scrollSnaps, setScrollSnaps] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onDotButtonClick = useCallback((index) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());

        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);

        return () => emblaApi.off('select', onSelect);
    }, [emblaApi]);

    const handleImageClick = (index) => {
        if (index <= productDetails?.images)
            setMainImage(productDetails?.images[index]);
    }

    const handleCountChange = (operation) => {
        if (operation === "minus" && productCount > 1) {
            setProductCount(productCount - 1);
        } else if (operation === "plus") {
            setProductCount(productCount + 1);
        }
    }

    const handleInputChange = (count) => {
        if (parseInt(count) && parseInt(count) > 0) {
            setProductCount(parseInt(count));
        } else {
            setProductCount(1);
        }
    }

    const getDiscountedPrice = (price, discount_rate) => {
        if (discount_rate === 0) {
            return price;
        }
        let discount = parseFloat(price) * parseFloat(discount_rate);
        return (parseFloat(price) - (discount / 100)).toFixed(2);
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
                    "product_count": productCount,
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

    const handleWhatsappShare = () => {
        const message = `Please checkout this product from IndianHeritage - Taste the Tradition\n\n${pageUrl}`;
        const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    }

    return (
        <div className={styles.container}>
            {
                mobileScreenDetected ? (
                    <div className={styles.product_title}>
                        {productDetails?.name}
                    </div>
                ) : (
                    ""
                )
            }
            <div className={styles.product_container}>
                <div className={styles.product_gallery}>
                    <div className={styles.mainImage}>
                        {
                            mainImage?.url && (
                                <div className="relative">
                                    <Image src={mainImage?.url} alt={slug} width="350" height="200" priority={true} />
                                    {
                                        (productDetails?.discount?.value && parseFloat(productDetails?.discount?.value) !== 0) ? (
                                            <div className="absolute top-[10px] left-[10px] bg-[#EC5E2A] text-white px-[10px] font-medium py-[5px] text-[15px]">
                                                <span>{productDetails?.discount?.value}% Off</span>
                                            </div>
                                        ) : (
                                            ""
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                    <div>
                        {
                            (productDetails?.images?.length > 1) && (
                                <div className={styles.embla}>
                                    <div className={styles.embla__viewport} ref={emblaRef}>
                                        <div className={styles.embla__container}>
                                            <div className={styles.embla__slide} onClick={() => handleImageClick(0)}>
                                                {
                                                    mainImage?.url && (
                                                        <Image src={productDetails?.images[0]?.url} alt={productDetails?.images[0]?.alt} width="350" height="200" />
                                                    )
                                                }
                                            </div>
                                            {
                                                productDetails?.images?.slice(1)?.map((image, index) => (
                                                    <div key={index} className={styles.embla__slide} onClick={() => handleImageClick(index + 1)}>
                                                        <Image
                                                            src={image.url}
                                                            alt={`${image.alt} ${index}`}
                                                            width={100}
                                                            height={100}
                                                            className="rounded-md"
                                                        />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className={styles.embla__dots}>
                                        {scrollSnaps.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => onDotButtonClick(index)}
                                                className={`${styles.embla__dot} ${index === selectedIndex ? styles.embla__dot__selected : ''}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={styles.product_details}>
                    <div className={styles.product_title}>
                        {productDetails?.name}
                    </div>
                    <div className={styles.product_price}>
                        <div className="text-2xl">
                            €{getDiscountedPrice(productDetails?.variation?.price?.amount, productDetails?.discount?.value)}
                        </div>
                        {
                            productDetails?.discount?.value && parseFloat(productDetails?.discount?.value) !== 0 ? (
                                <div className="line-through text-gray-600 text-[16px]">
                                    {productDetails?.variation?.price?.amount?.toFixed(2)}
                                </div>
                            ) : (
                                ""
                            )
                        }
                    </div>
                    <div className="text-gray-600">(Prices are Including VAT)</div>
                    <div className={styles.product_weight}>
                        <div className="font-medium">Qty: </div>
                        <div>
                            <div className="flex flex-nowrap rounded-md">
                                <div onClick={() => handleCountChange("minus")} className="border-2 rounded-full border-[#EA5F28] py-2 px-2 cursor-pointer hover:bg-[#EA5F28] hover:text-white">
                                    <Minus />
                                </div>
                                <input value={productCount} onChange={(e) => handleInputChange(e.target.value)} className={styles.productCountInput} type="text" />
                                <div onClick={() => handleCountChange("plus")} className="border-2 rounded-full border-[#EA5F28] py-2 px-2 cursor-pointer hover:bg-[#EA5F28] hover:text-white">
                                    <Plus />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.product_menu}>
                        <div>
                            <button onClick={() => handleAddProductToCart(productDetails)} className="border-2 text-white bg-[#EA5F28] border-[#EA5F28] px-4 py-2 rounded-md cursor-pointer flex gap-[5px] flex-nowrap justify-center items-center w-[200px]">
                                <ShoppingCart /> Add to Cart
                            </button>
                        </div>
                    </div>

                    <div className={styles.product_description}>
                        <p className="mb-[10px]">{productDetails?.description}</p>
                        <p>
                            <span className="text-gray-700 pr-2">Color:</span>
                            {productDetails?.variation?.attributes?.color}
                        </p>
                        <p>
                            <span className="text-gray-700 pr-2">Weight:</span>
                            {productDetails?.variation?.weight_label}
                        </p>
                        {
                            (productDetails?.variation?.attributes?.material !== "" || productDetails?.variation?.attributes?.material !== "NA") && (
                                <p>
                                    <span className="text-gray-700 pr-2">Material:</span>
                                    {productDetails?.variation?.attributes?.material}
                                </p>
                            )
                        }
                        {/* {
                            (productDetails?.variation?.dimensions?.length !== "NA" && productDetails?.variation?.dimensions?.width !== "NA") && (
                                <p>
                                    <span className="text-gray-700 pr-2">Dimenssions:</span>
                                    {productDetails?.variation?.dimensions?.length} * {productDetails?.variation?.dimensions?.width}
                                </p>
                            )
                        } */}
                    </div>

                    <div className="flex gap-[5px] my-[20px] select-none">
                        <div>Tags: </div>
                        <div className="flex flex-wrap">
                            {
                                productDetails?.tags?.map((tag, index) => (
                                    <span key={index} className="px-[5px] hover:text-blue-700 font-medium cursor-pointer">
                                        #{tag}
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                    <div className="my-[10px] flex justify-start items-center gap-4 flex-wrap">
                        <div className="font-medium">Share via: </div>
                        <div onClick={() => handleWhatsappShare()} className="cursor-pointer">
                            <WhatsAppSVG height={35} width={35} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[50px]">
                <div className="text-2xl font-medium">
                    Related Products
                </div>
                <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] mt-[16px] mb-[48px] place-items-center">
                    {
                        relatedProductsList?.slice(0, 8)?.map((item, index) => {
                            return (
                                <div key={index} className="border-2 border-[#E1F5EB]">
                                    <ProductCard productDetails={item} />
                                </div>
                            )
                        })
                    }
                    {
                        [1, 2, 3, 4]?.slice(relatedProductsCount)?.map((index) =>
                            <div key={index} />
                        )
                    }
                </div>
            </div>
            <div className="w-fit mx-auto">
                <div className="flex flex-col justify-center items-center mt-[25px] cursor-pointer hover:text-[#EF5D29]" onClick={() => router.push(`/category/${productDetails?.category?.slug}`)}>
                    <CircleChevronDown strokeWidth={1} size={50} />
                    <span className="text-xl">See All</span>
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