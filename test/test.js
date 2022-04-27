const { expect } = require('chai');
const { ethers } = require('hardhat');

let omniNFT;
let marketplace;
let lzEndpointMock;
let minter;
const chainIdSrc = 1;
const chainIdDst = 2;

describe('OmniNFT', async function () {
  before(async function () {
    const LayerZeroEndpointMock = await ethers.getContractFactory(
      'LZEndpointMock'
    );
    lzEndpointMockSrc = await LayerZeroEndpointMock.deploy(chainIdSrc);
    lzEndpointMockDst = await LayerZeroEndpointMock.deploy(chainIdDst);
  });

  it('Should deploy', async function () {
    const OmniNFT = await ethers.getContractFactory('OmniNFT');
    omniNFT = await OmniNFT.deploy();
    await omniNFT.deployed();

    console.log('OmniNFT deployed to:', omniNFT.address);
  });

  it('Should safely mint', async function () {
    minter = await ethers.getSigner(0);
    const tx = await omniNFT.safeMint(minter.address);
    const receipt = await tx.wait();

    console.log('OmniNFT minted to:', await omniNFT.ownerOf(0));
  });
});

describe('Marketplace', function () {
  it('Should deploy', async function () {
    const Marketplace = await ethers.getContractFactory('Marketplace');
    const marketplace = await Marketplace.deploy(lzEndpointMockSrc.address);
    await marketplace.deployed();

    console.log('Marketplace deployed to:', marketplace.address);

    await lzEndpointMockSrc.setDestLzEndpoint(
      omniNFT.address,
      lzEndpointMockDst.address
    );

    const newOwner = await ethers.getSigner(1);

    omniNFT.connect(minter).approve(lzEndpointMockDst.address, 0);
    await marketplace
      .connect(minter)
      .changeNFTOwner(chainIdDst, omniNFT.address, newOwner.address, 0);
  });
});
