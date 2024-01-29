"use client"

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { CheckPin, GetWorld } from '../worldController';



export default function WorldPage({params, searchParams}: { params: {worldName: string}, searchParams: { [key:string]: string | string[] | undefined } }) {
  const router = useRouter();  

  const [worldData, setData] = useState();
  const [pinEntered, setPin] = useState(false);

  const [inputdata, setInputdata] = useState("");

  useEffect(() => {
    if (pinEntered) {
      const asyncGameData = async () => {
        const worldName = params.worldName;
        const world = await GetWorld(worldName);
        setData(world);
      };
      asyncGameData();
    }
  }, [params.worldName, pinEntered]);

  async function checkPin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const pinInput = formData.get('pin-input') || ""; // Provide a default value


    console.log("checking ", params.worldName, " with pin ", pinInput)
    const isPinValid = await CheckPin(params.worldName, pinInput as string);

    setPin(isPinValid);

    isPinValid ? setInputdata("true") : setInputdata("false")
    

    console.log(pinInput);
  }


  return (
    <div className='min-h-screen'>
      {
        (!pinEntered) &&
        <div className='flex flex-col align-center place-items-center min-h-screen'>
          <form className='flex flex-col bg-gray-100 w-[300px] p-2 h-fit mt-36' onSubmit={e => checkPin(e)}>
            <label htmlFor='pin-input' className='p-1 underline'>enter pin to join</label>
            <input type='text' name='pin-input' placeholder="'1234'" className='p-1'></input>
            <input type='submit' value="join" className='bg-green-400 text-white w-fit px-6 mt-2 self-end'></input>
          </form>
          <div>
            <p>IData: {inputdata}</p>
          </div>
        </div>
      }
      {
        (worldData && pinEntered == true) &&
        <div className="min-h-screen flex flex-col">
          <div className="flex flex-col place-items-center">
            <div className='flex flex-row bg-gray-100 justify-center'>
              <p>{JSON.stringify(worldData)}</p>
            </div>
          </div>
        </div>
      }
    </div>
  )
}