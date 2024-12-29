import { auth } from "@/app/auth";
import { signOut } from "@/app/auth";
import { redirect } from "next/navigation";
import { getname } from "../getname";

const HomePage = async () => {
    const session = await auth();
    const information = await getname(session?.user?.id);
    const parsedinformation = JSON.parse(information) || 'loading';

    if (!session?.user) redirect("/login");
    if (Object.keys(session.user).length === 0) redirect("/login?error=OAuthCallbackError");
    return (
        <>

        </>
    );
};

export default HomePage;