import ContentTabs from "../../layout/ContentTabs";
import { FaArrowRight } from "react-icons/fa";
import React from 'react';
import { alurUser} from "../../../data";
import Alur from "../../elements/Alur";

const UserAlur = () => {

    return (
       <Alur data={alurUser} />
    );
}

export default UserAlur;