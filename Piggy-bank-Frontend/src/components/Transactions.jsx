import React from "react";

function Transactions({ transactions }) {
  return (
    <>
      <table
        id="result"
        className="w-[30rem] border-collapse border border-slate-40 p-3"
      >
        <caption className="caption-top">
          <p className="text-center font-extralight  text-base">
            Transaction History
          </p>
        </caption>
        <thead>
          <tr className="">
            <th className="text-left pr-4 border border-slate-300">Amount</th>
            <th className="text-left pr-4 border border-slate-300">Date</th>
            <th className="text-left border border-slate-300">
              Transaction ID
            </th>
          </tr>
        </thead>
      </table>
      <div className="max-h-[10rem] overflow-y-auto overflow-x-hidden custom-overflow">
        <table id="result" className="w-[30rem]">
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td className="text-left pr-4">₹{transaction.amount}</td>
                <td className="text-left pr-4">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="text-left">{transaction._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Transactions;
