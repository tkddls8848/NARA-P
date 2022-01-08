import '../styles/globals.css'
import Footer from '../component/footer'
import Header from '../component/header'
import { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
  })

  return (
    <>
      <Header></Header>
      {loading ? (<Component {...pageProps}/>) : (<div>LOAD</div>)}      
      <Footer></Footer>
    </>
  )


}

export default MyApp
