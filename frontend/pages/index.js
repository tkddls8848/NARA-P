import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const button = ({onClick}) => (
  <button onClick={onClick}></button>
)

export default  function Index() {
  const [data, setData] = useState()
  const [category, setCategory] = useState()

  const onClick = async () => {
    const json = await axios.get('http://localhost:5000/test')
    setData(json.data[Object.keys(json.data)[0]])
    console.log(json.data, data, Object.keys(json)[0])
  }

  return (
    <div>
      <button onClick={onClick}>TEST Button</button>
      {[data]}
    </div>
  )
}
