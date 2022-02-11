import { useRouter } from "next/router"

export default function Header() {

    const router =  useRouter()
    const menus = ['로그인창', '검색', 'TASK CRUD', 'login기능', '다중 검색 매크로', 'ABOUT ME']
    const urls = ['/', '/task/naraSearch', '/test/searchList', '/test/login', '/test/multisearch', '/test/aboutme']

    const clickMenus = (e) => {
        const type = e.target.id
        const number = menus.indexOf(type)
        router.push(urls[number])        
    }

  return (
    <div className="flex space-x-4 items-center flex-wrap bg-blue-500 p-6">
        <span className="flex items-center">
            <h2 className="text-2xl font-bold text-white">NARA-P</h2>
            {menus.map((menu) => (
                <button className="text-2s text-white p-4" id={menu} key={menu} onClick={clickMenus}>{menu}</button>
            ))}
        </span>
    </div>
  )
}