const express = require('express')
const axios = require('axios');
const urlencode = require('urlencode');
const app = express()
const dotenv = require('dotenv').config({ path: '../.env' })
const cors = require('cors')

app.use(express.json()); 
app.use(cors())
app.use(express.urlencoded( {extended : true } ));
app.listen(process.env.PORT, () => {
    console.log("SERVER ON")
})

app.get('/sajeon', (req, res) => {
    const url = 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoThng'
    const url1 = 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoCnstwk'
    const url2 = 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoServc'
    const serviceKey = process.env.SERVICE_KEY
    const datasize = 'numOfRows=20&pageNo=1'
    const date = 'inqryBgnDt=202106150000&inqryEndDt=202106182359'
    const departname = 'rlDminsttNm=%EA%B5%AD%EB%AF%BC%EA%B1%B4%EA%B0%95%EB%B3%B4%ED%97%98%EA%B3%B5%EB%8B%A8'
    /*
    const departname = 'rlDminsttNm=' + urlencode(req.param.departname)
    */
    const type = 'type=json'

    /*건보*/
    const api = (url + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname + '&' + type)
    const api1 = (url1 + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname + '&' + type)
    const api2 = (url2 + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname + '&' + type)
    let dataSet = []
    getData = async (api) => {
        const array = api.split('||')       
        await axios.all([axios.get(array[0]), axios.get(array[1]), axios.get(array[2])])
        .then(axios.spread((result, result1, result2) => {
            dataSet.push(result.data.response.body)
            dataSet.push(result1.data.response.body)
            dataSet.push(result2.data.response.body)
            res.json({'sajeon' : dataSet})
       }))
    }
    getData(api + '||' + api1 + '||' + api2)
})

app.get('/bone', (req, res) => {
    const url = 'http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoCnstwkPPSSrch'
    const url1 = 'http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoServcPPSSrch'
    const url2 = 'http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoThngPPSSrch'
     
    const serviceKey = process.env.SERVICE_KEY
    const datasize = 'numOfRows=20&pageNo=1&inqryDiv=1'
    const date = 'inqryBgnDt=202106150000&inqryEndDt=202106180000'
    const departname = 'dminsttNm=%EA%B5%AD%EB%AF%BC%EA%B1%B4%EA%B0%95%EB%B3%B4%ED%97%98%EA%B3%B5%EB%8B%A8&type=json'
  
    /*건보*/
    const api = (url + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname)
    const api1 = (url1 + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname)
    const api2 = (url2 + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname)

    let dataSet = []
    getData = async (api) => {
        const array = api.split("||")
        await axios.all([axios.get(array[0]), axios.get(array[1]), axios.get(array[2])])
        .then(
            axios.spread((result, result1, result2) => {
                dataSet.push(result.data.response.body)
                dataSet.push(result1.data.response.body)
                dataSet.push(result2.data.response.body)
                res.json({'bone': dataSet})
            })
        )
    }
    getData(api + "||" + api1 + "||" + api2)
})

app.get('/test', (req, res) => {
    res.json({'TEST': 'this is test'})
})