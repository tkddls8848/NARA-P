const router = require('express').Router()
const axios = require('axios')
const serviceKey = process.env.SERVICE_KEY
const datasize = 'numOfRows=999&pageNo=1'
const type = 'type=json'

//사전공고
router.get('/sajeon/:departname', (req, res) => {
    const url = 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoThng'
    const url1 = 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoCnstwk'
    const url2 = 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoServc'
    const departname = 'rlDminsttNm=' + encodeURIComponent(req.params.departname)
    // 검색 기간 쿼리 스트링
    const date = 'inqryBgnDt='+ req.query.beginDate +'&inqryEndDt=' + req.query.endDate

    const api = (url + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname + '&' + type)
    const api1 = (url1 + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname + '&' + type)
    const api2 = (url2 + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname + '&' + type)
    const dataSet = []

    dataProcess = (result) => {
        console.log("RESULT", result.data.response.body)
        if (result.data.response.body.totalCount != 0 && !null) {
            for(let i = 0 ; i < result.data.response.body.items.length ; i++){
                result.data.response.body.items[i].type = 'sajeon'
                result.data.response.body.items[i].isNew = false
                dataSet.push(result.data.response.body.items[i])
            }                
        }
    }

    getData = async (api) => {
        const array = api.split('||')
        await axios.all([axios.get(array[0]), axios.get(array[1]), axios.get(array[2])])
        .then(axios.spread((result, result1, result2) => {
            dataProcess(result)
            dataProcess(result1)
            dataProcess(result2)
            //데이터 공고 게시 날짜 기준 내림차순 정렬
            dataSet.sort((a, b) => {
                return a.rcptDt > b.rcptDt ? -1 :  a.rcptDt < b.rcptDt ? 1 : 0
            })
            res.send(dataSet)
       }))
    }
    getData(api + '||' + api1 + '||' + api2)
})



//본공고
router.get('/bone/:departname', async (req, res) => {
    const url = 'http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoCnstwkPPSSrch'
    const url1 = 'http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoServcPPSSrch'
    const url2 = 'http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoThngPPSSrch'
    const departname = 'dminsttNm=' + encodeURIComponent(req.params.departname)
    const date = 'inqryBgnDt='+ req.query.beginDate +'&inqryEndDt=' + req.query.endDate
    
    const api = (url + "?"+ serviceKey + "&" + datasize + "&inqryDiv=1&" + date + '&' + departname + '&' + type)
    const api1 = (url1 + "?"+ serviceKey + "&" + datasize + "&inqryDiv=1&" + date + '&' + departname + '&' + type)
    const api2 = (url2 + "?"+ serviceKey + "&" + datasize + "&inqryDiv=1&" + date + '&' + departname + '&' + type)
    const dataSet = []

    dataProcess = (result) => {
        console.log("RESULT", result.data.response.body)
        if (result.data.response.body.totalCount != 0 && !null) {
            for(let i = 0 ; i < result.data.response.body.items.length ; i++){
                result.data.response.body.items[i].type = 'bone'
                result.data.response.body.items[i].isNew = false
                dataSet.push(result.data.response.body.items[i])
            }                
        }
    }

    getData = async (api) => {
        const array = api.split('||')       
        await axios.all([axios.get(array[0]), axios.get(array[1]), axios.get(array[2])])
        .then(axios.spread((result, result1, result2) => {
            dataProcess(result)
            dataProcess(result1)
            dataProcess(result2)
            //데이터 공고 게시 날짜 기준 내림차순 정렬
            dataSet.sort((a, b) => {
                return a.bidNtceDt > b.bidNtceDt ? -1 :  a.bidNtceDt < b.bidNtceDt ? 1 : 0
            })
            res.send(dataSet)
       }))
    }
    getData(api + '||' + api1 + '||' + api2)
})

module.exports = router