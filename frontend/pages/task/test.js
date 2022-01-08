import SearchBar from '../../component/searchBar'

export default function Test() {
  const address = 'http://localhost:3000'
  const type = 'sajeon'
  console.log(address, type)
  return (
    <div>
      <SearchBar address={address} type={type}></SearchBar>
    </div>
  )
}
