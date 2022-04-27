const hre = require("hardhat");

async function main() {
  const OmniNFT = await hre.ethers.getContractFactory("OmniNFT");
  const omniNFT = await OmniNFT.deploy();

  await omniNFT.deployed();

  console.log("OmniNFT deployed to:", omniNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
