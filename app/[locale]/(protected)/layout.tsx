import Link from 'next/link';
import {
  FileCog,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2
} from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { User } from './user';
import Providers from './providers';
import { NavItem } from '@/components/ui/nav-item';
import { SearchInput } from './search';
import { ChildrenProps } from '@/types/childrenProps';
import { RoutingIndicator } from '@/components/ui/routingIndicator';

export default function RootClientLayout({
  children
}: ChildrenProps) {
  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <RoutingIndicator />
        <DesktopNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            {/*<DashboardBreadcrumb />*/}
            <SearchInput />
            <User />
          </header>
          <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            {children}
          </main>
        </div>
      </main>
    </Providers>
  );
}

function DesktopNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <img src="/assets/veridibloc_logo.svg" className="h-8 w-8 transition-all group-hover:scale-110" alt="Veridibloc Logo"/>
          <span className="sr-only">Acme Inc</span>
        </Link>

        <NavItem href="/" label="Dashboard">
          <Home className="h-5 w-5" />
        </NavItem>

        <NavItem href="/contracts" label="Contracts">
          <FileCog className="h-5 w-5" />
        </NavItem>

        <NavItem href="/customers" label="Customers">
          <Users2 className="h-5 w-5" />
        </NavItem>

        <NavItem href="#" label="Analytics">
          <LineChart className="h-5 w-5" />
        </NavItem>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}

function DashboardBreadcrumb() {
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="#">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="#">Products</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>All Products</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
