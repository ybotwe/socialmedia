const main = async () =>{
    const contractFactory = await hre.ethers.getContractFactory("BlockMedia");
    const contract = await contractFactory.deploy();
    await contract.deployed();
    console.log("Contract deployed to:", contract.address);
    const contractName = await contract.name();
    console.log("Contract name:", contractName);
}


const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();