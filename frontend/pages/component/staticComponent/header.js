import { useRouter } from "next/router"

export default function Header() {

    const router =  useRouter()
    const menus = ['홈', '검색', 'mongo', 'logintasks', '다중 검색 (saved_searchconditions)']

    const clickMenus = (e) => {
        const type = e.target.id

        switch (type) {
            case menus[0]:
                router.push('/')
                break
            case menus[1]:
                router.push('/task/naraSearch')
                break
            case menus[2]:
                router.push('/test/mongo')
                break        
            case menus[3]:
                router.push('/test/logintask')
                break
            case menus[4]:
                router.push('/test/multisearch')
                break         
            default:
                console.log("NOT MENU")
        }
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