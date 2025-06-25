"use client";
import React, { useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import styles from "./../../styles/InstagramVideo.module.css";
import useEmblaCarousel from "embla-carousel-react";

export default function InstagramEmbed() {
    const buttonRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const blockquoteStyle = {
        background: "#FFF",
        border: 0,
        borderRadius: "3px",
        boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
        margin: "1px",
        maxWidth: "300px",
        minWidth: "200px",
        padding: 0,
        width: "100%",
    }

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        slidesToScroll: 1,
        containScroll: "trim"
    });

    const [scrollSnaps, setScrollSnaps] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onDotButtonClick = useCallback((index) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi || isHovered) return;

        const autoplayInterval = setInterval(() => {
            emblaApi.scrollNext();
        }, 3000);

        return () => clearInterval(autoplayInterval);
    }, [emblaApi, isHovered]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());

        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);

        return () => emblaApi.off('select', onSelect);
    }, [emblaApi]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && buttonRef.current) {
                    buttonRef.current.click();
                }
            },
            {
                threshold: 0.5,
            }
        );

        if (buttonRef.current) {
            observer.observe(buttonRef.current);
        }

        return () => {
            if (buttonRef.current) {
                observer.unobserve(buttonRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="w-[100%]">
            <div className="max-w-[1400px] select-none px-[10px] mx-auto my-[50px]">
                <div className="text-[#F26C36] text-[32px] mb-[20px]">
                    Why Indian Heritage?
                </div>
                <div className={styles.embla} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <div className={styles.embla__viewport} ref={emblaRef}>
                        <div className={styles.embla__container}>
                            <div className={styles.embla__slide}>
                                <blockquote
                                    className="instagram-media"
                                    data-instgrm-permalink="https://www.instagram.com/reel/DIW6w5PoxNY/?utm_source=ig_embed&amp;utm_campaign=loading"
                                    data-instgrm-version="14"
                                    style={blockquoteStyle}
                                />
                            </div>
                            <div className={styles.embla__slide}>
                                <blockquote
                                    className="instagram-media"
                                    data-instgrm-permalink="https://www.instagram.com/p/DIWNhUpIINO/?utm_source=ig_embed&amp;utm_campaign=loading"
                                    data-instgrm-version="14"
                                    style={blockquoteStyle}
                                />
                            </div>
                            <div className={styles.embla__slide}>
                                <blockquote
                                    className="instagram-media"
                                    data-instgrm-permalink="https://www.instagram.com/reel/DIWPRkrIxDX/?utm_source=ig_embed&amp;utm_campaign=loading"
                                    data-instgrm-version="14"
                                    style={blockquoteStyle}
                                />
                            </div>
                            <div className={styles.embla__slide}>
                                <blockquote
                                    className="instagram-media"
                                    data-instgrm-permalink="https://www.instagram.com/reel/DIk10pMIGqL/?utm_source=ig_embed&amp;utm_campaign=loading"
                                    data-instgrm-version="14"
                                    style={blockquoteStyle}
                                />
                            </div>
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
            </div>
        </div>
    );
}
