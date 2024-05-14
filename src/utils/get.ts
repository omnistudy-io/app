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
            resolve(field === "" ? res.data : res.data[field]);
            update(field === "" ? res.data : res.data[field]);
        }).catch((err) => {
            try {
                resolve(field === "" ? err.response.data : err.response.data[field]);
                update(field === "" ? err.response.data : err.response.data[field]);
            } catch {
                resolve({ code: 500, message: "An error occurred", data: null });
                update({ code: 500, message: "An error occurred", data: null });
            }
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
