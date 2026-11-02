"use strict";

const form = document.querySelector("#tip-form");
const billInput = document.querySelector("#bill");
const tipInput = document.querySelector("#tip");
const peopleInput = document.querySelector("#people");
const results = document.querySelector("#results");
const formError = document.querySelector("#form-error");
const fields = [billInput, tipInput, peopleInput];

function clearErrors() {
  for (const field of fields) {
    field.removeAttribute("aria-invalid");
    document.querySelector(`#${field.id}-error`).textContent = "";
  }
  formError.textContent = "";
}

function showError(field, message) {
  field.setAttribute("aria-invalid", "true");
  document.querySelector(`#${field.id}-error`).textContent = message;
}

function money(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

// Changing any input hides the old answer so it cannot be mistaken for a new one.
form.addEventListener("input", () => {
  clearErrors();
  results.hidden = true;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();
  results.hidden = true;

  const billText = billInput.value.trim();
  const peopleText = peopleInput.value.trim();
  const bill = Number(billText);
  const tipPercent = Number(tipInput.value);
  const people = Number(peopleText);
  let billCents = 0;

  // Check emptiness before Number(): Number("") would otherwise become zero.
  if (billInput.validity.badInput) {
    showError(billInput, "Please enter a valid bill amount.");
  } else if (billText === "") {
    showError(billInput, "Please enter a bill amount.");
  } else if (!Number.isFinite(bill) || bill < 0) {
    showError(billInput, "Please enter a bill amount of 0 or more.");
  } else if (!/^\d*(?:\.\d{1,2})?$/.test(billText)) {
    showError(billInput, "Please use a bill amount with up to 2 decimal places.");
  } else {
    // Work in cents to avoid familiar floating-point money errors.
    billCents = Math.round(bill * 100);
    if (!Number.isSafeInteger(billCents) || billCents > Math.floor(Number.MAX_SAFE_INTEGER / 120)) {
      showError(billInput, "Please enter a smaller bill amount.");
    }
  }

  if (![10, 15, 20].includes(tipPercent)) {
    showError(tipInput, "Please select a tip of 10%, 15%, or 20%.");
  }

  if (peopleInput.validity.badInput) {
    showError(peopleInput, "Please enter a valid number of people.");
  } else if (peopleText === "") {
    showError(peopleInput, "Please enter the number of people.");
  } else if (!Number.isSafeInteger(people) || people <= 0) {
    showError(peopleInput, "Please enter a whole number of people, at least 1.");
  }

  const firstInvalid = fields.find((field) => field.getAttribute("aria-invalid") === "true");
  if (firstInvalid) {
    formError.textContent = "Please check the highlighted fields and calculate again.";
    firstInvalid.focus();
    return;
  }

  const tipCents = Math.round(billCents * tipPercent / 100);
  const totalCents = billCents + tipCents;
  const perPersonCents = Math.round(totalCents / people);

  document.querySelector("#tip-amount").textContent = money(tipCents);
  document.querySelector("#total-amount").textContent = money(totalCents);
  document.querySelector("#per-person").textContent = money(perPersonCents);
  results.hidden = false;
});
