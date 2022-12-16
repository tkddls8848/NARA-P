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
    const urls = ['http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoThng',
    'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoCnstwk',
    'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoServc']
    const departs = req.body.departList
    const newApi = new Array()
    const dataSet = []
    for(let i = 0 ; i < departs.length ; i++) {
        const date = 'inqryBgnDt='+ yesterday +'&inqryEndDt=' + today
        const departname = 'rlDminsttNm=' + encodeURIComponent(departs[i])
        for(let j = 0 ; j < 3 ; j++) {
            const api = (urls[j] + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname + '&' + type)
            newApi.push(api)
        }
    }
    let requests = newApi.map(api => axios.get(api))   
    Promise.all(requests)
    .then( responses => responses.forEach(
      result => {
        if (result.data.response.body.totalCount != 0 && !null) {
            for(let i = 0 ; i < result.data.response.body.items.length ; i++){
                result.data.response.body.items[i].type = 'sajeon'
                result.data.response.body.items[i].isNew = true
                dataSet.push(result.data.response.body.items[i])
            }                
        }
    }))
    .then(() => {
            dataSet.sort((a, b) => { return a.rcptDt > b.rcptDt ? -1 :  a.rcptDt < b.rcptDt ? 1 : 0 })
            res.send(dataSet)
    })        
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
    const urls = ['http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoCnstwkPPSSrch',
    'http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoServcPPSSrch',
    'http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoCnstwkPPSSrch']
    const departs = req.body.departList
    const newApi = new Array()
    const dataSet = []

    for(let i = 0 ; i < departs.length ; i++) {
        const date = 'inqryBgnDt='+ yesterday +'&inqryEndDt=' + today
        const departname = 'dminsttNm=' + encodeURIComponent(departs[i])
        for(let j = 0 ; j < 3 ; j++) {
            const api = (urls[j] + "?"+ serviceKey + "&" + datasize + "&inqryDiv=1&" + date + '&' + departname + '&' + type)
            newApi.push(api)
        }
    }
    let requests = newApi.map(api => axios.get(api))   
    console.log("sadf", requests)
    Promise.all(requests)
    .then( responses => responses.forEach(
      result => {
        console.log(result.data)
        if (result.data.response.body.totalCount != 0 && !null) {
            for(let i = 0 ; i < result.data.response.body.items.length ; i++){
                result.data.response.body.items[i].type = 'bone'
                result.data.response.body.items[i].isNew = true
                dataSet.push(result.data.response.body.items[i])
            }                
        }
    }))
    .then(() => {
            dataSet.sort((a, b) => { return a.rcptDt > b.rcptDt ? -1 :  a.rcptDt < b.rcptDt ? 1 : 0 })
            res.send(dataSet)
    })        
})

module.exports = router