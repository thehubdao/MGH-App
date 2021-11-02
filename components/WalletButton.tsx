import "animate.css"


const WalletButton = () => {

    return (
        <>
            <div className="relative w-52 flex items-center transform scale-90 xl:scale-100 justify-center cursor-pointer text-gray-200 font-medium text-xl rounded-xl p-3 px-5 bg-white bg-opacity-5 group shadow-black overflow-hidden transition ease-in-out duration-500">
                <div className="h-full w-full absolute bg-gradient-to-br transition-all ease-in-out duration-300 from-pink-600 to-blue-500 rounded-xl blur-2xl group-hover:blur-xl" />
                <span className="pt-1 z-10">Connect Wallet</span>
            </div>
        </>
    )
}


export default WalletButton
