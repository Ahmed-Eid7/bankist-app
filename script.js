"use strict";
// Bankist App

// Data
const account1 = {
  owner: "Ahmed Eid",
  movements: [1050, 450, -975, 3000, -150, -1130, 4650, 1300],
  interestRate: 0.7, // %
  pin: 1111,
};

const account2 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 5555,
};

const account3 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account4 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account5 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// Coding
// Display Movements List (Deposits & Withdrawals)
const displayMovements = (movs, sort = false) => {
  containerMovements.innerHTML = "";

  const movements = sort ? movs.slice().sort((a, b) => a - b) : movs;

  movements.forEach((mov, i) => {
    const type = mov < 0 ? "withdrawal" : "deposit";
    const html = `<div class='movements__row'>
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov}€</div></div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// Display Totla Balance
const calcDisplayBalance = (acc) => {
  acc.balance = acc.movements.reduce((a, c) => a + c);
  labelBalance.textContent = acc.balance + " €";
};

// Display total summary for (Deposits & Withdrawals & Interests)
const calcDisplaySummary = (acc) => {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((a, c) => a + c);
  labelSumIn.textContent = incomes + "€";

  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((a, c) => a + c);
  labelSumOut.textContent = Math.abs(outcomes) + "€";

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((a, c) => a + c);
  labelSumInterest.textContent = interest.toFixed(2) + "€";
};

// Create user name for each account
const createUserName = (accounts) => {
  accounts.forEach((account) => {
    account.userName = account.owner
      .split(" ")
      .map((e) => e[0])
      .join("")
      .toLowerCase();
  });
};
createUserName(accounts);

const updateUI = (acc) => {
  // Display Movements
  displayMovements(acc.movements);
  // Display Balance
  calcDisplayBalance(acc);
  // Display Summary
  calcDisplaySummary(acc);
};

// EVENTS
// Create Login Functionality
let currentAccount;

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  currentAccount = accounts.find(
    (account) => account.userName === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = "1";

    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

// Create Transfer Money Functionality
btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const reciveAcc = accounts.find(
    (account) => account.userName === inputTransferTo.value
  );

  if (
    amount > 0 &&
    reciveAcc &&
    currentAccount.balance >= amount &&
    inputTransferTo.value !== currentAccount.userName
  ) {
    reciveAcc.movements.push(amount);
    currentAccount.movements.push(-amount);
    updateUI(currentAccount);

    inputTransferAmount.value = inputTransferTo.value = " ";
  }
});

// Loan Feature
btnLoan.addEventListener("click", (e) => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
});

// Close Account
btnClose.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
  ) {
    const index = accounts.findIndex(
      (acc) => acc.userName === currentAccount.userName
    );

    // Delete Account
    accounts.splice(index, 1);
    // Hide UI
    containerApp.style.opacity = "0";
  }
});

// Sort Movements
let sorted = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
