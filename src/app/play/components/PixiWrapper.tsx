"use client"

import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

export default function PixiWrapper() {
    const pixiContainerRef = useRef(null);

    useEffect(() => {
        // Initialize PIXI.js application
        const app = new PIXI.Application({
            backgroundColor: 0xf0f0f0,
            width: 1880,
            height: 800,
        });

        // Constants for chunk and symbol dimensions
        const chunkSize = 10;
        const symbolSize = 20;
        const borderWidth = 3;

        // Create the main game container
        const gameContainer = new PIXI.Container();
        gameContainer.x = (app.renderer.width - (chunkSize * symbolSize + chunkSize * borderWidth * 2 + 100)) / 2;
        gameContainer.y = 10; // Align to the top vertically
        app.stage.addChild(gameContainer);

        // create chunk container for displaying chunk components
        const chunkContainer = new PIXI.Container();
        chunkContainer.y = 50;
        gameContainer.addChild(chunkContainer)


        // create navigation buttons

        // up
        const up = new PIXI.Graphics();
        up.beginFill(0x000000);
        up.drawRect(chunkSize * symbolSize + chunkSize * borderWidth, 0, 100, 35);
        up.endFill();
        // Center horizontally
        up.x = (gameContainer.width - up.width) / 2; // Center within gameContainer
        gameContainer.addChild(up);
        
        // down
        const down = new PIXI.Graphics();
        down.beginFill(0x000000);
        down.drawRect(
            chunkSize * symbolSize + chunkSize * borderWidth,
            app.renderer.height - 35, // Align to the bottom vertically
            100,
            35
        );
        down.endFill();
        // Center horizontally
        down.x = (app.renderer.width - down.width) / 2;
        gameContainer.addChild(down);
        //left

        //right


        // Create 3x3 chunks
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                // Create a chunk container
                const chunk = new PIXI.Container();
                chunk.x = x * (chunkSize * (symbolSize + borderWidth));
                chunk.y = y * (chunkSize * (symbolSize + borderWidth));
                chunkContainer.addChild(chunk);

                for (let chunkX = 0; chunkX < chunkSize; chunkX++) {
                    for (let chunkY = 0; chunkY < chunkSize; chunkY++) {

                        // Build chunk with gray squares or different color
                        const isGray = (chunkX + chunkY) % 2 === 0;
                        const color = 0xe0e0e0

                        // Use PIXI.Graphics to create border effect
                        const square = new PIXI.Graphics();
                        square.beginFill(color);
                        square.drawRect(
                            chunkX * (symbolSize + borderWidth),
                            chunkY * (symbolSize + borderWidth),
                            symbolSize,
                            symbolSize
                        );
                        square.endFill();

                        const border = new PIXI.Graphics();
                        border.lineStyle(borderWidth, 0x000000, 0); // Transparent border
                        border.drawRect(
                            chunkX * (symbolSize + borderWidth) - borderWidth / 2,
                            chunkY * (symbolSize + borderWidth) - borderWidth / 2,
                            symbolSize + borderWidth,
                            symbolSize + borderWidth
                        );
                        chunk.addChild(square, border);
                    }
                }
            }
        }

        // Append the PIXI.js view to the container element
        ((pixiContainerRef.current as unknown) as HTMLElement)?.appendChild(app.view as unknown as Node);

        // Cleanup logic when component is unmounted
        return () => {
            // Destroy PIXI application and remove view
            app.destroy(true, { children: true, texture: true, baseTexture: true });
        };
    }, []); // Run this effect only once

    return (
        <div className='bg-black flex flex-col gap-2'>
            <div ref={pixiContainerRef}></div>
        </div>
    );
};