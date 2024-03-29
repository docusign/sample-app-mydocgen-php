import React from 'react';
import { Form } from 'react-bootstrap';
import { arrayOf, bool, shape, string } from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { useFormValues } from '../../services/formValues';

export const Question = ({ className, controlId, question, options, disabled }) => {
  const { values, changeValue } = useFormValues();
  const value = _.get(values, controlId) ?? options[0].value;

  const handleChange = (e) => {
    changeValue(controlId, e.target.value);
  };

  return (
    <Form.Group className={classNames(className, { disabled })}>
      <Form.Label>{question}</Form.Label>
      {options.map((o) => (
        <Form.Check
          key={`${controlId}_${o.value}`}
          type='radio'
          name={controlId}
          label={o.title}
          value={o.value}
          id={`${controlId}_${o.value}`}
          onChange={handleChange}
          checked={value === o.value.toString()}
          disabled={disabled}
        />
      ))}
    </Form.Group>
  );
};

Question.propTypes = {
  className: string,
  controlId: string.isRequired,
  question: string.isRequired,
  options: arrayOf(shape({ title: string.isRequired, value: string.isRequired }))
    .isRequired,
  disabled: bool,
};

Question.defaultProps = {
  className: null,
  disabled: false,
};
