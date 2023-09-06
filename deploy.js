import * as ethers from "ethers";
import * as fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  //create provider
  const provider = new ethers.JsonRpcProvider("HTTP://127.0.0.1:7545");
  const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY, //PrivateKey
    provider
  );

  //get abi and bin
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const bin = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");

  //create contract using contractFactory
  const contractFactory = new ethers.ContractFactory(abi, bin, wallet);
  const contract = await contractFactory.deploy({ gasLimit: 3e6 });
  const deployTransaction = contract.deploymentTransaction();
  console.log("Deploy transaction");
  console.log(deployTransaction);
  //get transactionReceipt
  const transactionReceipt = await contract.waitForDeployment();
  console.log("transaction receipt - ");
  console.log(transactionReceipt);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
