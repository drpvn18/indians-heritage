"use client";

import useEmblaCarousel from "embla-carousel-react";
import "./../../styles/home/CategoryCarousel.css";
import React, { useEffect, useState } from "react";
import all_categories from "./../../public/data/categories.json";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CategoryCarousel() {
    const router = useRouter();

    const [isHovered, setIsHovered] = useState(false);
    const [categoryList, setCategoryList] = useState([]);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        slidesToScroll: 1,
        containScroll: "trim"
    });

    useEffect(() => {
        if (!emblaApi || isHovered) return;

        const autoplayInterval = setInterval(() => {
            emblaApi.scrollNext();
        }, 3000);

        return () => clearInterval(autoplayInterval);
    }, [emblaApi, isHovered]);

    useEffect(() => {
        let temp_categories = [];
        Object.keys(all_categories)?.map(key => {
            all_categories[key]?.categories?.map(category => {
                let temp = category?.sub_categories;
                temp_categories?.push(...temp);
            })
        });
        setCategoryList(temp_categories);
    }, [all_categories])

    return (
        <div className="w-[100%]">
            <div className="category_carousel relative select-none">
                <div className="embla" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <div className="embla__viewport" ref={emblaRef}>
                        <div className="embla__container">
                            {
                                categoryList?.map((category, index) => {
                                    return (
                                        <div className="embla__slide" key={index}>
                                            <div className="flex flex-col items-center justify-center cursor-pointer border-2 border-[#F9F5F0] hover:border-[#FFDECB] rounded-md p-2" onClick={() => router.push(`${category?.endpoint}`)}>
                                                <Image src={`${category?.image || ""}`} alt={`${category?.title}`} width={100} height={100} className="h-[100px] w-[100px] sm:h-[150px] sm:w-[150px] rounded-full" fetchPriority="high" />
                                                <p className="text-center pt-[5px] text-[14px] font-medium">{category?.title}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}