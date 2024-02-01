"use client"

import { useState, useEffect } from 'react'

export default function TileComponent({ x, y }: { x: number, y: number}) {

    const [tileState, setTileState] = useState("gray-300");

    useEffect(() => {
        // You can perform any asynchronous actions here if needed
    }, [tileState]);

    const handleClick = (e) => {
        e.preventDefault();

        // Updating state based on the previous state
        setTileState((prevColor) => (prevColor === "gray-300" ? "black" : "gray-300"));
    };

    return (
        <div
            className={`bg-${tileState} w-[15px] h-[15px] rounded-sm hover:bg-${tileState}/50 hover:cursor-pointer`}
            key={`t(${x}${y})`}
            onClick={handleClick}
        >
        </div>
    );
}