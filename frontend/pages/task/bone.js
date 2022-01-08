import BoneTask from '../../component/boneTask'
import axios from 'axios'
import { useState } from 'react'
import { Grid } from '@mui/material'

const address = 'http://localhost:5000/'

export default  function Index({fromServer, type}) {

  const [tasks, setTasks] = useState(fromServer)
  const [category, setCategory] = useState(type)
  console.log(tasks)
  console.log(category)

  return (
      <Grid container columnSpacing={1} rowSpacing={1}>
        {tasks.map((taskType) => (
          taskType.items.map((task)=> (
            <Grid item xs={4}>
            <BoneTask task={task}></BoneTask>
          </Grid>))
        ))}
      </Grid>
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