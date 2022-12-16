

export const getServerSideProps = async (ctx) => {
  console.log("ctx", ctx.res.body)
  console.log("ctx", ctx.req.body)
  return {
    props: {}
  }
}

export default function AboutMe() {

    return (
    <div className='flex justify-center'>
    <div className="container max-w-sm mx-auto bg-white rounded-xl shadow-lg m-5 p-5">
    <div className='flex justify-center p-2'>
    Login
    </div>
    <div className="flex flex-col space-y-3 justify-items-center">
    <input 
    className='border-solid border-2 border-black' 
    placeholder='Email' />
    <input 
    className='border-solid border-2 border-black' 
    placeholder='Email' />
    <button 
    type='button'
    className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
    onClick={() => {}}>로그인</button>
    <button 
    type="button" 
    className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
    onClick={() => {}}>회원가입</button>
    </div>
    </div>
    </div>
    )
  }

