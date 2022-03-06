import jwt from 'jsonwebtoken'

const backAddress = process.env.BACK_URL
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
  const departList = ctx.req.params
  console.log('ctx', departList)
//  const fromServer = await axios.post(backAddress+'/task/sajeon', {'departList' : departList})
//  const toServer = fromServer.data
  const decodeCookie = jwt.decode(jwtCookie)
  const user = decodeCookie.userId
  return {
    props: {
      user
    }
  }
}

const ShowToday = ({toServer, user}) => {

  return (
    <div>
      ShowToday
    </div>
  )
}

export default ShowToday