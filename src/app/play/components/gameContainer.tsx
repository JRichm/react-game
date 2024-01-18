import ChunkComponent from "./chunkComponent"

export default function GameContainer() {
    return (
        <div className="w-[600px] h-[600px] text-white flex flex-row justify-center place-items-center">
            <div className="bg-gray-100 w-[30px] rounded h-[100px] hover:bg-gray-200 hover:cursor-pointer flex justify-center">
                <img className="w-[20px] h-[20px] self-center " src="https://upload.wikimedia.org/wikipedia/commons/1/16/TriangleArrow-Left.svg"/>
            </div>
            <div className="flex flex-col place-items-center">
                <div className="bg-gray-100 w-[100px] h-[30px] rounded hover:bg-gray-200 hover:cursor-pointer flex justify-center">
                    <img className="w-[20px] h-[20px] self-center " src="https://upload.wikimedia.org/wikipedia/commons/1/10/TriangleArrow-Up.svg"/>
                </div>
                <div className="grid grid-cols-3 p-3">
                    <ChunkComponent chunkSize={10} />
                    <ChunkComponent chunkSize={10} />
                    <ChunkComponent chunkSize={10} />
                    <ChunkComponent chunkSize={10} />
                    <ChunkComponent chunkSize={10} />
                    <ChunkComponent chunkSize={10} />
                    <ChunkComponent chunkSize={10} />
                    <ChunkComponent chunkSize={10} />
                    <ChunkComponent chunkSize={10} />
                </div>
                <div className="bg-gray-100 w-[100px] h-[30px] rounded hover:bg-gray-200 hover:cursor-pointer flex justify-center">
                    <img className="w-[20px] h-[20px] self-center " src="https://upload.wikimedia.org/wikipedia/commons/4/4f/TriangleArrow-Down.svg"/>
                </div>
            </div>
                <div className="bg-gray-100 w-[30px] rounded h-[100px] hover:bg-gray-200 hover:cursor-pointer flex justify-center">
                    <img className="w-[20px] h-[20px] self-center " src="https://upload.wikimedia.org/wikipedia/commons/2/24/TriangleArrow-Right.svg"/>
            </div>
        </div>
    )
}