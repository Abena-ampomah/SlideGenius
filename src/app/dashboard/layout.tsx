'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter
} from '@/components/ui/sidebar';
import { Presentation, Bot, FileUp, ImageIcon, Search, LogOut, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Convert Document', icon: FileUp },
    { href: '/dashboard/image-generator', label: 'Image Generator', icon: ImageIcon },
    { href: '/dashboard/web-research', label: 'Web Research', icon: Search },
    { href: '/dashboard/chatbot', label: 'AI Assistant', icon: Bot },
  ];

  const pageTitle = menuItems.find(item => pathname.startsWith(item.href))?.label || 'Dashboard';

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader className="p-4">
             <div className="flex items-center gap-2">
                <div className="bg-primary rounded-lg p-2 flex items-center justify-center transition-all duration-300 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:p-1.5">
                    <Presentation className="text-primary-foreground h-6 w-6 transition-all duration-300 group-data-[collapsible=icon]:w-5 group-data-[collapsible=icon]:h-5" />
                </div>
                <h1 className="text-xl font-bold font-headline text-primary transition-opacity duration-200 group-data-[collapsible=icon]:opacity-0">SlideGenius</h1>
             </div>
        </SidebarHeader>
        <SidebarMenu className="flex-1 p-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                tooltip={{ children: item.label, side: 'right', align: 'start' }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarFooter className="p-2">
            <Separator className="my-2" />
            <SidebarMenuItem>
                <SidebarMenuButton tooltip={{ children: 'Settings', side: 'right', align: 'start' }}>
                    <Settings />
                    <span>Settings</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip={{ children: 'Logout', side: 'right', align: 'start' }}>
                    <LogOut />
                    <span>Logout</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <Separator className="my-2" />
            <div className="flex items-center gap-3 p-2">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="https://picsum.photos/seed/user/40/40" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm transition-opacity duration-200 group-data-[collapsible=icon]:opacity-0">
                    <span className="font-semibold">Jane Doe</span>
                    <span className="text-muted-foreground text-xs">jane.doe@example.com</span>
                </div>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b h-16 bg-card">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <h2 className="text-xl font-semibold font-headline">{pageTitle}</h2>
          </div>
          <Button>Export Presentation</Button>
        </header>
        <main className="p-4 lg:p-8 bg-background flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
