import React from "react";
import { useHistory} from "react-router-dom";
// ,useState,useEffect 
import { Formik, Form, Field, ErrorMessage } from "formik";
let classNames = require("classnames");

const container = classNames([
  "flex",
  "w-full",
  "h-screen",
  "items-center",
  "bg-purple-800",
]);
const containerLogin = classNames([
  "px-8",
  "pt-6",
  "pb-8",
  "mb-4",
  "flex",
  "flex-wrap",
  "w-1/2",
]);
const divContainer = classNames(["m-3", "w-full"]);

const inputClass = classNames({
  shadow: true,
  "appearance-none": true,
  border: true,
  rounded: true,
  "w-full": true,
  "py-2": true,
  "px-3": true,
  "text-grey-darker": true,
});

let buttonClass = classNames({
  "bg-black": true,
  "hover:bg-blue-dark": true,
  "hover:bg-opacity-100": true,
  "text-yellow-500": true,
  "bg-opacity-70": true,
  "font-bold": true,
  "py-2": true,
  "px-4": true,
  rounded: true,
});


function Login() {
  let history = useHistory();

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={async (values) => {
          if (values.email.trim() !== "" && values.password.trim() !== "")
            history.push("/movies");
        }}
      >
        {({ isSubmitting }) => (
          <div className={container}>
            <div className={containerLogin}>
              <Form className={divContainer}>
                <div className={divContainer}>
                  <Field type="email" name="email" className={inputClass} />
                  <ErrorMessage name="email" component="div" />
                </div>
                <div className={divContainer}>
                  <Field
                    type="password"
                    name="password"
                    className={inputClass}
                  />
                  <ErrorMessage name="password" component="div" />
                </div>
                <div className={divContainer}>
                  <button
                    type="submit"
                    className={buttonClass}
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
export default Login;
