import ContentTabs from "../../layout/ContentTabs";
// import { FaArrowRight } from "react-icons/fa";
import React from 'react';
import { alurKonsultan } from "../../../data";
import Alur from "../../elements/Alur";

const KonsultanAlur = () => {

    return (
        <Alur data={alurKonsultan}/>
    );
}

export default KonsultanAlur;