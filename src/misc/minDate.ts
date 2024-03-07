export const minDate = () => {
    const actualDate = new Date();
    return actualDate.toISOString().split("T")[0];
};