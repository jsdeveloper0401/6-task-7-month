import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { auth } from "@service";
import { useNavigate } from "react-router-dom";

const ForgotPasswordModal = ({ open, handleClose, email }) => {
    const [code, setCode] = useState("");
    const [secondsLeft, setSecondsLeft] = useState(60);
    const navigate = useNavigate();

    useEffect(() => {
        let timer = null;
        if (open) {
            timer = setInterval(() => {
                setSecondsLeft((prevSeconds) => prevSeconds - 1);
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [open]);

    useEffect(() => {
        if (secondsLeft === 0) {
            handleClose();
        }
    }, [secondsLeft, handleClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { code, email };
            const response = await auth.auth_verify(payload);
            if (response.status === 201) {
                navigate("/signin");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description">
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    minWidth: 450,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                }}>
                <Typography
                    id="keep-mounted-modal-title"
                    className="text-center"
                    variant="h6"
                    component="h2">
                    Parolni kiriting
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Parolni kiriting"
                        id="fullWidth"
                        sx={{ marginY: "20px" }}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <Typography variant="body1" component="p" className="my-4">
                        {`Time left: ${secondsLeft} seconds`}
                    </Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth>
                        Submit
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default ForgotPasswordModal;
