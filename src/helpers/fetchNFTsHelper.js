// Functions.js

import axios from "axios";

export const API_BASE_URL = "https://cardano-mainnet.blockfrost.io/api/v0";
export const API_KEY = "mainnet0NnL1ah5PTxMw6JsRYaxZn70w4i9RP6h";

export const hexToASCII = (hex) => {
    let str = "";
    for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
};

export const processAsset = (assetId, prefix, assetList) => {
    const idHex = assetId.slice(52);
    const idString = hexToASCII(idHex);
    const idMatch = idString.match(/\d+$/);

    if (!idMatch) {
        console.warn(`Failed to extract ID from asset: ${assetId}`);
        return;
    }

    const id = idMatch[0];

    const formattedAsset = {
        assetid: assetId,
        id: id,
    };

    assetList.push(formattedAsset);
};


const fetchAllAssetsByStakeAddress = async (
    stakeAddress,
    apiKey,
    url,
    page = 1,
    nfts = { ghosts: [], plots: [], watches: [] }
) => {
    console.log("fetchAllAssetsByStakeAddress called with stakeAddress:", stakeAddress);

    const fetchPageAssets = async (page) => {
        const response = await axios.get(
            `${url}/accounts/${stakeAddress}/addresses/assets?count=100&page=${page}`,
            {
                headers: {
                    'project_id': apiKey,
                },
            }
        );
        return response.data;
    };

    const pagesData = await Promise.all(
        Array(10)
            .fill(0)
            .map((_, index) => fetchPageAssets(page + index))
    );

    const newAssets = [].concat(...pagesData);

    if (newAssets.length === 0) {
        return nfts;
    } else {
        newAssets.forEach((asset) => {
            const assetId = asset.unit;

            if (assetId.startsWith('b000e9f3994de3226577b4d61280994e53c07948c8839d628f4a425a')) {
                processAsset(assetId, 'ghosts', nfts.ghosts);
            } else if (assetId.startsWith('b00041d7dc086d33e0f7777c4fccaf3ef06720543d4ff4e750d8f123')) {
                processAsset(assetId, 'plots', nfts.plots);
            } else if (assetId.startsWith('b000e43ed65c89e305bdb5920001558d9f642f3488154b2552a3ad63')) {
                processAsset(assetId, 'watches', nfts.watches);
            }
        });

        const sortedNfts = {
            ghosts: nfts.ghosts.sort((a, b) => parseInt(a.id) - parseInt(b.id)),
            plots: nfts.plots.sort((a, b) => parseInt(a.id) - parseInt(b.id)),
            watches: nfts.watches.sort((a, b) => parseInt(a.id) - parseInt(b.id)),
        };

        return fetchAllAssetsByStakeAddress(stakeAddress, apiKey, url, page + 10, sortedNfts);
    };
};



const fetchAllAssetsByPaymentAddress = async (
    paymentAddress,
    apiKey,
    url,
    onAddressNotFound,
    nfts = { ghosts: [], plots: [], watches: [] }
) => {

    const fetchAssets = async () => {
        try {
            const response = await axios.get(
                `${url}/addresses/${paymentAddress}`,
                {
                    headers: {
                        'project_id': apiKey,
                    },
                }
            );
            return response.data;

        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error("Address not found or has no transactions associated with it.");
                return { notFound: true };
            } else {
                console.error("Error fetching assets:", error.response ? error.response.data : error.message);
                return { amount: [] };
            }
        }
    };

    const assetsData = await fetchAssets();

    if (assetsData.notFound) {
        onAddressNotFound();
        return nfts;
    }

    return fetchAllAssetsByStakeAddress(assetsData.stake_address, API_KEY, API_BASE_URL)

};


const fetchAssetsByHandle = async (
    handleName,
    apiKey,
    url
) => {
    const policyID = 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a';

    if (handleName.length === 0) {
        throw new Error("Invalid handle name.");
    }

    const handleNameWithoutSymbol = handleName.substring(1);

    const assetName = Buffer.from(handleNameWithoutSymbol).toString('hex');

    const response = await axios.get(
        `${url}/assets/${policyID}${assetName}/addresses`,
        {
            headers: {
                'project_id': apiKey,
                'Content-Type': 'application/json',
            },
        }
    );
    const data = response.data;

    if (data && data.error) {
        throw new Error(data.error);
    }

    const [{ address }] = data;

    return fetchAllAssetsByPaymentAddress(address, API_KEY, API_BASE_URL)


};

export const helperFunctions = {
    fetchAllAssetsByPaymentAddress,
    fetchAllAssetsByStakeAddress,
    fetchAssetsByHandle,
};


export const fetchNFTs = async (address, addressType = "payment", onAddressNotFound, helperFunctions) => {

    try {
        let nfts;
        if (addressType === "stake") {
            nfts = await fetchAllAssetsByStakeAddress(address, API_KEY, API_BASE_URL);
        } else if (addressType === "payment") {
            nfts = await fetchAllAssetsByPaymentAddress(address, API_KEY, API_BASE_URL, onAddressNotFound);
        } else if (addressType === "handle") {
            nfts = await fetchAssetsByHandle(address, API_KEY, API_BASE_URL);
        } else {
            throw new Error("Invalid address type.");
        }


        console.log("Ghosts:", nfts.ghosts);
        console.log("Plots:", nfts.plots);
        console.log("Watches:", nfts.watches);

        if (nfts.ghosts.length === 0 && nfts.plots.length === 0 && nfts.watches.length === 0) {
            console.error("No NFTs found");
            // Handle the error or display a message accordingly
        } else {
            // Add your processing code here
        }

        return nfts;
    } catch (error) {
        console.error("Error fetching NFTs:", error);
        if (error.message === "Invalid address format.") {
            // Handle the error or display a message accordingly
        } else {
            // Handle the error or display a message accordingly
        }
        throw error;
    }
};
