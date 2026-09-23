import { BookOpen, Home } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/mock-data";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const items = [
  { title: "หน้าแรก", url: "/", icon: Home },
  { title: "ลงทะเบียนเรียน", url: "/enrollment", icon: BookOpen },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-1 text-sm font-semibold">CPE & ISNE</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>เมนูหลัก</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* ✅ แก้ไข: Base UI ใช้ `render={<Link />}` แทน `asChild` */}
                  <SidebarMenuButton
                    isActive={location.pathname === item.url}
                    render={<Link to={item.url} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Separator/>
      <SidebarFooter>
      <div className="flex items-center gap-3 px-2 py-1.5">
        <Avatar>
          <AvatarImage src={currentUser.avatar}></AvatarImage>
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-col">
          <span className="turncate text-sm font-medium">{currentUser.nickname}</span>
          <Badge variant="outline" className="p-1 font-sm text-[10px]">{currentUser.role}</Badge>
        </div>
      </div>
      </SidebarFooter>
    </Sidebar>
  );
}
