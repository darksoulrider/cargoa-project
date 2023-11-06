import notify_modal from "../modal/Notification.js"

export const order_created = async (data) => {
    try {

        const re = JSON.parse(data)
        const wr = {
            initiatedID: re.orderCreatedBy,
            affectedID: re.vendor,
            message: re.message
        }
        const res = await notify_modal.create(wr);
        console.log("Successfully pushed message to notification..")
    } catch (e) {

        console.log(`Error pushing into notifiy model...`)

    }


}