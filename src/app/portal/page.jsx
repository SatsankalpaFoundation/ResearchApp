
import Image from "next/image";
import { auth } from "@/app/auth";
import { signOut } from "@/app/auth";
import { redirect} from "next/navigation";

const HomePage = async () => {
    const session = await auth();

    if (!session?.user) redirect("/login");
    if (Object.keys(session.user).length === 0) redirect("/login?error=OAuthCallbackError");

    return (
        <div className="flex flex-col items-center m-4">
            {session?.user?.name && session?.user?.image ? (
                <>
                    <h1 className="text-3xl my-2">
                        Welcome, {session?.user?.name}
                    </h1>
                    <Image
                        src={session?.user?.image}
                        alt={session?.user?.name}
                        width={72}
                        height={72}
                        className="rounded-full"
                    />
                </>
            ) : (
                <h1 className="text-3xl my-2">
                    Welcome to the Contributing Portal, {session?.user?.name}
                </h1>
            )}
            <form action={async () => {
                "use server";
                await signOut({ redirectTo: "/login?error=Successfuly%20Signed%20Out" });
            }}>
                <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Out</button>
            </form>
        </div>
    );
};

export default HomePage;