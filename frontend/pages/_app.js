import '../styles/globals.css'
import Footer from '../component/footer'
import Header from '../component/header'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header></Header>
      <Component {...pageProps} />
      <Footer></Footer>
    </>
  )


}

export default MyApp
