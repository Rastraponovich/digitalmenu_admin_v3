import { Html } from "next/document"
import Head from "next/head"
import React, { memo, FC, ReactNode, useEffect, useState } from "react"
import Drawer from "../Drawer/Drawer"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import ProgressBar from "../ProgressBar/ProgressBar"

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <ProgressBar />
            <Drawer />
            {children}
            <Footer />
        </>
    )
}

export default memo(Layout)
