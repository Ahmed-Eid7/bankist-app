"use strict";
// Bankist App

// Data
const account1 = {
  owner: "Ahmed Eid",
  movements: [1050, 450, -975, 3000, -150, -1130, 4650, 1300],
  interestRate: 0.7, // %
  pin: 1111,
  movementsDates: [
    "2020-11-18T21:31:17.178Z",
    "2021-12-23T07:42:02.383Z",
    "2021-01-28T09:15:04.904Z",
    "2022-04-01T10:17:24.185Z",
    "2023-05-08T14:11:59.604Z",
    "2023-06-04T17:01:17.194Z",
    "2023-06-07T23:36:17.929Z",
    "2023-06-10T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account2 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 5555,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2021-05-27T17:01:17.194Z",
    "2021-07-11T23:36:17.929Z",
    "2022-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account3 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2021-05-27T17:01:17.194Z",
    "2021-07-11T23:36:17.929Z",
    "2022-07-12T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2021-05-27T17:01:17.194Z",
    "2021-07-11T23:36:17.929Z",
    "2022-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "en-US",
};

const account5 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2021-05-27T17:01:17.194Z",
    "2021-07-11T23:36:17.929Z",
    "2022-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "en-US",
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
const formatMovementDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};

// Display Movements List (Deposits & Withdrawals)
const displayMovements = (acc, sort = false) => {
  containerMovements.innerHTML = "";

  const movements = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movements.forEach((mov, i) => {
    const type = mov < 0 ? "withdrawal" : "deposit";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `<div class='movements__row'>
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div></div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// Display Totla Balance
const calcDisplayBalance = (acc) => {
  acc.balance = acc.movements.reduce((a, c) => a + c);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

// Display total summary for (Deposits & Withdrawals & Interests)
const calcDisplaySummary = (acc) => {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((a, c) => a + c);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((a, c) => a + c);
  labelSumOut.textContent = formatCur(
    Math.abs(outcomes),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((a, c) => a + c);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
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
  displayMovements(acc);
  // Display Balance
  calcDisplayBalance(acc);
  // Display Summary
  calcDisplaySummary(acc);
};

const startLogoutTimer = () => {
  const tick = () => {
    const sec = String(time % 60).padStart(2, "0");
    const min = String((time - sec) / 60).padStart(2, "0");

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = "0";
    }

    time--;
  };

  let time = 120;

  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// EVENTS
// Create Login Functionality
let currentAccount, timer;

// Create Log in
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  currentAccount = accounts.find(
    (account) => account.userName === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and Message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = "1";

    // Create current date and time for user
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    updateUI(currentAccount);
  }
});

// Create Transfer Money Functionality
btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();

  const amount = +inputTransferAmount.value;
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

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    reciveAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    // Reset Timer
    clearInterval(timer);
    timer = startLogoutTimer();

    inputTransferAmount.value = inputTransferTo.value = " ";
  }
});

// Loan Feature
btnLoan.addEventListener("click", (e) => {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      updateUI(currentAccount);

      // Reset Timer
      clearInterval(timer);
      timer = startLogoutTimer();
    }, 2500);
  }

  inputLoanAmount.value = "";
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
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
