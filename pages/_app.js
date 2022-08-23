import Layout from '../components/layout/Layout'
import '../styles/globals.css'
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  return (
    <>
        <Head>
            <title>NextJs Meetup</title>
            <meta name='description' content='Browser a huge list of highly active NextJs Meetups!'></meta>
        </Head>
        <Layout>
            <Component {...pageProps} />
        </Layout>
        </>
    

  )
}

export default MyApp
