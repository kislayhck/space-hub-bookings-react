
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Search, Menu, UserCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-blue-600 font-bold text-xl">SpaceHub</span>
            </Link>
          </div>

          {!isMobile ? (
            <>
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/">
                      <NavigationMenuLink className={cn("px-3 py-2 text-sm font-medium")}>
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/spaces">
                      <NavigationMenuLink className={cn("px-3 py-2 text-sm font-medium")}>
                        Spaces
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Cities</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[300px] gap-3 p-4">
                        {["Pune", "Mumbai", "Bangalore", "Delhi", "Hyderabad"].map((city) => (
                          <li key={city}>
                            <Link to={`/spaces?city=${city}`}>
                              <NavigationMenuLink
                                className={cn(
                                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                )}
                              >
                                <div className="text-sm font-medium leading-none">
                                  {city}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Explore coworking spaces in {city}
                                </p>
                              </NavigationMenuLink>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/about">
                      <NavigationMenuLink className={cn("px-3 py-2 text-sm font-medium")}>
                        About
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  <Input 
                    type="text" 
                    placeholder="Search spaces..." 
                    className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
                
                {user ? (
                  <div className="flex items-center gap-2">
                    {user.isAdmin && (
                      <Link to="/admin">
                        <Button variant="ghost" className="text-blue-600">
                          Admin
                        </Button>
                      </Link>
                    )}
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={() => logout()}
                    >
                      <UserCircle className="h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                        Log in
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button className="bg-blue-600 text-white hover:bg-blue-700">
                        Sign up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>SpaceHub</SheetTitle>
                  <SheetDescription>
                    Find the perfect workspace for your needs
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <nav className="flex flex-col space-y-4">
                    <Link to="/" className="text-lg font-medium">Home</Link>
                    <Link to="/spaces" className="text-lg font-medium">Spaces</Link>
                    <Link to="/about" className="text-lg font-medium">About</Link>
                    {user?.isAdmin && (
                      <Link to="/admin" className="text-lg font-medium text-blue-600">Admin Dashboard</Link>
                    )}
                    <div className="pt-2">
                      <p className="text-sm text-gray-500 mb-2">Cities</p>
                      {["Pune", "Mumbai", "Bangalore", "Delhi", "Hyderabad"].map((city) => (
                        <Link key={city} to={`/spaces?city=${city}`} className="block py-1 text-base">
                          {city}
                        </Link>
                      ))}
                    </div>
                  </nav>
                  <div className="mt-8 space-y-4">
                    <Input 
                      type="text" 
                      placeholder="Search spaces..." 
                      className="w-full"
                    />
                    <div className="space-y-2">
                      {user ? (
                        <Button onClick={() => logout()} variant="outline" className="w-full">
                          Logout
                        </Button>
                      ) : (
                        <>
                          <Link to="/login">
                            <Button variant="outline" className="w-full">Log in</Button>
                          </Link>
                          <Link to="/signup">
                            <Button className="w-full">Sign up</Button>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
