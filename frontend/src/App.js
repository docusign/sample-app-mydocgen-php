import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './assets/scss/main.scss';

import { useLoginMutation } from './api';

import { getAuthToken, setAuthToken } from './services/localRepository';

import { LegalForm } from './pages/legal-form';
import { PersonalLoan } from './pages/personal-loan';
import { HrLetter } from './pages/hr-letter';

import { Layout } from './components';
import { Home } from './pages/home';

const App = () => {
  const [login] = useLoginMutation();

  const handleLogIn = async () => {
    const token = getAuthToken();
    if (!token) {
      const response = await login({
        login: process.env.REACT_APP_MANAGER_LOGIN,
        password: process.env.REACT_APP_MANAGER_PASSWORD,
      });
      setAuthToken(response.data.token);
    }
  };

  useEffect(() => {
    handleLogIn();
  }, []);

  const routes = (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/personal_loan' element={<PersonalLoan />} />
      <Route path='/hr_letter' element={<HrLetter />} on />
      <Route path='/legal_form' element={<LegalForm />} />
    </Routes>
  );

  return (
    <Suspense fallback=''>
      <Layout>{routes}</Layout>
    </Suspense>
  );
};

export default App;
