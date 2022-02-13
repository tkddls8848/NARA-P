import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'
import LoginForm from '../component/loginComponent/loginForm'

const backAddress = process.env.BACK_URL
const frontAddress = process.env.FRONT_URL

export default function Login({toUser}) {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const router = useRouter()
  console.log("user", toUser)
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
    <div className='grid grid-cols-3'>
      <LoginForm user={toUser}></LoginForm>
    </div>
  );
}

export const getServerSideProps = async (login) => {
  let user = await axios.post(backAddress + '/login')
  const toUser = user.data
  
  console.log("toUser", toUser)
  return {
      props: {
        toUser
      }
  }
}