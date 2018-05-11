module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      gas: 90000000000,
      gasPrice: 1,
      network_id: '*' // Match any network id
    }
  }
};
