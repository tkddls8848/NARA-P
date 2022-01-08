import { Button, Link } from "@mui/material"
import { useState } from "react"

const SearchBar = ({address, type}) => {
    const host = address
    const [name, setName] = useState('initialState')    
    const onChange = (e) => {
        setName(e.target.value)
    }
    const task = type

    return (
        <div>
            <input id="part" onChange={onChange} key='input'></input>
            <Button key='button'><Link href={host + '/task/' + task + '/' + name}>Search</Link></Button>
        </div>
    )
}

export default SearchBar