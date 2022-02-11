import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'

const backAddress = process.env.BACK_URL
const frontAddress = process.env.FRONT_URL

export default function Login() {

  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const router = useRouter()

  const idHandler = (e) => {
    setId(e.target.value)
  }
  const pwHandler = (e) => {
    setPw(e.target.value)
  }
  const loginSubmit = async () => {
    await axios.post(backAddress + '/login', {'id': id, "password": pw})
  }
  const joinSubmit = async () => {
    await axios.post(backAddress + '/login/join', {'id': id, "password": pw})
  }
  return (
    <div>
      <div className="flex justify-center space-x-6 m-4">
        <input 
        className='border-solid border-2 border-black' 
        id='id' 
        placeholder='ID' 
        onKeyUp={(key) => idHandler(key)}/>
        <input 
        className='border-solid border-2 border-black' 
        id='pw' 
        placeholder='PW' 
        onKeyUp={(key) => pwHandler(key)}/>
        <button 
        type='button'
        className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => {loginSubmit()}}>LOGIN</button>      
        <button 
        type="button" 
        className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => {joinSubmit()}}>JOIN</button>
      </div>

      <div className="flex justify-center space-x-6 m-4">
        <input 
        className='border-solid border-2 border-black' 
        id='id' 
        placeholder='ID' 
        onKeyUp={(key) => idHandler(key)}/>
        <input 
        className='border-solid border-2 border-black' 
        id='pw' 
        placeholder='PW' 
        onKeyUp={(key) => pwHandler(key)}/>
        <button 
        type='button'
        className="inline-block px-6 py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => {loginSubmit()}}>Modify</button>      
      </div>

      <div className="flex justify-center space-x-6 m-4">
        <input 
        className='border-solid border-2 border-black' 
        id='id' 
        placeholder='ID' 
        onKeyUp={(key) => idHandler(key)}/>
        <input 
        className='border-solid border-2 border-black' 
        id='pw' 
        placeholder='PW' 
        onKeyUp={(key) => pwHandler(key)}/>
        <button 
        type='button'
        className="inline-block px-6 py-2.5 bg-red-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => {loginSubmit()}}>OUT</button>      
      </div>
    </div>

  );
}