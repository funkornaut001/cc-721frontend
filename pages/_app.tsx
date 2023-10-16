import type { AppProps } from "next/app";
import { ThirdwebProvider, coinbaseWallet, metamaskWallet, paperWallet, smartWallet } from "@thirdweb-dev/react";
import "../styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "base-goerli";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId= {process.env.NEXT_PUBLIC_CLIENT_ID}
      activeChain={activeChain}
      supportedWallets={[
        smartWallet({
          factoryAddress: "0x7f7Dd55bB48E8f4C64e9304b3Da7A423Ef5Ab5ec",
          gasless: true,
          personalWallets: [
            paperWallet({
              paperClientId: "04c3e31c-8c02-4e67-9f1e-f4bd4ff12df0",
            }),
            metamaskWallet(),
            coinbaseWallet(),
          ]
        })
      ]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
