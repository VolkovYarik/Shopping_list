import '../styles/globals.scss';
import { Provider } from "../components/Context";

function MyApp({ Component, pageProps }) {

   return (
      <Provider>
         <Component {...pageProps} />
      </Provider>
   );
}

export default MyApp;
