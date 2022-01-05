import SajeonTask from '../component/sajeonTask'
import BoneTask from '../component/boneTask'
import axios from 'axios'

let today = new Date()
let yyyy = today.getFullYear()
let mm = today.getMonth()+1
let dd = today.getDate()
if(dd<10) {
  dd+='0'
} 
if(mm<10) {
  mm +='0'
} 
today = yyyy + mm + dd + "0000"
console.log(today)  
export default  function Home({fromServer}) {
  const tasks = fromServer
  /*
    const newdatas = []
    for(let i = 0 ; i < rowdatas.length ; i++) {
      if(rowdatas[i].totalCount != 0) {
        newdatas.push(rowdatas[i])
      }
    }  
  */
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
  fromServer = fromServer.data
  console.log("F",fromServer)
  return {
    props: {
      fromServer
    }
  }
}