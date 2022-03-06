const router = require('express').Router()
const axios = require('axios')
const moment = require('moment')
const serviceKey = process.env.SERVICE_KEY
const datasize = 'numOfRows=999&pageNo=1'
const type = 'type=json'
const yesterday = moment().subtract(1, 'days').format('YYYYMMDD0000')
const today = moment().format('YYYYMMDD2359')

//사전공고
router.get('/sajeon/:departname', async (req, res) => {
    const url = 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoThng'
    const url1 = 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoCnstwk'
    const url2 = 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoServc'
    const departname = 'rlDminsttNm=' + encodeURIComponent(req.params.departname)
    const date = 'inqryBgnDt='+ req.query.beginDate +'&inqryEndDt=' + req.query.endDate
    const api = (url + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname + '&' + type)
    const api1 = (url1 + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname + '&' + type)
    const api2 = (url2 + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname + '&' + type)
    const dataSet = []

    dataProcess = (result) => {
        console.log('totalcount', result.data.response.body.totalCount)
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
        await Promise.all([axios.get(array[0]), axios.get(array[1]), axios.get(array[2])])
        .then((responses) => {responses.forEach((response) => {dataProcess(response)})})
        dataSet.sort((a, b) => { return a.rcptDt > b.rcptDt ? -1 :  a.rcptDt < b.rcptDt ? 1 : 0 })
        res.send(dataSet)
    }    
    getData(api + '||' + api1 + '||' + api2)
})


router.post('/sajeon', async (req, res) => {
    const url = 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoThng'
    const url1 = 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoCnstwk'
    const url2 = 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoServc'
    const departname = 'rlDminsttNm=' + encodeURIComponent(req.body.departList[0])
    const departname1 = 'rlDminsttNm=' + encodeURIComponent(req.body.departList[1])
    const date = 'inqryBgnDt='+ yesterday +'&inqryEndDt=' + today
    const api = (url + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname + '&' + type)
    const api1 = (url1 + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname + '&' + type)
    const api2 = (url2 + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname + '&' + type)
    const api3 = (url + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname1 + '&' + type)
    const api4 = (url1 + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname1 + '&' + type)
    const api5 = (url2 + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname1 + '&' + type)
    const dataSet = []

    dataProcess = (result) => {
        console.log('totalcount', result.data.response.body.totalCount)
        if (result.data.response.body.totalCount != 0 && !null) {
            for(let i = 0 ; i < result.data.response.body.items.length ; i++){
                result.data.response.body.items[i].type = 'sajeon'
                result.data.response.body.items[i].isNew = true
                dataSet.push(result.data.response.body.items[i])
            }                
        }
    }

    mulitAxios = (obj) => {
        /*
        1. obj => arr
        2. arr받아다가 각 성분에 대해 axios
        3. 전체 결과 arr로 return
        */
    }

    getData = async (api) => {
        const array = api.split('||')
        //     await Promise.all([mulitAxios(obj)])
        await Promise.all([axios.get(array[0]), axios.get(array[1]), axios.get(array[2]), axios.get(array[3]), axios.get(array[4]), axios.get(array[5])])
        .then((responses) => {responses.forEach((response) => {dataProcess(response)})})
        dataSet.sort((a, b) => { return a.rcptDt > b.rcptDt ? -1 :  a.rcptDt < b.rcptDt ? 1 : 0 })
        console.log(dataSet)
        res.send(dataSet)
    }    
    getData(api + '||' + api1 + '||' + api2+ '||' + api3 + '||' + api4 + '||' + api5)
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
        console.log(typeof(array))
        await Promise.all([axios.get(array[0]), axios.get(array[1]), axios.get(array[2])])
        .then((responses) => {responses.forEach((response) => {dataProcess(response)})})
        dataSet.sort((a, b) => { return a.rcptDt > b.rcptDt ? -1 :  a.rcptDt < b.rcptDt ? 1 : 0 })
        res.send(dataSet)
    }
    getData(api + '||' + api1 + '||' + api2)
})

router.post('/bone', async (req, res) => {  
    console.log('BONE')
    const url = 'http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoCnstwkPPSSrch'
    const url1 = 'http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoServcPPSSrch'
    const url2 = 'http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoThngPPSSrch'
    const date = 'inqryBgnDt='+ yesterday +'&inqryEndDt=' + today
    const dataSet = []  
    const departnames = req.body.departList

    for (let i = 0 ; i < departnames.length ; i ++) {
        const departname = 'dminsttNm=' + encodeURIComponent(departnames[i])
        const api = (url + "?"+ serviceKey + "&" + datasize + "&inqryDiv=1&" + date + '&' + departname + '&' + type)
        const api1 = (url1 + "?"+ serviceKey + "&" + datasize + "&inqryDiv=1&" + date + '&' + departname + '&' + type)
        const api2 = (url2 + "?"+ serviceKey + "&" + datasize + "&inqryDiv=1&" + date + '&' + departname + '&' + type)

        dataProcess = (result) => {       
            if (result.data.response.body.totalCount != 0 && !null) {
                for(let i = 0 ; i < result.data.response.body.items.length ; i++){
                    result.data.response.body.items[i].type = 'bone'
                    result.data.response.body.items[i].isNew = true
                    dataSet.push(result.data.response.body.items[i])
                }                
            }            
        }
        getData = async (api) => {
            const array = api.split('||')
            await Promise.all([axios.get(array[0]), axios.get(array[1]), axios.get(array[2])])
            .then((responses) => {responses.forEach((response) => {dataProcess(response)})})
            dataSet.sort((a, b) => { return a.rcptDt > b.rcptDt ? -1 :  a.rcptDt < b.rcptDt ? 1 : 0 })
        } 
        console.log('api', api,api1,api2)

        getData(api + '||' + api1 + '||' + api2)

    }
    console.log("result", dataSet)
    return res.json(dataSet)
})

module.exports = router