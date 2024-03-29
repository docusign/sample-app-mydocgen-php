import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { bool, string } from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { useFormValues } from '../../services/formValues';

export const Input = ({
  label,
  controlId,
  className,
  required,
  placeholder,
  type,
  pattern,
  disabled,
}) => {
  const [message, setMessage] = useState();
  const { values, changeValue } = useFormValues();

  const updateMessage = (e) => {
    setMessage(
      e.target.validity.patternMismatch
        ? 'Please enter a valid value'
        : e.target.validationMessage,
    );
  };
  const handleChange = (e) => {
    updateMessage(e);
    changeValue(controlId, e.target.value);
  };

  return (
    <Form.Group className={classNames(className, { disabled })} controlId={controlId}>
      <Form.Label className={required && 'required'}>{label}</Form.Label>
      <Form.Control
        type={type}
        required={required}
        placeholder={placeholder}
        pattern={pattern}
        onInvalid={updateMessage}
        onChange={handleChange}
        name={controlId}
        value={_.get(values, controlId) ?? ''}
        disabled={disabled}
      />
      <Form.Control.Feedback type='invalid'>{message}</Form.Control.Feedback>
    </Form.Group>
  );
};

Input.propTypes = {
  label: string.isRequired,
  controlId: string.isRequired,
  className: string,
  required: bool,
  placeholder: string,
  type: string,
  pattern: string,
  disabled: bool,
};

Input.defaultProps = {
  className: null,
  required: false,
  placeholder: null,
  type: 'text',
  pattern: null,
  disabled: false,
};
