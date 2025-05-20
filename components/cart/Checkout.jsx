
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

export default function Checkout({ openPlaceOrderPopup, setOpenPlaceOrderPopup }) {
    const [mobileScreenDetected, setMobileScreenDetected] = useState(0);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [timeToRedirect, setTimeToRedirect] = useState(7000);

    const [modalStyle, setModalStyle] = useState({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -65%)',
        width: '95%',
        maxWidth: '400px',
        bgcolor: 'background.paper',
        border: '2px solid #2CA966',
        borderRadius: '4px',
        outline: 'none',
        boxShadow: 24,
        p: "20px",
        zIndex: 9999
    });

    useEffect(() => {
        setMobileScreenDetected(window.innerWidth <= 640)
        const handleResize = () => {
            setMobileScreenDetected(window.innerWidth <= 640);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (!mobileScreenDetected) {
            setModalStyle({ ...modalStyle, "maxWidth": 650 });
        }
    }, [mobileScreenDetected])

    const handleClose = () => setOpenPlaceOrderPopup(false);

    useEffect(() => {
        let timer;

        if (openPlaceOrderPopup) {
            if (timeToRedirect <= 0) {
                setOrderPlaced(false);
                setOpenPlaceOrderPopup(false);
                handleRedirect()
                return;
            }

            timer = setTimeout(() => {
                setTimeToRedirect((prev) => prev - 1000);
            }, 1000);
        }

        return () => clearTimeout(timer);
    }, [timeToRedirect, openPlaceOrderPopup, orderPlaced]);

    const handleRedirect = () => {
        window.location.href = '/';
    }

    return (
        <div>
            <Modal
                open={openPlaceOrderPopup}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <div>
                        <div className='text-[20px] text-center my-2 text-gray-800'>
                            Hey, thanks for your interest.
                            <br />
                        </div>
                        <div className='text-[18px] text-center my-2 text-gray-800'>
                            {"We are launching our website soon."}
                        </div>
                        <div className='flex justify-center items-center'>
                            <button type='button' className='w-fit mt-4 outline-none border-[#2CA966] bg-[#2CA966] text-white cursor-pointer py-2 px-4 rounded-md hover:bg-[#EF5D29] hover:border-[#EF5D29]' onClick={handleRedirect}>
                                Continue Shopping
                            </button>
                        </div>
                        <div className='text-center mt-4 text-gray-500 font-medium'>
                            Redirecting to cart in {timeToRedirect / 1000} seconds
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}