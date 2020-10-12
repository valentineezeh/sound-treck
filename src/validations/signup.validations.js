import isEmpty from "is-empty";
import passwordValidator from "password-validator";
import validator from "validator";

const ValidateUserSignUpInput = data => {
  const errors = {};
  const email = data.email.trim().toLowerCase();
  let validatePassword = new passwordValidator();
  validatePassword
    .is()
    .min(6)
    .is()
    .max(100)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits()
    .has()
    .not()
    .spaces()
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]);

  if (
    !data.fullName ||
    data.fullName === "" ||
    data.fullName.trim().length === 0
  ) {
    errors.fullName = "Please enter your full name.";
  }

  if (!email || email === "" || email.trim().length === 0) {
    errors.email = "Please enter your email.";
  }

  if (email && !validator.isEmail(email)) {
    errors.email = "Please enter valid email.";
  }

  if (
    data.password === "" ||
    !data.password ||
    data.password.trim().length === 0
  ) {
    errors.password = "This field is required.";
  }
  if (data.password < 6) {
    errors.password = "Password should be greater than 6 characters";
  }
  if (!validatePassword.validate(data.password)) {
    errors.password =
      "Password must have uppercase, lowercase, number and must not start with password.";
  }

  if (data.gender === "" || !data.gender || data.gender.trim().length === 0) {
    errors.gender = "Please choose a gender.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateUserNextSignUpInput = data => {
  const errors = {};
  if (
    !data.country ||
    data.country === "" ||
    data.country.trim().length === 0
  ) {
    errors.country = "Please enter your country.";
  }

  if (!data.city || data.city === "" || data.city.trim().length === 0) {
    errors.city = "Please enter your city.";
  }

  if (!data.state || data.state === "" || data.state.trim().length === 0) {
    errors.state = "Please enter your State.";
  }

  if (
    !data.address ||
    data.address === "" ||
    data.address.trim().length === 0
  ) {
    errors.address = "Please enter your address.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export { ValidateUserSignUpInput, validateUserNextSignUpInput };
