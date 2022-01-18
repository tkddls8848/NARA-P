import '../styles/globals.css'
import Footer from '../component/footer'
import Header from '../component/header'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Load from '../component/loadPage'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const routeStart = (url, { shallow }) => {
      setLoading(true)
    }
    const routeEnd = (url, { shallow }) => {
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
      <Header></Header>
      {loading ? <Load></Load> : <Component {...pageProps}/>}
      <Footer></Footer> 
    </>
  )
}

export default MyApp
