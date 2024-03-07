import { Transfer } from "../types/transfer";

export const GetAvailablesTransfers = async (props: Transfer) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/availables`, { method: "POST", body: JSON.stringify(props), headers: { "Content-Type": "Application/json" } });
        const { success, data } = await response.json()
        console.log(success)
        if (success && data.services) {
            return data
        }
        return [];
    }
    catch (error) {
        console.log(error);
        return [];
    }
}