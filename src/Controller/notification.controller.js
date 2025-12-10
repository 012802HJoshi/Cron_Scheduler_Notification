const Notification = require("../Database/notification.model");

const getAllNotification = async(req,res)=>{
   const  allNotifications = await Notification.find();
   res.status(200).json({allNotifications});
}


const deleteNotification = async (req, res) => {
  try {
    const { notification_id } = req.body;

    const deleted = await Notification.findByIdAndDelete(notification_id);

    if (!deleted) {
      return res.status(404).json({ error: "Notification not found" });
    }

    return res.status(200).json({ message: "Notification deleted successfully", deleted });
  } catch (error) {
    return res.status(500).json({ error: "Delete failed", details: error.message });
  }
};


module.exports = {
  getAllNotification,
  deleteNotification
};


