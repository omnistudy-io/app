import { motion } from "framer-motion";
import Logo from "@/assets/Logo.png";
import { useSearchParams } from "react-router-dom";
import NotFound from "./NotFound";

import { InviteSchema } from "@/schema/invites";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import get from "@/utils/get";
import post from "@/utils/post";
import { Toaster } from "@/components/ui/Toaster";
import { useToast } from "@/hooks/useToast";
import { CircleAlert, CircleCheck, EyeOff, Eye } from "lucide-react";

export default function Invite() {

    // Hooks
    const { toast } = useToast();
    const navigate = useNavigate();

    // Get the query parameters
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");

    // State management
    const [invite, setInvite] = useState<InviteSchema | null>(null);
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    // Password logic state management
    const [passwordValid, setPasswordValid] = useState<boolean>(false);
    const [between6And22, setBetween6And22] = useState<boolean>(false);
    const [hasCapitalLetter, setHasCapitalLetter] = useState<boolean>(false);
    const [hasNumber, setHasNumber] = useState<boolean>(false);
    const [hasSpecialCharacter, setHasSpecialCharacter] = useState<boolean>(false);

    function passwordChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        // Set the password
        const newPassword = e.target.value;
        setPassword(newPassword);

        // Check between 6 and 22 characters
        setBetween6And22(newPassword.length >= 6 && newPassword.length <= 22);
        // Check for capital letter
        setHasCapitalLetter(/[A-Z]/.test(newPassword))
        // Check for number
        setHasNumber(/[0-9]/.test(newPassword))
        // Check for special character
        setHasSpecialCharacter(/[!@#$%^&*]/.test(newPassword))

        // Set the password valid state
        setPasswordValid(
            newPassword.length >= 6 && newPassword.length <= 22 &&
            /[A-Z]/.test(newPassword) &&
            /[0-9]/.test(newPassword) &&
            /[!@#$%^&*]/.test(newPassword)
        );
    }

    function submitHandler() {

        console.log("submit");
        console.log(!passwordValid, password, confirmPassword, invite?.accepted)

        // If invite already accepted, redirect to login
        if(invite?.accepted) {
            window.location.href = "/login";
            return;
        }

        // Check if the password is valid
        if(!passwordValid) {
            toast({ title: "Error", description: "Your password does not meet the requirements. Please try again." })
            return;
        }

        // If the password and confirm password do not match, show an error
        if(password != confirmPassword) {
            toast({ title: "Error", description: "Your passwords do not match, please try again." })
            return;
        }

        // Accept the invite
        post((data: any) => {
            // If the request was not successful, show an error toast
            if(data.code > 299) {
                toast({ title: "Failed to accept invitation", description: "An error occured while accepting the invitation, please try again later." });
            }
            // If the request was successful, show a success toast and navigate to the login page
            else {
                toast({ title: "Success", description: "Invitation accepted successfully." });
                // Store the token in local storage
                localStorage.setItem("token", data.token);
                // Navigate to the app
                navigate("/");
            }
        }, `/invites/${code}/accept`, {
            first_name: invite?.first_name,
            last_name: invite?.last_name,
            email: invite?.email,
            username: invite?.username,
            password: password
        });
    }

    useEffect(() => {
        // If the code is not found, return
        if(code == null || code == undefined) 
            return;
        // If found, get the invite
        get(setInvite, "invite", `/invites/${code}`);
    }, []);

    // If the code is not present or the invite is not found, show an invite not found page
    if(code == null || invite == null) {
        return(
            <div className="flex flex-col gap-y-4 w-full h-full justify-center items-center">
                {/* Header */}
                <div className="flex flex-row gap-x-4 justify-center items-center">
                    <img 
                        src={Logo}
                        alt="" 
                        className="w-16 h-16"
                    />
                    <h2 className="text-[#00adb5] text-5xl font-['Reem_Kufi_Fun']">OmniStudy</h2>                
                </div>

                {/* Subheader text */}
                <div className="flex justify-center">
                    <p className="text-stone-500 text-xl max-w-[50%] text-center">
                        An invitation cannot be found with the provided code. Please check the code and try again.
                    </p>
                </div>
            </div>
        );
    }

    // Standard return - invite has not yet been accepted
    return(
        <div className="flex flex-col gap-y-4 w-full h-full justify-center items-center">

            {/* Header */}
            <div className="flex flex-row gap-x-4 justify-center items-center">
                <img 
                    src={Logo}
                    alt="" 
                    className="w-16 h-16"
                />
                <h2 className="text-[#00adb5] text-5xl font-['Reem_Kufi_Fun']">OmniStudy</h2>                
            </div>

            {/* Subheader text */}
            <div className="flex justify-center">
                <p className="text-stone-500 text-xl max-w-[50%] text-center">
                    {!invite.accepted ? 
                        "You are invited to the initial alpha release of OmniStudy! Click below to accept the invitation and create your account." 
                    : 
                        "You have already accepted this invitation. Please login to your account to access OmniStudy."}
                </p>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-y-4 bg-stone-100 rounded-md shadow-lg p-4 min-w-[600px]">
                {/* First and last name inputs */}
                <div className="flex flex-row gap-x-4 w-full">
                    <div className="flex flex-col gap-x-1 w-full">
                        <label className="text-sm ml-1">First Name</label>
                        <input 
                            type="text" 
                            className="text-sm border-1 border-gray-300 bg-stone-200 rounded-md focus:outline-[#34354a] p-2 border"
                            value={invite?.first_name || ""}
                            placeholder="No first name found"
                            disabled
                        />
                    </div>
                    <div className="flex flex-col gap-x-1 w-full">
                        <label className="text-sm ml-1">Last Name</label>
                        <input 
                            type="text" 
                            className="text-sm border-1 border-gray-300 bg-stone-200 rounded-md focus:outline-[#34354a] p-2 border"
                            value={invite?.last_name || ""}
                            placeholder="No last name found"
                            disabled
                        />
                    </div>
                </div>

                {/* Email input */}
                <div className="flex flex-row gap-x-4 w-full">
                    <div className="flex flex-col gap-x-1 w-full">
                        <label className="text-sm ml-1">Email</label>
                        <input 
                            type="text" 
                            className="text-sm border-1 border-gray-300 bg-stone-200 rounded-md focus:outline-[#34354a] p-2 border"
                            value={invite?.email || ""}
                            placeholder="No email found"
                            disabled
                        />
                    </div>
                </div>

                {/* Username input */}
                <div className="flex flex-row gap-x-4 w-full">
                    <div className="flex flex-col gap-x-1 w-full">
                        <label className="text-sm ml-1">Username</label>
                        <input 
                            type="text" 
                            className="text-sm border-1 border-gray-300 bg-stone-200 rounded-md focus:outline-[#34354a] p-2 border"
                            placeholder="No username found"
                            value={invite?.username || ""}
                            disabled
                        />
                    </div>
                </div>

                {/* Password input */}
                {invite && !invite.accepted && <div className="flex flex-row gap-x-4 w-full">
                    <div className="flex flex-col gap-x-1 w-full">
                        <label className="text-sm ml-1">Password</label>
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="text-sm border-1 border-gray-300 bg-white rounded-md focus:outline-[#34354a] p-2 border w-full"
                                placeholder="Enter password here"
                                value={password}
                                onChange={passwordChangeHandler}
                            />
                            <div className="absolute right-0 mr-2 top-[50%] translate-y-[-50%]">
                                {showPassword ?
                                    <Eye className="w-4 h-4 text-stone-500 cursor-pointer" onClick={() => setShowPassword(false)} />
                                :
                                    <EyeOff className="w-4 h-4 text-stone-500 cursor-pointer" onClick={() => setShowPassword(true)} />
                                }
                            </div>
                        </div>
                        <ul className="mt-1 ml-2 list-none *:text-sm">
                            <li className={`flex flex-row gap-x-1 items-center ${between6And22 ? "text-green-500" : "text-red-500"}`}>
                                {between6And22 ? <CircleCheck className="w-4 h-4 text-green-500" /> : <CircleAlert className="w-4 h-4 text-red-500" />}
                                Between 6 - 22 characters
                            </li>
                            <li className={`flex flex-row gap-x-1 items-center ${hasCapitalLetter ? "text-green-500" : "text-red-500"}`}>
                                {hasCapitalLetter ? <CircleCheck className="w-4 h-4 text-green-500" /> : <CircleAlert className="w-4 h-4 text-red-500" />}
                                At least one capital letter
                            </li>
                            <li className={`flex flex-row gap-x-1 items-center ${hasNumber ? "text-green-500" : "text-red-500"}`}>
                                {hasNumber ? <CircleCheck className="w-4 h-4 text-green-500" /> : <CircleAlert className="w-4 h-4 text-red-500" />}
                                At least one number
                            </li>
                            <li className={`flex flex-row gap-x-1 items-center ${hasSpecialCharacter ? "text-green-500" : "text-red-500"}`}>
                                {hasSpecialCharacter ? <CircleCheck className="w-4 h-4 text-green-500" /> : <CircleAlert className="w-4 h-4 text-red-500" />}
                                At least one special character (!@#$%^&*)
                            </li>
                        </ul>
                    </div>
                </div>}

                {/* Confirm password input */}
                {invite && !invite.accepted && <div className="flex flex-row gap-x-4 w-full">
                    <div className="flex flex-col gap-x-1 w-full">
                        <label className="text-sm ml-1">Confirm Password</label>
                        <div className="relative w-full">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="text-sm border-1 border-gray-300 bg-white rounded-md focus:outline-[#34354a] p-2 border w-full"
                                placeholder="Confirm password here"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <div className="absolute right-0 mr-2 top-[50%] translate-y-[-50%]">
                                {showConfirmPassword ?
                                    <Eye className="w-4 h-4 text-stone-500 cursor-pointer" onClick={() => setShowConfirmPassword(false)} />
                                :
                                    <EyeOff className="w-4 h-4 text-stone-500 cursor-pointer" onClick={() => setShowConfirmPassword(true)} />
                                }
                            </div>
                        </div>
                    </div>
                </div>}
            </div>

            {/* Submit button */}
            <div className="flex flex-row justify-end items-end mt-2">
                <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#00adb5] text-white text-lg p-2 rounded-md w-[600px]"
                    onClick={submitHandler}
                >
                    {!invite.accepted ? 
                        "Accept Invitation"
                    : 
                        "Login"
                    }
                </motion.button>
            </div>

            <Toaster />

        </div>
    );
}