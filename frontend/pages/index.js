import axios from 'axios'
import {  useState } from 'react'

export default  function Index() {
  const [data, setData] = useState()
  const [category, setCategory] = useState()
  const [departname, setDepartname] = useState(process.env.FRONT_URL)
  console.log(departname)

  const onClick = async () => {
    setData(process.env.FRONT_URL)
  }

  return (
    <div>
      <button onClick={onClick}>TEST Button</button>
      {[data]}

    </div>
  )
}
