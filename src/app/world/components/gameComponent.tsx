import TileComponent from "./tileComponent";

export default function GameComponent({ worldName }: { worldName: string }) {

    const GameTiles = () => {

        let width = 30;
        let height = 30;

        let tileElements = [];

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < width; y++) {

                let tileElement = <TileComponent x={x} y={y} />

                tileElements.push(tileElement);
            }
        }

        return(
            <div className="grid gap-[4px]" style={{ gridTemplateColumns: 'repeat(30, 0fr)' }} key="tile-elements">
                { tileElements }
            </div>
        )
    }

    return (
        <div className="bg-gray-400 h-full p-[5px] outline outline-gray-400/40 rounded-2xl" key="gmae">
            <div className="bg-gray-300 h-full rounded-xl p-8">
                <div className="bg-gray-400 p-1.5 rounded">
                    <GameTiles />
                </div>
            </div>
        </div>
    )
}