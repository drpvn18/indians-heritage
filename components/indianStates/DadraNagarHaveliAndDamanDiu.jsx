import React from "react";

export default function DadraNagarHaveliAndDamanDiu({ stateSelected, setStateSelected, fill = "#bfbbbb", stroke = "#e6e6e6" }) {
    return (
        <path onClick={() => setStateSelected("DN")} fill={fill} stroke={stroke} strokeWidth={0.5} data-title="Dadra & Nagar Haveli and Daman & Diu" d="m 52.071,392.57824 0.11,-1.80846 1.311,-3.27739 0.615,0.65387 1.569,-0.2156 0.858,0.56822 0.278,1.33494 -1.744,0.77476 1.659,0.59241 -0.049,0.67603 -0.554,-0.008 -0.002,0.68208 -0.47,0.0121 0.915,1.21907 0,0 -0.379,-0.20049 0.07,0.31635 -1.076,0.30426 -3.111,-1.62408 z" className={`${stateSelected === "DN" && 'fill-[#F35B2A] stroke-[#F35B2A]'} hover:fill-[#F35B2A]  cursor-pointer stroke-[${stroke}]`}></path>
    );
}