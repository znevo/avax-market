const hre = require("hardhat");

async function main() {
  const lzEndpointFuji = "0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706";
  const lzChainIdRinkeby = 10001;
  const newOwner = "0x2838b365D1646D693Af11A81Ac644809C4D97a16";
  const marketAddr = "0x6Be365EB70Ba957891e07b8BFCdA474d8946C3c0";
  const nftAddr = "0xF558474DBdff7EE9Dea7C327fB68074B02390b78";

  const marketplace = await hre.ethers.getContractAt(
    "Marketplace",
    marketAddr
  );

  const changeTx = await marketplace.changeNFTOwner(
    lzChainIdRinkeby,
    nftAddr,
    newOwner,
    0,
    {
      gasLimit: 1000000
    }
  );

  const receipt = await changeTx.wait();

  console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
