"use client";

import React, { useEffect, useRef, useState } from "react";
import { AndamanNicobar, AndhraPradesh, ArunachalPradesh, Assam, Bihar, Chandigarh, Chhattisgarh, DadraNagarHaveliAndDamanDiu, Delhi, Goa, Gujarat, Haryana, HimachalPradesh, JammuandKashmir, Jharkhand, Karnataka, Kerala, Ladakh, Lakshadweep, MadhyaPradesh, Maharashtra, Manipur, Meghalaya, Mizoram, Nagaland, Odisha, Puducherry, Punjab, Rajasthan, Sikkim, TamilNadu, Telengana, Tripura, Uttarakhand, UttarPradesh, WestBengal } from "../indianStates";
import ProductsByRegion from "./ProductsByRegion";
import StateToolTip from "./StateToolTip";

export default function StateReports() {
    const [stateSelected, setStateSelected] = useState("");
    const stateWiseProductsRef = useRef(null);
    const [stateHovered, setStateHovered] = useState("");

    const scrollToSection = () => {
        stateWiseProductsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (stateSelected)
            scrollToSection();
    }, [stateSelected])

    return (
        <section className="w-[100%]">
            <div className="max-w-[1400px] px-[10px] mx-auto my-[10px]">
                <div className="text-[#F26C36] text-[32px] mb-[20px]">
                    Explore By State
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 bg-[#FFFFFF] border-2 border-[#E1F5EB]">
                    <div className="india-map wow zoomIn p-[10px]" data-wow-delay=".5s">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg2" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 615 680" enableBackground="new 0 0 500 500" xmlSpace="preserve">
                            <AndamanNicobar stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <AndhraPradesh stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <ArunachalPradesh stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Assam stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Bihar stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Chandigarh stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Chhattisgarh stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <DadraNagarHaveliAndDamanDiu stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Delhi stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Goa stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Gujarat stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <HimachalPradesh stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Haryana stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Jharkhand stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Karnataka stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Kerala stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Maharashtra stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Meghalaya stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Manipur stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <MadhyaPradesh stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Mizoram stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Nagaland stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Odisha stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Punjab stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Puducherry stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Rajasthan stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Sikkim stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Telengana stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <TamilNadu stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Tripura stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <UttarPradesh stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <Uttarakhand stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <WestBengal stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                            <JammuandKashmir stateSelected={stateSelected} setStateSelected={setStateSelected} stateHovered={stateHovered} setStateHovered={setStateHovered} />
                            <Ladakh stateSelected={stateSelected} setStateSelected={setStateSelected} stateHovered={stateHovered} setStateHovered={setStateHovered} />
                            <Lakshadweep stateSelected={stateSelected} setStateSelected={setStateSelected} setStateHovered={setStateHovered} stateHovered={stateHovered} />
                        </svg>
                        <StateToolTip stateHovered={stateHovered} />
                    </div>
                    <div className="p-[10px]" ref={stateWiseProductsRef}>
                        <ProductsByRegion stateSelected={stateSelected} />
                    </div>
                </div>
            </div>
        </section>
    );
}