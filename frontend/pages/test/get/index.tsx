import Head from 'next/head'

import { useAccount, useProvider } from 'wagmi'
import { useState } from 'react'
import { ethers } from 'ethers'
import { contractAddress, abi } from "@/public/constants"

const Get = () => {
  const { address, isConnected } = useAccount()
  const provider = useProvider()

  const [number, setNumber] = useState(null)

  const getTheNumber = async() => {
    const contract = new ethers.Contract(contractAddress, abi, provider)
    let smartContractValue = await contract.getNumber()
    console.log('smartContractValue', smartContractValue)
    setNumber(smartContractValue.toString())
  }

  return (
    <>
      <Head>
        <title>Create Next App - Get</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div>
      <button onClick={getTheNumber}>Get</button>
    </div>
    </>
  );
};

export default Get;