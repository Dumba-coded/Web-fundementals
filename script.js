document.addEventListener("DOMContentLoaded", function () {

  const container = document.getElementById("container");

  const registerButton =
    document.getElementById("register");

  const loginButton =
    document.getElementById("login");

  const loginForm =
    document.getElementById("login-form");

  const registrationForm =
    document.getElementById("registration-form");

  const nextButton =
    document.getElementById("next-step");

  const previousButton =
    document.getElementById("previous-step");

  const createButton =
    document.getElementById("create-account");

  const welcomePanel =
    document.getElementById("welcome-panel");

  const signOutButton =
    document.getElementById("sign-out");

  const progressFill =
    document.getElementById("progress-fill");

  let currentStep = 1;
  let registeredAccount = null;

  const demoAccount = {
    fullName: "SEASONS Guest",
    email: "demo@seasons.com",
    password: "Seasons123",
    fragranceFamily: "Woody",
    preferredSeason: "Autumn"
  };

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validPhone(value) {
    return /^[0-9+\-\s]{8,15}$/.test(value);
  }

  function validPassword(value) {
    return (
      value.length >= 8 &&
      /[A-Z]/.test(value) &&
      /[0-9]/.test(value)
    );
  }

  function setError(field, errorId, message) {
    const errorElement =
      document.getElementById(errorId);

    errorElement.textContent = message;

    field.classList.toggle(
      "invalid",
      message !== ""
    );

    field.setAttribute(
      "aria-invalid",
      message ? "true" : "false"
    );
  }

  function showMessage(id, message, type) {
    const element =
      document.getElementById(id);

    element.textContent = message;

    element.className =
      "form-message" +
      (type ? " " + type : "");
  }

  function resetWelcome() {
    welcomePanel.hidden = true;
    loginForm.hidden = false;

    container.classList.remove("signed-in");
  }

  function showLoginSide() {
    container.classList.remove("active");
    resetWelcome();
  }

  function showRegistrationSide() {
    container.classList.add("active");
    resetWelcome();
    updateStep();
  }

  function updateStep() {
    const registrationSteps =
      document.querySelectorAll(
        ".registration-step"
      );

    registrationSteps.forEach(function (step) {
      const stepNumber =
        Number(step.dataset.step);

      step.hidden =
        stepNumber !== currentStep;
    });

    const progressSteps =
      document.querySelectorAll(
        "[data-progress-step]"
      );

    progressSteps.forEach(function (step) {
      const stepNumber =
        Number(step.dataset.progressStep);

      step.classList.toggle(
        "active",
        stepNumber === currentStep
      );

      step.classList.toggle(
        "completed",
        stepNumber < currentStep
      );
    });

    progressFill.style.width =
      ((currentStep - 1) / 2 * 100) + "%";

    previousButton.hidden =
      currentStep === 1;

    nextButton.hidden =
      currentStep === 3;

    createButton.hidden =
      currentStep !== 3;
  }

  function validateStepOne() {
    const name =
      document.getElementById("register-name");

    const email =
      document.getElementById("register-email");

    const phone =
      document.getElementById("register-phone");

    const nameError =
      name.value.trim().length < 2
        ? "Enter at least 2 characters."
        : "";

    const emailError =
      !validEmail(email.value.trim())
        ? "Enter a valid email."
        : "";

    const phoneError =
      !validPhone(phone.value.trim())
        ? "Enter 8 to 15 digits."
        : "";

    setError(
      name,
      "register-name-error",
      nameError
    );

    setError(
      email,
      "register-email-error",
      emailError
    );

    setError(
      phone,
      "register-phone-error",
      phoneError
    );

    return (
      !nameError &&
      !emailError &&
      !phoneError
    );
  }

  function validateStepTwo() {
    const password =
      document.getElementById(
        "register-password"
      );

    const confirmation =
      document.getElementById(
        "confirm-password"
      );

    const passwordError =
      !validPassword(password.value)
        ? "Use 8+ characters, uppercase and number."
        : "";

    const confirmError =
      !confirmation.value ||
      confirmation.value !== password.value
        ? "Passwords must match."
        : "";

    setError(
      password,
      "register-password-error",
      passwordError
    );

    setError(
      confirmation,
      "confirm-password-error",
      confirmError
    );

    return (
      !passwordError &&
      !confirmError
    );
  }

  function validateStepThree() {
    const family =
      document.getElementById(
        "fragrance-family"
      );

    const season =
      document.querySelector(
        'input[name="preferredSeason"]:checked'
      );

    const terms =
      document.getElementById(
        "accept-terms"
      );

    const familyError =
      family.value
        ? ""
        : "Choose a fragrance family.";

    const seasonError =
      season
        ? ""
        : "Choose a season.";

    const termsError =
      terms.checked
        ? ""
        : "Confirm the simulation statement.";

    setError(
      family,
      "fragrance-family-error",
      familyError
    );

    document.getElementById(
      "preferred-season-error"
    ).textContent = seasonError;

    document.getElementById(
      "accept-terms-error"
    ).textContent = termsError;

    return (
      !familyError &&
      !seasonError &&
      !termsError
    );
  }

  function validateCurrentStep() {
    if (currentStep === 1) {
      return validateStepOne();
    }

    if (currentStep === 2) {
      return validateStepTwo();
    }

    return validateStepThree();
  }

  function updatePasswordRules() {
    const value =
      document.getElementById(
        "register-password"
      ).value;

    document.getElementById(
      "rule-length"
    ).classList.toggle(
      "valid",
      value.length >= 8
    );

    document.getElementById(
      "rule-uppercase"
    ).classList.toggle(
      "valid",
      /[A-Z]/.test(value)
    );

    document.getElementById(
      "rule-number"
    ).classList.toggle(
      "valid",
      /[0-9]/.test(value)
    );
  }

  function showWelcome(account) {
    loginForm.hidden = true;
    welcomePanel.hidden = false;

    container.classList.add("signed-in");

    document.getElementById(
      "welcome-heading"
    ).textContent =
      "Welcome, " + account.fullName + "!";

    document.getElementById(
      "welcome-description"
    ).textContent =
      "Your simulated profile favours " +
      account.fragranceFamily +
      " fragrances for " +
      account.preferredSeason +
      ".";
  }

  registerButton.addEventListener(
    "click",
    showRegistrationSide
  );

  loginButton.addEventListener(
    "click",
    showLoginSide
  );

  nextButton.addEventListener(
    "click",
    function () {
      showMessage(
        "registration-message",
        "",
        ""
      );

      if (validateCurrentStep()) {
        currentStep += 1;
        updateStep();
      } else {
        showMessage(
          "registration-message",
          "Please correct the highlighted fields.",
          "error"
        );
      }
    }
  );

  previousButton.addEventListener(
    "click",
    function () {
      currentStep -= 1;

      showMessage(
        "registration-message",
        "",
        ""
      );

      updateStep();
    }
  );

  registrationForm.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();

      if (!validateStepThree()) {
        showMessage(
          "registration-message",
          "Please complete your preferences.",
          "error"
        );

        return;
      }

      const season =
        document.querySelector(
          'input[name="preferredSeason"]:checked'
        );

      registeredAccount = {
        fullName:
          document.getElementById(
            "register-name"
          ).value.trim(),

        email:
          document.getElementById(
            "register-email"
          ).value.trim().toLowerCase(),

        password:
          document.getElementById(
            "register-password"
          ).value,

        fragranceFamily:
          document.getElementById(
            "fragrance-family"
          ).value,

        preferredSeason:
          season.value
      };

      document.getElementById(
        "login-email"
      ).value = registeredAccount.email;

      showLoginSide();

      showMessage(
        "login-message",
        "Account created. Enter your password to sign in.",
        "success"
      );
    }
  );

  loginForm.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();

      const email =
        document.getElementById(
          "login-email"
        );

      const password =
        document.getElementById(
          "login-password"
        );

      const emailError =
        validEmail(email.value.trim())
          ? ""
          : "Enter a valid email.";

      const passwordError =
        password.value
          ? ""
          : "Enter your password.";

      setError(
        email,
        "login-email-error",
        emailError
      );

      setError(
        password,
        "login-password-error",
        passwordError
      );

      if (emailError || passwordError) {
        showMessage(
          "login-message",
          "Complete both login fields.",
          "error"
        );

        return;
      }

      const accounts =
        registeredAccount
          ? [demoAccount, registeredAccount]
          : [demoAccount];

      const account =
        accounts.find(function (item) {
          return (
            item.email.toLowerCase() ===
              email.value.trim().toLowerCase() &&
            item.password === password.value
          );
        });

      if (account) {
        showWelcome(account);
      } else {
        showMessage(
          "login-message",
          "Email or password not recognised.",
          "error"
        );
      }
    }
  );

  const passwordButtons =
    document.querySelectorAll(
      "[data-password-target]"
    );

  passwordButtons.forEach(function (button) {
    button.addEventListener(
      "click",
      function () {
        const input =
          document.getElementById(
            button.dataset.passwordTarget
          );

        const passwordIsHidden =
          input.type === "password";

        input.type =
          passwordIsHidden
            ? "text"
            : "password";

        button.textContent =
          passwordIsHidden
            ? "Hide"
            : "Show";
      }
    );
  });

  document.getElementById(
    "register-password"
  ).addEventListener(
    "input",
    updatePasswordRules
  );

  document.getElementById(
    "forgot-password"
  ).addEventListener(
    "click",
    function () {
      const email =
        document.getElementById(
          "login-email"
        ).value.trim();

      if (validEmail(email)) {
        showMessage(
          "login-message",
          "Simulation: a reset link would be sent to " +
            email +
            ".",
          "success"
        );
      } else {
        showMessage(
          "login-message",
          "Enter a valid email first.",
          "error"
        );
      }
    }
  );

  signOutButton.addEventListener(
    "click",
    function () {
      loginForm.reset();

      resetWelcome();

      showMessage(
        "login-message",
        "You have signed out.",
        "success"
      );
    }
  );

  updateStep();
});