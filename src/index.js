import "./style.css";

setupForm();

function setupForm() {
  setEmailValidity();
  setCountryValidity();
  setPostCodeValidity();
  setPasswordValidity();

  const form = document.querySelector("form");
  const submitBtn = document.querySelector("button#submit");
  const formStatus = document.querySelector("#form-status");
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (form.checkValidity()) {
      console.log("submitted! :)");
      formStatus.textContent = "Submission Successfull";
      alert("High Five!");
    } else {
      console.log("some fields still need to be filled");
      formStatus.textContent = "Please fill all fields.";
    }
  });
}
function setEmailValidity() {
  const email = document.querySelector("#email");
  email.required = true;

  email.addEventListener("input", () => {
    if (email.validity.typeMismatch) {
      email.setCustomValidity("Please enter a valid email address.");
    } else {
      email.setCustomValidity("");
    }

    email.reportValidity();
  });
}

function setCountryValidity() {
  const country = document.querySelector("#country");
  country.required = true;

  country.setAttribute("pattern", "[A-Za-z ]+");

  country.addEventListener("input", () => {
    if (country.validity.patternMismatch) {
      country.setCustomValidity("Please use letters only.");
    } else {
      country.setCustomValidity("");
    }

    country.reportValidity();
  });
}

function setPostCodeValidity() {
  const postCode = document.querySelector("#post-code");
  postCode.required = true;
  const pattern = new RegExp(
    "^[A-Za-z]{1,2}[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}$",
    ""
  );

  postCode.addEventListener("input", () => {
    if (pattern.test(postCode.value)) {
      postCode.setCustomValidity("");
    } else {
      postCode.setCustomValidity("Please enter a valid UK Post Code");
      postCode.reportValidity();
    }
  });
}

function setPasswordValidity() {
  const password = document.querySelector("#password");
  const passConfirm = document.querySelector("#pass-confirm");
  [password, passConfirm].forEach((e) => (e.required = true));
  const badPassword = new RegExp(
    "^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$",
    ""
  );

  password.addEventListener("input", () => {
    if (badPassword.test(password.value)) {
      password.setCustomValidity(
        "Please enter a password with at least 8 characters, 1 number, 1 uppercase character, 1 special character."
      );
      password.reportValidity();
    } else {
      password.setCustomValidity("");
    }
  });

  passConfirm.addEventListener("input", () => {
    if (passConfirm.value === password.value) {
      passConfirm.setCustomValidity("");
    } else {
      passConfirm.setCustomValidity("Passwords does not match.");
      passConfirm.reportValidity();
    }
  });
}
