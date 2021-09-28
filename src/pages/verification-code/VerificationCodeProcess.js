import React, { useRef, useState } from "react";
import axios from "axios";
import "./VerificationCodeProcess.scss";
import { http } from "../../utils/http";
import { useHistory } from "react-router";

const VerificationCodeProcess = () => {
  const [formData, setFormData] = useState({});
  const history = useHistory();
  const code2Ref = useRef();
  const code3Ref = useRef();
  const code4Ref = useRef();
  const code5Ref = useRef();
  const code6Ref = useRef();
  const submitBtnRef = useRef();

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event, ref, typed) => {
    const { name, value, maxLength } = event.target;
    console.log("isFormValid 2", name, value);
    const onlyNumber = Number(value);

    console.log("onlyNumber", onlyNumber, Number.isNaN(onlyNumber));

    if (Number.isNaN(onlyNumber)) {
      return setFormData({
        ...formData,
        [name]: "",
      });
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    if (value.length >= 1 && ref) {
      console.log("ref", ref);
      ref.current.focus();
    }
    setErrorMessage("");
  };

  const verifyCodeHandler = async () => {
    try {
      setErrorMessage("");
      let verificationCode = "";
      for (let key in formData) {
        verificationCode = verificationCode + formData[key];
      }
      await http.post("/user/verify-code", {
        verificationCode: Number(verificationCode),
      });
      history.push("/success");
    } catch (errorResponse) {
      const errorMessage =
        errorResponse?.response?.data?.error?.message ||
        "An error occured. Please try again later.";
      setErrorMessage(errorMessage);
    }
  };

  const isFormValid =
    formData?.code1 &&
    formData?.code2 &&
    formData?.code3 &&
    formData?.code4 &&
    formData?.code5 &&
    formData?.code6;

  console.log("isFormValid", formData);

  return (
    <div className="verification-wrapper">
      <form onsubmit="onSubmit(event)" className="content-area">
        <h4>Your verification code is: 232323</h4>
        <h2>Verification code:</h2>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <div>
          <input
            name="code1"
            className="code-input"
            required
            onChange={(event) => handleInputChange(event, code2Ref)}
            value={formData?.code1}
            maxLength={1}
          />
          <input
            ref={code2Ref}
            name="code2"
            className="code-input"
            required
            onChange={(event) => handleInputChange(event, code3Ref)}
            value={formData?.code2}
            maxLength={1}
          />
          <input
            ref={code3Ref}
            name="code3"
            className="code-input"
            required
            onChange={(event) => handleInputChange(event, code4Ref)}
            value={formData?.code3}
            maxLength={1}
          />
          <input
            ref={code4Ref}
            name="code4"
            className="code-input"
            required
            onChange={(event) => handleInputChange(event, code5Ref)}
            value={formData?.code4}
            maxLength={1}
          />
          <input
            ref={code5Ref}
            name="code5"
            className="code-input"
            required
            onChange={(event) => handleInputChange(event, code6Ref)}
            value={formData?.code5}
            maxLength={1}
          />
          <input
            ref={code6Ref}
            name="code6"
            className="code-input"
            required
            onChange={(event) => handleInputChange(event, submitBtnRef)}
            value={formData?.code6}
            maxLength={1}
          />
        </div>
        <button
          ref={submitBtnRef}
          onClick={verifyCodeHandler}
          type="button"
          disabled={!isFormValid}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default VerificationCodeProcess;
