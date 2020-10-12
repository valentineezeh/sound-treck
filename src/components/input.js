import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";

export const FormInput = props => {
  if (props.type === "tel") {
    return (
      <FormGroup className={`form__group ${props.className}`}>
        <Label className="form__label" for={props.id}>
          {props.label}
        </Label>
        <div className="form__phone">
          <div className="form__phone-code">{`+${props.phoneCode}`}</div>
          <InputMask
            mask="+234\ 999 999 999 99"
            maskChar="                         "
            required={props.isRequired}
            className="form__input"
            id={props.id}
            disabled={props.isDisabled}
            name={props.id}
            placeholder={props.placeholder}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
          />
        </div>
      </FormGroup>
    );
  }

  if (props.type === "select") {
    return (
      <FormGroup
        className={`form__group form__select-block ${props.className}`}
      >
        <Label className="form__label" for={props.id}>
          {props.label}
        </Label>
        <Input
          required={props.isRequired}
          className="form__input form__select"
          id={props.id}
          disabled={props.isDisabled}
          name={props.id}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
        >
          {props.obj.map(i => (
            <option value={i}>{i}</option>
          ))}
          {props.children}
        </Input>
      </FormGroup>
    );
  }

  return (
    <FormGroup className={`form__group ${props.className}`}>
      <>
        <Label className="form__label" for={props.id}>
          {props.label}
        </Label>
        <div className={props.edit ? "input-group-text" : ""}>
          <Input
            required={props.isRequired}
            className="form__input"
            id={props.id}
            disabled={props.isDisabled}
            name={props.id}
            placeholder={props.placeholder}
            type={props.type}
            value={props.value}
            onClick={props.onClick}
            onChange={props.onChange}
          />
          {props.edit ? (
            <i className="fas fa-edit" onClick={props.onClick} />
          ) : (
            ""
          )}
        </div>
        {props.error && (
          <>
            <p className="text-danger">
              &nbsp;
              {props.error}
            </p>
          </>
        )}
      </>
    </FormGroup>
  );
};

FormInput.defaultProps = {
  className: "",
  isRequired: true,
  options: [],
  placeholder: "",
  phoneCode: 234,
  value: ""
};

FormInput.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  phoneCode: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  onClick: PropTypes.func
};
