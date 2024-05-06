import axios from "axios";
import getApiBase from "./getApiBase";

/**
 * Make a DELETE request to the API
 * 
 * @param update A function to update the state with the response data
 * @param path The path to the API endpoint
 * @param headers Optional headers to send with the request
 * @returns 
 */
export default function del(update: Function, path: string, headers: object = {}) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    headers = { ...headers, authorization: `Bearer ${token}` };
    
    return new Promise((resolve, _) => {
        axios.delete(`${getApiBase()}${path}`, { headers: headers }).then((res) => {
            resolve(res.data);
            update(res.data);
        }).catch((err) => {
            resolve(err);
        });
    });
}

// ------ EXAMPLE USAGE ------
// import delete from "@utils/post";
// function Settings() {
//    const [data, setData] = useState(null);
//
//    useEffect(() => {
//        delete(setData, "/path");
//    }, []);
//
//    return (
//        <div>{data?.stuff}</div>
//    );
// }