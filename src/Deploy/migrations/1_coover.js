const migrations = artifacts.require("cooverContract");
module.exports = function (deployer) {
  const integrantes = ['0x617F2E2fD72FD9D5503197092aC168c91465E7f2', '0x17F6AD8Ef982297579C203069C1DbfFE4348c372', '0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C']; // Defina o valor desejado para _minPessoas
  const imei = ["1234","1235","1236"]; 
  deployer.deploy(migrations, integrantes, imei);
};''