import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css'
import React from 'react'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Clumsy View</title>
                <meta name="description" content="Clumsy NFT Wallet Viewer. Search any Cardano Address, ADA Handle, or Stake Key to view your Clumsy NFTs!" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp

