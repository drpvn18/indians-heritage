"use client";

import React, { useEffect, useRef, useState } from "react";
import { AndamanNicobar, AndhraPradesh, ArunachalPradesh, Assam, Bihar, Chandigarh, Chhattisgarh, DadraNagarHaveliAndDamanDiu, Delhi, Goa, Gujarat, Haryana, HimachalPradesh, JammuandKashmir, Jharkhand, Karnataka, Kerala, Ladakh, Lakshadweep, MadhyaPradesh, Maharashtra, Manipur, Meghalaya, Mizoram, Nagaland, Odisha, Puducherry, Punjab, Rajasthan, Sikkim, TamilNadu, Telengana, Tripura, Uttarakhand, UttarPradesh, WestBengal } from "../indianStates";
import ProductsByRegion from "./ProductsByRegion";

export default function StateReports() {
    const [stateSelected, setStateSelected] = useState("");
    const stateWiseProductsRef = useRef(null);

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
                    <div className="min-w-[400px] overflow-x-scroll india-map wow zoomIn p-[10px]" data-wow-delay=".5s">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg2" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 615 680" enableBackground="new 0 0 500 500" xmlSpace="preserve">
                            <AndamanNicobar stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <AndhraPradesh stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <ArunachalPradesh stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Assam stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Bihar stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Chandigarh stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Chhattisgarh stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <DadraNagarHaveliAndDamanDiu stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Delhi stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Goa stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Gujarat stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <HimachalPradesh stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Haryana stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Jharkhand stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Karnataka stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Kerala stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Maharashtra stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Meghalaya stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Manipur stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <MadhyaPradesh stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Mizoram stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Nagaland stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Odisha stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Punjab stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Puducherry stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Rajasthan stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Sikkim stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Telengana stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <TamilNadu stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Tripura stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <UttarPradesh stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Uttarakhand stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <WestBengal stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <JammuandKashmir stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Ladakh stateSelected={stateSelected} setStateSelected={setStateSelected} />
                            <Lakshadweep stateSelected={stateSelected} setStateSelected={setStateSelected} />
                        </svg>
                    </div>
                    <div className="p-[10px]" ref={stateWiseProductsRef}>
                        <ProductsByRegion stateSelected={stateSelected} />
                    </div>
                </div>
            </div>
        </section>
    );
}