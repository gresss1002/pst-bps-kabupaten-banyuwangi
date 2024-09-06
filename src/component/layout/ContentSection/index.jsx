import React from "react";

const ContentSection = ({ children }) => {

    return (
        <div className="flex flex-col min-h-screen w-full font-openSans px-[8%] mt-[50px] py-8">
            <div className="flex flex-col gap-4">{children}</div>
            
        </div>
    );
}

export default ContentSection;