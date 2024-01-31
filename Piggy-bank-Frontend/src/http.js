//Creating Piggy bank
export async function fetchdata(username, bankname, initialAmount) {
  let result = null;
  try {
    // console.log("fetch");
    const response = await fetch(
      "http://localhost:8080/api/create-new-piggy-bank",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          name: bankname,
          initialAmount: initialAmount,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create piggy bank");
    }

    result = await response.json();
    console.log("Piggy bank created successfully:", result);
  } catch (error) {
    console.error("Error in createPiggyBank:", error.message);
    throw error; // Re-throw the error to propagate it to the calling function
  }
  return result;
}

// Add Money

export async function fetchaddMoney(amount, bankId) {
  try {
    const response = await fetch("http://localhost:8080/api/add-money", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bankid: bankId,
        amount: amount,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add money");
    }

    const result = await response.json();
    console.log("Money added successfully:", result);
    return result; // You can return the result if needed
  } catch (error) {
    console.error("Error adding money:", error.message);
    throw error; // Re-throw the error to propagate it to the calling function
  }
}

// Break piggy Bank
export async function fetchBreakBank(bankId) {
  try {
    const response = await fetch("http://localhost:8080/api/break-piggy-bank", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bankid: bankId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add money");
    }

    const result = await response.json();
    console.log("Piggy bank breaked successfully:", result);
    return result; // You can return the result if needed
  } catch (error) {
    console.error("Error adding money:", error.message);
    throw error; // Re-throw the error to propagate it to the calling function
  }
}

// view transaction
