import React, { useContext, useState } from "react";
import TokenItem from "../TokenItem/TokenItem";
import ReactPaginate from "react-paginate";
import { WalletContext } from "../../context/Context";
import Loader from "../Loader/Loader";

const TokenList = () => {
  const { tokenBalance, isLoading } = useContext(WalletContext);

  const [pageNumber, setPageNumber] = useState(0);
  const tokensPerPage = 7;
  const pagesVisited = pageNumber * tokensPerPage;

  const displayTokens = tokenBalance
    .slice(pagesVisited, pagesVisited + tokensPerPage)
    .map((token, index) => (
      <TokenItem
        key={index}
        name={token.name}
        symbol={token.symbol}
        img={token.logo}
        balance={token.balance}
      />
    ));

  const pageCount = Math.ceil(tokenBalance.length / tokensPerPage);
  const changePageHandler = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <section className="relative w-full">
      <div className="w-[55%] mx-auto bg-gray-200 py-6 rounded-md absolute left-[50%] translate-x-[-50%]  -top-24">
        <div className="flex gap-80 px-20  text-xl font-Grotesk font-semibold mb-3 text-[#1e1e1e]">
          <h2>Name</h2>
          <p>Balance</p>
        </div>

        {isLoading && <Loader />}

        {!isLoading && displayTokens}
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePageHandler}
          containerClassName={
            "flex justify-center py-2 items-center gap-10 mt-6"
          }
          nextLinkClassName={
            "px-5 py-2 border border-gray-600 rounded-md bg-[#1e1e1e] text-white "
          }
          previousLinkClassName={
            "px-5 py-2 border border-gray-600 rounded-md bg-[#1e1e1e] text-white "
          }
          disabledClassName={"paginationDisabled"}
          activeClassName={"text-xl font-semibold"}
        />
      </div>
    </section>
  );
};

export default TokenList;
