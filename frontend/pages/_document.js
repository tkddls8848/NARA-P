import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument  extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta name="google-site-verification" content="37Qt-RHCauaYHeSXVDdfmVyj5xjT2GlCnpmhSumhPTQ" />
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