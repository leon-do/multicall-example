
# NFT Hack: How to Get The Owner of Multiple ERC-721 Tokens
Get the owner of batch for ERC-721 tokens by using Multicall


## Question
Is there a way to get the owner of multiple ERC-721 tokens?

## Overview
Most NFTs follow the ERC-721 standard, which must implement certain functions such as Transfer, balanceOf, ownerOf etc. In this example we'll focus on ownerOf which returns the owner (address) of the NFT.

```solidity
// solidity
function ownerOf(uint256 _tokenId) external view returns (address);
```

Each _tokenId has an owner. For example, token id 1 belongs to address 0xdD4c825203f97984e7867F11eeCc813A036089D1.

## Problem
The problem is you can only get one owner at a time. The diagram below is how a user gets the owner of each token. The user will have to send three separate requests to the blockchain to get the balance of token 1, 2 and 3.
This is ok if you have a few tokens but what if there are over 2 million tokens? Not efficient.
In short, many lines under Network Request = bad;

![1_0SmuZSpqfiSoxd8V8S50NQ](https://user-images.githubusercontent.com/19412160/130330340-c246b9cb-f666-475b-88a9-9e3fa10879a8.png)


## Solution: Multicall
Multicall aggregates results from multiple contract constant function calls. 

Source: https://github.com/makerdao/multicall

Multicall is a smart contract that calls your NFT contract. What makes this efficient is you only need one network request to the blockchain. The Multicall contract will call all of the functions in a loop and return all of the data.

![1_XAewrl_BLexvFo_fAI6TrA](https://user-images.githubusercontent.com/19412160/130330348-7b84bfc5-99cd-4ef6-b122-938d1793ee40.png)

## Conclusion
Using Multicall is a clever way to get data without multiple network requests. This is especially useful for getting the ownerOf a list of NFTs or functions that only returns one value.
