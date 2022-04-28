const hre = require("hardhat");

async function main() {
  const lzEndpointRinkeby = "0x79a63d6d8BBD5c6dfc774dA79bCcD948EAcb53FA";

  const omniNFT = await hre.ethers.getContractAt(
    "OmniNFT",
    "0xF558474DBdff7EE9Dea7C327fB68074B02390b78"
  );

  const signer = await ethers.getSigner(0);

  const mintTx = await omniNFT.safeMint(signer.address);
  const mintReceipt = await mintTx.wait();

  const approveTx = await omniNFT.approve(lzEndpointRinkeby, 0);
  const approveReceipt = await approveTx.wait();

  console.log(await omniNFT.ownerOf(0));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
