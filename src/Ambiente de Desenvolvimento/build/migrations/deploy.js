const contrato = artifacts.require("cooverContract");

module.exports = function(deployer) {
    // deployment steps
    deployer.deploy(contrato, 1,  5,  1, "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678", 1253);
};