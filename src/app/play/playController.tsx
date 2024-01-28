export async function createNewWorld() {
    
    const randomHex = Math.floor(Math.random() * 16777215).toString(16); // 16777215 is FFFFFF in hexadecimal
    let newName = "";

    // check if world name exists
    while (newName == '') {
        const newString = '0'.repeat(6 - randomHex.length) + randomHex;
        const existingWorld = await fetch(`http://localhost:5000/get_world/${newString}`).then(res => res.json())
        if (!existingWorld.ok) {
            newName = newString;
        }
    }

    const newWorld = await fetch(`http://localhost:5000/create_world/${newName}`).then(res => res.json())
    return newWorld
}