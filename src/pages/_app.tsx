import { Provider } from "react-redux"; // Redux provider to make the Redux store available to the app
import { store } from "../app/store"; // Import the Redux store
import "../styles/globals.css"; // Import global CSS styles
import type { AppProps } from "next/app"; // Type for AppProps from Next.js
import { SessionProvider } from "next-auth/react"; // NextAuth provider to handle session management

// Define the main App component
function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Wrap the app with SessionProvider to handle authentication sessions
    <SessionProvider session={pageProps.session}>
      {/* Wrap the app with Redux Provider to make the Redux store available */}
      <Provider store={store}>
        {/* Render the current page component with its props */}
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

// Export the App component as the default export
export default MyApp;
