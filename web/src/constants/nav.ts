import {
  BookOpen,
  CalendarClock,
  CircleFadingArrowUp,
  CirclePlay,
  FileChartLine,
  FileClock,
  FilePen,
  FileTerminal,
  GithubIcon,
  Home,
  LayoutDashboard,
  Lightbulb,
  SettingsIcon,
  SquareTerminal,
  TableProperties,
  UserRoundPlus,
  Workflow,
} from "lucide-react";

export const NavItems = {
  analytics: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Tracing",
      url: "/tracing",
      icon: FileChartLine,
    },
    {
      title: "Events",
      url: "/events",
      icon: CalendarClock,
    },
  ],
  evaluation: [
    {
      title: "Evaluation",
      url: "/evaluation",
      icon: Lightbulb,
    },
    {
      title: "Workflows",
      url: "/workflows",
      icon: Workflow,
    },
    {
      title: "Annotations",
      url: "/annotations",
      icon: FilePen,
    },
  ],
  promptEngineering: [
    {
      title: "Prompts",
      url: "/prompt-engineering",
      icon: FileTerminal,
    },
    {
      title: "Datasets",
      url: "/datasets",
      icon: TableProperties,
    },
    {
      title: "Playground",
      url: "/playground",
      icon: CirclePlay,
    },
  ],
  others: [
    {
      title: "Trigger",
      url: "/triggers",
      icon: FileClock,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: SettingsIcon,
    },
    {
      title: "Invite Members",
      url: "/invite-members",
      icon: UserRoundPlus,
    },
  ],
  navSecondary: [
    {
      title: "Github",
      url: "/github",
      icon: GithubIcon,
    },
    {
      title: "Documentation",
      url: "/documentation",
      icon: BookOpen,
    },
    {
      title: "Upgrade",
      url: "/upgrade",
      icon: CircleFadingArrowUp,
    },
  ],
};
