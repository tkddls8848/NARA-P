const express = require('express')
const axios = require('axios')
const app = express()
const dotenv = require('dotenv').config({ path: '../.env' })
const cors = require('cors')
const moment = require('moment')
/*
각 용역, 물품, 외자 별 numOfRows:20, totalCount가 존재하여 많은 수의 건수 검색을하면 20개의 items 만 나옴
*/
const today = moment().format('YYYYMMDD0000')
const yesterday = moment().subtract(7, 'days').format('YYYYMMDD0000')

const serviceKey = process.env.SERVICE_KEY
const datasize = 'numOfRows=20&pageNo=1'
const date = 'inqryBgnDt='+ yesterday +'&inqryEndDt=' + today
const type = 'type=json'

app.use(express.json())
app.use(cors())
app.use(express.urlencoded( {extended : true } ))
app.listen(process.env.PORT, () => {
    console.log("SERVER ON")
    console.log("TODAY", today, yesterday, typeof(yesterday))
})

//기본 부서 : 국민건강보험공단
app.get('/task/sajeon', (req, res) => {
    const url = 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoThng'
    const url1 = 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoCnstwk'
    const url2 = 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoServc'
    const departname = 'rlDminsttNm=%EA%B5%AD%EB%AF%BC%EA%B1%B4%EA%B0%95%EB%B3%B4%ED%97%98%EA%B3%B5%EB%8B%A8'

    const api = (url + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname + '&' + type)
    const api1 = (url1 + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname + '&' + type)
    const api2 = (url2 + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname + '&' + type)
    
    let dataSet = []
    getData = async (api) => {
        const array = api.split('||')       
        await axios.all([axios.get(array[0]), axios.get(array[1]), axios.get(array[2])])
        .then(axios.spread((result, result1, result2) => {
            if (result.data.response.body.totalCount != 0) {
                for(let i = 0 ; i < result.data.response.body.items.length ; i++){
                    dataSet.push(result.data.response.body.items[i])
                }                
            }
            if (result1.data.response.body.totalCount != 0) {
                for(let i = 0 ; i < result1.data.response.body.items.length ; i++){
                    dataSet.push(result1.data.response.body.items[i])
                }                
            }
            if (result2.data.response.body.totalCount != 0) {
                for(let i = 0 ; i < result2.data.response.body.items.length ; i++){
                    dataSet.push(result2.data.response.body.items[i])
                }                
            }
            dataSet.sort((a, b) => {
                return a.rcptDt > b.rcptDt ? -1 :  a.rcptDt < b.rcptDt ? 1 : 0
            })
            res.send(dataSet)
       }))
    }
    getData(api + '||' + api1 + '||' + api2)
})

app.get('/task/sajeon/:departname', (req, res) => {
    const url = 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoThng'
    const url1 = 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoCnstwk'
    const url2 = 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoServc'
    const departname = 'rlDminsttNm=' +encodeURIComponent(req.params.departname)
    console.log(departname)
    const api = (url + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname + '&' + type)
    const api1 = (url1 + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname + '&' + type)
    const api2 = (url2 + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname + '&' + type)
    let dataSet = []

    getData = async (api) => {
        const array = api.split('||')       
        await axios.all([axios.get(array[0]), axios.get(array[1]), axios.get(array[2])])
        .then(axios.spread((result, result1, result2) => {
            if (result.data.response.body.totalCount != 0) {
                for(let i = 0 ; i < result.data.response.body.items.length ; i++){
                    dataSet.push(result.data.response.body.items[i])
                }                
            }
            if (result1.data.response.body.totalCount != 0) {
                for(let i = 0 ; i < result1.data.response.body.items.length ; i++){
                    dataSet.push(result1.data.response.body.items[i])
                }                
            }
            if (result2.data.response.body.totalCount != 0) {
                for(let i = 0 ; i < result2.data.response.body.items.length ; i++){
                    dataSet.push(result2.data.response.body.items[i])
                }                
            }
            dataSet.sort((a, b) => {
                return a.rcptDt > b.rcptDt ? -1 :  a.rcptDt < b.rcptDt ? 1 : 0
            })
            res.send(dataSet)
       }))
    }
    getData(api + '||' + api1 + '||' + api2)
})

//기본 부서 : 국민건강보험공단
app.get('/task/bone', (req, res) => {
    const url = 'http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoCnstwkPPSSrch'
    const url1 = 'http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoServcPPSSrch'
    const url2 = 'http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoThngPPSSrch'
    const departname = 'dminsttNm=%EA%B5%AD%EB%AF%BC%EA%B1%B4%EA%B0%95%EB%B3%B4%ED%97%98%EA%B3%B5%EB%8B%A8'

    const api = (url + "?"+ serviceKey + "&" + datasize + "&inqryDiv=1&" + date + '&' + departname + '&' + type)
    const api1 = (url1 + "?"+ serviceKey + "&" + datasize + "&inqryDiv=1&" + date + '&' + departname + '&' + type)
    const api2 = (url2 + "?"+ serviceKey + "&" + datasize + "&inqryDiv=1&" + date + '&' + departname + '&' + type)
    let dataSet = []

    getData = async (api) => {
        const array = api.split('||')       
        await axios.all([axios.get(array[0]), axios.get(array[1]), axios.get(array[2])])
        .then(axios.spread((result, result1, result2) => {
            if (result.data.response.body.totalCount != 0) {
                for(let i = 0 ; i < result.data.response.body.items.length ; i++){
                    dataSet.push(result.data.response.body.items[i])
                }                
            }
            if (result1.data.response.body.totalCount != 0) {
                for(let i = 0 ; i < result1.data.response.body.items.length ; i++){
                    dataSet.push(result1.data.response.body.items[i])
                }                
            }
            if (result2.data.response.body.totalCount != 0) {
                for(let i = 0 ; i < result2.data.response.body.items.length ; i++){
                    dataSet.push(result2.data.response.body.items[i])
                }                
            }
            dataSet.sort((a, b) => {
                return a.bidNtceDt > b.bidNtceDt ? -1 :  a.bidNtceDt < b.bidNtceDt ? 1 : 0
            })
            res.send(dataSet)
       }))
    }
    getData(api + '||' + api1 + '||' + api2)
})

app.get('/task/bone/:departname', (req, res) => {
    const url = 'http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoCnstwkPPSSrch'
    const url1 = 'http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoServcPPSSrch'
    const url2 = 'http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoThngPPSSrch'
    const departname = 'dminsttNm=' + encodeURIComponent(req.params.departname)

    const api = (url + "?"+ serviceKey + "&" + datasize + "&inqryDiv=1&" + date + '&' + departname + '&' + type)
    const api1 = (url1 + "?"+ serviceKey + "&" + datasize + "&inqryDiv=1&" + date + '&' + departname + '&' + type)
    const api2 = (url2 + "?"+ serviceKey + "&" + datasize + "&inqryDiv=1&" + date + '&' + departname + '&' + type)
    let dataSet = []

    getData = async (api) => {
        const array = api.split('||')       
        await axios.all([axios.get(array[0]), axios.get(array[1]), axios.get(array[2])])
        .then(axios.spread((result, result1, result2) => {
            if (result.data.response.body.totalCount != 0) {
                for(let i = 0 ; i < result.data.response.body.items.length ; i++){
                    dataSet.push(result.data.response.body.items[i])
                }                
            }
            if (result1.data.response.body.totalCount != 0) {
                for(let i = 0 ; i < result1.data.response.body.items.length ; i++){
                    dataSet.push(result1.data.response.body.items[i])
                }                
            }
            if (result2.data.response.body.totalCount != 0) {
                for(let i = 0 ; i < result2.data.response.body.items.length ; i++){
                    dataSet.push(result2.data.response.body.items[i])
                }                
            }
            dataSet.sort((a, b) => {
                return a.bidNtceDt > b.bidNtceDt ? -1 :  a.bidNtceDt < b.bidNtceDt ? 1 : 0
            })
            res.send(dataSet)
       }))
    }
    getData(api + '||' + api1 + '||' + api2)
})

const Data = require('./dataModel')
const mongoose = require('mongoose')
const url = process.env.MONGO_URL

mongoose.connect(url).then(() => {
        console.log("MONGO CONNECT")
    }).catch((err) => {
    console.log("MONGO ERR", err)
    })

app.get('/test', (req, res) => {
    Data.find({}).exec((err, data) => {
        if(err) {
            res.send('error')
        } else {
            console.log(data)
            res.json(data)
        }
    })
})