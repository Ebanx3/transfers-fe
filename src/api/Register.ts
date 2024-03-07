import { User } from "../types/user";

type UserWithPass = User & {
    password: string
}

export const register = async (userData: UserWithPass) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`, { method: "POST", body: JSON.stringify(userData), headers: { "Content-Type": "Application/json" } });
        return await response.json()
    }
    catch (error) {
        console.log(error);
        return null;
    }
}