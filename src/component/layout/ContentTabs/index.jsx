import React from "react";

const ContentTabs = ({ title,  children }) => {
    return (
        <div className="flex flex-col w-full gap-4 p-3">
            <h1 className="flex justify-center items-center text-[20px] font-bold font-inter text-active text-bluePrimary ">           
                {title}
            </h1>
            <div>{children}</div>      
        </div>
    );
}

export default ContentTabs;