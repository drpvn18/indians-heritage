import React, { useEffect, useState } from "react";
import indianStates from "./../../public/data/indianStates.json";

export default function StateToolTip({ stateHovered }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);
    const [statename, setStatename] = useState("");

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setVisible(true);
        };

        const handleMouseLeave = () => setVisible(false);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    useEffect(() => {
        if (stateHovered && stateHovered in indianStates) {
            setStatename(indianStates[stateHovered]?.name || "")
        } else {
            setStatename("")
        }
    }, [stateHovered])

    return (
        (visible && statename) && (
            <div
                className={`fixed z-50 text-white text-md px-4 py-2 rounded shadow-lg pointer-events-none transition-all`}
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y - 25}px`,
                    transform: "translate(-50%, -100%)",
                    backgroundColor: indianStates[stateHovered]?.color || "#000"
                }}
            >
                {statename}
            </div>
        )
    );
}