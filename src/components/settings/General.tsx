import { Bell, CalendarFold } from "lucide-react";
import { Card } from "../ui/Card";

import * as Switch from "@radix-ui/react-switch";

export default function General() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="border-b border-[#34354a] pb-4">
        <h2 className="text-xl">General Settings</h2>
        <p className="text-[#868686] text-sm">
          Control the settings to your account here.
        </p>
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-bold">Notification Preferences</h3>
        <p className="text-sm text-[#868686]">
          Select notification settings you would like to recieve via email.
          Please note that you cannot opt out of reciving service messages, such
          as payment, security, or legal notifications
        </p>
        <Card className="flex flex-col gap-y-2 bg-[#f5f5f5] p-3 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-x-2">
              <span className="p-4 rounded-full bg-[#fff]">
                <Bell className="w-[20px] h-[20px]" />
              </span>
              <div className="flex flex-col justify-center">
                <h4 className="font-bold">Notifications</h4>
                <p className="text-sm">
                  Get updated when anything happens to your account.
                </p>
              </div>
            </div>
            <Switch.Root className="w-[42px] h-[25px] bg-[#868686] rounded-full relative shadow-blackA4 data-[state=checked]:bg-[#00adb5] outline-none cursor-pointer">
              <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
          </div>
        </Card>
        <Card className="flex flex-col gap-y-2 bg-[#f5f5f5] p-3 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-x-2">
              <span className="p-4 rounded-full bg-[#fff]">
                <CalendarFold className="w-[20px] h-[20px]" />
              </span>
              <div className="flex flex-col justify-center">
                <h4 className="font-bold">Our News Letter</h4>
                <p className="text-sm">
                  We'll always update you on important changes.
                </p>
              </div>
            </div>
            <Switch.Root className="w-[42px] h-[25px] bg-[#868686] rounded-full relative shadow-blackA4 data-[state=checked]:bg-[#00adb5] outline-none cursor-pointer">
              <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
          </div>
        </Card>

        {/* Add version here */}
        <div>
          <h3 className="text-lg font-bold mt-4">Version</h3>
          <p className="text-sm text-[#868686]">
            Version 0.2.0
          </p>
          <p className="text-sm text-[#868686]">
            OmniStudy © 2024
          </p>
        </div>
      </div>
    </div>
  );
}
