import axios from 'axios'
import { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import TodaySearchBar from '../component/todayComponent/todaySearchBar'
import TodaySajeon from '../component/todayComponent/todaySajeon'
import TodayBone from '../component/todayComponent/todayBone'
import NoData from '../component/staticComponent/noData'

const backAddress = process.env.BACK_URL

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
  const departList = Object.values(ctx.req.query)
  const decodeCookie = jwt.decode(jwtCookie)
  const user = decodeCookie.userId
  const [sajeonJson, boneJson] = await Promise.all([
    axios.post(backAddress+'/task/sajeon', {'departList' : departList}),
    axios.post(backAddress+'/task/bone', {'departList' : departList})
  ])

  return {
    props: {
      sajeonJson: sajeonJson.data,
      boneJson: boneJson.data,
      user
    }
  }
}

const TodayTaskShow = ({sajeonJson, boneJson}) => {
  const [sajeonData, setSajeonData] = useState(sajeonJson)
  const [boneData, setBoneData] = useState(boneJson)
  const [isdata, setIsdata] = useState(true)

  useEffect(() => {
    if(sajeonData.length == 0) {
      setIsdata(false)
    }
  }, [sajeonData, boneData])

  return (
    <div>
      <TodaySearchBar />
      <div>
        {isdata ?
        <div className="h-full w-full p-4 grid gap-2 grid-cols-4">
          {sajeonData.map((sajeon) => (
            <div key={sajeon.refNo}>
              <TodaySajeon task={sajeon} />
            </div>
          ))}
          {boneData.map((bone) => (
            <div key={bone.refNo}>
              <TodayBone task={bone} />
            </div>
          ))}
        </div> :
        <NoData/>}
      </div>
    </div>
  )
}

export default TodayTaskShow