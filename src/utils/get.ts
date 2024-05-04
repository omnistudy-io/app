import axios from "axios";

// Base URL
const base = "http://localhost:3001";

/**
 * Make a GET request to the API
 * 
 * @param update A function to update the state with the response data
 * @param path The path to the API endpoint
 * @param headers Optional headers to send with the request
 * @returns 
 */
export default function get(update: Function, field: string, path: string, headers: object = {}) {
    return new Promise((resolve, _) => {
        axios.get(`${base}${path}`, { headers: headers }).then((res) => {
            resolve(res.data);
            update(field === "" ? res.data : res.data[field]);
        }).catch((err) => {
            resolve(err);
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
