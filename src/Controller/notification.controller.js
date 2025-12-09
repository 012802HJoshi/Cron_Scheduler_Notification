const Notification = require("../Database/notification.model");

const getAllNotification = async(req,res)=>{
   const  allNotifications = await Notification.find();
   res.status(200).json({allNotifications});
}

module.exports = getAllNotification;

