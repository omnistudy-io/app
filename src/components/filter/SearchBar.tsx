import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function SearchBar(props: SearchBarProps) {

    const { data, setData } = props;

    /**
     * When the search input changes, filter the data
     * 
     * @param e The event object
     */
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const searchValue = e.target.value.trim().toLowerCase();
        // Filter the data
        const filteredData = data.filter((item: any) => {
            let found = false;
            props.fields.forEach((field) => {
                if (item[field].toLowerCase().includes(searchValue)) { found = true; }
            });
            return found;
        });
        setData(filteredData);
    }

    return(
        <div>
            {/* Search Bar */}
            <div className="flex items-center border-2 border-gray-200 rounded-lg p-2">
                <MagnifyingGlassIcon></MagnifyingGlassIcon>
                <input
                    type="text"
                    className="text-sm ms-2 focus:outline-none w-full"
                    placeholder="Search"
                    onChange={handleChange}
                />
            </div>
        </div>
    
    );
}

// Props
type SearchBarProps = {
    data: any;
    setData: any;
    fields: string[];
};