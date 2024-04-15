import Account from "@/components/settings/Account";
import Billing from "@/components/settings/Billing";
import General from "@/components/settings/General";
import Plans from "@/components/settings/Plan/Plans";
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <DashboardContainer header="Settings" headerIcon={<SettingsIcon />}>
      <div>
        <Tabs defaultValue="account" className="max-w-[60%]">
          <TabsList className="mb-6 bg-[#34354a] text-[#fff] gap-x-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="plan">Plan</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <General />
          </TabsContent>
          <TabsContent value="account">
            <Account />
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
