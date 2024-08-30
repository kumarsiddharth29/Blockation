const hre = require('hardhat')

async function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function main(){
    const collection = await hre.ethers.deployContract("NftCollection")
    collection.waitForDeployment()
    console.log(`NFT Collection deployed at : ${collection.target}`);
   

    await sleep(30 * 1000)

    await hre.run('verify:verify',{
        address : collection.target,
        constructorArguments : []
    })

}

main().catch((err)=>{
    console.error(err);
    process.exitCode(1);
})