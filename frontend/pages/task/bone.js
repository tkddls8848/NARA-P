import BoneTask from '../../component/boneTask'
import axios from 'axios'
import { useEffect, useState } from 'react'

  /*
let today = new Date()
let yyyy = today.getFullYear()
let mm = today.getMonth()+1
let dd = today.getDate()
if(dd<10) {dd+='0'} 
if(mm<10) {mm +='0'} 
today = yyyy + mm + dd + "0000"
console.log(today)  

    const newdatas = []
    for(let i = 0 ; i < rowdatas.length ; i++) {
      if(rowdatas[i].totalCount != 0) {
        newdatas.push(rowdatas[i])
      }
    }  
  */

export default  function Index({fromServer, type}) {

  const [tasks, setTasks] = useState(fromServer)
  const [category, setCategory] = useState(type)
  console.log(tasks)
  console.log(category)

  return (
    <div>
      {tasks.map((taskType) => (
        taskType.items.map((task)=> (
          <BoneTask task={task}></BoneTask>
        ))
      ))}
    </div>
  )
}

export const getServerSideProps = async () => {

  let fromServer = await axios.get('http://localhost:5000/bone')
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