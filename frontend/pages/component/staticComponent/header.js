import { useRouter } from "next/router"

const Header = () => {
    const router =  useRouter()
    const menus = ['로그인창', 'login기능', '검색', 'TASK CRUD', 'ABOUT ME']
    const urls = ['/', '/userLogin/login', '/task/naraSearch', '/userTask/usertask', '/aboutme']

    const clickMenus = (e) => {
        const type = e.target.id
        const number = menus.indexOf(type)
        router.push(urls[number])        
    }

  return (
    <div className="flex space-x-6 items-center flex-wrap bg-blue-500 p-6">
        <span className="flex items-center">
            <h1 className="text-3xl font-bold text-white mr-12">NARA-P</h1>
            {menus.map((menu) => (
                <button className="text-s text-white p-4" id={menu} key={menu} onClick={clickMenus}>{menu}</button>
            ))}
        </span>
    </div>
  )
}

export default Header