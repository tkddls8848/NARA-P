import TaskSearchBar from '../component/taskComponent/taskSearchBar'

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


const TaskSearch = () => {
  
  return (
    <div>
      <TaskSearchBar address={frontAddress}></TaskSearchBar>
      <div className='flex justify-center py-10 text-base'>
        검색을 통해 공고를 확인 할 수 있습니다.
      </div>
    </div>
  )
}

export default TaskSearch
