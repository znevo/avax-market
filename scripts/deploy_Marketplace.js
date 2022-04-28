const hre = require("hardhat");

async function main() {
  const lzEndpoint = "0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706";

  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(lzEndpoint);

  await marketplace.deployed();

  console.log("Marketplace deployed to:", marketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
