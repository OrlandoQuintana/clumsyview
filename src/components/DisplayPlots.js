// DisplayPlots.js

import React, { useEffect, useState } from "react";
//import { hexToASCII } from "../helpers/fetchNFTs";

const PlotSVG = ({ url }) => {
    return (
        <object
            type="image/svg+xml"
            data={url}
            style={{ width: "100%", height: "100%" }}
        />
    );
};

const DisplayPlots = ({ plots }) => {
    const [svgURLs, setSvgURLs] = useState([]);

    useEffect(() => {
        if (plots && plots.length > 0) {
            const urls = plots.map((plot) => {
                const plotID = plot.id;
                const url = `/plotSVGs/ClumsyValleyLandPlot${plotID}_ipfs.svg`;
                return url;
            });
            setSvgURLs(urls);
        }
    }, [plots]);

    return (
        <div className={`plot-grid${svgURLs.length > 1 ? " multiple" : ""}`}>
            {svgURLs.map((url, index) => (
                <PlotSVG key={index} url={url} />
            ))}
        </div>
    );
};

export default DisplayPlots;