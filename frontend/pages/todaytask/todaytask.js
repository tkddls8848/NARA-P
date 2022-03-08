import moment from 'moment'
import TodaySearchBar from '../component/todayComponent/todaySearchBar'

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
      <TodaySearchBar />
      <div className='flex flex-col items-center py-10 text-base'>
        <div className='py-2'>{moment(new Date()).format("YYYY/MM/DD")}일의 기관별 공고 검색입니다.</div>
      </div>
    </div>
  )
}

export default TodayTask
