import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument  extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel='icon' href='/naraapi.jpg'></link>
                    <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
                </Head>
                <body>
                    <Main></Main>
                    <NextScript></NextScript>
                </body>
            </Html>
        )
    }
}

export default MyDocument