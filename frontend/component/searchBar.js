import { Box, Button, TextField, Radio, RadioGroup , FormControlLabel, FormControl } from "@mui/material"
import { DateRangePicker } from "@mui/lab"
import { useState } from "react"
import { useRouter } from "next/router"

const SearchBar = ({address}) => {
    const host = address
    const [departName, setDepartName] = useState('NONE')    
    const [radioType, setRadioType] = useState('sajeon')
    const [dateRange, setDateRange] = useState([null, null])
    const router = useRouter()

    const ChangeRadio = (e) => {
        setRadioType(e.target.value)
    }
    const ChangeInput = (e) => {
        setDepartName(e.target.value)
    }
    const ButtonClick = (e) => {
        console.log("beginDate", dateRange[0].format('YYYYMMDD0000'))
        console.log("endDate", dateRange[1].format('YYYYMMDD0000'))
        const beginDate = dateRange[0].format('YYYYMMDD0000')
        const endDate = dateRange[1].format('YYYYMMDD0000')
        router.push(host + '/task/' + radioType + '/' + departName + '?' + 'beginDate' + '=' + beginDate + '&' + 'endDate' + '=' + endDate)
    }

    return (
        <div style={{padding: 10}}>
            <FormControl>
                <RadioGroup row name="row-radiobuttons" defaultValue="sajeon" onChange={ChangeRadio}>
                    <FormControlLabel value="sajeon" control={<Radio size="small"/>} label="사전공고" />
                    <FormControlLabel value="bone" control={<Radio size="small"/>} label="본공고" />
                </RadioGroup>
            </FormControl>
            <TextField label="Search" variant="standard" id="part" onChange={ChangeInput} key='input'></TextField>
            <DateRangePicker
            startText="beginDate"
            endText="endDate"
            value={dateRange}            
            onChange={(newValue) => setDateRange(newValue)}
            renderInput={(startProps, endProps) => (
                <>
                    <TextField {...startProps}/>
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                </>
            )}
            />
            <Button key='button' variant="outlined" onClick={ButtonClick}>Search</Button>
            </div>
    )
}

export default SearchBar