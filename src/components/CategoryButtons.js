// CategoryButtons.js

import React from "react";
import { Button } from "/components/ui/button"

const CategoryButtons = ({ onSelectCategory, ghostsCount, plotsCount, watchesCount }) => {
    return (
        <div className="category-buttons">
            <Button
                className="category-button"
                onClick={() => onSelectCategory("ghosts")}
            >
                Ghosts ({ghostsCount})
            </Button>
            <Button
                className="category-button"
                onClick={() => onSelectCategory("plots")}
            >
                Plots ({plotsCount})
            </Button>
            <Button
                className="category-button"
                onClick={() => onSelectCategory("watches")}
            >
                Watches ({watchesCount})
            </Button>
        </div>
    );
};

export default CategoryButtons;

/*
import React from "react";

const CategoryButtons = ({ onSelectCategory, ghostsCount, plotsCount, watchesCount }) => {
    return (
        <div className="category-buttons">
            <button
                className="category-button"
                onClick={() => onSelectCategory("ghosts")}
            >
                Ghosts ({ghostsCount})
            </button>
            <button
                className="category-button"
                onClick={() => onSelectCategory("plots")}
            >
                Plots ({plotsCount})
            </button>
            <button
                className="category-button"
                onClick={() => onSelectCategory("watches")}
            >
                Watches ({watchesCount})
            </button>
        </div>
    );
};

export default CategoryButtons;
*/