//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./interfaces/ILayerZeroEndpoint.sol";

contract Marketplace {
    ILayerZeroEndpoint public endpoint;

    constructor(address _endpoint) {
        endpoint = ILayerZeroEndpoint(_endpoint);
    }

    function changeNFTOwner(
        uint16 _destChainId,
        bytes calldata _destNFT,
        address _to,
        uint256 _tokenId
    ) public payable {
        endpoint.send{value: msg.value}(
            _destChainId,
            _destNFT,
            abi.encode(_to, _tokenId),
            payable(msg.sender),
            address(this),
            bytes("")
        );
    }
}
