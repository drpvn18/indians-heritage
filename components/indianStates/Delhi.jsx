import React from "react";

export default function Delhi({ stateSelected, setStateSelected, fill = "#bfbbbb", stroke = "#e6e6e6" }) {
    return (
        <path onClick={() => setStateSelected("DL")} stroke={stroke} strokeWidth={0.5} fill={fill} data-title="Delhi" d="m 188.413,205.10421 0.637,0.75563 -0.427,0.95813 0.581,0.18336 1.261,1.79838 0.807,-0.0816 -0.257,1.70468 0.523,0.85436 -0.887,1.00649 0.919,1.37926 0,0 -1.99,0.58233 -0.354,0.49166 0.312,0.83824 -1.567,0.48662 -0.994,-0.81003 -0.222,-1.22814 -0.737,-0.63069 -0.496,0.1209 -0.894,-0.65789 -0.011,0.67703 -0.776,-0.31333 -1.865,0.44129 -0.874,-1.14452 -0.055,-0.82212 0.415,-0.0222 0.484,-1.08206 1.171,-0.001 -0.343,-0.46849 0.776,-1.15056 -0.257,-2.76054 1.868,-0.38487 0.927,-1.14451 1.104,0.45841 0.223,0.56823 z" className={`${stateSelected === "DL" && 'fill-[#F35B2A] stroke-[#F35B2A]'} hover:fill-[#F35B2A]  cursor-pointer stroke-[${stroke}]`}></path>
    );
}