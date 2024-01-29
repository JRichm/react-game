export default function GameHeader() {
    return (
        <div className="flex flex-row bg-gray-100 gap-1 p-2">
            <a href="/" className='px-3 py-1 hover:cursor-pointer hover:bg-white rounded transition-all'>Home</a>
            <a href="/world" className='px-3 py-1 hover:cursor-pointer hover:bg-white rounded transition-all'>Worlds</a>
            <a href="/play" className='px-3 py-1 hover:cursor-pointer hover:bg-white rounded transition-all'>Play</a>
            <p className='px-3 py-1 hover:cursor-pointer hover:bg-white rounded transition-all'>Leaderboards</p>
        </div>
    )
}