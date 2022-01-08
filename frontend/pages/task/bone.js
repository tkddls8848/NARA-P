import BoneTask from '../../component/boneTask'
import axios from 'axios'
import { useState } from 'react'
import { Link, Button, Grid } from '@mui/material'

const address = 'http://localhost:5000/'
const frontAddress = 'http://localhost:3000/'

export default  function Index({fromServer, type}) {

  const [tasks, setTasks] = useState(fromServer)
  const [category, setCategory] = useState(type)
  const [depart, setDepart] = useState('1')

  const clickButton = () => {
    console.log("TEXT1", address + 'task/bone/' + depart)
  }

  const onChange = (e) => {
    console.log('e', e.target.value)
    setDepart(e.target.value)
  }

  return (
    <div>
      <input id="part" onChange={onChange}></input><Button onClick={clickButton}><Link href={ frontAddress + 'task/bone/' + depart}>Search</Link></Button>
      <Grid container columnSpacing={1} rowSpacing={1}>
        {tasks.map((taskType) => (
          taskType.items.map((task)=> (
            <Grid item xs={4} key={task.bidNtceNo}>
            <BoneTask task={task}></BoneTask>
          </Grid>))
        ))}
      </Grid>
    </div>

  )
}

export const getServerSideProps = async () => {

  let fromServer = await axios.get(address+'task/bone/')
  let type = Object.keys(fromServer.data)
  fromServer = fromServer.data[type]

  console.log("Ftype",type)
  console.log("Fdata",fromServer)

  return {
    props: {
      fromServer,
      type
    }
  }
}