import axios from 'axios'
import {  useState } from 'react'

const button = ({onClick}) => (
  <button onClick={onClick}></button>
)

export default  function Index() {
  const [data, setData] = useState()
  const [category, setCategory] = useState()
  const [departname, setDepartname] = useState("국민연금공단")
  console.log(departname)

  const onClick = async () => {
    const json = await axios.get('http://localhost:5000/sajeon/' + departname)
    console.log([json.data.sajeon[0].items], typeof([json.data.sajeon[0].items]))
    setData("국민연금공단")
  }

  return (
    <div>
      <button onClick={onClick}>TEST Button</button>
      {[data]}
    </div>
  )
}
