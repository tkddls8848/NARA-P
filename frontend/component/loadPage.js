import SearchBar from './searchBar'

const backAddress = process.env.BACK_URL
const frontAddress = process.env.FRONT_URL

const Load = () => {
    return (
        <div>
            <SearchBar address={frontAddress}></SearchBar>
            <div>Loading</div>
        </div>

    )
}
export default Load