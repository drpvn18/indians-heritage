"use client";

import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useState } from "react";
import "./../../styles/home/FeaturesCarousel.css";
import { useRouter } from "next/navigation";

export default function FeaturesCarousel() {
    const router = useRouter();
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [scrollSnaps, setScrollSnaps] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const onDotButtonClick = useCallback((index) => {
        if (emblaApi) emblaApi.scrollTo(index);
        restartAutoplay();
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());

        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);

        return () => emblaApi.off('select', onSelect);
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi || isHovered) return;

        const autoplayInterval = setInterval(() => {
            emblaApi.scrollNext();
        }, 5000);

        return () => clearInterval(autoplayInterval);
    }, [emblaApi, isHovered]);

    const restartAutoplay = () => {
        setIsHovered(true);
        setTimeout(() => setIsHovered(false), 5000);
    };

    return (
        <div className="features_carousel">
            <div className="embla" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        <div className="embla__slide">
                            <img
                                src='https://firebasestorage.googleapis.com/v0/b/indiansheriatge.firebasestorage.app/o/slide-3.jpg?alt=media&token=fa13c173-6519-4bb9-90b9-ffbad190ca9c'
                                width={300}
                                height={200}
                                alt={`Slide 1`}
                                className="embla__image w-[100%]"
                                fetchPriority="high"
                                onClick={() => router.push('/category/all')}
                            />
                        </div>
                        <div className="embla__slide">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/indiansheriatge.firebasestorage.app/o/slide-4.jpg?alt=media&token=c9531542-0cc2-4ac9-99a6-d5557835d535"
                                width={300}
                                height={200}
                                alt={`Slide 1`}
                                className="embla__image w-[100%]"
                                fetchPriority="high"
                                onClick={() => router.push('/category/all')}
                            />
                        </div>
                    </div>
                </div>

                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}