import '../styles/globals.css'

/**
 * Internal Next.js wrapper for the clientside application.
 * 
 * @param {*} pageProps - Props for the application.
 * @returns The entire application as a component.
 */
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
