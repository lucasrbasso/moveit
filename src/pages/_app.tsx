/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import '../styles/global.css';

import React from 'react';

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;
