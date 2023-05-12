// DisplayWatches.js

import React, { useEffect, useState } from "react";
//import { hexToASCII } from "../helpers/fetchNFTs";

const WatchSVG = ({ url }) => {
    return (
        <object
            type="image/svg+xml"
            data={url}
            style={{ width: "100%", height: "100%" }}
        />
    );
};


const DisplayWatches = ({ watches }) => {
    const [svgURLs, setSvgURLs] = useState([]);

    useEffect(() => {
        if (watches && watches.length > 0) {
            const urls = watches.map((watch) => {
                const watchID = watch.id;
                const url = `/watchSVGs/Ghostwatch${watchID}.svg`;
                return url;
            });
            setSvgURLs(urls);
        }
    }, [watches]);

    return (
        <div className={`watch-grid${svgURLs.length > 1 ? " multiple" : ""}`}>
            {svgURLs.map((url, index) => (
                <WatchSVG key={index} url={url} />
            ))}
        </div>
    );
};

export default DisplayWatches;
