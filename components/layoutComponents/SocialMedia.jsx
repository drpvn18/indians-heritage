"use client";

import React from "react";
import { WhatsAppSVG } from "../icons";

export default function SocialMedia() {
    return (
        <div className="fixed right-0 top-[40%] z-999">
            <div className="bg-white py-[8px] pl-[8px] pr-[8px] rounded-l-[10px] border-2 border-[var(--secondary-bg)] border-r-0">
                <WhatsAppSVG height={32} width={32} />
            </div>
        </div>
    );
}