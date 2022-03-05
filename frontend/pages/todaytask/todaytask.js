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
      <TodaySearchBar></TodaySearchBar>
      <div className='flex justify-center py-10 text-base'>
        today test
      </div>
    </div>
  )
}

export default TodayTask
