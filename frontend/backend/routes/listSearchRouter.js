const router = require('express').Router()
const axios = require('axios')
const moment = require('moment')
const serviceKey = process.env.SERVICE_KEY
const type = 'type=json'
const yesterday = moment().subtract(100, 'years').format('YYYYMMDD0000')
const today = moment().format('YYYYMMDD0000')

router.get("/", async (req, res) => {
    const url = 'http://apis.data.go.kr/1230000/UsrInfoService/getDminsttInfo'
    const datasize = 'numOfRows=999&pageNo=' + '1'
    const api = (url + "?"+ datasize + "&" + serviceKey + "&" + "dminsttNm=" + encodeURIComponent("사회보장정보원") +
    "&" + "inqryBgnDt="+ yesterday + "&"+ "inqryEndDt=" + today + "&" +"inqryDiv=1" + '&' + type)
    let dataSet = []
    let dataTotalSize = 0

    await axios.get(api)
    .then((results) => {
        dataTotalSize = results.data.response.body.totalCount
        results.data.response.body.items.map((item) => {
            console.log(item.dminsttNm)
            dataSet.push(item.dminsttNm + '||' +item.dminsttCd)
        })
    }).catch((err) => {
        console.log("ERROR", err)
    })
    return res.json(dataSet)
})

module.exports = router