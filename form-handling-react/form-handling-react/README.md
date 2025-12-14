
# Implementing Form Handling in React with Controlled Components and Formik

## Objective
Learn to manage form data in React using controlled components and then transition to using Formik for more complex form handling, focusing on a practical application involving a user registration form.

---

## Project Overview
This project demonstrates two approaches to form handling in React:

1. **Controlled Components**: Manual state management using React's `useState`.
2. **Formik Integration**: Leveraging Formik and Yup for advanced form state management and validation.

Both approaches implement a user registration form with fields for username, email, and password, including basic validation.

---

## Step 1: Set Up the React Project

### Project Setup

```bash
npm create vite@latest form-handling-react -- --template react
cd form-handling-react
npm install
```

---

## Step 2: User Registration Form Using Controlled Components

- **Component:** `RegistrationForm` (`src/components/RegistrationForm.jsx`)
- **Features:**
	- Fields: username, email, password
	- State managed with `useState`
	- Basic validation: all fields required

---

## Step 3: Transition to Formik for Form Handling

### Integrate Formik

```bash
npm install formik yup
```

- **Component:** `FormikForm` (`src/components/formikForm.js`)
- **Features:**
	- Uses Formik's `Form`, `Field`, and `ErrorMessage`
	- Validation handled by Yup
	- Same fields and validation as the controlled form

---

## How to Run

```bash
npm run dev
```

Open your browser to the provided local address to view the registration forms.

---

## Learning Outcomes
- Understand the difference between controlled components and Formik-managed forms
- Learn to implement validation manually and with Yup
- Gain experience in refactoring React forms for scalability

---

## Mock API
This project can be extended to submit registration data to a mock API endpoint for further practice.
