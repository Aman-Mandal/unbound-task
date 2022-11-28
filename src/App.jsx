import { useContext } from "react";
import ConnectedModal from "./components/ConnectedModal/ConnectedModal";
import Header from "./components/Header/Header";
import TokenList from "./components/TokenList/TokenList";
import { WalletContext } from "./context/Context";

const App = () => {
  const { currentAccount } = useContext(WalletContext);

  return (
    <div>
      <Header />
      {currentAccount ? <TokenList /> : <ConnectedModal />}
    </div>
  );
};

export default App;
