export const locationType = (type?: string): string => {

    switch (type) {
        case "A": return "IATA";
        case "P": return "PORT";
        case "T": return "STATION";
        default: return "ATLAS"
    }
}