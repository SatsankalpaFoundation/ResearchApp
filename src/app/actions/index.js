
'use server'

import { signIn, signOut } from "@/app/auth";

export async function doSocialLogin(formData) {
    const action = formData.get('action');
    await signIn(action, { redirectTo: "/portal" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/login" });
}

export async function doCredentialLogin(formData) {
  console.log("formData", formData);

  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: '/portal',
    });
    return response;
  } catch (err) {
    // biome-ignore lint/complexity/noUselessCatch: <explanation>
    throw err;
    // Handle the error appropriately, e.g., display an error message to the user
  }
}