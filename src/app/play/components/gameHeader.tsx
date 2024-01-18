export default function GameHeader() {
    return (
        <div className="flex flex-row bg-gray-100 gap-1 p-2">
            <a href="/" className='px-3 py-1 hover:cursor-pointer hover:bg-white rounded transition-all'>Home</a>
            <p className='px-3 py-1 hover:cursor-pointer hover:bg-white rounded transition-all'>Leaderboards</p>
        </div>
    )
}