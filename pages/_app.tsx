import type { AppProps } from "next/app";
import { ThirdwebProvider, localWallet, coinbaseWallet, metamaskWallet, paperWallet, smartWallet } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { NavBar } from "../components/hamburger";
// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "base-goerli";

export const smartWalletConfig = smartWallet(localWallet(), {
  factoryAddress: "0x7f7Dd55bB48E8f4C64e9304b3Da7A423Ef5Ab5ec",
  gasless: true,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId= {process.env.NEXT_PUBLIC_CLIENT_ID}
      activeChain={activeChain}
      supportedWallets={[
        smartWalletConfig
          //   metamaskWallet(),
          //   coinbaseWallet(),
      ]}
    >
      <NavBar />
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
