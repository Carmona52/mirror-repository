"use client";

import {FC} from "react";
import ButtonsLogin from "@/components/layout/LoginButtons";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/Button";

const Navbar: FC = () => {
    const router = useRouter();



    return (
        <nav className="navbar-glass sticky z-40 flex items-center px-5 py-4 bg-primary justify-between">
            <div className="cursor-pointer" onClick={() => router.push('/')}>
                <h1 className='font-bold text-xl text-white'>Materiales San Otilio</h1>
            </div>
            <div className='flex justify-around items-center'>
                <ButtonsLogin/>
            </div>
        </nav>
    );
};

export default Navbar;
