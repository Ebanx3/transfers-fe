export const logout = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,
            {
                method: "POST",
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
