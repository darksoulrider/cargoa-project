
import validator from "validator";
import { DateTime } from "luxon";


export const isValidDate = (date) => {
    if (!date) {
        return false;
    }
    let luxonDate = DateTime.fromJSDate(new Date(date));
    let validDate = false

    if (luxonDate.isValid) {
        validDate = luxonDate.toFormat("yyyy/MM/dd");
    }


    // const formats = ["yyyy-MM-dd", "dd/MM/yyyy", "yyyy/MM/dd", "dd-MM-yyyy"];
    // for (const format of formats) {
    //     let luxonDate = DateTime.fromFormat(d, format, { zone: "utc" });
    //     console.log(`${luxonDate} - ${format}`)
    //     if (luxonDate.isValid) {
    //         validDate = luxonDate.toFormat("yyyy/MM/dd");
    //         break; // Stop if a valid format is found
    //     }
    // }
    console.log(validDate)
    return validDate;
};