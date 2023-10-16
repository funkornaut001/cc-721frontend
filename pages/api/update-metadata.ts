import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { LOYALTY_CARD_CONTRACT_ADDRESS } from "../../const/addresses";

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    try {
        const { nftTokenId, metadata } = req.body;

        const sdk = ThirdwebSDK.fromPrivateKey(
            process.env.PRIVATE_KEY as string,
            "base-goerli",
            {
                secretKey: process.env.SECRET_KEY as string,
            }
        );

        const loyaltyContract = await sdk.getContract(LOYALTY_CARD_CONTRACT_ADDRESS);
        
        await loyaltyContract.erc721.update(nftTokenId, metadata);

        res.status(200).json({ success: "Loyalty card updated!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
