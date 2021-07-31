// import Input from "./Input";
// import Label from "./Label";
// import Button from "./Button";
// import { Formik, Form, ErrorMessage } from "formik";
// let classNames = require("classnames");

// const container = classNames([
//   "flex",
//   "w-full",
//   "h-screen",
//   "items-center",
//   "bg-yellow-500",
// ]);
// const containerLogin = classNames([
//   "px-8",
//   "pt-6",
//   "pb-8",
//   "mb-4",
//   "flex",
//   "flex-wrap",
//   "w-1/2"
// ]);
// const divContainer = classNames(["m-3", "w-full"]);

// export default function Login() {
//   let
//   return (
//     <div className={container}>
//       <div className={containerLogin}>
//         <Formik
//           initialValues={{ email: "", password: "" }}
//           validate={(values) => {console.log(values)
//             const errors = {};
//             errors.email = "";
//             if (!values.email) {
//               errors.email = "Required";
//             } else if (
//               !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//             ) {
//               errors.email = "Invalid email address";
//             }
//             return errors;
//           }}
//           onSubmit={(values, { setSubmitting }) => {
//             setTimeout(() => {
//               alert(JSON.stringify(values, null, 2));
//               setSubmitting(false);
//             }, 400);
//           }}
//         >
//           {({ isSubmitting }) => (
//             <Form className={divContainer}>
//               <div className={divContainer}>
//                 <Label label="Email" />
//                 <Input
//                   id="email"
//                   type={"email"}
//                   placeholder={"Username"}
//                   name="email"
//                 />
//                 <ErrorMessage name="email" component="div" />
//               </div>
//               <div className={divContainer}>
//                 <Label label="Password" />
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="******************"
//                   name="password"
//                 />
//                 <ErrorMessage name="password" component="div" />
//               </div>
//               <div className={divContainer}>
//                 <Button type="submit" label="Sign In" disabled={isSubmitting} />
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

let classNames = require("classnames");

const container = classNames([
  "flex",
  "w-full",
  "h-screen",
  "items-center",
  "bg-yellow-500",
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
  "bg-black":true,
  "hover:bg-blue-dark":true,
  "hover:bg-opacity-100":true,
  "text-yellow-500":true,
  "bg-opacity-70":true,
   "font-bold":true,
   "py-2":true,
   "px-4":true,
   "rounded":true,
});

const Login = () => (
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
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
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
                <Field type="password" name="password" className={inputClass} />
                <ErrorMessage name="password" component="div" />
              </div>
              <div className={divContainer}>
                <button type="submit" className={buttonClass} disabled={isSubmitting}>
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

export default Login;
