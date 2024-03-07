import { Service } from "../types/transfersAvailables";

const getType = (s: string) => {
    if (s === "IATA") return "FLIGHT";
    if (s === "PORT") return "CRUISE";
    if (s === "STATION") return "TRAIN";
    return ""
}

export const ConfirmTransfer = async (props: Service) => {
    try {
        const dataToSend = {
            language: "en",
            clientReference: "BOSTON#12-203#456754",
            remark: "Booking remarks go here.",
            transfers: [
                {
                    rateKey: props.rateKey,
                    transferDetails: [{
                        type: getType(props.pickupInformation.from.type),
                        direction: props.direction,
                        code: "XR1234",
                        companyName: null
                    }]
                }],
        };
        const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/api/confirmTransfer`,
            {
                method: "POST",
                body: JSON.stringify(dataToSend),
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
