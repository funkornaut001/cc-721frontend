import { NFT, ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";
import { LOYALTY_CARD_CONTRACT_ADDRESS } from "../const/addresses";
//import updateLoyaltyCard from "../pages/api/update-points";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

type NFTProps = {
    nft: NFT;
    tokenID: string;
};

export const NFTCard = ({ nft, tokenID }: NFTProps) => {
    const {
        contract
    } = useContract(LOYALTY_CARD_CONTRACT_ADDRESS);
    const {
        data: loyaltyCard,
        isLoading: loadingLoyaltyCard,
    } = useNFT(contract, tokenID);
    console.log(loyaltyCard?.metadata.name);
    console.log(loyaltyCard?.metadata.image);

    // Call server side to update nft metadata
    const handleUpdatePoints = async () => {
        const updatedMetadata = {
            ...nft.metadata,
            attributes: [
                {
                    trait_type: "points",
                    value: loyaltyCardPoints + 10
                },
            ],
        };
    
        const response = await fetch("/api/update-metadata", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nftTokenId: tokenID,
                metadata: updatedMetadata
            })
        });
    
        const data = await response.json();
        if (data.success) {
            alert("Loyalty card updated!");
        } else {
            alert("Error updating loyalty card.");
        }
    }
    


    // state variable for points set to 0 by default
    let [loyaltyCardPoints, setLoyaltyCardPoints] = useState(0);
    console.log(loyaltyCardPoints);
    // update and set points on NFT metadata
    useEffect(() => {
        // @ts-ignore
        setLoyaltyCardPoints(loyaltyCard?.metadata.attributes[0].value);
        console.log(loyaltyCardPoints);
    }, [loyaltyCard]);

    return (
        <div className={styles.loyaltyCard}>
            <ThirdwebNftMedia
                metadata={nft.metadata}
                height="100%"
                width="100%"
            />
            {nft.metadata.attributes && (
                <>
                    {/* @ts-ignore */}
                    {nft.metadata.attributes.map((attribute, index) => (
                        <div key={index} className={styles.loyaltyCardPoints}>
                            {attribute.trait_type}: {attribute.value}
                        </div>
                    ))}
                </>
            )}
            <button
                onClick={async () => {
                    await handleUpdatePoints();
                    //Refresh loyalty card points
                    // @ts-ignore
                    await setLoyaltyCardPoints(loyaltyCard?.metadata.attributes[0].value);
                }}
                className={styles.updatePointsBtn}
            >Update points</button>
        </div>
    );
};