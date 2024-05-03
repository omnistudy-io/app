import Account from "@/components/settings/Account";
import Profile from "@/components/settings/Profile";
import Billing from "@/components/settings/Billing";
import General from "@/components/settings/General";
import Plans from "@/components/settings/Plan/Plans";
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

import { Settings as SettingsIcon } from "lucide-react";
import { useGet } from "@/hooks/useApi";

export default function Settings() {
  return (
    <DashboardContainer
      subHeader="Settings"
      header="Your Settings"
      headerIcon={<SettingsIcon />}
    >
      <div>
        <Tabs defaultValue="profile" className="max-w-[60%]">
          <TabsList className="mb-6 bg-[#34354a] text-[#fff] gap-x-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="plan">Plan</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <General />
          </TabsContent>
          <TabsContent value="account">
            <Account />
          </TabsContent>
          <TabsContent value="profile">
            <Profile />
          </TabsContent>
          <TabsContent value="plan">
            <Plans />
          </TabsContent>
          <TabsContent value="billing">
            <Billing />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardContainer>
  );
}
