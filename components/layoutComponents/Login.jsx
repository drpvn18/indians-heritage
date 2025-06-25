"use client";

import { Loader, X } from "lucide-react";
import React, { useState } from "react";
import styles from "./../../styles/layoutComponents/LoginSidebar.module.css";
import { Box, Modal } from "@mui/material";

const modal_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    maxWidth: '400px',
    bgcolor: 'background.paper',
    border: '2px solid #2CA966',
    borderRadius: '4px',
    outline: 'none',
    boxShadow: 24,
    p: "20px",
    zIndex: 9999
};

export default function Login({ showLoginPopup, setShowLoginPopup }) {
    const [loginStatus, setLoginStatus] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        setLoginStatus(true);
        e.preventDefault();
        setLoginMessage("");
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify(formData)
            });

            const response = await res?.json();
            console.log(response);
            if (response?.status === 200) {
                const jwt_token = response?.jwt_token;
                document.cookie = `token=${jwt_token}; path=/`

                setLoginMessage("success");
                setLoginStatus(false);
                setTimeout(() => {
                    window.location.reload();
                    setShowLoginPopup(false);
                }, 1000);
            } else {
                console.log("not authenticated...!");
                setLoginStatus(false);
                setLoginMessage("failed");
            }
        } catch (error) {
            setLoginMessage("failed");
            console.log(error);
            setLoginStatus(false);
        }
    }

    const handleClose = () => setShowLoginPopup(false);

    return (
        <Modal
            open={showLoginPopup}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modal_style}>
                <div>
                    <div className={styles.loginTitle}>
                        <span className='text-2xl font-semibold'>Sign in</span>
                        <div onClick={() => setShowLoginPopup(false)} className='flex cursor-pointer'>
                            <X />Close
                        </div>
                    </div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formElement}>
                            <label>Email address<span className='pl-1 text-red-600'>*</span></label><br />
                            <input name='email' type='email' value={formData.username} onChange={(e) => handleChange(e)} />
                        </div>

                        <div className={styles.formElement}>
                            <label>Password<span className='pl-1 text-red-600'>*</span></label><br />
                            <input name='password' type='password' value={formData.password} onChange={(e) => handleChange(e)} />
                        </div>
                        {
                            loginStatus ? (
                                <div className="flex flex-col justify-center items-center my-[15%]" >
                                    <div className="w-6 h-6 animate-spin text-black">
                                        <Loader />
                                    </div>
                                    <p className="text-[18px] mt-[5px]">
                                        Signing In
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.formElement}>
                                    <button className={styles.loginBtn}>LOG IN</button>
                                </div>
                            )
                        }
                        <div>
                            {
                                loginMessage === "success" ? (
                                    <p className="text-[18px] text-[var(--secondary-bg)] text-center">
                                        Login Successful...!
                                    </p>
                                ) : ""
                            }
                            {
                                loginMessage === "failed" ? (
                                    <p className="text-[18px] text-red-500 text-center">
                                        Login failed. Please check your credentials.
                                    </p>
                                ) : ""
                            }
                        </div>
                    </form>
                </div>
            </Box>
        </Modal>
    );
}