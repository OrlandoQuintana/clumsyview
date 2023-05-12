// pages/[id].js

import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import { fetchNFTs, helperFunctions } from "../helpers/fetchNFTsHelper";
import DisplayGhosts from "../components/DisplayGhosts";
import DisplayPlots from "../components/DisplayPlots";
import DisplayWatches from "../components/DisplayWatches";
import CategoryButtons from "../components/CategoryButtons";

export default function Wallet() {
    const router = useRouter();
    const { id } = router.query;

    const [walletAddress, setWalletAddress] = useState(id || "");
    const [nfts, setNfts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("ghosts");

    const handleAddressNotFound = () => {
        setMessage("404 ERROR: Address either a) does not exist or b) has no transactions associated with it. If using Eternl, select 'Show used/additional addresses' on the 'Receive' page and select a used address");
    };

    useEffect(() => {
        if (id) {
            setWalletAddress(id);
            fetchNfts(id);
        }
    }, [id]);

    const fetchNfts = async (address) => {
        setNfts(null);
        setMessage('');

        if (address) {
            try {
                let addressType;
                if (address.startsWith("stake")) {
                    addressType = "stake";
                } else if (address.startsWith("addr")) {
                    addressType = "payment";
                } else if (address.startsWith("$")) {
                    addressType = "handle";
                } else {
                    throw new Error("Invalid address format.");
                }

                const fetchedNfts = await fetchNFTs(address, addressType, handleAddressNotFound, helperFunctions);
                setNfts(fetchedNfts);
            } catch (error) {
                console.error("Error fetching NFTs:", error);
            }
        } else {
            console.error("Please enter a valid address");
        }
    };

    const selectCategory = (category) => {
        setSelectedCategory(category);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/${walletAddress}`);
    };

    return (
        <div>
            <h1>Clumsy View</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter wallet address, ADA Handle, or stake key"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {isLoading}
            {message && <div className="alert">{message}</div>}
            <div>
                {nfts && (
                    <>
                        <CategoryButtons
                            onSelectCategory={selectCategory}
                            ghostsCount={nfts.ghosts.length}
                            plotsCount={nfts.plots.length}
                            watchesCount={nfts.watches.length}
                        />
                        {selectedCategory === "ghosts" && <DisplayGhosts ghosts={nfts.ghosts} />}
                        {selectedCategory === "plots" && <DisplayPlots plots={nfts.plots} />}
                        {selectedCategory === "watches" && <DisplayWatches watches={nfts.watches} />}
                    </>
                )}
            </div>
        </div>
    );
}


