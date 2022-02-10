import '../styles/globals.css'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '../component/staticComponet/header'
import Footer from '../component/staticComponet/footer'
import Load from '../component/loadPage'

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
  }, [router])

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
