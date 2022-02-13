import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"

const frontAddress = process.env.FRONT_URL
const backAddress = process.env.BACK_URL

const LoginForm = ({user}) => {
    const [userId, setUserId] = useState(user.id)
    const [userPw, setUserPw] = useState(user.pw)
    const [userStatus, setUserStatus] = useState(user.status)    
    const router = useRouter()

    const idHandler = (e) => {
      setUserId(e.target.value)
    }
    const pwHandler = (e) => {
      setUserPw(e.target.value)
    }
    const stateHandler = (e) => {
        setUserStatus(e.target.value)
        console.log(userStatus)
    }
    const loginSubmit = async () => {
        await axios.post(backAddress + '/login', {'id': userId, "password": userPw})
    }
    const joinSubmit = async () => {
        router.push(frontAddress + '/userLogin/join')
    }
    const modifySubmit = () => {
        router.push(frontAddress + '/userLogin/modify')
//추후
/*
        if (userStatus != 'not registered user') {
                    router.push(frontAddress + '/test/modifyForm', {'id': userId, "password": userPw, 'status': userStatus})
        } else {
            console.log('NOT REGISTERD USER')
        }
*/
    }
    const deleteSubmit = async () => {
        router.push(frontAddress + '/userLogin/delete')
    }
    return (
        <div className="flex flex-col space-y-2 m-4">
        LOGIN FORM
        <input 
        className='border-solid border-2 border-black' 
        id='id' 
        defaultValue={userId}
        placeholder='ID' 
        onKeyUp={(key) => idHandler(key)}/>
        <input 
        className='border-solid border-2 border-black' 
        id='pw' 
        defaultValue={userPw}
        placeholder='PW' 
        onKeyUp={(key) => pwHandler(key)}/>
        <input 
        className='border-solid border-2 border-black' 
        id='state' 
        defaultValue='registered user'
        placeholder='state' 
        onKeyUp={(key) => stateHandler(key)}/>
        <button 
        type='button'
        className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => {loginSubmit()}}>LOGIN</button>      
        <button 
        type="button" 
        className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => {joinSubmit()}}>JOIN</button>
        <button 
        type='button'
        className="inline-block px-6 py-2.5 bg-gray-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => {modifySubmit()}}>Modify</button>      
        <button 
        type='button'
        className="inline-block px-6 py-2.5 bg-red-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => {deleteSubmit()}}>DELETE</button>      
      </div>      
    )
}

export default LoginForm