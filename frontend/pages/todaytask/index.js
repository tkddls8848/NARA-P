import { useState } from "react"
import Router from 'next/router'
import 'nprogress/nprogress.css'
import moment from 'moment'
import { TrashIcon } from '@heroicons/react/solid'

const frontAddress = process.env.FRONT_URL

export const getServerSideProps = async (ctx) => {
  const jwtCookie = ctx.req.cookies.userCookie
  if (!jwtCookie) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {}
  }
}

const TodayTask = () => {

  const [type, setType] = useState('')
  const [departName, setDepartName] = useState('')
  const [departs, setDeparts] = useState([['s', '국민연금공단'], ['s', '건강보험심사평가원']])
  const [dataFlag, setDataFlag] = useState(false)

  const changeHandler = (e) => {
    e.target.id == 'radio' ? setType(e.target.value) : setDepartName(e.target.value) 
  }

  const AddTasks = () => {
    const JsonDeparts = JSON.stringify(departs)        
    if(departName != null) {
      if (type == 'sajeon') {
        if (JsonDeparts.includes(JSON.stringify(['s', departName]))) {
            console.log('사전 중복')
        } else {
        setDeparts((departs) => [...departs, ['s', departName]])
      }
      } else if (JsonDeparts.includes(JSON.stringify(['b', departName]))) {
        console.log('본 중복')
      } else {
        setDeparts((departs) => [...departs, ['b', departName]])
      }
    }        
  }

  const SearchTasks = async () => {
      const departList = []
      departs.map((depart) => {
        departList.push(depart[1])
      })
      Router.push({
        pathname: frontAddress + '/todaytask/todaytaskshow',
        query: departList
      })
  }

  const DeleteTasks = (e) => {
    const arr = e.target.id.split('||')
    let filteredDepart = departs.filter((depart) => JSON.stringify(depart)!=JSON.stringify(arr))
    setDeparts(filteredDepart)
  }

  return (
    <div>

      <div className="'flex justify-center'">
        <div className="flex justify-center items-center space-x-6 m-4">
          <input 
          className='border-solid border-2 border-gray-400 rounded-md' 
          placeholder='부서명' id='input' onChange={(e) => changeHandler(e)}/>
          <div className="flex flex-row items-center space-x-2 ">
              <button
              className="inline-block px-6 py-2.5 bg-green-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={AddTasks}>추가
              </button>
              <button
              className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={SearchTasks}>검색
              </button>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center" id='group'>
          {departs.map((depart) => (
            <div className="flex flex-row items-center rounded-md m-2 p-1 bg-red-400 text-white" key={depart[0]+depart[1]}>
              <div className="p-1 text-xs font-semibold">
                {depart[1]}
              </div>
              <TrashIcon 
              className="flex justify-center h-4 w-4 cursor-pointer" 
              id={depart[0]+'||'+depart[1]} 
              onClick={(e) => DeleteTasks(e)}/>
            </div>
          ))}
        </div>
        <div className="mx-16 my-4 text-center text-red-500" id='warning' />
      </div>

      <div className='flex flex-col items-center py-10 text-base'>
        {
        dataFlag ? <div>TRUE</div> : <div className='py-2'>{moment(new Date()).format("YYYY/MM/DD")}일의 기관별 공고 검색입니다.</div>
        }
        
      </div>
    </div>
  )
}

export default TodayTask
