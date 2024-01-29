"use client"

import { useState, useEffect } from 'react';
import { FetchWorlds, GetNewWorld } from './worldController';

interface worldType {
    world_id: number;
    world_name: string;
    owner?: number;
    pin?: number;
    created?: Date;
    updated?: Date;
    last_played?: Date;
}

export default function WorldPage() {

    const [worldData, setData] = useState<worldType[] | undefined>();
    const [menuState, setMenu] = useState("");

    useEffect(() => {
        // if menu is not open, show worlds
        if (menuState == "") {
            const getWorlds = async () => {
                const data = await FetchWorlds();
                setData(data);
            }
            
            getWorlds();
        }
        
        if (menuState == "new") {
            const createNewWorld = async () => {
                try {
                    const newWorld = await GetNewWorld();
                    console.log("newWorld data:", newWorld);
                    console.log(newWorld.world_name)
                    
                    if (newWorld && newWorld.world_name) {
                        window.location.href = `/world/${newWorld.world_name}`;
                    } else {
                        console.error("Failed to create a new world:", newWorld.error);
                    }
                } catch (error) {
                    // Handle errors
                    console.error("Failed to create a new world:", error);
                }
            };
        
            // Call the asynchronous function
            createNewWorld();
        }
    }, [menuState])

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex flex-col">
                {
                    menuState == "" &&
                    <div className="bg-gray-300 place-self-center p-1">
                        <div>
                            <div className='w-full p-1'>
                                <input type="button" value="New World" className='text-center bg-gray-100 w-full hover:bg-green-600 hover:text-white/75 transition-colors hover:cursor-pointer' onClick={e => setMenu("new")}></input>
                            </div>
                            <div>
                                {   
                                    worldData &&
                                    worldData.map((world: worldType) => {
                                        return (
                                            <div className='p-1'>
                                                <span className='flex flex-row justify-between bg-gray-200'>
                                                    <div className='flex flex-row place-items-center'>
                                                        <p key={world.world_id + "_" + world.world_id} className='w-8 text-right px-2'>{world.world_id}</p>
                                                        <p key={world.world_id + "_" + world.world_name}>{world.world_name}</p>
                                                    </div>
                                                    <a href={`/world/${world.world_name}`} className='self-end bg-green-400 hover:bg-green-600 hover:text-white/75 text-white px-4 rounded m-2 text-center transition-colors'>Play</a>
                                                </span>
                                                <div className='bg-white flex flex-col'>
                                                    <div className='text-xs p-2'>
                                                        { world.owner ? <p key={world.world_id + "_" + world.owner}>{world.owner}</p> : <p>No Owner</p> }
                                                        { world.last_played ? <p key={world.world_id + "_" + world.last_played}>{JSON.stringify(world.last_played)}</p> : <p>Unknown last play date</p> }
                                                        { world.created ? <p key={world.world_id + "_" + world.created}>{JSON.stringify(world.created)}</p> : <p>Unknown creation date</p> }
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                }
                {
                    menuState == "new" &&
                    <p className='p-3'>loading...</p>
                }
            </div>
        </div>
    )
}