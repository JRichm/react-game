"use client"

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import PixiWrapper from '../components/PixiWrapper';
import GameHeader from '../components/gameHeader';
import MapContainer from '../components/mapContainer';
import ShopContainer from '../components/shopContainer';
import ChatContainer from '../components/chatContainer';
import GameContainer from '../components/gameContainer';

export default function GamePage({params, searchParams}: { params: {world: string}, searchParams: { [key:string]: string | string[] | undefined } }) {
    useEffect(() => {
        // Use the world name from params to establish a WebSocket connection
        const worldName = params.world;
        const socket = new WebSocket(`ws:/localhost:5000/worldSocket/${worldName}`);
    
        // Event handler for when the connection is opened
        socket.addEventListener('open', (event) => {
          console.log('WebSocket connection opened:', event);
        });
    
        // Event handler for when a message is received from the server
        socket.addEventListener('message', (event) => {
          // The event.data contains the world_data JSON
          const worldData = JSON.parse(event.data);
          console.log('Received world_data:', worldData);
    
          // Use worldData to populate the GameContainer or perform other actions
        });
    
        // Event handler for errors
        socket.addEventListener('error', (event) => {
          console.error('WebSocket error:', event);
        });
    
        // Event handler for when the connection is closed
        socket.addEventListener('close', (event) => {
          console.log('WebSocket connection closed:', event);
        });
    
        // Cleanup function to close the WebSocket when the component is unmounted
        return () => {
          socket.close();
        };
      }, [params.world]);

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex flex-col">
                <div className="bg-gray-200 h-screen place-self-center p-2 flex flex-col gap-2">
                    <GameHeader />
                    <div className='flex flex-row gap-2'>
                            <div className='flex flex-col gap-2'>
                                <MapContainer />
                                <ChatContainer />
                                <div>
                                    {params.world}
                                </div>
                            </div>
                            <div className='bg-gray-100 rounded-lg p-3'>
                                <GameContainer />
                            </div>
                    </div>
                    {/* <PixiWrapper />
                    <div className='bg-gray-300 min-h-60'>
                    </div> */}
                </div>
            </div>
        </div>
    )
}