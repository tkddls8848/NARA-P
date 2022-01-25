import axios from 'axios'
import {  useState } from 'react'
import SearchBar from '../component/searchBar'

const backAddress = process.env.BACK_URL
const frontAddress = process.env.FRONT_URL

export default  function Index() {
  const [data, setData] = useState()
  const [depart, setDepart] = useState('1')
  const [type, setType] = useState('sajeon')

  const onChange = (e) => {
    console.log('e', e.target.value)
    setDepart(e.target.value)
  }

  const onClick = () => {
    setData(process.env.FRONT_URL)
    console.log(data)
  }

  return (
    <div>
      <SearchBar address={frontAddress} type={type}></SearchBar>
      <div>TEST</div>
    </div>
  )
}

