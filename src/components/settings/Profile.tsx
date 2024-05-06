import { useState } from "react";
import { motion } from "framer-motion";
import { UserProfileSchema } from "@/schema";
import { useGet, usePut, put } from "@/hooks/useApi";
import { useToast } from "@/hooks/useToast";
import equal from "@/utils/equal";

export default function Profile() {

    const { toast } = useToast();
    const { data } = useGet("/users/{userId}/profile");
    
    const [profile, setProfile] = useState<UserProfileSchema>(data?.user_profile);
    const [newProfile, setNewProfile] = useState<UserProfileSchema>(data?.user_profile);

    async function saveChangesHandler() {
        const result = await put(`/users/{uid}/profile`, {}, {
            address1: newProfile.address1
        });
        toast({ title: "Profile Update", description: "Your profile was updated succesfully" });
        setProfile(newProfile);
    }

    return (
        <div className="flex flex-col gap-y-4">

            {/* Header container */}
            <div className="border-b border-[#34354a] pb-4">
                <h2 className="text-xl">Profile Settings</h2>
                <p className="text-[#868686] text-sm">
                    Adjust your profile information here.
                </p>
            </div>

            {/* Address 1/2 inputs */}
            <div className="flex flex-row gap-4">
                {/* Address 1 input */}
                <div className="flex flex-col w-full">
                    <label className="font-bold" htmlFor="usernameChange">
                        Address 1
                    </label>
                    <input
                        className="border p-2 rounded-lg my-1 text-sm focus:outline-none focus:border-[#34354a] bg-[#f5f5f5]"
                        type="text"
                        name="address1"
                        id="address1"
                        placeholder="1234 Avenue St NW"
                        defaultValue={profile?.address1}
                        onChange={(e) => setNewProfile({ ...profile, address1: e.target.value })}
                    />
                    <p className="text-sm text-[#868686]">
                    </p>
                </div>
                {/* Address 2 input */}
                <div className="flex flex-col w-full">
                    <label className="font-bold" htmlFor="usernameChange">
                        Address 2
                    </label>
                    <input
                        className="border p-2 rounded-lg my-1 text-sm focus:outline-none focus:border-[#34354a] bg-[#f5f5f5]"
                        type="text"
                        name="usernameChange"
                        id="usernameChange"
                        placeholder="Suite 500"
                        defaultValue={profile?.address2}
                        onChange={(e) => setNewProfile({ ...profile, address2: e.target.value })}
                    />
                    <p className="text-sm text-[#868686]">
                    </p>
                </div>
            </div>

            {/* City state country inputs */}
            <div className="flex flex-row gap-4">
                {/* City input */}
                <div className="flex flex-col w-full">
                    <label className="font-bold" htmlFor="usernameChange">
                        City
                    </label>
                    <input
                        className="border p-2 rounded-lg my-1 text-sm focus:outline-none focus:border-[#34354a] bg-[#f5f5f5]"
                        type="text"
                        name="usernameChange"
                        id="usernameChange"
                        placeholder="1234 Avenue St NW"
                        defaultValue={profile?.city}
                        onChange={(e) => setNewProfile({ ...profile, city: e.target.value })}
                    />
                    <p className="text-sm text-[#868686]">
                    </p>
                </div>
                {/* State input */}
                <div className="flex flex-col w-full">
                    <label className="font-bold" htmlFor="usernameChange">
                        State/Province
                    </label>
                    <select 
                        name="state" 
                        id="state"
                        className="border p-2 rounded-lg my-1 text-sm focus:outline-none focus:border-[#34354a] bg-[#f5f5f5]"
                        defaultValue={profile?.state}
                        onChange={(e) => setNewProfile({ ...profile, state: e.target.value })}
                    >
                        <option value="MN">Minnesota</option>
                        <option value="CA">California</option>
                    </select>
                    <p className="text-sm text-[#868686]">
                    </p>
                </div>
                {/* Zip code input */}
                <div className="flex flex-col w-full">
                    <label className="font-bold" htmlFor="usernameChange">
                        Zip Code
                    </label>
                    <input
                        className="border p-2 rounded-lg my-1 text-sm focus:outline-none focus:border-[#34354a] bg-[#f5f5f5]"
                        type="number"
                        name="usernameChange"
                        id="usernameChange"
                        placeholder="1234 Avenue St NW"
                        defaultValue={profile?.zip}
                        onChange={(e) => setNewProfile({ ...profile, zip: e.target.value })}
                    />
                    <p className="text-sm text-[#868686]">
                    </p>
                </div>
                {/* Country input */}
                <div className="flex flex-col w-full">
                    <label className="font-bold" htmlFor="usernameChange">
                        Address 1
                    </label>
                    <input
                        className="border p-2 rounded-lg my-1 text-sm focus:outline-none focus:border-[#34354a] bg-[#f5f5f5]"
                        type="text"
                        name="usernameChange"
                        id="usernameChange"
                        placeholder="1234 Avenue St NW"
                        defaultValue={profile?.country}
                        onChange={(e) => setNewProfile({ ...profile, country: e.target.value })}
                    />
                    <p className="text-sm text-[#868686]">
                    </p>
                </div>
            </div>

            {/* Other shit */}
            <div className="flex flex-col">
                <label className="font-bold" htmlFor="usernameChange">
                    Password
                </label>
                <input
                    className="border p-2 rounded-lg my-1 text-sm focus:outline-none focus:border-[#34354a] bg-[#f5f5f5]"
                    type="password"
                    name="passwordChange"
                    id="passwordChange"
                    placeholder="password123"
                    onChange={()=>{}}
                />
                <p className="text-sm text-[#868686]">
                    change your password here. Make sure it's a valid password.
                </p>
            </div>

            {/* Save changes button */}
            <div>
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${newProfile && !equal(newProfile, profile) && "!bg-[#00adb5]"} bg-stone-400 transition-all duration-150 px-6 py-2 rounded-lg text-white shadow-lg mt-4`}
                    disabled={newProfile && equal(newProfile, profile)}
                    onClick={saveChangesHandler}
                >
                    Save Changes
                </motion.button>
            </div>
        </div>
        )

}