// import { ThirdwebSDK } from "@thirdweb-dev/sdk";
// import { NFT } from "@thirdweb-dev/react";
// import { LOYALTY_CARD_CONTRACT_ADDRESS } from "../../const/addresses";

// export default async function updateLoyaltyCard(
//     nft: NFT,
//     loyaltyCardPoints: number,
//     nftTokenId: string
// ) {
//     try {
//         if (!process.env.PRIVATE_KEY) {
//             console.error("PRIVATE_KEY is missing or undefined");
//             return;
//         }

//         console.log("Private Key", process.env.PRIVATE_KEY)
        
//         // get instance of SDK w/ private key and chain
//         const sdk = ThirdwebSDK.fromPrivateKey(
//             process.env.PRIVATE_KEY as string,
//             "base-goerli",
//             {
//                  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
//                  //secretKey: process.env.SECRET_KEY as string,
//             }
//         );
//         console.log('PRIVATE_KEY:', process.env.PRIVATE_KEY);

//         console.log("SDK created");

//         const loyaltyContract = await sdk.getContract(LOYALTY_CARD_CONTRACT_ADDRESS);
//         // update metadata - could be cool to make nfts dynamic, change images somehow as points rise

//         // Mondays = double points, friday half points
//         const today = new Date().getDay();
//         const isSunday = today === 0;
//         const isMonday = today === 1;
//         const isTuesday = today === 2;
//         const isWednesday = today === 3;
//         const isThursday = today === 4;
//         const isFriday = today === 5;
//         const isSaturday = today === 6;
        
        
//         let pointsToAdd = 1;
//         if (isMonday) {
//             pointsToAdd = 20;
//         }   else if (isFriday) {
//             pointsToAdd = 5;
//         }

//         console.log("Day of the week:", today); 
//         console.log("Points to Add:", pointsToAdd);
//         //console.log("Final Metadata:", metadata);

//         const metadata = {
//             ...nft.metadata,
//             attributes: [
//                 {
//                     trait_type: "points",
//                     value: loyaltyCardPoints + pointsToAdd
//                 },
//             ],
//         };
//         // can add in logic to make user complete some task to claim points
//         if( true ) {
//             const updateNFT = await loyaltyContract.erc721.update(nftTokenId, metadata);
//             console.log("Day of the week:", today); 

//             console.log(nftTokenId)
//             console.log(metadata)
//             alert("Loyalty card updated");
//         } else {
//             alert("Loyalty card not updated");
//             return { error: "You don't have enough points to update your loyalty card." };
//         }

//         return { success: "Loyalty card updated!" };
//     } catch (error) {
//         console.error(error);
//     }
// };