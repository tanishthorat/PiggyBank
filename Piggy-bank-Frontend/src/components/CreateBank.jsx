import React, { useRef, useState } from "react";
import Input from "./Input";
import { fetchdata } from "../http";
import Notify from "./Notify";

function CreateBank({ setCreateBank, setPiggyBank }) {
  const [error, setError] = useState(null);

  const username = useRef();
  const bankname = useRef();
  const amount = useRef();

  async function CreatePiggyBank(a, b, c) {
    try {
      //   console.log("async");
      const result = await fetchdata(a, b, c);
      setPiggyBank((prev) => {
        return {
          Account: true,
          ...result.piggyBank,
        };
      });
      setCreateBank(false);
      console.log(result);
    } catch (error) {
      // Handle the error if needed
      console.log(error);
    }
  }

  function handlesave() {
    setError(null);
    const enteredUsername = username.current.value;
    const enteredBankname = bankname.current.value;
    const enteredAmount = amount.current.value;

    // Simple validation check
    if (!enteredUsername || !enteredBankname || !enteredAmount) {
      // Display a warning to the user
      setError(<Notify>please enter a valid value</Notify>);
      alert("Please enter valid values for all fields.");
      return; // Don't proceed with saving if validation fails
    }

    // Proceed with creating the piggy bank if validation passes
    CreatePiggyBank(enteredUsername, enteredBankname, enteredAmount);
  }

  return (
    <div className="w-[35rem]  absolute bg-white p-8  top-[17vh] right-[26%]">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button
            onClick={() => setCreateBank(false)}
            className="hover:text-stone-800 text-stone-400"
          >
            Cancle
          </button>
        </li>
        <li>
          <button
            onClick={handlesave}
            className="px-4 py-2 bg-pink-400 rounded text-slate-100 hover:bg-pink-500"
          >
            Save
          </button>
        </li>
      </menu>
      <div>
        {error && error}
        <Input type={"text"} ref={username}>
          {"Username"}
        </Input>
        <Input type={"text"} ref={bankname}>
          {"Bank Name"}
        </Input>
        <Input type={"number"} ref={amount}>
          {"Initial Amount"}
        </Input>
      </div>
    </div>
  );
}

export default CreateBank;
