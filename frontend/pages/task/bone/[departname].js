import BoneTask from '../../../component/boneTask'
import SearchBar from '../../../component/searchBar'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Grid } from '@mui/material'

const backAddress = process.env.BACK_URL
const frontAddress = process.env.FRONT_URL

export default  function boneComponent({toServer}) {
  const [tasks, setTasks] = useState(toServer)
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
        {tasks.map((task)=> (
          <Grid item xs={4} key={task.bidNtceNo}>
            <BoneTask task={task}></BoneTask>
          </Grid>))}
      </Grid>
      :
      <div>No data</div>
      }
    </div>

  )
}

export const getServerSideProps = async (queryString) => {
  const pName = encodeURI(queryString.query.departname)
  const beginDate = queryString.query.beginDate
  const endDate = queryString.query.endDate
  let fromServer = await axios.get(backAddress+'/task/bone/' + pName + '?beginDate=' + beginDate + '&endDate=' + endDate)
  const toServer = fromServer.data

  console.log("toServer",toServer)

  return {
    props: {
      toServer
    }
  }
}