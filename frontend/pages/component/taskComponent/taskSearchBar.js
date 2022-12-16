import { useState } from "react"
import { useRouter } from "next/router"
import DatePicker from "react-datepicker"
import subDays from "date-fns/subDays"
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css"

const TaskSearchBar = ({address}) => {
    const host = address
    const [radioType, setRadioType] = useState(null)
    const [departName, setDepartName] = useState(null)
    const [startDate, setStartDate] = useState(subDays(new Date(), 1))
    const [endDate, setEndDate] = useState(new Date())
    const message = ''
    const router = useRouter()

    const changeHandler = (e) => {
        e.target.id == 'radio' ? setRadioType(e.target.value) : setDepartName(e.target.value) 
    }

    const ButtonClick = () => {
        const beginDate = moment(startDate).format("YYYYMMDD0000")
        const lastDate = moment(subDays((endDate), -1)).format("YYYYMMDD0000")
        let searchFlag = false
        radioType == null || departName == null || beginDate >= lastDate ? searchFlag = true : searchFlag = false
        if (searchFlag == true) {
            radioType == null ? message += ' 공고타입' : console.log('공고입력완료')
            departName == null ? message += ' 부서명' : console.log('부서입력완료')
            beginDate >= lastDate ? message += ' 날짜' : console.log('기간검증완료')
            //안티 패턴 수정 필요
            document.getElementById('warning').innerText = (message + '(이)가 잘못되었습니다.')
            alert(message + '(이)가 잘못되었습니다.')  
        } else {
            router.push(host + '/task/' + radioType + '/' + departName + '?' + 'beginDate' + '=' + beginDate + '&' + 'endDate' + '=' + lastDate)
        }
    }

    return (
    <div className="'flex justify-center'">
        <div className="flex justify-center items-center space-x-4 m-4">
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
            placeholder='부서명' id='input' onChange={(e) => changeHandler(e)}/>
            <div className="flex flex-row items-center">
                <DatePicker selected={startDate} selectsStart startDate={startDate} endDate={endDate} dateFormat="yyyyMMdd" todayButton="TODAY"
                onChange={(date) => setStartDate(date)} 
                customInput={ <input className='border-solid border-2 border-gray-400 rounded-md m-2' placeholder='시작일'  id="startDate"/>}/>
                <DatePicker selected={endDate} selectsEnd startDate={startDate} endDate={endDate} dateFormat="yyyyMMdd" todayButton="TODAY"
                onChange={(date) => setEndDate(date)} 
                customInput={ <input className='border-solid border-2 border-gray-400 rounded-md m-2' placeholder='종료일'  id="endDate"/>}/>
            </div>
            <div>
                <button
                className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={ButtonClick}>검색
                </button>
            </div>
        </div>
        <div className="mx-16 my-4 text-center text-red-500" id='warning' />
    </div>
    )
}

export default TaskSearchBar