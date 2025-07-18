import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUseStyles } from "react-jss";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setLoginStatus,
  setPassword,
  setUsername,
} from "../services/login/loginSlice";

const loginData = [
  {
    userName: "user1",
    password: "Password@123",
  },
  {
    userName: "user2",
    password: "Password@456",
  },
  {
    userName: "user3",
    password: "Password@789",
  },
];

const useStyles = createUseStyles({
  container: {
    maxWidth: 400,
    margin: "40px auto",
    padding: 24,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 24,
    textAlign: "center",
    color: "#666",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    fontWeight: 500,
  },
  input: {
    padding: 8,
    border: "1px solid #ccc",
    borderRadius: 4,
    fontSize: 16,
  },
  error: {
    color: "#d32f2f",
    fontSize: 14,
    marginTop: 2,
  },
  button: {
    padding: 10,
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    marginTop: 8,
    "&:hover": {
      background: "#1565c0",
    },
  },
});

const Login = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Must contain an uppercase letter")
        .matches(/[a-z]/, "Must contain a lowercase letter")
        .matches(/[0-9]/, "Must contain a number")
        .matches(/[@$!%*#?&]/, "Must contain a special character"),
    }),
    onSubmit: (values) => {
      const user = loginData.find(
        (user) =>
          user.userName === values.userName && user.password === values.password
      );
      dispatch(setUsername(values.userName));
      dispatch(setPassword(values.password));
      if (user) {
        navigate("/products");
        dispatch(setLoginStatus(true));
      } else {
        formik.setFieldError("password", "Invalid username or password");
      }
    },
  });

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Login Page</h1>
      <p className={classes.subtitle}>
        Please enter your credentials to log in.
      </p>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <div className={classes.field}>
          <label htmlFor="username" className={classes.label}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className={classes.input}
          />
          {formik.touched.userName && formik.errors.userName ? (
            <div className={classes.error}>{formik.errors.userName}</div>
          ) : null}
        </div>
        <div className={classes.field} style={{ position: "relative" }}>
          <label htmlFor="password" className={classes.label}>
            Password:
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className={classes.input}
            style={{ paddingRight: 36 }}
          />
          <span
            onClick={toggleVisibility}
            style={{
              position: "absolute",
              top: 34,
              right: 12,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              height: 24,
            }}
            tabIndex={0}
            aria-label={showPassword ? "Hide password" : "Show password"}
            role="button"
          >
            {showPassword ? (
              <AiFillEye size={22} />
            ) : (
              <AiFillEyeInvisible size={22} />
            )}
          </span>
          {formik.touched.password && formik.errors.password ? (
            <div className={classes.error}>{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit" className={classes.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
