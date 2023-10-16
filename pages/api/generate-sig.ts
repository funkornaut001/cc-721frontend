import { PayloadToSign721withQuantity, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { LOYALTY_CARD_CONTRACT_ADDRESS } from "../../const/addresses";

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    try {
        // grabs wallet that's connected
        const { address } = JSON.parse(req.body);
        // looks for private key
        if (!process.env.PRIVATE_KEY) {
            throw new Error(
                "You're missing WALLET_PRIVATE_KEY in your .env.local file."
            );
        };
        // get instance of SDK w/ private key and chain
        const sdk = ThirdwebSDK.fromPrivateKey(
            process.env.PRIVATE_KEY as string,
            "base-goerli",
            {
                secretKey: process.env.SECRET_KEY as string,
            }
        );

        console.log("SDK created");
        // get instance of contract
        const loyaltyContract =  await sdk.getContract(LOYALTY_CARD_CONTRACT_ADDRESS);

        const payload: PayloadToSign721withQuantity = {
            to: address,
            // @note can update metadata with whatever properties we want
            metadata: {
                name: "Loyalty Card",
                description: `This is a loyalty card for ${address}`,
                image: "ipfs://QmRJHhWoF4YhVXX3FNSk2E26u2HfW3tg2MVyEvivV1uKXR/AB-Category-Munich-Helles-Lager-Photo.webp",
                attributes: [
                    {
                        trait_type: "points",
                        value: 0
                    },
                ],
            },
        };

        console.log("Creating signature");
        // generate sig to claim NFT with above metadata
        const signedPayload = await loyaltyContract.erc721.signature.generate(payload);
        console.log("Signature created");
        // return signed payload 
        return res.status(200).json({ 
            signedPayload: JSON.parse(JSON.stringify(signedPayload)),
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};