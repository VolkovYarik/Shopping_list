import '../styles/globals.scss';
import { Provider } from "../components/Context";
import { StorageObserver } from "components/StorageObserver";

function MyApp({ Component, pageProps }) {

   return (
      <Provider>
         <StorageObserver />
         <Component {...pageProps} />
      </Provider>
   );
}

export default MyApp;
