import React, { useContext, useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { BigNumber, ethers, utils } from "ethers";
import { formatUnits } from "ethers/lib/utils";
const config = {
  apiKey: import.meta.env.API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

const Data = () => {
  const [tokenBalance, setTokenBalance] = useState([]);

  const sortByHighestBalance = (a, b) => {
    return b.balance - a.balance;
  };

  const fetchTokens = async () => {
    const response = await fetch(
      " https://gateway.ipfs.io/ipns/tokens.uniswap.org"
    );
    const responseData = await response.json();
    const { tokens } = responseData;

    const tokensArray = [];
    const ownerAddress = "0x00000000219ab540356cbb839cbe05303d7705fa";

    tokens.map((token) => {
      if (token.chainId === 1) {
        tokensArray.push({
          address: token.address,
          decimals: token.decimals,
          name: token.name,
          symbol: token.symbol,
        });
      }
    });

    const data = await alchemy.core.getTokenBalances(
      ownerAddress,
      tokensArray.map((token) => token.address)
    );

    data.tokenBalances.map((token, index) => {
      const balance = parseInt(token.tokenBalance);
      const decimals = tokensArray[index].decimals;
      // console.log("balance: ", balance, "decimals", decimals);
      tokensArray[index].balance = balance / 10 ** decimals;
    });
    setTokenBalance(tokensArray);
    console.log(tokensArray);

    console.log(tokensArray.sort(sortByHighestBalance));
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  console.log(tokenBalance);

  return <div>Data</div>;
};

export default Data;
