const Header = (appContent) => {

    const router =  appContent.router
    const menus = ['홈', '검색',  '저장된 공고', '오늘의 공고']
    const urls = ['/', '/task', '/usertask', '/todaytask']
    const auth = appContent.checkcookies

    const clickMenus = (e) => {
        const type = e.target.id
        const number = menus.indexOf(type)
        auth == true ? router.push(urls[number]) : alert('로그인 되어 있지 않습니다.')
    }
    
    return (
    <div className="flex space-x-6 items-center flex-wrap bg-slate-600 px-10 py-6">
        <span className="flex items-center">
            <h1 className="text-2xl font-bold text-white mr-10">NARA-P</h1>
            {menus.map((menu) => (
                <button className="text-xs text-white p-2" id={menu} key={menu} onClick={clickMenus}>{menu}</button>
            ))}
        </span>
    </div>
    )
}

export default Header