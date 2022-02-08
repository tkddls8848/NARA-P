import SajeonTask from '../../../component/sajeonTask'
import SearchBar from '../../../component/searchBar'
import axios from 'axios'
import { useState, useEffect } from 'react'

const backAddress = process.env.BACK_URL
const frontAddress = process.env.FRONT_URL

export default  function sajeonComponent({toServer}) {
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
        <div className="h-full w-full grid gap-4 grid-cols-3 grid-rows-3">
          {tasks.map((task) => (
            <div key={task.refNo}>
              <SajeonTask task={task}></SajeonTask>
            </div>
          ))}
        </div>      
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
  let fromServer = await axios.get(backAddress+'/task/sajeon/' + pName + '?beginDate=' + beginDate + '&endDate=' + endDate)
  const toServer = fromServer.data

  console.log("toServer",toServer)
  
  return {
    props: {
      toServer
    }
  }
}