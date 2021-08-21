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

  // generate call data to get owner of token #2
  const callData2 = nftContract.methods["ownerOf"](2).encodeABI();

  // generate call data to get owner of token #3
  const callData3 = nftContract.methods["ownerOf"](3).encodeABI();

  // ----------------------------------------------------------------------------------
  // multicall
  // ----------------------------------------------------------------------------------

  // address of multicall contract
  const multicallAddress = "0xeefba1e63905ef1d7acba5a8513c70307c1ce441"; // ETH mainnet
  // multicall abi to interact with contract
  const multicallAbi = [
    {
      constant: false,
      inputs: [
        {
          components: [
            { name: "target", type: "address" },
            { name: "callData", type: "bytes" },
          ],
          name: "calls",
          type: "tuple[]",
        },
      ],
      name: "aggregate",
      outputs: [
        { name: "blockNumber", type: "uint256" },
        { name: "returnData", type: "bytes[]" },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  // interact with multicall contract
  const multicallContract = new web3.eth.Contract(
    multicallAbi,
    multicallAddress
  );

  // provide args to multicall contract.
  // this will allow multicall to know who who and what to call
  const multicallArgs = [
    {
      target: nftAddress,
      callData: callData1,
    },
    {
      target: nftAddress,
      callData: callData2,
    },
    {
      target: nftAddress,
      callData: callData3,
    },
  ];

  // call
  const ownerOfs = await multicallContract.methods["aggregate"](
    multicallArgs
  ).call();
  console.log(ownerOfs);
})();
