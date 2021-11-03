import "animate.css"
import { useState } from "react";

import NavItem from './NavItem';
import NetworkButton from "./NetworkButton"
import WalletButton from "./WalletButton"
import SmallScreenToolbar from "./SmallScreenToolbar"

import { HiMenuAlt4 } from "react-icons/hi"
import { MdClose } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux";



const Layout = ({ children }: any) => {

    return (
        <>
            <div className="flex flex-col w-screen h-full xl:h-screen pt-0 xl:pt-0 bg-grey-darkest overflow-hidden">

                <div className="h-72 w-72 rounded-full border bg-gradient-to-br from-blue-500 to-pink-600 blur-3xl fixed top-0 left-0 xl:top-20 xl:left-0.15 2xl:left-0.125 opacity-80"/>

                <div className="h-72 w-72 rounded-tl-full border bg-gradient-to-br from-blue-500 to-pink-600 blur-3xl fixed bottom-0 right-0 opacity-50"/>


                <SmallScreenToolbar />
                
                <div className="hidden xl:flex space-x-10 h-32 w-full items-center justify-between p-10">
                    <a href="/" className="hover:scale-110 transition-all duration-500 ease-in-out ">
                        <img src="/images/mgh_logo.png" className={` h-18 w-18`} />
                    </a>

                    <div className="flex space-x-10">
                        <NetworkButton />
                        <WalletButton />
                    </div>
                </div>

                <div className="flex w-full justify-end h-full">

                    <div className="hidden xl:flex h-full w-1/6 max-w-sm min-w-max flex-col items-start p-5 pt-16">
                        <div className="space-y-6 flex flex-col w-full">
                            <NavItem text="Home" link="/" />
                            <NavItem text="Swap" link="/swap" />
                            <NavItem text="Liquidity" link="/stake" />
                            <NavItem text="NFT Pools" link="/pools" />
                            <NavItem text="LAND Valuation" link="/valuation" />
                        </div>
                    </div>

                    <main className="w-full h-full pt-24 sm:pt-28 md:pt-32 lg:pt-24 xl:pt-10 p-6 sm:p-10 min-h-screen flex items-start sm:items-center xl:min-h-full flex-grow overflow-scroll overscroll-contain animate__animated animate__slideInRight border-l border-t border-opacity-0 xl:border-opacity-20 rounded-none xl:rounded-tl-3xl self-end  bg-grey-dark bg-opacity-30 shadow-black ">
                        {children}
                    </main>

                </div>

            </div>


        </>
    )
}


export default Layout
