export type Transfer = {
    fromType: string;
    fromCode: string;
    toType: string;
    toCode: string;
    outbound: string;
    inbound?: string;
    adults: number;
    children: number;
    infants: number
}