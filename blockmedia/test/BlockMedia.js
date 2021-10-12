const { assert } = require("chai");
const { web3 } = require("hardhat");

describe('deployment', async () => {
    let contract;

    before(async () => {
        const contractFactory = await hre.ethers.getContractFactory("BlockMedia");
        contract = await contractFactory.deploy();
    })

    it("deploys successfully", async () => {
        const address = await contract.deployed();
        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
    })

    it("has name", async () => {
        const name = await contract.name();
        assert.equal(name, "BlockMedia");
    })
})

describe('posts', async () => {
    let contract;
    let result;

    before(async () => {
        const contractFactory = await hre.ethers.getContractFactory("BlockMedia");
        contract = await contractFactory.deploy();
        
    })

    it("creates posts", async () => {
        const [author] = await hre.ethers.getSigners();
        result = await contract.createPost("This is my first post!", {from: author.address});
        postCount = await contract.totalPosts();
        assert.equal(postCount, 1);
    })

    it("lists posts", async () => {
        const [author] = await hre.ethers.getSigners();
        postCount = await contract.totalPosts();
        const post = await contract.posts(postCount)
        assert.equal(post.id.toNumber(), postCount.toNumber());
        assert.equal(post.content, "This is my first post!")
        assert.equal(post.tipAmount, 0);
        assert.equal(post.author, author.address)
    })

    it("allows users to tip posts", async () => {
        const [author, tipper] = await ethers.getSigners();
        let oldBalance = await web3.eth.getBalance(author.address);
        oldBalance = new web3.utils.toBN(oldBalance);

        postCount = await contract.totalPosts();
        result = await contract.connect(tipper).tipPost(postCount, {value: web3.utils.toWei('1','ether')});
        const post = await contract.posts(postCount);
        assert.equal(post.id.toNumber(), postCount.toNumber());
        assert.equal(post.content, "This is my first post!")
        assert.equal(post.tipAmount , '1000000000000000000');
        assert.equal(post.author, author.address)

        let newBalance = await web3.eth.getBalance(author.address);
        newBalance = new web3.utils.toBN(newBalance);

        let tipAmount = web3.utils.toWei('1', 'ether');
        tipAmount = new web3.utils.toBN(tipAmount);

        const expectedBalance = oldBalance.add(tipAmount);

        assert.equal(expectedBalance.toString(), newBalance.toString());

    })

})
