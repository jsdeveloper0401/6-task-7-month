import * as Yup from "yup";
// ===================AUT===================
export const signUpValidationSchema = Yup.object().shape({
    full_name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
            "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter"
        )
        .required("Password is required"),
    phone_number: Yup.string()
        .min(19, "Invalid phone number")
        .required("Phone is required"),
});
export const signInValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
            "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter"
        )
        .required("Password is required"),
});

// validation.js
export const updatePassValidationSchema = Yup.object().shape({
    // sizning validatsiya qoidalaringiz
});
