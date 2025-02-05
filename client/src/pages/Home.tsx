// import { useEffect, useState, useLayoutEffect } from "react";
// import { retrieveUsers } from "../api/userAPI";
// import { UserData} from "../interfaces/UserData";
// import ErrorPage from "./ErrorPage"
// import auth from '../utils/auth';


const Home = () => {

    // //const [users, setUsers] = useState<UserData[]>([]);
    // const [error, setError] = useState(false);
    // //const [loginCheck, setLoginCheck] = useState(false);

    // // useEffect(() => {
    // //     if (loginCheck){
    // //         fetchUsers();
    // //     }
    // // }, [loginCheck]);

    // // useLayoutEffect(() => {
    // //     checkLogin();
    // // }, []);

    // // const checkLogin = () => {
    // //     if (auth.loggedIn()){
    // //         setLoginCheck(true);
    // //     }
    // // };

    // // const fetchUsers = async () => {
    // //     try{
    // //         const data = await retrieveUsers();
    // //         setUsers(data);
    // //     }catch (err){
    // //         console.error('Failed to retrieve users', err);
    // //         setError(true);
    // //     }
    // // }

    // if (error){
    //     return <ErrorPage />
    // }

    
//TODO: update with css styling later
    return (
        <div>
            <h1>
                Welcome to Moon Watchers
            </h1>

        {/* TODO : update with img later */}

            <p>
                Write info of moon phases and info about website
            </p>
        </div>
    )
}

export default Home;