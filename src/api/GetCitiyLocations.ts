export const GetCityLocations = async (cityCode: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/locations/${cityCode}`);
        const { success, data } = await response.json();
        if (success) {
            const optionsHotels = data.hotels.map(
                (loc: { code: string; name: string }) => ({
                    value: loc.name,
                    label: loc.name,
                    code: loc.code,
                })
            )
            const optionsTerminals = data.terminals.map(
                (loc: {
                    code: string;
                    content: { type: string; description: string };
                }) => ({
                    value: loc.content.description,
                    label: loc.content.description,
                    code: loc.code,
                    type: loc.content.type,
                })
            );
            return [{ value: "Select a location...", label: "" }, ...optionsTerminals, ...optionsHotels]
        }
        return [];
    }
    catch (error) {
        console.log(error);
        return [];
    }
}