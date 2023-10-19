import { ConnectWallet, Web3Button, useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { LOYALTY_CARD_CONTRACT_ADDRESS } from "../const/addresses";
import { NFTCard } from "../components/nft";
import Leaderboard from "../components/leaderboard";

const Home: NextPage = () => {
  const address = useAddress();
  const {
    contract
  } = useContract(LOYALTY_CARD_CONTRACT_ADDRESS);
  
  const {
    data: nfts,
    isLoading: nftsLoading,
  } = useOwnedNFTs(contract, address);
  // function to claim NFT with signed payload from generate sig api
  const claimLoyaltyCard = async () => {
    try {

      const signedPayloadReq = await fetch("/api/generate-sig", {
        method: "POST",
        body: JSON.stringify({
          address,
        }),
      });
      
      console.log("Got response from server");
      const json =  await signedPayloadReq.json();

      if (!signedPayloadReq.ok) {
        alert(json.error);
      }

      const signedPayload = json.signedPayload;

      const loyaltyCard = await contract?.erc721.signature.mint(signedPayload);
      alert("Loyalty Card cliamed!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.loginCard}>
          <ConnectWallet 
            modalSize="wide"
            btnTitle="Login"
          />
          {/* connecting wallet
            checks for address
              if not signed in prompt to sign in
            checks if it owns an NFT
              if not prompt them to claim NFT via sig
            if wallet has NFTs loop through and display them
             */ }
          {address ? (
            <>
              {!nftsLoading && (
                nfts && nfts.length > 0 ? (
                  nfts.map((nft) => (
                    <NFTCard
                      key={nft.metadata.id}
                      nft={nft}
                      tokenID={nft.metadata.id}
                    />
                  ))
                ) : (
                  <>
                    <p>No Loyalty Card</p>
                    <Web3Button
                      contractAddress={LOYALTY_CARD_CONTRACT_ADDRESS}
                      action={() => claimLoyaltyCard()}
                    >Claim Loyalty Card</Web3Button>
                  </>
                  
                )
              )}
            </>
          ) : (
            <p>Login to view loyalty card.</p>
          )}
        </div>
      </div>
      <Leaderboard />
    </main>
  );
};

export default Home;
