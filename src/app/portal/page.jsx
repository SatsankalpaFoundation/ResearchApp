  import Image from "next/image";
  import { auth } from "@/app/auth";
  import { signOut } from "@/app/auth";
  import { redirect } from "next/navigation";
  import { getname } from "./getname";

  const HomePage = async () => {
      const session = await auth();
      const information = await getname(session?.user?.id);
      const parsedinformation = JSON.parse(information) || 'loading';

      if (!session?.user) redirect("/login");
      if (Object.keys(session.user).length === 0) redirect("/login?error=OAuthCallbackError");
      return (
          <>
              <nav className="flex justify-between items-center p-4 ">
                  <div>
                      <h1 className="text-3xl font-bold">Contributing Portal</h1>
                  </div>
                  <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                          
                          <span className="text-lg font-semibold">{parsedinformation.name}</span>
                      </div>
                      <form
                          action={async () => {
                              "use server";
                              await signOut({ redirectTo: "/login?error=Successfully%20Signed%20Out" });
                          }}
                      >
                          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                              Sign Out
                          </button>
                      </form>
                  </div>
              </nav>
          </>
      );
  };

  export default HomePage;