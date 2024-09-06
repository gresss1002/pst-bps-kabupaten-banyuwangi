import ContentTabs from "../../layout/ContentTabs";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";
import React from 'react';

const Alur = ({ data }) => {
    return (
        <ContentTabs title='Alur Konsultasi'>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
                {data.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <div className="flex flex-col items-center text-center font-openSans text-[10px] md:text-[12px] lg:text-[14px]">
                            <img
                                src={item.image}
                                alt={`Step ${item.id}`}
                                className="w-20 h-20 md:w-24 md:h-24 lg:w-26 lg:h-26 mb-2"
                            />
                            <p className="px-2 md:text-[10px] lg:text-[12px] font-openSans">{item.description}</p>
                        </div>
                        {index < data.length - 1 && (
                            <div className="hidden md:block">
                                <FaArrowRight className="text-bluePrimary text-2xl md:text-2xl lg:text-3xl mx-2 md:mx-2" />
                            </div>
                        )}
                        {index < data.length - 1 && (
                            <div className="block md:hidden">
                                <FaArrowDown className="text-bluePrimary text-2xl mx-2 md:mx-2 xs:text-xl" />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </ContentTabs>
    );
}

export default Alur;
