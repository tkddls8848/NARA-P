import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const frontAddress = process.env.FRONT_URL
const backAddress = process.env.BACK_URL

export default function Delete({data}) {

  const [userId, setUserId] = useState('1234')
  const [userPw, setUserPw] = useState('1234')
  const [userEmail, setUserEmail] = useState('test@test.com')
  const [userStatus, setUserStatus] = useState('registered user')
  const router = useRouter()

  const deleteUser = async () => {
    console.log(userId, userPw, userEmail)
    await axios.delete(backAddress + '/login/delete', {data: {'id': userId}})
    router.push('/userLogin/login')
  }

  return (
  <div>
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex my-4 items-center space-x-4">
      <label>{userId}</label>
      <label>{userPw}</label>
      <label>{userEmail}</label>
      <button onClick={() => {deleteUser()}}>DELETE</button>
    </div>
  </div>
  );
}