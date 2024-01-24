
"use client"
import { useRouter } from 'next/navigation'

export interface worldType {
    id: number;
    name: string;
    owner: number;
    pin: string;
    created: string;
    updated: Date;
    last_played: Date;
    world_data: worldDataType;
}

interface worldDataType {
    [key: string]: chunkRowType;
}

interface chunkRowType {
    [key: string]: chunkType;
}

interface chunkType {
    id: number;
    location: string;
    tileData: tileType[]
} 

interface tileType {
    id:number;
    location: string;
    color: string;
    opacity: number;
}

export async function findWorld(worldName: string) {
    // Check if the world exists in the database
    console.log('looking for world')
    const world = await fetch(`http://localhost:5000/get_world/${worldName}`).then(res => res.json());

    console.log('world')
    console.log(world)

    return world
}

export async function changeTileColor(world: worldType, x: number, y: number, color: string) {
    // Find the chunk and tile
    const rowIndex = Math.floor(y / 10);
    const chunkIndexWithinRow = Math.floor(x / 10);
    const chunkIndex = rowIndex * 10 + chunkIndexWithinRow;

    // Check if 'chunks' property exists in world.world_data
    if ('chunks' in world.world_data) {
        // Check if the chunk exists
        if (world.world_data.chunks[chunkIndex]) {
            // Check if 'tiles' property exists in the chunk
            if ('tileData' in world.world_data.chunks[chunkIndex]) {
                const tileRow = world.world_data.chunks[chunkIndex].tileData;
                const tile = tileRow && tileRow[y % 10];
                
                console.log(color)

                // Check if 'color' property exists in the tile
                if (tile) {
                    // Update the tile color
                    tile.color = color;
            
                    // TODO: Send the updated world data back to the server if needed
                    // You may want to add logic to update the server with the modified data
            
                    // Return the updated world data
                    return world;
                } else {
                    console.error(`'color' property not found in tile at (${x}, ${y})`);
                    return null;
                }
            } else {
                console.error(`'tiles' property not found in chunk at (${x}, ${y}) ${chunkIndex}`);
                return null;
            }
        } else {
            console.error(`Chunk not found at (${x}, ${y})`);
            return null;
        }
    } else {
        console.error('Invalid world_data structure');
        return null;
    }
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