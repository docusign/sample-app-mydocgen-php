import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { bool, string } from 'prop-types';
import _ from 'lodash';
import { useFormValues } from '../../services/formValues';

export const PercentInput = ({ label, controlId, className, required }) => {
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
        <Form.Control
          required={required}
          type='number'
          placeholder='0.00'
          min='0.00'
          step='0.01'
          max={100}
          onChange={handleChange}
          onInvalid={updateMessage}
          name={controlId}
          value={_.get(values, controlId) ?? ''}
        />
        <InputGroup.Text>%</InputGroup.Text>
        <Form.Control.Feedback type='invalid'>{message}</Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
};

PercentInput.propTypes = {
  label: string.isRequired,
  controlId: string.isRequired,
  className: string,
  required: bool,
};

PercentInput.defaultProps = {
  className: null,
  required: false,
};
