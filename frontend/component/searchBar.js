import { Button, Link } from "@mui/material"
import { useState } from "react"
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

const SearchBar = ({address, type}) => {
    const host = address
    const [name, setName] = useState('initialState')    
    const onChange = (e) => {
        console.log('searchBar', e.target.value)
        setName(e.target.value)
    }
    const task = type

    return (
        <div style={{padding: 10}}>
            <FormControl>
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                    <FormControlLabel value="사전공고" control={<Radio size="small"/>} label="사전공고" />
                    <FormControlLabel value="본공고" control={<Radio size="small"/>} label="본공고" />
                </RadioGroup>
            </FormControl>
            <input id="part" onChange={onChange} key='input'></input>
            <Button key='button' variant="outlined"><Link href={host + '/task/' + task + '/' + name}>Search</Link></Button>
        </div>
    )
}

export default SearchBar