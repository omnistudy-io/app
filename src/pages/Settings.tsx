import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"

export default function Settings() {
    return(
        <div>
            <h1 className="text-3xl p-4 border-b">Settings</h1>
            <div className="p-6">
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="plan">Plan</TabsTrigger>
                        <TabsTrigger value="billing">Billing</TabsTrigger>
                    </TabsList>
                    <TabsContent value="general">Make changes to your account here.</TabsContent>
                    <TabsContent value="account">Change your password here.</TabsContent>
                    <TabsContent value="plan">Change your plan here.</TabsContent>
                    <TabsContent value="billing">Change your billing here.</TabsContent>
                </Tabs>
            </div>
        </div>
    );
}