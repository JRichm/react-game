"use client"

import { useState, useEffect } from 'react';
import GameHeader from './components/gameHeader';

export default function PlayPage() {
    // State to store the fetched data
    const [worlds, setWorlds] = useState([]);
    const [menu, setMenu] = useState("main")

    // Effect to fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Assuming '/worlds' is the correct API endpoint for fetching world data
                const response = await fetch('http://localhost:5000/worlds');
                const data = await response.json();

                // Update the state with the fetched data
                setWorlds(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    let newName

    if (menu == "new") {
        const randomHex = Math.floor(Math.random() * 16777215).toString(16); // 16777215 is FFFFFF in hexadecimal
        newName = '0'.repeat(6 - randomHex.length) + randomHex;
        window.location.href = `/play/${newName}`
    }
    
    const menuButtonStyle = `bg-gray-100 m-1 rounded hover:cursor-pointer hover:bg-gray-200`

    return (



        <div className="min-h-screen flex flex-col">
            <div className="flex flex-col">
                <div className="bg-gray-300 place-self-center p-2 flex flex-col gap-2">
                    <GameHeader />
                    {
                        menu == "main" &&
                        <div className='flex flex-col text-center'>
                            <p className={`${menuButtonStyle}`} onClick={e=> setMenu("singleplayer")}>Singleplayer</p>
                            <p className={`${menuButtonStyle}`} onClick={e=> setMenu("multiplayer")}>Multiplayer</p>
                        </div>
                    }
                    {
                        menu == "singleplayer" &&
                        <div className='flex flex-col text-center'>
                            <p className={`${menuButtonStyle}`} onClick={e=> setMenu("new")}>New World</p>
                            <p className={`${menuButtonStyle}`} onClick={e=> setMenu("main")}>back</p>
                        </div>
                    }
                    {
                        menu == "new" &&
                        <div className='flex flex-col text-center'>
                            <p>{newName}</p>
                            <p className={`${menuButtonStyle}`} onClick={e=> setMenu("main")}>back</p>
                        </div>
                    }
                    {
                        menu == "multiplayer" &&
                        <div className='flex flex-col text-center'>
                            <p className={`${menuButtonStyle}`} onClick={e=> setMenu("main")}>Host World</p>
                            <p className={`${menuButtonStyle}`} onClick={e=> setMenu("main")}>Join World</p>
                            <p className={`${menuButtonStyle}`} onClick={e=> setMenu("main")}>back</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}