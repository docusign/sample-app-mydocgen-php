import React, { useEffect, useRef, useState } from 'react';
import { Card, Form, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { func } from 'prop-types';
import { useFormValues } from '../../../services/formValues';
import { PrimaryButton } from '../../../components';

export const Recipients = ({ onNext }) => {
  const { t } = useTranslation('HrLetter');
  const {
    values: { recipients },
    changeValue,
  } = useFormValues();
  const selectAllRef = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    changeValue(
      'recipients',
      recipients.map((r) =>
        r.email === e.target.id ? { ...r, selected: e.target.checked } : r,
      ),
    );
  };

  const handleAllChange = (e) => {
    changeValue(
      'recipients',
      recipients.map((r) => ({ ...r, selected: e.target.checked })),
    );
  };

  const validate = () => {
    if (!recipients.some((r) => r.selected)) {
      setMessage('Please select one or more recipients');
      return false;
    }
    setMessage('');
    return true;
  };

  const handleNext = () => {
    setSubmitted(true);
    if (!validate()) {
      return;
    }
    onNext();
  };

  useEffect(() => {
    if (submitted) {
      validate();
    }
    if (selectAllRef.current) {
      const selected = recipients.filter((r) => r.selected);
      selectAllRef.current.indeterminate =
        selected.length > 0 && selected.length < recipients.length;
    }
  }, [submitted, recipients, selectAllRef.current]);

  return (
    <>
      <section>
        <Table>
          <thead>
            <tr>
              <th>
                <Form.Check.Input
                  id='selectAll'
                  checked={recipients.every((r) => r.selected)}
                  ref={selectAllRef}
                  onChange={handleAllChange}
                />
              </th>
              <th>{t('Recipients.Name')}</th>
              <th>{t('Recipients.Email')}</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map((r) => (
              <tr key={r.email}>
                <td>
                  <Form.Check.Input
                    checked={!!r.selected}
                    id={r.email}
                    onChange={handleChange}
                  />
                </td>
                <td>{r.name}</td>
                <td>{r.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {message && (
          <Form.Control.Feedback type='invalid' style={{ display: 'block' }}>
            {message}
          </Form.Control.Feedback>
        )}
      </section>
      <Card.Footer>
        <PrimaryButton text={t('Footer.Next')} hideArrow onClick={handleNext} />
      </Card.Footer>
    </>
  );
};

Recipients.propTypes = {
  onNext: func.isRequired,
};
