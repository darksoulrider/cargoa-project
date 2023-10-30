
import validator from "validator";
import { DateTime } from "luxon";


export const isValidDate = (date) => {
    if (!date) {
        return false;
    }
    const formats = ["yyyy-MM-dd", "dd/MM/yyyy", "yyyy/MM/dd", "dd-MM-yyyy"];

    let validDate = false;

    for (const format of formats) {
        const luxonDate = DateTime.fromFormat(date, format, { zone: "utc" });

        if (luxonDate.isValid) {
            validDate = luxonDate.toFormat("yyyy/MM/dd");
            break; // Stop if a valid format is found
        }
    }
    return validDate;
};