import React from 'react';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormValues } from '../../../services/formValues';

export const SentList = () => {
  const { t } = useTranslation('HrLetter');
  const {
    values: { recipients },
  } = useFormValues();

  return (
    <section>
      <Table>
        <thead>
          <tr>
            <th>{t('Success.Name')}</th>
            <th>{t('Success.Email')}</th>
          </tr>
        </thead>
        <tbody>
          {recipients
            .filter((r) => r.selected)
            .map((r) => (
              <tr key={r.email}>
                <td>{r.name}</td>
                <td>{r.emailUpdated}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </section>
  );
};
