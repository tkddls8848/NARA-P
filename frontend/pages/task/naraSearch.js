import SearchBar from '../component/searchBar'

const frontAddress = process.env.FRONT_URL

export default  function Index() {  
  return (
    <div>
      <SearchBar address={frontAddress}></SearchBar>
      <div>검색을 통해 공고를 확인 할 수 있습니다.asdf</div>
    </div>
  )
}
