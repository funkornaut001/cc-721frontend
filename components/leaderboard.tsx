import { useNFTs, useContract } from "@thirdweb-dev/react";
import { LOYALTY_CARD_CONTRACT_ADDRESS } from "../const/addresses";
import styles from "../styles/Home.module.css";

//Define types
/**
 * This is what is returned from useNFTs
 * 
 * {
    metadata: {
      id: string;
      uri: string;
      name?: string | number | undefined;
      description?: string | null | undefined;
      image?: string | null | undefined;
      external_url?: string | null | undefined;
      animation_url?: string | null | undefined;
      background_color?: string | undefined;
      properties?: {
          [x: string]: unknown;
      } | {
          [x: string]: unknown;
      }[] | undefined;
  };
    owner: string;
    type: "ERC1155" | "ERC721";
    supply: number;
    quantityOwned?: number; // Only available for ERC1155
}[];
 */
type NFTProperties = {
    points?: number;
    [key: string]: any;
  };
  
  type NFTMetadata = {
    id: string;
    uri: string;
    name?: string;
    description?: string;
    image?: string;
    attributes?: Array<{ trait_type: string; value: number }>;
  };
  
  type NFTData = {
    metadata: NFTMetadata;
    owner: string;
    type: "ERC1155" | "ERC721";
    supply: number;
  };

function Leaderboard() {
  const { contract } = useContract(LOYALTY_CARD_CONTRACT_ADDRESS);
  const { data, isLoading, error } = useNFTs(
    contract
    // ,
    // {
    //     //Only Return the top 10 NFTs
    //     count: 50,
    //     start: 0,
    // }
    );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

// type-casting
const nfts = data?.map((nft: any) => ({
    metadata: nft.metadata,
    owner: nft.owner,
    type: nft.type,
    supply: Number(nft.supply),
  })) || [];

// grab owner & points properties from each NFT
 const loaderboardData = nfts.map((entry) => {
    console.log(entry.metadata.attributes); // Add this log

    const pointsAttribute = entry.metadata.attributes?.find(attr => attr.trait_type === "points");

    const points = pointsAttribute?.value || 0;
    return {
      owner: entry.owner,
      points: points,
    };
 });

 const sortedData = loaderboardData.sort((a, b) => b.points - a.points);

  return (
    <div className={styles.leaderboardCard}>
      <h2 className={styles.leaderboardTitle}>Leaderboard</h2>
      <ul className={styles.leaderboardList}>
        {sortedData.map((entry, index) => (
          <li key={index} className={styles.leaderboardEntry}>
            {entry.owner}: {entry.points || 0} points
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
