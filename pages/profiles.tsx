import { NextPageContext } from "next";
import "../app/globals.css";
import { getSession, signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";


export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}

const Profiles = () => {
    const { data: user } = useCurrentUser();
    const router = useRouter();
    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center"> Who is watching..</h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={() => router.push('/')}>

                        <div className="group flex-row w-44 mx-auto">
                            <div
                                className="
                            w-44
                            h-44
                            rounded-md
                            flex
                            items-center
                            justify-center
                            border-2
                            border-transparent
                            group-hover : cursor-pointer
                            group-hover:border-white
                            overflow-hidden
                            "
                            >
                                <img className="text-white" src="/images/default-blue.jpg" alt="ProfileImage" />
                            </div>
                            <div className="
                            mt-4
                            text-gray-400
                            text-2xl
                            text-center
                            group-hover:text-white
                            ">
                                {user?.name}
                            </div>
                        </div>
                        {/* <button className='h-10 w-full bg-white hover:opacity-80'
                            onClick={() => signOut()}
                        >
                            Logout
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profiles;