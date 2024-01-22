import { useState } from 'react';
import ChunkComponent from './chunkComponent';


interface GameContainerProps {
    onTileClick: (x: number, y: number) => Promise<void>;
  }
export default function GameContainer({ onTileClick }: GameContainerProps) {

    interface ChunkComponentProps {
        chunkSize: number;
        offsetX?: number;
        offsetY?: number;
    }
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);

    const handleArrowClick = (direction: 'left' | 'up' | 'right' | 'down') => {
      const step = 10; // Adjust the step size according to your needs
  
      switch (direction) {
        case 'left':
          setOffsetX((prevOffsetX) => prevOffsetX - step);
          break;
        case 'up':
          setOffsetY((prevOffsetY) => prevOffsetY - step);
          break;
        case 'right':
          setOffsetX((prevOffsetX) => prevOffsetX + step);
          break;
        case 'down':
          setOffsetY((prevOffsetY) => prevOffsetY + step);
          break;
        default:
          break;
      }
    };


    return (
        <div className="w-[600px] h-[600px] text-white flex flex-row justify-center place-items-center">
            <div className="bg-gray-100 w-[30px] rounded h-[100px] hover:bg-gray-200 hover:cursor-pointer flex justify-center" onClick={() => handleArrowClick('left')} >
            {/* Left arrow icon */}
            </div>
            <div className="flex flex-col place-items-center">
            <div className="bg-gray-100 w-[100px] h-[30px] rounded hover:bg-gray-200 hover:cursor-pointer flex justify-center" onClick={() => handleArrowClick('up')} >
                {/* Up arrow icon */}
            </div>
            <div className="grid grid-cols-3 p-3">
                {Array.from({ length: 9 }, (_, index) => {
                    const row = Math.floor(index / 3);
                    const col = index % 3;
                    const chunkOffsetX = col * 10;
                    const chunkOffsetY = row * 10;

                    return (
                    <ChunkComponent
                        key={index}
                        chunkSize={10}
                        offsetX={chunkOffsetX}
                        offsetY={chunkOffsetY}
                        onTileClick={onTileClick}
                    />
                    );
                })}
            </div>
            <div className="bg-gray-100 w-[100px] h-[30px] rounded hover:bg-gray-200 hover:cursor-pointer flex justify-center" onClick={() => handleArrowClick('down')} >
                {/* Down arrow icon */}
            </div>
            </div>
            <div className="bg-gray-100 w-[30px] rounded h-[100px] hover:bg-gray-200 hover:cursor-pointer flex justify-center" onClick={() => handleArrowClick('right')} >
            {/* Right arrow icon */}
            </div>
        </div>
    );
}