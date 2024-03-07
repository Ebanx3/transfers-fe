import { Booking } from "./transferConfirmation";

export type TransferAtLog = {
    status: string;
    bookingReference: string;
    rateKey: string
}

export type User = {
    name: string;
    surname: string;
    email: string;
    phone: string;
    id: string;
    transfersLog: Booking[]
}