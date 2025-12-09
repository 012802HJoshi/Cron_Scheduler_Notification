const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  projectid: {
    type: String,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
  cronString: {             
    type: String,
    required: true,
  },
  message: {
    type: mongoose.Schema.Types.Mixed,   
    required: true,
  },
}, { timestamps: true }); 

module.exports = mongoose.model("Notification", NotificationSchema);
