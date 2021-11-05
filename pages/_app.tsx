import '../styles/globals.scss';
import { Provider, StorageObserver } from "components";
import React from "react";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {

   return (
      <Provider>
         <StorageObserver />
         <Component {...pageProps} />
      </Provider>
   );
}

export default App;
