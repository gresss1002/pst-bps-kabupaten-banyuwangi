import React from "react";

const ContentTabsElement = ({  children }) => {
    return (
        <div className="flex w-full px-3">
            <div className="w-[100%]">{children}</div>      
        </div>
    );
}

export default ContentTabsElement;