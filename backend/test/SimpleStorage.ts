import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SimpleStorage", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy();

    return { simpleStorage, owner, otherAccount };
  }

  it("should return the correct value after setting it", async () => {
    const { simpleStorage } = await loadFixture(deployOneYearLockFixture);

    await simpleStorage.setNumber(42);
    const value = await simpleStorage.getNumber();
    expect(value).to.equal(42);
  });

  it("should return zero by default", async () => {
    const { simpleStorage } = await loadFixture(deployOneYearLockFixture);
    const value = await simpleStorage.getNumber();
    expect(value).to.equal(0);
  });

});
