import ContentTabs from "../../layout/ContentTabs";
// import { FaArrowRight } from "react-icons/fa";
import React from 'react';
import { alurAdmin} from "../../../data";
import Alur from "../../elements/Alur";

const AdminAlur = () => {

    return (
        <Alur data={alurAdmin}/>
    );
}

export default AdminAlur;