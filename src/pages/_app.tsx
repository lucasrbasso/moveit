/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect } from 'react';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function () {
                navigator.serviceWorker.register('/sw.js').then(
                    function (registration) {
                        console.log(
                            'Service Worker registration successful with scope: ',
                            registration.scope,
                        );
                    },
                    function (err) {
                        console.log(
                            'Service Worker registration failed: ',
                            err,
                        );
                    },
                );
            });
        }
    }, []);

    return <Component {...pageProps} />;
}

export default MyApp;
