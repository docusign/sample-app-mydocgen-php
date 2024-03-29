import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { bool, string } from 'prop-types';
import _ from 'lodash';
import { useFormValues } from '../../services/formValues';

export const CurrencyInput = ({ label, controlId, className, required, step }) => {
  const [message, setMessage] = useState();
  const { values, changeValue } = useFormValues();

  const updateMessage = (e) => {
    setMessage(e.target.validationMessage);
  };
  const handleChange = (e) => {
    updateMessage(e);
    changeValue(controlId, e.target.value ? parseFloat(e.target.value) : null);
  };

  return (
    <Form.Group className={className} controlId={controlId}>
      <Form.Label className={required && 'required'}>{label}</Form.Label>
      <InputGroup hasValidation>
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control
          required={required}
          type='number'
          placeholder='0.00'
          min='1'
          step={step}
          onChange={handleChange}
          onInvalid={updateMessage}
          name={controlId}
          value={_.get(values, controlId) ?? ''}
        />
        <Form.Control.Feedback type='invalid'>{message}</Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
};

CurrencyInput.propTypes = {
  label: string.isRequired,
  controlId: string.isRequired,
  className: string,
  required: bool,
  step: string,
};

CurrencyInput.defaultProps = {
  className: null,
  required: false,
  step: '0.01',
};
