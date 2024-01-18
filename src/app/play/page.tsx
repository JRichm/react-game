"use client"

import { useState, useEffect } from 'react';
import GameHeader from './components/gameHeader';

export default function PlayPage() {
    // State to store the fetched data
    const [worlds, setWorlds] = useState([]);

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

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex flex-col">
                <div className="bg-gray-300 place-self-center p-2 flex flex-col gap-2">
                    <GameHeader />
                    <div className='flex flex-col'>
                    </div>
                </div>
            </div>
        </div>
    )
}