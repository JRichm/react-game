export async function FetchWorlds() {
    try {
        //fetch endpoint
        const response = await fetch("http://127.0.0.1:8000/world/", {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // check response
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // get json data from response
        const worlds = await response.json();
        return worlds;

    } catch (error) {
        console.error("Error fetching worlds:", error);
        throw error; // Propagate the error to the caller
    }
}

export async function GetWorld(worldName:string) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/world/${worldName}`)

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`)
        }

        const responseData = await response.json();
        console.log("Get World Response Data: ", responseData);

        if (responseData) {
            return responseData;
        } else {
            throw new Error ("Invalid response structure");
        }
    } catch (error) {
        console.error(`Failed to fetch world (${worldName}).`)
        throw error;
    }
}

export async function CheckPin(world: string, pin?: string) {
    try {
        let queryString;
        if (pin) {
            queryString = `?world_name=${encodeURIComponent(world)}&input_pin=${encodeURIComponent(pin)}`;
        } else {
            queryString = `?world_name=${encodeURIComponent(world)}`;
        }
        
        const response = await fetch(`http://127.0.0.1:8000/check_pin${queryString}`, {
            method: "GET",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // Handle successful response, e.g., parse JSON
            const data = await response.json();
            return data;
        } else {
            // Handle error response
            console.error('Error:', response.statusText);
            return ({"pinValid": false});
        }
    } catch (error) {
        // Handle network or other errors
        console.error('Error:', error);
        return ({"pinValid": false});
    }
}

export async function GetNewWorld() {
    try {
        const response = await fetch("http://127.0.0.1:8000/world/", {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log("New World Response Data:", responseData);

        // Check the response structure and adjust accordingly
        if (responseData && responseData.world_name) {
            return responseData;
        } else {
            throw new Error("Invalid response structure");
        }
    } catch (error) {
        console.error("Failed to create a new world:", error);
        throw error;
    }
}
