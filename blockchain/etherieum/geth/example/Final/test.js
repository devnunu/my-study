
var contract_obj = proofContract.at("0xde4df0e33c18831463140bef60f961c69fa105ff");
contract_obj.set.sendTransaction("Owner Name", "e3e9d9e9d9", { 
    from: web3.eth.accounts[0],
}, function (error, transactionHash) {
    if (!error)
        console.log(transactionHash);
})

contract_obj.get.call("e3e9d9e9d9");