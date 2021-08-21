const Web3 = require("web3");

(async () => {
  const web3 = new Web3(
    "https://mainnet.infura.io/v3/858f183c2d0b4483bc6c44cfbd9883bf"
  );

  // address of ERC721 NFT
  const nftAddress = "0x06012c8cf97bead5deae237070f9587f8e7a266d";
  // ERC721 abi to interact with contract
  const nftAbi = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  // interact with contract
  const nftContract = new web3.eth.Contract(nftAbi, nftAddress);

  // generate call data to get owner of token #1
  const callData1 = nftContract.methods["ownerOf"](1).encodeABI();
  // call the blockchain to get the owner of token #1
  const ownerOfToken1 = await web3.eth.call({
    to: nftAddress,
    data: callData1,
  });
  console.log(ownerOfToken1);

  // generate call data to get owner of token #2
  const callData2 = nftContract.methods["ownerOf"](2).encodeABI();
  // call the blockchain to get the owner of token #2
  const ownerOfToken2 = await web3.eth.call({
    to: nftAddress,
    data: callData2,
  });
  console.log(ownerOfToken2);

  // generate call data to get owner of token #3
  const callData3 = nftContract.methods["ownerOf"](3).encodeABI();
  // call the blockchain to get the owner of token #3
  const ownerOfToken3 = await web3.eth.call({
    to: nftAddress,
    data: callData3,
  });
  console.log(ownerOfToken3);
})();
