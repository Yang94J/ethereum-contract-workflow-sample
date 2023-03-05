// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

contract Car {
    string public brand;

    constructor(string memory initialBrand) {
        brand = initialBrand;
    }

    function setBrand(string memory initialBrand) public {
        brand = initialBrand;
    }

}