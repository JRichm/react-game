interface ChunkComponentProps {
  chunkSize: number;
  offsetX?: number;
  offsetY?: number;
  onTileClick: Function;
}

export default function ChunkComponent({
  chunkSize,
  offsetX,
  offsetY,
  onTileClick,
}: ChunkComponentProps) {
  let chunkRows = [];

  for (let x = 0; x < chunkSize; x++) {
    let chunkRow = [];
    for (let y = 0; y < chunkSize; y++) {
      chunkRow.push(
        <div
          className={`bg-gray-400/25 hover:bg-gray-400/50 transition-all duration-75 hover:cursor-pointer hover:rounded w-[15px] h-[15px] aspect-square m-[1px] rounded-sm`}
          key={`${x}${y}`}
          onClick={(e) => onTileClick((offsetX || 0) + x, (offsetY || 0) + y)}
        ></div>
      );
    }

    chunkRows.push(chunkRow);
  }

  return (
    <div className={`flex flex-row w-full justify-evenly`}>
      {chunkRows.map((square, index) => (
        <div className="flex flex-col justify-between" key={`d${index}`}>
          {square}
        </div>
      ))}
    </div>
  );
}