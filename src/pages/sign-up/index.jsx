import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMask } from "@react-input/mask";
import { signUpValidationSchema } from "@validation";
import { auth } from "@service";
import SignUpModal from "../../components/modal/sign-up-modal";

const Index = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState("");
    const inputRef = useMask({
        mask: "+998 (__) ___-__-__",
        replacement: { _: /\d/ },
    });

    const initialValues = {
        full_name: "",
        email: "",
        password: "",
        phone_number: "",
    };

    const handleSubmit = async (values) => {
        setEmail(values.email);
        const phone_number = values.phone_number.replace(/\D/g, "");
        const payload = { ...values, phone_number: `+${phone_number}` };
        try {
            const response = await auth.sign_up(payload);
            response.status === 200 && setModal(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <SignUpModal
                open={modal}
                handleClose={() => setModal(false)}
                email={email}
            />
            <div className="h-screen flex items-center justify-center flex-col gap-8 p-5">
                <h1 className="text-[35px] font-bold sm:text-[40px] md:text-[50px]">
                    Ro'yxatdan o'tish
                </h1>
                <div className="max-w-[600px]">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={signUpValidationSchema}
                        onSubmit={handleSubmit}>
                        {({ isSubmitting }) => (
                            <Form>
                                <Field
                                    name="full_name"
                                    type="text"
                                    as={TextField}
                                    label="Ful Name"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    helperText={
                                        <ErrorMessage
                                            name="full_name"
                                            component="p"
                                            className="text-[red] text-[15px]"
                                        />
                                    }
                                />
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
                                    name="phone_number"
                                    type="tel"
                                    as={TextField}
                                    label="Phone"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    inputRef={inputRef}
                                    helperText={
                                        <ErrorMessage
                                            name="phone_number"
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
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    fullWidth>
                                    {isSubmitting ? "Submitting" : "Submit"}
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
