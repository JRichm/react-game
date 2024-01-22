"use client"

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { findWorld, connectWorldSocket, changeTileColor, worldType } from './gamePageController'

import PixiWrapper from '../components/PixiWrapper';
import GameHeader from '../components/gameHeader';
import MapContainer from '../components/mapContainer';
import ShopContainer from '../components/shopContainer';
import ChatContainer from '../components/chatContainer';
import GameContainer from '../components/gameContainer';

export default function GamePage({params, searchParams}: { params: {world: string}, searchParams: { [key:string]: string | string[] | undefined } }) {
  const router = useRouter();  

  const [thisWorld, setWorld] = useState<worldType | undefined>(undefined);

  useEffect(() => {
    const asyncGameData = async () => {
      // Use the world name from params to establish a WebSocket connection
      const worldName = params.world;
      console.log('worldName')
      console.log(worldName)
  
      // find world
      const world = await findWorld(worldName)
  
      setWorld(world)

      // connect to socket
      let worldSocket: any;
      if (!world.error) {
        console.log('connecting world socket')
        let worldSocket = connectWorldSocket(worldName)
      } else {
        window.location.href='/worldnotfound'
      }
    }

    asyncGameData()
  }, [params.world]);

  // Define the handleTileClick function
  const handleTileClick = async (x: number, y: number) => {
    console.log('click captured')
    console.log(x)
    console.log(y)
    // Call the changeTileColor function with the updated color (e.g., 'red')
    let updatedWorld
    if (thisWorld) {
      updatedWorld = await changeTileColor(thisWorld, x, y, 'red');
    }

    // Check if the update was successful
    if (updatedWorld) {
      // Update the state with the modified world data
      setWorld(updatedWorld);

    // TODO: Send the updated world data back to the server if needed
    // You may want to add logic to update the server with the modified data
    } else {
      console.error(`Failed to update tile color at (${x}, ${y})`);
    }
  };


  return (
      <div className="min-h-screen flex flex-col">
          <div className="flex flex-col">
              <div className="bg-gray-200 h-screen place-self-center p-2 flex flex-col gap-2">
                  <GameHeader />
                  <div className='flex flex-row gap-2'>
                    {
                      thisWorld ?
                        <div className='flex flex-row gap-2'>
                          <div className='flex flex-col gap-2'>
                              <MapContainer />
                              <ChatContainer />
                              <div className='flex flex-col'>
                                  {params.world}
                              </div>
                          </div>
                          <div className='bg-gray-100 rounded-lg p-3'>
                              <GameContainer onTileClick={handleTileClick} />
                          </div>
                        </div>
                        :
                        <div>
                          <p>world not found</p>
                        </div>
                    }
                  </div>
              </div>
          </div>
      </div>
  )
}