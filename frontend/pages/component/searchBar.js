import { useState } from "react"
import { useRouter } from "next/router"
import DatePicker from "react-datepicker"
import subDays from "date-fns/subDays"
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css"

const SearchBar = ({address}) => {
    const host = address
    const [departName, setDepartName] = useState(null)    
    const [radioType, setRadioType] = useState(null)
    const [message, setMessage] = useState('')
    const [startDate, setStartDate] = useState(subDays(new Date(), 1))
    const [endDate, setEndDate] = useState(new Date())

    const router = useRouter()

    const changeHandler = (e) => {
        const type = e.target.id
        if (type == 'radio') {
            setRadioType(e.target.value) 
        } else if (type == 'input') {
            setDepartName(e.target.value) 
        }
    }

    const ButtonClick = (e) => {

        let checker = [false, false, false]
        const beginDate = moment(startDate).format("YYYYMMDD0000")
        const lastDate = moment(endDate).format("YYYYMMDD0000")
        console.log("BUTTON", radioType, departName,beginDate, lastDate)

        if (!radioType) {
            console.log("NO RADIO")
            checker[0] = true
            setMessage(message + "NO RADIO")
        }
        if (!departName) {
            console.log("NO INPUT")
            checker[1] = true
            setMessage(message + "NO INPUT")
        }
        if (startDate || endDate) {
            console.log("NO RANGE")
            checker[2] = true
            setMessage(message + "NO RANGE")
        }
        if (checker.includes(true)) {
            console.log("NO ALLOW")
        } else {
            router.push(host + '/task/' + radioType + '/' + departName + '?' + 'beginDate' + '=' + beginDate + '&' + 'endDate' + '=' + lastDate)
        }        
        console.log("CHECKER" , checker, message)      
        alert('경고 메세지 : ', message)  
    }

    const WarningMessage = (message) => {

    }

    return (
    <div className="container">
        <div className="flex justify-center items-center space-x-6 m-4">
            <div className="form-check form-check-inline">
                <input className="form-check-input rounded-full h-4 w-4 border border-gray-300 checked:bg-blue-400 mt-1 align-top mr-2 cursor-pointer"
                type="radio" name="inlineRadioOptions" id="radio" value="sajeon" onClick={(e) => {changeHandler(e)}}/>
                <label className="form-check-label inline-block text-gray-800" htmlFor="inlineRadio10">사전공고</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input rounded-full h-4 w-4 border border-gray-300 checked:bg-blue-400 mt-1 align-top mr-2 cursor-pointer"
                type="radio" name="inlineRadioOptions" id="radio" value="bone" onClick={(e) => {changeHandler(e)}}/>
                <label className="form-check-label inline-block text-gray-800" htmlFor="inlineRadio20">본공고</label>
            </div>
            <input 
            className='border-solid border-2 border-gray-400 rounded-md' 
            placeholder='부서명' onChange={(e) => changeHandler(e)}/>
            <div className="flex flex-row items-center">
<DatePicker selected={startDate} selectsStart startDate={startDate} endDate={endDate} dateFormat="yyyyMMdd" todayButton="TODAY"
onChange={(date) => setStartDate(date)} 
customInput={ <input className='border-solid border-2 border-gray-400 rounded-md m-2' placeholder='시작일'  id="startDate"/>}/>

<DatePicker selected={endDate} selectsEnd startDate={startDate} endDate={endDate} dateFormat="yyyyMMdd" todayButton="TODAY"
onChange={(date) => setEndDate(date)} 
customInput={ <input className='border-solid border-2 border-gray-400 rounded-md m-2' placeholder='종료일'  id="endDate"/>}/>
                <div>
                    <button
                    className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={ButtonClick}>Button
                    </button>
                </div>
            </div>
        </div>
        <div className="mx-16 my-4 text-red-500">Warning Message</div>
    </div>
    )
}

export default SearchBar