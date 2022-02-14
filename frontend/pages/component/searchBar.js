import { useState } from "react"
import { useRouter } from "next/router"

const SearchBar = ({address}) => {
    const host = address
    const [departName, setDepartName] = useState('NONE')    
    const [radioType, setRadioType] = useState('sajeon')
    const [dateRange, setDateRange] = useState([null, null])
    const router = useRouter()

    const ChangeRadio = (e) => {
        setRadioType(e.target.id)
    }
    const ChangeInput = (e) => {
        setDepartName(e.target.value)
        console.log(departName)
    }
    const ButtonClick = (e) => {
        //캘린더 양식 적용 전까지 임의로 맞는 날짜 입력 필요
        const beginDate = dateRange[0]
        const endDate = dateRange[1]
        let checker = [false, false, false]
        let warningMessage = ''
        console.log("BUTTON", radioType, departName, dateRange)
        if (!radioType) {
            console.log("NO RADIO")
            checker[0] = true
            warningMessage += "NO RADIO "
        }
        if (!departName) {
            console.log("NO INPUT")
            checker[1] = true
            warningMessage += "NO INPUT "
        }
        if (!dateRange[0] || !dateRange[1]) {
            console.log("NO RANGE")
            checker[2] = true
            warningMessage += "NO RANGE "
        }
        if (checker.includes(true)) {
            console.log("NO ALLOW")
        } else {
            router.push(host + '/task/' + radioType + '/' + departName + '?' + 'beginDate' + '=' + beginDate + '&' + 'endDate' + '=' + endDate)
        }        
        //alert이 뜨게하기
        console.log("CHECKER" , checker, warningMessage)        
    }

    const WarningMessage = (message) => {

    }

    return (
    <div className="flex justify-center items-center space-x-6 m-4">
        <div className="form-check form-check-inline">
            <input className="form-check-input rounded-full h-4 w-4 border border-gray-300 checked:bg-blue-400 mt-1 align-top mr-2 cursor-pointer"
            type="radio" name="inlineRadioOptions" id="sajeon" onClick={ChangeRadio}/>
            <label className="form-check-label inline-block text-gray-800" htmlFor="inlineRadio10">사전공고</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input rounded-full h-4 w-4 border border-gray-300 checked:bg-blue-400 mt-1 align-top mr-2 cursor-pointer"
            type="radio" name="inlineRadioOptions" id="bone" onClick={ChangeRadio}/>
            <label className="form-check-label inline-block text-gray-800" htmlFor="inlineRadio20">본공고</label>
        </div>
        <div className="border-solid border-2 border-black-500">
            <input placeholder="search depart" onKeyUp={ChangeInput}></input>
        </div>
        <div className="flex items-center justify-center">
            <div className="relative form-floating mx-1 xl:w-96">
                <input type="text"
                className="form-control block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Select a beginDate"
                id="beginDate"
                onChange={(value) => {setDateRange([value.target.value, dateRange[1]])}} />
                <label htmlFor="floatingInput" className="text-gray-700">Select a beginDate</label>
            </div>
            <div className="relative form-floating mx-1 xl:w-96">
                <input type="text"
                className="form-control block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Select a endDate"
                id="endDate"
                onChange={(value) => {setDateRange([dateRange[0], value.target.value])}} />
                <label htmlFor="floatingInput" className="text-gray-700">Select a endDate</label>
            </div>
            <div>
                <button
                className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={ButtonClick}>Button
                </button>
            </div>
        </div>

        <div className="text-red-500">Warning Message</div>
    </div>
    )
}

export default SearchBar