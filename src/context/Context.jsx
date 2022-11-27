import React, { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { BigNumber, ethers, utils } from "ethers";

export const WalletContext = React.createContext();

const { ethereum } = window;

const config = {
  apiKey: import.meta.env.API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

const WalletContextProvider = ({ children }) => {
  const [tokenBalance, setTokenBalance] = useState([]);
  const [currentAccount, setCurrentAccount] = useState("");

  // sorting function
  const sortByHighestBalance = (a, b) => {
    return b.balance - a.balance;
  };

  // fetch data
  const fetchTokens = async () => {
    const response = await fetch(
      " https://gateway.ipfs.io/ipns/tokens.uniswap.org"
    );
    const responseData = await response.json();
    const { tokens } = responseData;
    const tokensArray = [];
    // const ownerAddress = `${currentAccount}`;
    const ownerAddress = currentAccount;

    tokens.map((token) => {
      // pushing data in new arr if chain === ethereum
      if (token.chainId === 1) {
        tokensArray.push({
          address: token.address,
          decimals: token.decimals,
          name: token.name,
          symbol: token.symbol,
          logo: token.logoURI,
        });
      }
    });

    // alchemy api to get balance
    const data = await alchemy.core.getTokenBalances(
      ownerAddress,
      tokensArray.map((token) => token.address)
    );

    data.tokenBalances.map((token, index) => {
      const balance = parseInt(token.tokenBalance);
      const decimals = tokensArray[index].decimals;
      tokensArray[index].balance = balance / 10 ** decimals;
    });

    // sorting array in descending (highest balance first)
    tokensArray.sort(sortByHighestBalance);
    setTokenBalance(tokensArray);
  };

  // connect Wallet
  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert("Please install Metamask!");
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const account = await signer.getAddress();

      setCurrentAccount(account);
    } catch (error) {
      console.error(error.message);
      throw new Error("No ethereum object found!");
    }
  };

  useEffect(() => {
    if (currentAccount) {
      fetchTokens();
    }
  }, [currentAccount]);

  return (
    <WalletContext.Provider
      value={{
        currentAccount,
        connectWallet,
        tokenBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContextProvider;
