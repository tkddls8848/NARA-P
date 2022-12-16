import '../styles/globals.css'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from './component/staticComponent/header'
import Footer from './component/staticComponent/footer'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { checkCookies } from 'cookies-next'

function MyApp({ Component, pageProps }) {
  
  const rootRouter = useRouter()
  const check = checkCookies('userCookie')

  useEffect(() => {
    const routeStart = () => {
      NProgress.start()
    }
    const routeEnd = () => {
      NProgress.done()
    }
    rootRouter.events.on('routeChangeStart', routeStart)
    rootRouter.events.on('routeChangeComplete', routeEnd)

    return () => {
      rootRouter.events.off('routeChangeStart', routeStart)
      rootRouter.events.off('routeChangeComplete', routeEnd)
    }
  }, [rootRouter])

  return (
  <>
    <Head>
      <title>나라장터 검색 웹 페이지</title>
    </Head>    
      <Header router={rootRouter} checkcookies={check}/>
      <Component {...pageProps}/>
      <Footer/>
  </>
  )
}

export default MyApp
