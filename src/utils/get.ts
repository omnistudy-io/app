import axios from "axios";
import getApiBase from "./getApiBase";

/**
 * Make a GET request to the API
 * 
 * @param update A function to update the state with the response data
 * @param path The path to the API endpoint
 * @param headers Optional headers to send with the request
 * @returns 
 */
export default function get(update: Function, field: string, path: string, headers: object = {}) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    headers = { ...headers, authorization: `Bearer ${token}` };

    return new Promise((resolve, _) => {
        axios.get(`${getApiBase()}${path}`, { headers: headers }).then((res) => {
            resolve(res.data);
            update(field === "" ? res.data : res.data[field]);
        }).catch((err) => {
            resolve(err);
            update(field === "" ? err.response.data : err.response.data[field]);
        });
    });
}


// ------ EXAMPLE USAGE ------
// import get from "@utils/get";
// function Settings() {
//    const [data, setData] = useState(null);
// 
//    useEffect(() => {
//        get(setData, "/path");
//    }, []);
// 
//    return (
//        <div>{data?.stuff}</div>
//    );
// }
