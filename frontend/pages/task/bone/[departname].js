import BoneTask from '../../../component/boneTask'
import SearchBar from '../../../component/searchBar'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, Grid, Button } from '@mui/material'

const backAddress = process.env.BACK_URL
const frontAddress = process.env.FRONT_URL

export default  function Index({fromServer, type}) {
  const [tasks, setTasks] = useState(fromServer)
  const [category, setCategory] = useState(type)
  const [load, setLoad] = useState(false)
  const [depart, setDepart] = useState('1')

  const clickButton = () => {
    console.log("TEXT1", backAddress + '/task/bone/' + depart)
  }

  const onChange = (e) => {
    console.log('e', e.target.value)
    setDepart(e.target.value)
  }

  return (
    <div>
      <SearchBar address={frontAddress} type={type}></SearchBar>
      <Grid container columnSpacing={1} rowSpacing={1} key='grid'>
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

export const getServerSideProps = async (depart) => {
  console.log("depart",depart.query.departname)
  const query = encodeURI(depart.query.departname)
  let fromServer = await axios.get(backAddress+'/task/bone/' + query)
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