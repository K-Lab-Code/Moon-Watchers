// import { useEffect, useState, useLayoutEffect } from "react";
// import { retrieveUsers } from "../api/userAPI";
// import { UserData} from "../interfaces/UserData";
// import ErrorPage from "./ErrorPage"
// import auth from '../utils/auth';
import MoonPhaseChart from "../components/MoonChart";

const Home = () => {
    
//TODO: update with css styling later
    return (
        <div>
            <h1>
                Welcome to Moon Watchers
            </h1>
            <MoonPhaseChart />
        {/* TODO : update with img later */}

            <p>
                Write info of moon phases and info about website
            </p>
        </div>
    )
}

export default Home;