import { toast } from "react-toastify";

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const _getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
};

export const _formatCharLength = (str, len) =>
  str.length > len ? `${str.substring(0, len - 1)}...` : str;

export const _notify = (str, type) => {
  toast[type](str);
};

export const _isArrayEmpty = arr => !arr || arr.length === 0;

export const _isCharLong = (str, len) => str.length > len;

export const _isInputValid = (errors, fullname) => {
  if (errors) {
    return errors.length === 0 ? "" : errors.toLowerCase().includes(fullname);
  }
  return false;
};

export const _isObjectEmpty = obj => {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return true;
};

export const _isUserMusician = user => {
  if (!_isObjectEmpty(user)) {
    return !!(
      user.role._id === "5dff97b0398ef6517551c0c6" ||
      user.role._id === "5e24cb7cb027421dd992c3c7"
    );
  }
};

export const _getAuthRedirectionUrl = user => {
  if (!_isObjectEmpty(user)) {
    switch (user.role) {
      case "5dff97b0398ef6517551c0c6":
        return (window.location.href = `/user/${user._id}`);
      default:
        return "/magic";
    }
  }
};

export const _getUserName = user => {
  if (!_isObjectEmpty(user)) {
    return user.fullName.split(" ")[0];
  }
};

export const _isStrEmpty = str => !str || str.length === 0;

export const _updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties
});

export const _validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const _validateNumber = n => {
  let firstChar;
  let number;
  const pattern = /^([0]{1})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g;

  if (!n || n.length < 5) {
    return false;
  }

  if (typeof n === "number") {
    number = `0${n}`;
  } else if (typeof n === "string") {
    firstChar = n.substring(0, 1);
    number = firstChar === "0" ? n : `0${n}`;
  } else {
    return false;
  }
  return pattern.test(number.replace(/\s+/g, ""));
};
