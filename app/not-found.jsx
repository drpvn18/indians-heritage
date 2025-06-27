"use client";

import React from 'react';
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='my-[125px] text-center'>
            <p className='text-[32px] font-bold my-[30px]'>
                404: Page Not Found
            </p>
            <Link href="/" className='border-2 border-[var(--main-bg)] bg-[var(--main-bg)] rounded-[30px] text-white px-[20px] py-[10px]'>
                Return Home
            </Link>
        </div>
    )
}