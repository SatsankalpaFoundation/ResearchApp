'use client'
import Image from "next/image"
import Link from "next/link"
import { auth } from "@/app/auth";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


import { useEffect } from "react";
import { useRouter } from "next/navigation"

import Footer from "@/components/footer";

import Nav from "@/components/nav";

import { useState } from "react"

import { doCredentialLogin } from "@/app/actions"
import { doSocialLogin } from "@/app/actions"
import checkSession from "./checkSession";

export default function Dashboard() {
  const router = useRouter();
    const [error, setError] = useState("");
    useEffect(() => {
        const checkUserSession = async () => {
            const isSessionValid = await checkSession()
            if (isSessionValid) {
                router.push("/portal")
            } else {
                console.log("no session")
            }
        }
        checkUserSession()
    }, [router])


    async function onSubmit(event) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);

            const response = await doCredentialLogin(formData);

            if (response.error) {
                console.error(response.error);
                setError(response.error.message);
            } else {
                router.push("/home");
            }
        } catch (e) {
            console.error(e);
            setError("Invalid email or password");
        }
    }
  return (
    <div className="max-h-[100vh]"><Nav activeItem="Login" /><div className="w-full lg:grid min-h-[100vh] lg:grid-cols-2 ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              {/* Enter your email below to login to your account */}
            </p>
          </div>
          {/* <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="m@example.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/forgot-password"
            className="ml-auto inline-block text-sm underline"
          >
            
          </Link>
        </div>
        <Input type="password" name="password" id="password" required />
        {typeof window !== 'undefined' && (
          <>
            {error && error !== "" && (
              <p className="text-sm text-red-500">{error}</p>
            )}

          </>
        )}

      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>

    </form> */}
          <form action={doSocialLogin}>
            <Button type='submit' name="action"
              value="google" className="w-full">
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {" "}
            <Link href="#" className="underline">

            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://picsum.photos/200"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
      </div>
    </div></div>
  )
}
