import SearchBar from '../component/searchBar'

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


const naraSearch = () => {
  return (
    <div>
      <SearchBar address={frontAddress}></SearchBar>
      <div className='flex justify-center py-10 text-base'>
        검색을 통해 공고를 확인 할 수 있습니다.
      </div>
    </div>
  )
}

export default naraSearch
