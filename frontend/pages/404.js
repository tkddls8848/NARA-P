import { useRouter } from "next/router"

const frontAddress = process.env.FRONT_URL

const Custom404 = () => {
    const router = useRouter()
    const backHome = () => {
        router.push('/')
    }
    return(
        <div className='flex justify-center'>
            <div className="container max-w-sm mx-auto bg-white rounded-xl shadow-lg m-5 p-5">
                <div className='flex justify-center py-4 text-lg'>
                    요청한 페이지를 찾을 수 없습니다.
                </div>
                <div className="flex flex-col space-y-3 place-items-center">
                    <button 
                    className="inline-block px-6 py-2.5 w-1/2 bg-green-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"    
                    onClick={() => backHome()}>돌아가기</button>
                </div>
            </div>
        </div>  
    )
}

export default Custom404