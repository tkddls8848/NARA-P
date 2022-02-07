import '../styles/globals.css'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Footer from '../component/footer'
import Header from '../component/header'
import Load from '../component/loadPage'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import MomentUtils from '@date-io/moment'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const routeStart = () => {
      setLoading(true)
    }
    const routeEnd = () => {
      setLoading(false)
    }
    router.events.on('routeChangeStart', routeStart)
    router.events.on('routeChangeComplete', routeEnd)

    return () => {
      router.events.off('routeChangeStart', routeStart)
      router.events.off('routeChangeComplete', routeEnd)
    }
  }, [])

  return (
  <>
    <Head>
      <title>나라장터 검색 웹 페이지</title>
    </Head>    
    <LocalizationProvider dateAdapter={MomentUtils}>
      <Header></Header>
      {loading ? <Load></Load> : <Component {...pageProps}/>}
      <Footer></Footer> 
    </LocalizationProvider>
  </>
  )
}

export default MyApp
