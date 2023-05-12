// DisplayGhosts.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import GhostDetailsModal from "./GhostDetailsModal";

const GHOST_API_URL = "http://clumsydataapi-env.eba-pz3wzys2.us-east-2.elasticbeanstalk.com/api/ghostdata/"

//const GHOST_API_URL = "https://protected-everglades-83276.herokuapp.com/api/ghosts/";

const DisplayGhosts = ({ ghosts }) => {
    const [svgURLs, setSvgURLs] = useState([]);
    const [selectedGhostId, setSelectedGhostId] = useState(null);
    const [ghostDetails, setGhostDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [selectedSvgURL, setSelectedSvgURL] = useState(null);


    useEffect(() => {
        if (ghosts && ghosts.length > 0) {
            const urls = ghosts.map((ghost) => {
                const ghostID = ghost.id;
                const url = `/ghostSVGs/cg${ghostID}.svg`;
                return url;
            });
            setSvgURLs(urls);
        }
    }, [ghosts]);

    useEffect(() => {
        if (selectedGhostId) {
            fetchGhostDetails(selectedGhostId);
        }
    }, [selectedGhostId]);

    const fetchGhostDetails = async (id) => {
        try {
            const response = await axios.get(`${GHOST_API_URL}${id}`);
            setGhostDetails(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const storeScrollPosition = () => {
        setScrollPosition(window.pageYOffset || document.documentElement.scrollTop);
    };

    const restoreScrollPosition = () => {
        window.scrollTo(0, scrollPosition);
    };

    const openModal = (id, url) => {
        setSelectedGhostId(id);
        setShowModal(true);
        storeScrollPosition();
        setSelectedSvgURL(url);
    };



    const closeModal = () => {
        setShowModal(false);
        restoreScrollPosition();
    };

    return (
        <div>
            <div className={`ghost-grid${svgURLs.length > 1 ? " multiple" : ""}`}>
                {svgURLs.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        style={{ width: "100%", height: "100%" }}
                        onClick={() => {
                            openModal(ghosts[index].id, url);
                        }}

                    />
                ))}
            </div>
            <GhostDetailsModal
                show={showModal}
                closeModal={closeModal}
                ghostDetails={ghostDetails}
                selectedGhostId={selectedGhostId}
                svgURL={selectedSvgURL}
            />


        </div>
    );
};

export default DisplayGhosts;


/*

import React, { useEffect, useState } from "react";
//import { hexToASCII } from "../helpers/fetchNFTs";

const GhostSVG = ({ url, onClick }) => {
    return (
        <object
            type="image/svg+xml"
            data={url}
            style={{ width: "100%", height: "100%" }}
            onClick={onClick}
        />
    );
};


const DisplayGhosts = ({ ghosts }) => {
    const [svgURLs, setSvgURLs] = useState([]);

    useEffect(() => {
        if (ghosts && ghosts.length > 0) {
            const urls = ghosts.map((ghost) => {
                const ghostID = ghost.id;
                const url = `${process.env.PUBLIC_URL}/ghostSVGs/cg${ghostID}.svg`;
                return url;
            });
            setSvgURLs(urls);
        }
    }, [ghosts]);

    return (
        <div className={`ghost-grid${svgURLs.length > 1 ? " multiple" : ""}`}>
            {svgURLs.map((url, index) => (
                <GhostSVG key={index} url={url} />
            ))}
        </div>
    );
};

export default DisplayGhosts;

*/
