import TodaySearchBar from '../component/todaySearchBar'

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


const TodayBoneTask = () => {
  return (
    <div>
      <TodaySearchBar type={'bone'}></TodaySearchBar>
      <div className='flex justify-center py-10 text-base'>
        today bone
      </div>
    </div>
  )
}

export default TodayBoneTask
