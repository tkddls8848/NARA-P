import { Button, TextField } from "@mui/material"
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { useState } from "react"
import { useRouter } from "next/router"

const SearchBar = ({address}) => {
    const host = address
    const [departName, setDepartName] = useState('initialState')    
    const [radioType, setRadioType] = useState('sajeon')
    const router = useRouter()

    const ChangeRadio = (e) => {
        setRadioType(e.target.value)
    }
    const ChangeInput = (e) => {
        setDepartName(e.target.value)
    }
    const ButtonClick = (e) => {
        router.push(host + '/task/' + radioType + '/' + departName)
    }

    return (
        <div style={{padding: 10}}>
            <FormControl>
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={ChangeRadio}>
                    <FormControlLabel value="sajeon" control={<Radio size="small"/>} label="사전공고" />
                    <FormControlLabel value="bone" control={<Radio size="small"/>} label="본공고" />
                </RadioGroup>
            </FormControl>
            <TextField label="Search" variant="standard" id="part" onChange={ChangeInput} key='input'></TextField>
            <Button key='button' variant="outlined" onClick={ButtonClick}>Search</Button>
        </div>
    )
}

export default SearchBar