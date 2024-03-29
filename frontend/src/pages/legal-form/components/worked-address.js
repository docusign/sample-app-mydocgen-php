import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { Address } from '../../../components';
import { useFormValues } from '../../../services/formValues';

const SAME_ADDRESS_ID = 'workedAddressSameAsEmployer';

export const WorkedAddress = () => {
  const { t } = useTranslation('LegalForm');
  const { values, changeValue } = useFormValues();
  return (
    <section>
      <h6>{t('WorkedAddress')}</h6>
      <Form.Check
        type='checkbox'
        label={t('WorkedAddressSameAsEmployer')}
        checked={values[SAME_ADDRESS_ID]}
        onChange={() => changeValue(SAME_ADDRESS_ID, !values[SAME_ADDRESS_ID])}
        id={SAME_ADDRESS_ID}
        name={SAME_ADDRESS_ID}
      />
      {!values[SAME_ADDRESS_ID] && <Address title='' prefix='workedAddress.' />}
    </section>
  );
};
