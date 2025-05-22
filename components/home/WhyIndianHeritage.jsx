"use client";

import React, { useEffect, useRef, useState } from "react";

export default function WhyIndianHeritage() {
    const videoContainerRef = useRef(null);
    const videoRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                console.log("In view:", entry.isIntersecting);
                setInView(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.20,
            }
        );

        const current = videoContainerRef.current;
        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        if (inView) {
            video.play().catch((err) => {
                console.warn("Autoplay blocked:", err);
            });
        } else {
            video.pause();
        }
    }, [inView]);

    return (
        <div className="w-[100%]">
            <div className="max-w-[1400px] select-none px-[10px] mx-auto my-[50px]">
                <div className="text-[#F26C36] text-[32px] mb-[20px]">
                    Why Indian Heritage?
                </div>

                <div ref={videoContainerRef} className="w-[100%] sm:w-[80%] mt-[30px] mb-[50px] mx-auto">
                    <video
                        ref={videoRef}
                        width="100%"
                        height="240"
                        controls
                        muted
                        preload="none"
                        autoPlay={inView}
                        className="rounded-lg drop-shadow-2xl"
                    >
                        <source src="/videos/why_indian_heritage-1.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>
        </div>
    );
}
