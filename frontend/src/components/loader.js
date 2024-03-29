import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const LoadingIndicator = ({ message }) => (
    <div className="d-flex gap-3 spinner">
      <Spinner animation="border" role="status" />
      <div className="d-flex justify-content-center align-items-center">
        <p className="m-0">{message}</p>
      </div>
    </div>
  )

export const Loader = ({ show }) => {
  const toastId = useRef(null);
  const { t } = useTranslation("Common");

  const notify = () => {
    toastId.current = toast(<LoadingIndicator message={t("LoaderMessage")} />, {
      toastId: "loading-toast",
    });
  };

  const dismiss = () => toast.dismiss(toastId.current);
  useEffect(() => {
    if (show) {
      notify();
    } else {
      dismiss();
    }
  }, [show]);

  return (
    <ToastContainer
      position="top-center"
      autoClose={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      theme="dark"
    />
  );
}

LoadingIndicator.propTypes = {
  message: PropTypes.string.isRequired,
};

Loader.propTypes = {
  show: PropTypes.bool.isRequired,
};
