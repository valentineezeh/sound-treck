import isEmpty from "is-empty";

const validateUserLoginInput = data => {
  const errors = {};
  if (data.email === "" || !data.email || data.email.trim().length === 0) {
    errors.email = "This field is required.";
  }
  if (
    data.password === "" ||
    !data.password ||
    data.password.trim().length === 0
  ) {
    errors.password = "This field is required.";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateUserLoginInput;
