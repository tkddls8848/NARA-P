import { useState } from "react"
import Router from "next/router"
import "react-datepicker/dist/react-datepicker.css"

const backAddress = process.env.BACK_URL
const frontAddress = process.env.FRONT_URL

const SearchBar = ({type}) => {

    const [departName, setDepartName] = useState('')
    const [departNames, setDepartNames] = useState(['국민연금공단', '건강보험심사평가원', '국민건강보험공단', '보건복지부', '사회보장정보원', '한국고용정보원', '우정사업정보센터'])

    const changeHandler = (e) => {
        setDepartName(e.target.value)
        console.log(departName)
    }

    const AddTasks = () => {
        const newDeparts = departNames.concat(departName)
        departName != null && !departNames.includes(departName) ? setDepartNames(newDeparts) : console.log('중복')
        console.log(departNames)
    }

    const SearchTasks = () => {
        console.log(departNames)
        type == 'sajeon' ?
        Router.push({pathname: frontAddress + '/todaytask/showtodaysajeon', query: {'departNames': departNames}}) :
        Router.push({pathname: frontAddress + '/todaytask/showtodaybone', query: {'departNames': departNames}})
    }

    const DeleteTasks = (e) => {
        let d = departNames.filter((depart) => depart != e.target.id)
        console.log('d',d, departNames,e.target.id)
        setDepartNames(d)
    }

    return (
    <div className="'flex justify-center'">
        <div className="flex justify-center items-center space-x-6 m-4">
            <input 
            className='border-solid border-2 border-gray-400 rounded-md' 
            placeholder='부서명' id='input' onChange={(e) => changeHandler(e)}/>
            <div className="flex flex-row items-center">
                <button
                className="inline-block px-6 py-2.5 bg-green-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={AddTasks}>추가
                </button>
                <button
                className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={SearchTasks}>검색
                </button>
            </div>
        </div>
        <div className="mx-16 my-4 text-center" id='group'>           

        {
            departNames.map((depart) => ( 
                <div key={depart}>
                    {depart}
                    <button
                    onClick={(e) => DeleteTasks(e)}
                    id={depart}>
                    button
                    </button>
                </div>
                ))
            }

        </div>
        <div className="mx-16 my-4 text-center text-red-500" id='warning' />
    </div>
    )
}

export default SearchBar