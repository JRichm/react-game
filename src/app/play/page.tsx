

import PixiWrapper from './components/PixiWrapper';
import MapContainer from './components/mapContainer';
import ShopContainer from './components/shopContainer';
import ChatContainer from './components/chatContainer';
import GameContainer from './components/gameContainer';

export default function PlayPage() {

    const GameHeader = () => {
        return (
            <div className="flex flex-row bg-gray-100 gap-1 p-2">
                <p className='px-3 py-1 hover:cursor-pointer hover:bg-white rounded transition-all'>Home</p>
                <p className='px-3 py-1 hover:cursor-pointer hover:bg-white rounded transition-all'>Leaderboards</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex flex-col">
                <div className="bg-gray-300 place-self-center p-2 flex flex-col gap-2">
                    <GameHeader />
                    <div className='flex flex-row gap-2'>
                            <div className='flex flex-col gap-2'>
                                <MapContainer />
                                <ChatContainer />
                            </div>
                            <GameContainer />
                            <ShopContainer />
                    </div>
                    {/* <PixiWrapper />
                    <div className='bg-gray-300 min-h-60'>
                    </div> */}
                </div>
            </div>
        </div>
    )
}