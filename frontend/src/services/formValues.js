import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes, { string } from 'prop-types';
import _ from 'lodash';

const FormValuesContext = React.createContext({});

export const FormValues = ({ formName, children }) => {
  const [values, setValues] = useState();

  const changeValue = useCallback(
    (name, value) => {
      const newValues = { ...values };
      _.set(newValues, name, value);
      setValues(newValues);
    },
    [values],
  );

  const loadJson = async () => {
    try {
      const response = await fetch(`/data/${formName}.json`);
      setValues(await response.json());
    } catch (e) {
      setValues({});
    }
  };

  useEffect(() => {
    loadJson();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <FormValuesContext.Provider value={{ values, changeValue }}>
      {!!values && children}
    </FormValuesContext.Provider>
  );
};

FormValues.propTypes = {
  formName: string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
};

export const useFormValues = () => useContext(FormValuesContext);
