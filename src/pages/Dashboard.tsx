import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { useGet } from "@/hooks/useApi";
import { LayoutDashboard as DashboardIcon } from "lucide-react";

export default function Dashboard() {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const { data, loading, error } = useGet(`/auth/validate/${token}`);

  const action = () => {
    console.log("action");
  };

  return (
    <DashboardContainer
      subHeader="Dashboard"
      header="Your Dashboard"
      headerIcon={<DashboardIcon />}
      callToAction={action}
      callToActionText="Dashboard"
    >
      <h1>Dashboard</h1>
      {/* <p>Welcome back, {!loading ? data.user.name : null}</p> */}
    </DashboardContainer>
  );
}
