import notify_modal from "../modal/Notification.js"

export const order_created = async (data) => {
    try {

        const re = JSON.parse(data)
        console.log(re)
        const wr = {
            initiatedID: re.orderCreatedBy,
            affectedID: re.vendor,
            message: re.message,
            orderid: re.orderid
        }

        const res = await notify_modal.create(wr);
        console.log("Successfully pushed message to notification..")
    } catch (e) {

        console.log(`Error pushing into notifiy model...`)
        console.log(e.message)
    }
}

export const confirmSchedule = async (data) => {
    try {

        const re = JSON.parse(data)

        const wr = {
            initiatedID: re.orderCreatedBy,
            affectedID: re.vendor,
            message: re.message,
            orderid: re.orderid
        }

        const res = await notify_modal.create(wr);
        console.log("Successfully pushed message to notification..")
    } catch (e) {

        console.log(`Error pushing into notifiy model...`)
        console.log(e.message)
    }
}

export const vendorSchedule = async (data) => {
    try {
        console.log('setchecule called')
        const re = JSON.parse(data)

        const wr = {
            initiatedID: re.vendor,
            affectedID: re.orderCreatedBy,
            message: re.message,
            orderid: re.orderid
        }
        const res = await notify_modal.create(wr);
        console.log("Successfully pushed message to notification..")
    } catch (e) {

        console.log(`Error pushing into notifiy model...`)
        console.log(e.message)
    }
}