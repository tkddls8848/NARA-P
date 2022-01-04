const express = require('express')
const axios = require('axios')
const app = express()
const PORT = 5000

app.listen(PORT, () => {
    console.log("SERVER ON")
})
app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));

app.get('/sajeon', (req, res) => {
    const url = 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoThng'
    const url1 = 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoCnstwk'
    const url2 = 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getInsttAcctoThngListInfoServc'
    const serviceKey = 'serviceKey=93KBnFsKzHe%2FGK1nzHq0z04qOkgHolPfnWuGBvSoxMuJ3XW4%2F6FguYCmerWsd2Sf6tV4supaKu9y5ng2Nf7KhA%3D%3D'
    const datasize = 'numOfRows=20&pageNo=1'
    const date = 'inqryBgnDt=202112200000&inqryEndDt=202112312359'
    const departname = 'rlDminsttNm=%EA%B5%AD%EB%AF%BC%EA%B1%B4%EA%B0%95%EB%B3%B4%ED%97%98%EA%B3%B5%EB%8B%A8&type=json'
    const departname1 = 'rlDminsttNm=%EA%B1%B4%EA%B0%95%EB%B3%B4%ED%97%98%EC%8B%AC%EC%82%AC%ED%8F%89%EA%B0%80%EC%9B%90&type=json'
  
    /*건보 물품*/
    const api = (url + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname)

    getData = async (api) => {
        await axios.get(api).then((result) => {
                res.json(result.data.response.body)
        })
    }
    getData(api)
})

app.get('/bone', (req, res) => {
    const url = 'http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfoCnstwkPPSSrch'

    const serviceKey = 'serviceKey=93KBnFsKzHe%2FGK1nzHq0z04qOkgHolPfnWuGBvSoxMuJ3XW4%2F6FguYCmerWsd2Sf6tV4supaKu9y5ng2Nf7KhA%3D%3D'
    const datasize = 'numOfRows=20&pageNo=1&inqryDiv=1'
    const date = 'inqryBgnDt=202110010000&inqryEndDt=202110212359'
    const departname = 'dminsttNm=%EA%B5%AD%EB%AF%BC%EA%B1%B4%EA%B0%95%EB%B3%B4%ED%97%98%EA%B3%B5%EB%8B%A8&type=json'
  
    /*건보 물품*/
    const api = (url + "?"+ serviceKey + "&" + datasize + "&" + date + '&' + departname)
    let dataSet = []

    getData = async (api) => {
        await axios.get(api).then((result) => {
                dataSet.push(result.data.response.body)
                res.json(dataSet)
        })
    }
    getData(api)
})