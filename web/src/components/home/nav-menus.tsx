"use client";

import {
  Folder,
  MoreHorizontal,
  Share,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function NavMenus({
  items,
  title,
  className,
}: {
  title: string;
  className?: string;
  items: {
    title?: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const { isMobile } = useSidebar();
  const currentPath = usePathname();

  const isActiveNav = (navLink: string) => {
    return currentPath === navLink;
  };

  return (
    <SidebarGroup
      className={cn("group-data-[collapsible=icon]:hidden", className)}
    >
      {title && (
        <SidebarGroupLabel className="text-zinc-950/50">
          {title}
        </SidebarGroupLabel>
      )}
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              className="!py-4 hover:bg-zinc-200/50 transition-all    data-[active=true]/menu-button:!text-primary/90"
              asChild
              isActive={isActiveNav(item.url)}
            >
              <a href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
