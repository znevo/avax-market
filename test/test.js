const { expect } = require('chai');
const { ethers } = require('hardhat');

let omniNFT;
let marketplace;

describe('OmniNFT', async function () {
  it('Should deploy', async function () {
    const OmniNFT = await ethers.getContractFactory('OmniNFT');
    omniNFT = await OmniNFT.deploy();
    await omniNFT.deployed();

    console.log('OmniNFT deployed to:', omniNFT.address);
  });

  it('Should safely mint', async function () {
    const minter = await ethers.getSigner(0);
    const tx = await omniNFT.safeMint(minter.address);
    const receipt = await tx.wait();

    console.log('OmniNFT minted to:', await omniNFT.ownerOf(0));
  });
});

describe('Marketplace', function () {
  it('Should deploy', async function () {
    const Marketplace = await ethers.getContractFactory('Marketplace');
    const marketplace = await Marketplace.deploy();
    await marketplace.deployed();

    console.log('Marketplace deployed to:', marketplace.address);
  });
});
