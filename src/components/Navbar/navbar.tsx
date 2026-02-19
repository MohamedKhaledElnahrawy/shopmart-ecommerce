"use client";
import Link from "next/link";
import React, { useContext } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ShoppingCartIcon, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { cartContext } from "@/context/cart.context";

export default function Navbar() {
  const { data: session } = useSession();

  const context = useContext(cartContext);

  if (context?.total?.data?.cartOwner) {
    const cartOwnerId: string = context?.total?.data?.cartOwner;
    localStorage.setItem("cartOwnerId", cartOwnerId);
  }

  return (
    <nav className="bg-white shadow py-4">
      <div className=" px-4 lg:px-8 font-semibold flex flex-col md:flex-row justify-between items-center ">
        {/* Logo */}
        <div className=" flex justify-center gap-2 items-center ">
          <div className="₩-10 h-9 rounded-md bg-black flex items-center justify-center">
            <span className="text-white font-bold text-2xl px-3">S</span>
          </div>
          <h2 className="text-2xl font-bold">
            <Link href={"/"}>ShopMart</Link>
          </h2>
        </div>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className="text-md font-bold" asChild>
                <Link href="/products">Products</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="text-md font-bold" asChild>
                <Link href="/brands">Brands</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="text-md font-bold" asChild>
                <Link href="/categories">Categories</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* ******************************************************************** */}

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <UserIcon className="size-6" />
                {/* for md-screen */}
                {session?.user?.name && (
                  <span className="hidden md:inline font-medium">
                    Welcome,{" "}
                    <span className="capitalize">{session.user.name}</span>
                  </span>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  {/*  dropdown for phone */}
                  <div className=" flex flex-col gap-2">
                    {session?.user?.name && (
                      <span className="md:hidden font-medium">
                        Welcome,
                        <span className="capitalize">{session.user.name}</span>
                      </span>
                    )}
                    My Account
                  </div>
                </DropdownMenuLabel>

                {session ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        href={"/wishlist"}
                        className="w-full block cursor-pointer"
                      >
                        Wishlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/allorders`}
                        className="w-full block cursor-pointer"
                      >
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Link href={"/login"}>Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={"/register"}>Register</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Shopping Cart */}
          {session && (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <div className="relative">
                      <Link href="/cart">
                        <ShoppingCartIcon className="size-6 text-inherit" />
                      </Link>
                      {context?.numOfCartItems ? (
                        <h1 className="bg-green-600 w-6 h-6 rounded-full text-white flex justify-center items-center absolute -top-2.75 -end-2.75">
                          {context?.numOfCartItems}
                        </h1>
                      ) : (
                        ""
                      )}
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
