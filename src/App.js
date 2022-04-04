import React from "react";
import InstallmentSelector from "./components/InstallmentSelector";

function App({amount}) {
  return <InstallmentSelector {...{amount}} />;
}

export default App;
