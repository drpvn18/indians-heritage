import React from "react";

export default function Chandigarh({ stateSelected, setStateSelected, fill = "#bfbbbb", stroke = "#e6e6e6", stateHovered, setStateHovered }) {
    return (
        <path onMouseEnter={() => setStateHovered("CH")} onMouseLeave={() => setStateHovered("")} onClick={() => setStateSelected("CH")} fill={fill} stroke={stroke} strokeWidth={0.5} data-title="Chandigarh" d="m 180.729,161.12496 -0.533,0.403 -1.425,-0.64883 -0.746,-1.56565 1.438,-0.95209 0.208,0.53801 0.562,-0.21359 -0.063,0.46949 0.734,0.0665 0,0 z" className={`${stateSelected === "CH" && 'fill-[#F35B2A] stroke-[#F35B2A]'}  ${stateHovered === "CH" && 'fill-[#F35B2A]'}   cursor-pointer stroke-[${stroke}]`}></path>
    );
}