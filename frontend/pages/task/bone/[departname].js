import BoneTask from '../../../component/boneTask'
import SearchBar from '../../../component/searchBar'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, Grid, Button } from '@mui/material'

const backAddress = process.env.BACK_URL
const frontAddress = process.env.FRONT_URL

export default  function Index({fromServer, type}) {
  const [tasks, setTasks] = useState(fromServer)
  const [isdata, setIsdata] = useState(true)

  useEffect(() => {
    if(tasks.length == 0) {
      setIsdata(false)
    }
  }, [])

  return (
    <div>
      <SearchBar address={frontAddress}></SearchBar>
      {isdata 
      ?
      <Grid container columnSpacing={1} rowSpacing={1} key='grid'>
        {tasks.map((taskType) => (
          taskType.items.map((task)=> (
          <Grid item xs={4} key={task.bidNtceNo}>
            <BoneTask task={task}></BoneTask>
          </Grid>))
        ))}
      </Grid>
      :
      <div>No data</div>
      }
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