
var contract_obj = proofContract.at("0xa3af2406c7ab1f412249eefa10fbf0a972ac72f1");
contract_obj.set.sendTransaction("nunu", "0x784da8ff1a3cc793bbadb2e29a715bf272374018b65ca5fd13e7479cb26182c2", { 
    from: web3.eth.accounts[0],
}, function (error, transactionHash) {
    if (!error)
        console.log(transactionHash);
})

contract_obj.get.call("0x784da8ff1a3cc793bbadb2e29a715bf272374018b65ca5fd13e7479cb26182c2");