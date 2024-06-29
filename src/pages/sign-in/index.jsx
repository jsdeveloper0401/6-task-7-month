import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { signInValidationSchema } from "@validation";
import ForgotPasswordModal from "../../pages/forgot-password";
import { auth } from "@service";
import { ToastContainer } from "react-toastify";
// import Notification from "../../utils/notification";
import { useNavigate } from "react-router-dom";

const Index = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState("");
    const initialValues = {
        email: "",
        password: "",
    };
    const navigate = useNavigate();

    const handleForgotPassword = async () => {
        try {
            const response = await auth.send_reset_code({ email });
            if (response.status === 200) {
                setModal(true);
            }
        } catch (error) {
            console.log(error);
            Notification({ title: "Xatolik mavjud", type: "error" });
        }
    };

    const handleSubmit = async (values) => {
        setEmail(values.email);
        try {
            const response = await auth.sign_in(values);
            if (response.status === 200) {
                navigate("/main");
                setDataToCookie("id", response?.data.id);
                setDataToCookie("token", response?.data.access_token);
                Notification({
                    title: "Muvaffaqiyatli yakunlandi",
                    type: "success",
                });
            }
        } catch (error) {
            console.log(error);
            Notification({ title: "Xatolik mavjud", type: "error" });
        }
    };

    return (
        <>
            <ToastContainer />
            <ForgotPasswordModal
                open={modal}
                handleClose={() => setModal(false)}
                email={email}
            />
            <div className="h-screen flex items-center justify-center flex-col gap-8 p-5">
                <h1 className="text-[35px] font-bold sm:text-[40px] md:text-[50px]">
                    Tizimga kirish
                </h1>
                <div className="max-w-[600px]">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={signInValidationSchema}
                        onSubmit={handleSubmit}>
                        {({ isSubmitting }) => (
                            <Form>
                                <Field
                                    name="email"
                                    type="email"
                                    as={TextField}
                                    label="Email"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    helperText={
                                        <ErrorMessage
                                            name="email"
                                            component="p"
                                            className="text-[red] text-[15px]"
                                        />
                                    }
                                />
                                <Field
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    as={TextField}
                                    label="Password"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    helperText={
                                        <ErrorMessage
                                            name="password"
                                            component="p"
                                            className="text-[red] text-[15px]"
                                        />
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                    edge="end">
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <p
                                    className="mb-3 cursor-pointer hover:text-blue"
                                    onClick={handleForgotPassword}>
                                    Parolni unutdingizmi ?
                                </p>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    fullWidth>
                                    {isSubmitting
                                        ? "Submitting"
                                        : "Tizimga kirish"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default Index;
