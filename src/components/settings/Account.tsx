import { useState } from "react";
import { motion } from "framer-motion";
import { usePut } from "@/hooks/useApi";

export default function Account() {
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // const token =
  //   localStorage.getItem("token") || sessionStorage.getItem("token");

  // const { data, loading, error } = usePut(`/users/${token}/profile`);

  const handleSavedChanges = () => {
    console.log(newUsername, newEmail, newPassword);
    // data.user.username = newUsername;
    // data.user.email = newEmail;
    // data.user.password = newPassword;
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="border-b border-[#34354a] pb-4">
        <h2 className="text-xl">Account Settings</h2>
        <p className="text-[#868686] text-sm">
          Control the settings to your account here.
        </p>
      </div>
      <div className="flex flex-col">
        <label className="font-bold" htmlFor="usernameChange">
          Username
        </label>
        <input
          className="border p-2 rounded-lg my-1 text-sm focus:outline-none focus:border-[#34354a] bg-[#f5f5f5]"
          type="text"
          name="usernameChange"
          id="usernameChange"
          placeholder="JohnDoe"
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <p className="text-sm text-[#868686]">
          This is your public display name. It can be your real name or a
          pseudonym. You can only change this once every 30 days.
        </p>
      </div>
      <div className="flex flex-col">
        <label className="font-bold" htmlFor="usernameChange">
          Email
        </label>
        <input
          className="border p-2 rounded-lg my-1 text-sm focus:outline-none focus:border-[#34354a] bg-[#f5f5f5]"
          type="email"
          name="emailChange"
          id="enailChange"
          placeholder="johndoe@gmail.com"
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <p className="text-sm text-[#868686]">
          Update your email address here. This will be used for notifications.
        </p>
      </div>
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
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <p className="text-sm text-[#868686]">
          change your password here. Make sure it's a valid password.
        </p>
      </div>
      <div>
        <motion.button
          onClick={handleSavedChanges}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-lg bg-[#00adb5] text-white shadow-lg mt-4"
        >
          Save Changes
        </motion.button>
      </div>
    </div>
  );
}
