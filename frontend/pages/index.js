import axios from 'axios'
import {  useState } from 'react'

export default  function Index() {
  const [data, setData] = useState()
  const [category, setCategory] = useState()
  const [departname, setDepartname] = useState("국민공단")
  console.log(departname)

  const onClick = async () => {
    setData("국민공단")
  }

  return (
    <div>
      <button onClick={onClick}>TEST Button</button>
      {[data]}
    </div>
  )
}
