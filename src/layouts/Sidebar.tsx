// Local components from shadcn
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/Avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

// Hooks and utils
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import getInitials from "@/utils/getInitials";
import { cn } from "@/lib/utils";

// Images and icons
import Logo from "@/assets/LogoVector.svg";
import {
  LayoutDashboard as DashboardIcon,
  GraduationCap as CoursesIcon,
  Clipboard as AssignmentsIcon,
  FileText as DocumentsIcon,
  NotebookText as StudySetsIcon,
  Bell as NotificationsIcon,
  Calendar as ScheduleIcon,
  Settings as SettingsIcon,
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ className }: SidebarProps) {
  // Get the user
  const { user, loading } = useAuth();

  // Logout function
  function logout() {
    // Logout the user
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    // TODO: Redirect to https://omnistudy.io in production
    window.location.href = "/";
  }

  return (
    <div
      className={cn(
        "flex h-screen bg-[#2D2F48] w-full basis-1/6 min-w-[225px] max-w-[325px]",
        className
      )}
    >
      <aside className="flex flex-col bg-[#1F202F] w-full">
        {/* Sidebar logo */}
        <a href="/">
          <div className="flex items-center px-4 py-6 h-16 border-b border-[#34354A]">
            <img src={Logo} alt="" className="w-8 h-8" />
            <h2 className="text-[#00adb5] ml-2 text-2xl font-['Reem_Kufi_Fun']">
              OmniStudy
            </h2>
          </div>
        </a>

        {/* Sidebar links */}
        <div className="flex-1 overflow-y-auto">
          <ul className="px-2 py-4">
            <SidebarLink
              icon={<DashboardIcon className="w-5" />}
              href="/"
              title="Dashboard"
            />
            <SidebarLink
              icon={<CoursesIcon className="w-5" />}
              href="/courses"
              title="Courses"
            />
            <SidebarLink
              icon={<AssignmentsIcon className="w-5" />}
              href="/assignments"
              title="Assignments"
            />
            <SidebarLink
              icon={<DocumentsIcon className="w-5" />}
              href="/documents"
              title="Documents"
            />
            <SidebarLink
              icon={<StudySetsIcon className="w-5" />}
              href="/study-sets"
              title="Study Sets"
            />
            <SidebarLink
              icon={<ScheduleIcon className="w-5" />}
              href="/schedule"
              title="Schedule"
            />
            <li className="mb-2">
              <Popover>
                <PopoverTrigger>
                  <Button className="flex items-center justify-start text-md w-full text-left text-white bg-[#1F202F] pl-2 gap-x-3 tracking-wider">
                    <NotificationsIcon className="w-5" />
                    <span>Notifications</span>
                    <Badge className="bg-[#00adb5] hover:bg-[#00adb5]">2</Badge>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-fit px-2 py-0">
                  <div className="flex flex-col w-fit">
                    <div className="border-b py-2 flex flex-col">
                      <span className="text-xs text-stone-400">
                        Mon Apr 8, 1:43pm
                      </span>
                      <span className="text-sm text-stone-500">
                        Assignment 'Homework 4' is overdue.
                      </span>
                    </div>
                    <div className="py-2 flex flex-col">
                      <span className="text-xs text-stone-400">
                        Mon Apr 10, 6:47pm
                      </span>
                      <span className="text-sm text-stone-500">
                        Assignment 'Zybooks 11' is overdue.
                      </span>
                    </div>
                    <div className="py-1 border-t cursor-pointer">
                      <span className="text-[#00adb5] hover:underline">
                        See all
                      </span>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </li>
            <SidebarLink
              icon={<SettingsIcon className="w-5" />}
              href="/settings"
              title="Settings"
            />
          </ul>
        </div>

        {/* Sidebar footer - profile */}
        <div className="flex items-center justify-between h-16 border-t border-[#34354A] p-4">
          <div className="flex flex-row gap-2">
            <Avatar>
              <AvatarImage
                alt="Anita Cruz"
                src="/placeholder.svg?height=32&width=32"
              />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm text-white">
                {loading ? "..." : user.name}
              </span>
              <span className="text-xs text-gray-400">
                {loading ? "..." : user.email}
              </span>
            </div>
          </div>
          <Popover>
            <PopoverTrigger>
              <DotsIcon className="text-white h-4 w-4" />
            </PopoverTrigger>
            <PopoverContent className="w-fit p-1">
              <div className="flex flex-col w-fit">
                <Button
                  variant="ghost"
                  className="px-2 py-1 justify-between text-left text-stone-500 hover:text-[#00adb5]"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </aside>
    </div>
  );
}

// Represents a link in the sidebar
function SidebarLink(props: { icon: any; href: string; title: string }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.location.pathname == props.href) setActive(true);
  }, []);

  return (
    <li className="mb-2">
      <a href={props.href}>
        <Button
          className={`${
            active ? "bg-[#00adb5] hover:bg-[#00adb5]/80" : "bg-[#1F202F]"
          } flex items-center justify-start text-md w-full text-left text-white pl-2 gap-x-3 tracking-wider`}
        >
          {props.icon}
          <span>{props.title}</span>
        </Button>
      </a>
    </li>
  );
}

// Dots svg in the sidebar footer
function DotsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}
