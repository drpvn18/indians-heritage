"use client";

import useEmblaCarousel from "embla-carousel-react";
import "./../../styles/layoutComponents/PromotionsCarousel.css";
import React, { useEffect, useState } from "react";

export default function PromotionsCarousel() {
    const [isHovered, setIsHovered] = useState(false);

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

    return (
        <div className="w-[100%] bg-[#FFDECB]">
            <div className="promotions_carousel relative select-none">
                <div className="embla" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <div className="embla__viewport" ref={emblaRef}>
                        <div className="embla__container">
                            <div className="embla__slide">
                                Why Wait? Authentic India Now Here!
                            </div>
                            <div className="embla__slide">
                                Free Shipping on orders above €50
                            </div>
                            <div className="embla__slide">
                                First GI Store—Craft Meets Europe!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}