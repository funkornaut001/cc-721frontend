~~Points are updating correctly~~ 
Adding in leaderboard
    Originally tried fetching data directly from chain w/api 
    This brought in risk of exposing private keys accidently
    And thirdweb useNFTs hook has all the data I needed.
    ~~Have owners of NFT fetched in leaderboard-data~~
    ~~Need to grab metadata/points info for each owner/NFT~~
    Shorten address so they fit in leaderboard
    Once I have profiles, render the users name with the points

Profiles
    Need to set up profiles for users.
    User should login and the wallet they create will be tied to a profile with email
    
    Things to consider
    Privacy and Permissions:
        Consider which parts of a user's profile should be public and which should be private. Implement access controls accordingly.
        Allow users to choose privacy settings for their profiles.