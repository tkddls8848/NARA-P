import TodaySearchBar from '../component/todayComponent/todaySearchBar'
import moment from 'moment'

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
  return (
    <div>
      <TodaySearchBar></TodaySearchBar>
      <div className='flex justify-center py-10 text-base'>
        {moment(new Date()).format("YYYY/MM/DD")}일의 기관별 공고 검색입니다.
        지금은 기능상 2개 기관만 가능
        사전공고만
      </div>
    </div>
  )
}

export default TodayTask
