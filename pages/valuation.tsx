import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import "animate.css"
import { HiOutlineSearch } from "react-icons/hi"
import { BsQuestionCircle } from "react-icons/bs"

import PriceCard from "../components/PriceCard";


const ValuationPage: NextPage = ({ prices }: any) => {
    const [ethPrice, setETHPrice] = useState("");
    const [usdPrice, setUSDPrice] = useState("");
    const [sandPrice, setSANDPrice] = useState("");
    const [name, setName] = useState("");
    const [tokenID, setTokenID] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [openseaLink, setOpenseaLink] = useState("");
    const [sandboxLink, setSandboxLink] = useState("");

    const [idProcessing, setIdProcessing] = useState(false);
    const [coordinatesProcessing, setCoordinatesProcessing] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [idError, setIdError] = useState("");
    const [coordinatesError, setCoordinatesError] = useState("");


    const convertPrices = (eth: number) => {
        const ethUSD = prices.ethereum.usd;
        const sandUSD = prices["the-sandbox"].usd;
        const USDfromETH = Math.round(eth * ethUSD);
        const SANDfromETH = Math.round(USDfromETH / sandUSD);
        return [USDfromETH, SANDfromETH]
    }

    const handleCoordinatesSubmit = async (ev: any) => {
        ev.preventDefault();

        const X = (document.getElementById('X') as HTMLInputElement).value
        const Y = (document.getElementById('Y') as HTMLInputElement).value

        setCoordinatesProcessing(true);
        setUSDPrice("")
        setSANDPrice("")
        setImageLink("")

        try {
            const res = await fetch("/api/getLandData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ X: X, Y: Y })
            });
            const data = await res.json()
            if (data.err) {
                setCoordinatesError("Not enough data yet")
                setShowCard(false);
            } else {
                setName(data.name);
                setTokenID(data.tokenId);
                setImageLink(data.images.image_url)
                setOpenseaLink(data.opensea_link)
                setSandboxLink(data.external_link)
                const price = data.prices.predicted_price;
                const [USDfromETH, SANDfromETH] = convertPrices(price)
                setETHPrice(price.toLocaleString({ maximumFractionDigits: 4 }))
                setSANDPrice(SANDfromETH.toLocaleString())
                setUSDPrice(USDfromETH.toLocaleString())
                setShowCard(true);
            }
            setCoordinatesProcessing(false);

        } catch (e) {
            setCoordinatesError("Something went wrong, please try again later");
            setShowCard(false);
            setCoordinatesProcessing(false);
        }

    }

    const handleIDSubmit = async (ev: any) => {
        ev.preventDefault();

        const tokenID = (document.getElementById('tokenID') as HTMLInputElement).value

        setIdProcessing(true);
        setUSDPrice("")
        setSANDPrice("")
        setImageLink("")

        try {
            const res = await fetch("/api/getLandData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ tokenID: tokenID })
            });
            const data = await res.json()
            if (data.err) {
                setIdError("Not enough data yet")
                setShowCard(false);
            } else {
                setName(data.name);
                setTokenID(data.tokenId);
                setImageLink(data.images.image_url)
                setOpenseaLink(data.opensea_link)
                setSandboxLink(data.external_link)
                const price = data.prices.predicted_price;
                const [USDfromETH, SANDfromETH] = convertPrices(price)
                setETHPrice(price.toLocaleString({ maximumFractionDigits: 4 }))
                setSANDPrice(SANDfromETH.toLocaleString())
                setUSDPrice(USDfromETH.toLocaleString())
                setShowCard(true);
            }
            setIdProcessing(false);

        } catch (e) {
            setIdError("Something went wrong, please try again later");
            setShowCard(false);
            setIdProcessing(false);
        }
    }

    return (
        <>
            <Head>
                <title>MGH - LAND valuation</title>
                <meta name="description" content="Governance of metaverse related items, fair valuation and minting of NFT backed tokens and provision of metaverse market data." />
            </Head>

            {/* <div className="h-full w-full flex flex-row items-center justify-evenly mt-8 xl:mt-0"> */}
                <div className="w-full flex flex-col items-center justify-start space-y-10 max-w-5xl mt-8 xl:mt-0">

                    <div className="flex flex-col items-start border-t border-l border-opacity-20 shadow-blck rounded-xl p-5 w-full bg-grey-dark bg-opacity-30 text-left">
                        <h2 className="text-transparent bg-clip-text bg-gradient-to-b from-blue-500 via-green-400 to-green-500">LAND Valuation</h2>
                        <p className={`text-lg xl:text-xl font-medium text-gray-200 pt-0 sm:pt-5`}>Find the real value of The Sandbox LANDs with our machine learning pricing algorithm.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 space-x-0 sm:space-x-5 md:space-x-10 items-stretch justify-between w-full">

                        <div className="flex flex-col justify-start lg:justify-between max-w-full sm:max-w-md w-full space-y-5 md:space-y-10 lg:space-y-5">

                            <div className="flex flex-col items-start border-t border-l border-opacity-20 shadow-blck rounded-xl p-5 w-full bg-grey-dark bg-opacity-30 text-left">
                                <div className="relative flex flex-wrap items-center mb-2 pl-2 text-left w-full max-w-sm">
                                    <p className="font-medium text-gray-300 pt-1">Find by Token ID</p>
                                    <BsQuestionCircle className="text-gray-300 cursor-pointer peer ml-3" />
                                    <p className="absolute -top-7 -left-6 xs:left-0 pl-2 px-2 py-1 rounded-lg bg-black bg-opacity-10 backdrop-filter backdrop-blur font-medium text-xs text-gray-400 hidden peer-hover:block w-70">Find LAND on Opensea &gt; Details &gt; Token ID</p>
                                </div>
                                <form onSubmit={handleIDSubmit} onInput={() => { setIdError(""); setCoordinatesError("") }} className="relative flex items-center w-full rounded-xl max-w-sm">
                                    <input required id="tokenID" type="text" placeholder="e.g. 72792" className={`bg-transparent w-full text-white font-medium p-4 focus:outline-none border ${idError ? "border-red-500 border-opacity-100" : "border-opacity-40 "} hover:border-opacity-100 focus:border-opacity-100 transition duration-300 ease-in-out rounded-xl placeholder-white placeholder-opacity-75`} />

                                    <button type="submit" className="absolute flex items-center justify-around bg-gray-200 hover:bg-white shadow-black hover:shadow-button transition ease-in-out duration-500 right-0 h-4/5 rounded-lg mr-1.5 w-12 xs:w-16 sm:w-12 lg:w-28">
                                        <svg className={`${idProcessing ? "block" : "hidden"} animate-spin-slow h-6 w-6 border-4 border-t-gray-300 border-l-gray-300 border-gray-800 rounded-full " viewBox="0 0 24 24`} />
                                        <span className="text-black font-medium pt-1 hidden lg:block">Search</span>
                                        <HiOutlineSearch className={`${idProcessing ? "hidden" : "block"} lg:hidden text-2xl`} />
                                    </button>
                                </form>
                                <p className="font-medium text-xs text-red-500 mt-1 pl-2 text-left w-full max-w-sm">{idError}</p>
                            </div>


                            <div className="flex flex-col items-start border-t border-l border-opacity-20 shadow-blak rounded-xl p-5 w-full bg-grey-dark bg-opacity-30 text-left">
                                <p className="font-medium  text-gray-300 mb-2 pl-2 text-left w-full max-w-sm">Find by Coordinates</p>
                                <form onSubmit={handleCoordinatesSubmit} onInput={() => { setIdError(""); setCoordinatesError("") }} className="relative flex items-stretch justify-between space-x-3 lg:space-x-5 w-full rounded-xl max-w-sm pr-2">
                                    <input required id="X" type="text" placeholder="X" className={`bg-transparent w-full text-white font-medium p-4 focus:outline-none border ${coordinatesError ? "border-red-500 border-opacity-100" : "border-opacity-40 "} hover:border-opacity-100 focus:border-opacity-100 transition duration-300 ease-in-out rounded-xl placeholder-white placeholder-opacity-75`} />
                                    <input required id="Y" type="text" placeholder="Y" className={`bg-transparent w-full text-white font-medium p-4 focus:outline-none border ${coordinatesError ? "border-red-500 border-opacity-100" : "border-opacity-40 "} hover:border-opacity-100 focus:border-opacity-100 transition duration-300 ease-in-out rounded-xl placeholder-white placeholder-opacity-75`} />

                                    <button type="submit" className="flex flex-none items-center justify-around bg-gray-200 hover:bg-white transition ease-in-out duration-500 rounded-xl m-1 ml-2 lg:ml-1 shadow-black hover:shadow-button w-12 xs:w-16 sm:w-12 lg:w-28">
                                        <svg className={`${coordinatesProcessing ? "block" : "hidden"} animate-spin-slow h-6 w-6 border-4 border-t-gray-300 border-l-gray-300 border-gray-800 rounded-full " viewBox="0 0 24 24`} />
                                        <span className="text-black font-medium pt-1 hidden lg:block">Search</span>
                                        <HiOutlineSearch className={`${coordinatesProcessing ? "hidden" : "block"} lg:hidden text-2xl`} />
                                    </button>
                                </form>
                                <p className="font-medium text-xs text-red-500 mt-1 pl-2 text-left w-full max-w-sm">{coordinatesError}</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-start border-t border-l border-opacity-20 shadow-black rounded-xl p-5 w-full bg-grey-dark bg-opacity-30 text-left">
                            <PriceCard showCard={showCard} processing={idProcessing || coordinatesProcessing} name={name} imageLink={imageLink} openseaLink={openseaLink} sandboxLink={sandboxLink} tokenID={tokenID} ethPrice={ethPrice} sandPrice={sandPrice} usdPrice={usdPrice} />
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </>
    )
};

export async function getStaticProps() {
    const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cthe-sandbox&vs_currencies=usd")
    const prices = await res.json();

    return {
        props: {
            prices,
        },
    }
}

export default ValuationPage;
