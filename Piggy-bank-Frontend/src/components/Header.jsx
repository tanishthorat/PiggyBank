import React, { useRef, useState } from "react";
import logo from "../assets/PiggyBank Logo.png";
import { fetchdata } from "../http";
import Modal from "./Modal";
import Button from "./Button";
import CreateBank from "./CreateBank";
import PiggyBank from "./PiggyBank";
import Transactions from "./Transactions";

function Header() {
  const modal = useRef();
  const [creatBank, setCreateBank] = useState();
  const [piggybank, setPiggyBank] = useState({
    Account: false,
  });

  function handleCreatingBank() {
    setCreateBank(true);
  }

  let createAccount = (
    <div>
      <span>
        <img className="h-[30vh]" src={logo} alt="Logo" />
      </span>
      <Button onClick={handleCreatingBank}>Create Piggy Bank</Button>
    </div>
  );
  console.log(piggybank.transactions, "tanish");
  return (
    <>
      <Modal ref={modal} buttonCaption={"Okay"}></Modal>
      {creatBank && (
        <CreateBank
          setPiggyBank={setPiggyBank}
          creatBank={creatBank}
          setCreateBank={setCreateBank}
        />
      )}
      {piggybank.Account === false && createAccount}
      {piggybank.Account === true && (
        <PiggyBank piggybank={piggybank} setPiggyBank={setPiggyBank} />
      )}
      {piggybank.Account && (
        <Transactions transactions={piggybank.transactions} />
      )}
    </>
  );
}

export default Header;
