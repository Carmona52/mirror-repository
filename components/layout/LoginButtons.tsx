"use client";

import {useAppStore} from "@/store/StoreProvider";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/Button";
import {useShallow} from "zustand/react/shallow";
import {FC} from "react";

const ButtonsLogin: FC = () => {
    const router = useRouter();
    const user = useAppStore(useShallow((state) => state.user))
    const isAuthenticated = useAppStore((state) => state.isAuthenticated)
    const logout = useAppStore((state) => state.logout)

    if (isAuthenticated) return (
        <div>
            <span>Hola, {user?.name}</span>
            <Button onClick={logout}>Cerrar sesión</Button>
        </div>
    )

    return (
        <div>
            <Button onClick={() => router.push('/auth/login')}>Iniciar sesión</Button>
        </div>
    )


}

export default ButtonsLogin;
