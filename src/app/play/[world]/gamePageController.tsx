
"use client"
import { useRouter } from 'next/navigation'


export async function findWorld(worldName: string) {
    // Check if the world exists in the database
    console.log('looking for world')
    const world = await fetch(`http://localhost:5000/get_world/${worldName}`).then(res => res.json());

    console.log('world')
    console.log(world)

    return world
}

export function connectWorldSocket(worldName: string) {
    const socket = new WebSocket(`ws://localhost:5000/worldSocket/${worldName}`);
    console.log(socket)

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

    return socket
}