const migrations = artifacts.require("cooverContract");
module.exports = function (deployer) {
  const integrantes = "0xaa00310795ECDcb40a70BC5002D475cFF867F09F"; // Defina o valor desejado para _minPessoas
  const imei = 6543; 
  deployer.deploy(migrations);
};''