import React, { useEffect, useRef } from "react";
import Button from "./Button";
import logo from "../assets/PiggyBank Logo.png";
import Modal from "./Modal";
import { fetchaddMoney, fetchBreakBank } from "../http";
import plusIcon from "../assets/plus.png";

function PiggyBank({ piggybank, setPiggyBank }) {
  const classes =
    "w-full p-1 border-b-2 rounded-sm border-pink-200 bg-yellow-100 text-slate-600 focus:outline-none focus:border-yelllow-600 placeholder-yellow-800 border placeholder-opacity-50";

  const modal = useRef();
  const input = useRef();

  //   let addMoney = null;

  function handleAddMoneyForm() {
    modal.current.open();
  }

  async function addMoney() {
    const amount = input.current.value;
    console.log(amount);
    try {
      // Send a request to add money to the piggy bank
      const { updatedPiggyBank } = await fetchaddMoney(amount, piggybank._id);
      modal.current.close();
      setPiggyBank(() => {
        return {
          ...updatedPiggyBank,
          Account: true,
        };
      });
      console.log(piggybank);
    } catch (error) {
      console.error("Error adding money:", error.message);
    }
  }

  async function breakPiggyBank() {
    const bankid = piggybank._id;
    try {
      await fetchBreakBank(bankid);
      setPiggyBank(() => {
        return {
          Account: false,
        };
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Modal ref={modal} buttonCaption={"Close"}>
        <div className="flex flex-col justify-center items-center my-5">
          <label className="text-sm font-bold uppercase text-pink-500">
            Enter Amount
          </label>
          <input
            ref={input}
            className={classes}
            type="number"
            required
            placeholder="Enter Amount"
          />
        </div>
        <button
          onClick={addMoney}
          className="bg-green-500 rounded w-[100%] px-2 py-1 hover:bg-green-800"
        >
          ADD
        </button>
      </Modal>

      <div className="flex flex-col justify-center items-center m-4">
        <h1 className="text-center text-3xl font-extrabold text-pink-500">
          {piggybank.name}
        </h1>
        <p className="text-center font-extralight  text-xs">your piggy bank</p>
        <img className="h-[30vh]" src={logo} alt="Logo" />
        <p className="text-center font-thin">balance</p>
        <h2 className="text-center text-3xl font-extrabold text-green-500">
          ₹{piggybank.balance}
        </h2>
      </div>
      <p className="text-center">
        <Button onClick={handleAddMoneyForm}>Add Money</Button>

        <Button onClick={breakPiggyBank}>Break Piggy Bank</Button>
      </p>
    </>
  );
}

export default PiggyBank;
