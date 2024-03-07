export const CheckCountry = async (cityName: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/country/${cityName}`);
        const { success, data } = await response.json()
        if (success) {
            const options = data.destinations.map(
                (dest: { name: string; code: string }) => ({
                    value: dest.name,
                    label: dest.name,
                    code: dest.code,
                })
            );
            return [{ value: "Select a city", label: "" }, ...options];
        }
        return [];
    }
    catch (error) {
        console.log(error);
        return [];
    }
}