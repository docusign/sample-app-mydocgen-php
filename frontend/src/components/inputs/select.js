import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { bool, string, arrayOf, number, oneOfType } from 'prop-types';
import _ from 'lodash';
import { useFormValues } from '../../services/formValues';

export const Select = ({
  label,
  controlId,
  className,
  required,
  placeholder,
  options,
}) => {
  const [message, setMessage] = useState();
  const { values, changeValue } = useFormValues();

  const updateMessage = (e) => {
    setMessage(e.target.validationMessage);
  };
  const handleChange = (e) => {
    updateMessage(e);
    changeValue(controlId, e.target.value);
  };

  return (
    <Form.Group className={className} controlId={controlId}>
      <Form.Label className={required && 'required'}>{label}</Form.Label>
      <Form.Select
        required={required}
        onInvalid={updateMessage}
        onChange={handleChange}
        name={controlId}
        value={_.get(values, controlId) ?? ''}
      >
        {placeholder && (
          <option className='placeholder' value='' disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={`${controlId}${o}`}>{o}</option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type='invalid'>{message}</Form.Control.Feedback>
    </Form.Group>
  );
};

Select.propTypes = {
  label: string.isRequired,
  controlId: string.isRequired,
  className: string,
  required: bool,
  placeholder: string,
  options: arrayOf(oneOfType([string, number])).isRequired,
};

Select.defaultProps = {
  className: null,
  required: false,
  placeholder: null,
};
