import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css'
import React from 'react'

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default MyApp
