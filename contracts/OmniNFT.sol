//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
pragma abicoder v2;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/ILayerZeroReceiver.sol";

contract OmniNFT is ERC721, Ownable, ILayerZeroReceiver {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("OmniNFT", "OMNI") {}

    receive() external payable {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function lzReceive(
        uint16,
        bytes calldata,
        uint64,
        bytes calldata _payload
    ) external override {
        address _newOwner;
        uint256 _tokenId;
        (_newOwner, _tokenId) = abi.decode(_payload, (address, uint256));

        address currentOwner = ownerOf(_tokenId);
        safeTransferFrom(currentOwner, _newOwner, _tokenId);
    }
}
