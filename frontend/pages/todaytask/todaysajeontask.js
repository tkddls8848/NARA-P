import TodaySearchBar from '../component/todayComponent/todaySearchBar'

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


const TodaySajeonTask = () => {
  return (
    <div>
      <TodaySearchBar type={'sajeon'}></TodaySearchBar>
      <div className='flex justify-center py-10 text-base'>
        today sajeon
      </div>
    </div>
  )
}

export default TodaySajeonTask
