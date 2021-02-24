/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import '../styles/global.css';

import { ChallengesProvider } from '../contexts/ChallengesContext';

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;
