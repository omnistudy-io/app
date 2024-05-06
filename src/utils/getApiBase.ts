/**
 * Find the base URL for the API based on the current URL
 * 
 * @returns The base URL for the API
 */
export default function getApiBase() {
    const url = window.location.href;
    
    // If the URL is localhost, return the development API base
    if (url.includes("localhost")) {
        return "http://localhost:3001";
    }

    // If the URL is the staging URL, return the staging API base
    else if (url.includes("staging")) {
        return "https://staging-api.omnistudy.io";
    }

    // If the URL is the production URL, return the production API base
    else {
        return "https://api.omnistudy.io";
    }
}