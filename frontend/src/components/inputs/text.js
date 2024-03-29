import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { bool, string } from 'prop-types';
import _ from 'lodash';
import iconInfo from '../../assets/img/icon-info.svg';
import { useFormValues } from '../../services/formValues';

export const Text = ({ label, controlId, className, required, placeholder, info }) => {
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
      {label && <Form.Label className={required && 'required'}>{label}</Form.Label>}
      <Form.Control
        as='textarea'
        rows={3}
        required={required}
        placeholder={placeholder}
        onInvalid={updateMessage}
        onChange={handleChange}
        name={controlId}
        value={_.get(values, controlId) ?? ''}
      />
      {info && (
        <Form.Text>
          <img src={iconInfo} alt='' />
          {info}
        </Form.Text>
      )}
      <Form.Control.Feedback type='invalid'>{message}</Form.Control.Feedback>
    </Form.Group>
  );
};

Text.propTypes = {
  label: string,
  controlId: string.isRequired,
  className: string,
  required: bool,
  placeholder: string,
  info: string,
};

Text.defaultProps = {
  label: null,
  className: null,
  required: false,
  placeholder: null,
  info: null,
};
