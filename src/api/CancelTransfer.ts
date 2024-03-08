export const CancelTransfer = async (bookingReference: string) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/api/cancelTransfer/${bookingReference}`,
            {
                method: "DELETE",
                headers: { "Content-Type": "Application/json" },
                credentials: "include",
            }
        );
        const res = await response.json();

        if (res.success) {
            return res.data;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};
