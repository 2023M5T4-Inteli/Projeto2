const migrations = artifacts.require("cooverContract");
module.exports = function (deployer) {
  const integrantes = ['0x617F2E2fD72FD9D5503197092aC168c91465E7f2']; // Defina o valor desejado para _minPessoas
  const imei = ["1234"]; 
  deployer.deploy(migrations, integrantes, imei);
};''