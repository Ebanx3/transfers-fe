export const login = async (userData: { email: string; password: string }) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
            {
                method: "POST",
                body: JSON.stringify(userData),
                headers: { "Content-Type": "Application/json" },
                credentials: "include",
            }
        );
        return await response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
};
