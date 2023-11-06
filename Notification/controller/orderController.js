

import notify_modal from "../modal/Notification.js"


export const viewedOrderByVendor = async (message, initiatedID, affectedID) => {

    if (!message || !initiatedID || !affectedID) {
        console.log(`Error accured..`)
    } else {

        const res = await notify_modal.create({
            initiatedID: initiatedID,
            affectedID: affectedID,
            message: message
        })




    }





}

// export const viewedOrderByVendor = async (req, res, next) => {

// }

export const ActionOrderByVendor = async (req, res, next) => {

}