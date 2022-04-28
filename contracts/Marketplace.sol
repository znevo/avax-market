//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./interfaces/ILayerZeroEndpoint.sol";

contract Marketplace {
    ILayerZeroEndpoint public endpoint;

    constructor(address _endpoint) {
        endpoint = ILayerZeroEndpoint(_endpoint);
    }

    receive() external payable {}

    function changeNFTOwner(
        uint16 _destChainId,
        bytes calldata _destNFT,
        address _to,
        uint256 _tokenId
    ) public payable {
        // use adapterParams v1 to specify more gas for the destination
        uint16 version = 1;
        uint gasForDestinationLzReceive = 350000;
        bytes memory adapterParams = abi.encodePacked(version, gasForDestinationLzReceive);

        bytes memory payload = abi.encode(_to, _tokenId);

        // get the fees we need to pay to LayerZero for message delivery
        (uint messageFee, ) = endpoint.estimateFees(_destChainId, address(this), payload, false, adapterParams);
        require(address(this).balance >= messageFee, "address(this).balance < messageFee. fund this contract with more avax");

        endpoint.send{value: messageFee}(
            _destChainId,
            _destNFT,
            payload,
            payable(msg.sender),
            address(this),
            bytes("")
        );
    }
}
