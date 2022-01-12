import SajeonTask from '../../component/sajeonTask'
import SearchBar from '../../component/searchBar'
import axios from 'axios'
import { useState } from 'react'
import { Link, Button, Grid } from '@mui/material'

const backAddress = process.env.BACK_URL
const frontAddress = process.env.FRONT_URL

export default  function Index({fromServer, type}) {
  const [tasks, setTasks] = useState(fromServer)
  const [category, setCategory] = useState(type)
  const [depart, setDepart] = useState('1')

  const clickButton = () => {
    console.log("TEXT1", address + '/task/bone/' + depart)
  }

  const onChange = (e) => {
    console.log('e', e.target.value)
    setDepart(e.target.value)
  }

  return (
    <div>
      <SearchBar address={frontAddress} type={type}></SearchBar>
      <Grid container columnSpacing={1} rowSpacing={1}>
        {tasks.map((taskType) => (
          taskType.items.map((task)=> (
          <Grid item xs={4} key={task.refNo}>
          <SajeonTask task={task}></SajeonTask>
          </Grid>))
        ))}
      </Grid>
    </div>

  )
}

export const getServerSideProps = async () => {
  let fromServer = await axios.get(backAddress+'/task/sajeon/')
  const type = Object.keys(fromServer.data)
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