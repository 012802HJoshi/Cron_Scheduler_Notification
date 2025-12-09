const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios');
const admin = require('firebase-admin');
const node_cron = require("node-cron");
const dotenv = require("dotenv");
const cors = require('cors');
const mongoose = require('mongoose');
const { WebClient, LogLevel } = require("@slack/web-api");

const Notification =require("./Database/notification.model");
const getAllNotification = require("./Controller/notification.controller");

const port = 2025;
const app = express();
dotenv.config(); 
app.use(bodyParser.json());


app.use(cors({
  origin: ['https://dashboardnotification.web.app',"http://localhost:5173"],
  methods: ['GET', 'POST', 'OPTIONS'],
}));

app.get("/all-notification",getAllNotification);

const token = process.env.BOT_TOKEN;
const mongourl = process.env.MONGOURL;


const filemanager = {
  type: "service_account",
  project_id: process.env.FILE_MANAGER_PROJECT_ID,
  private_key_id: process.env.FILE_MANAGER_PRIVATE_KEY_ID,
  private_key: process.env.FILE_MANAGER_PRIVATE_KEY, // Fix new line issue
  client_email: process.env.FILE_MANAGER_CLIENT_EMAIL,
  client_id: process.env.FILE_MANAGER_CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FILE_MANAGER_CLIENT_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

const videoplayer = {
  type: "service_account",
  project_id: process.env.VIDEO_PLAYER_PROJECT_ID,
  private_key_id: process.env.VIDEO_PLAYER_PRIVATE_KEY_ID,
  private_key: process.env.VIDEO_PLAYER_PRIVATE_KEY, // Fix new line issue
  client_email: process.env.VIDEO_PLAYER_CLIENT_EMAIL,
  client_id: process.env.VIDEO_PLAYER_CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.VIDEO_PLAYER_CLIENT_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

const ZxFileManager = {
  type: "service_account",
  project_id: process.env.ZX_FILE_MANAGER_PROJECT_ID,
  private_key_id: process.env.ZX_FILE_MANAGER_PRIVATE_KEY_ID,
  private_key: process.env.ZX_FILE_MANAGER_PRIVATE_KEY, // Fix new line issue
  client_email: process.env.ZX_FILE_MANAGER_CLIENT_EMAIL,
  client_id: process.env.ZX_FILE_MANAGER_CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.ZX_FILE_MANAGER_CLIENT_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

const LightVideoPlayer = {
  type: "service_account",
  project_id: process.env.LIGHT_VIDEO_PLAYER_PROJECT_ID,
  private_key_id: process.env.LIGHT_VIDEO_PLAYER_PRIVATE_KEY_ID,
  private_key: process.env.LIGHT_VIDEO_PLAYER_PRIVATE_KEY, // Fix new line issue
  client_email: process.env.LIGHT_VIDEO_PLAYER_CLIENT_EMAIL,
  client_id: process.env.LIGHT_VIDEO_PLAYER_CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.LIGHT_VIDEO_PLAYER_CLIENT_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

const MusicPlayer = {
  type: "service_account",
  project_id: process.env.MUSIC_PLAYER_PROJECT_ID,
  private_key_id: process.env.MUSIC_PLAYER_PRIVATE_KEY_ID,
  private_key: process.env.MUSIC_PLAYER_PRIVATE_KEY, // Fix new line issue
  client_email: process.env.MUSIC_PLAYER_CLIENT_EMAIL,
  client_id: process.env.MUSIC_PLAYER_CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.MUSIC_PLAYER_CLIENT_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

const vpn = {
  type: "service_account",
  project_id: process.env.VPN_PROJECT_ID,
  private_key_id: process.env.VPN_PRIVATE_KEY_ID,
  private_key: process.env.VPN_PRIVATE_KEY, // Fix new line issue
  client_email: process.env.VPN_CLIENT_EMAIL,
  client_id: process.env.VPN_CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.VPN_CLIENT_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

const collagemaker ={
  type: "service_account",
  project_id: process.env.PHOTO_EDITOR_PROJECT_ID,
  private_key_id: process.env.PHOTO_EDITOR_PRIVATE_KEY_ID,
  private_key: process.env.PHOTO_EDITOR_PRIVATE_KEY, // Fix new line issue
  client_email: process.env.PHOTO_EDITOR_CLIENT_EMAIL,
  client_id: process.env.PHOTO_EDITOR_CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.PHOTO_EDITOR_CLIENT_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
}

const hdx ={
  type: "service_account",
  project_id: process.env.HDX_PROJECT_ID,
  private_key_id: process.env.HDX_PRIVATE_KEY_ID,
  private_key: process.env.HDX_PRIVATE_KEY, // Fix new line issue
  client_email: process.env.HDX_CLIENT_EMAIL,
  client_id: process.env.HDX_CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.HDX_CLIENT_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
}

const cast ={
  type: "service_account",
  project_id: process.env.CAST_PROJECT_ID,
  private_key_id: process.env.CAST_PRIVATE_KEY_ID,
  private_key: process.env.CAST_PRIVATE_KEY, // Fix new line issue
  client_email: process.env.CAST_CLIENT_EMAIL,
  client_id: process.env.CAST_CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.HDX_CLIENT_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
}

const mp3 ={
  type: "service_account",
  project_id: process.env.MP3_PROJECT_ID,
  private_key_id: process.env.MP3_PRIVATE_KEY_ID,
  private_key: process.env.MP3_PRIVATE_KEY, // Fix new line issue
  client_email: process.env.MP3_CLIENT_EMAIL,
  client_id: process.env.MP3_CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.HDX_CLIENT_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
}

const hd_downloader ={
  type: "service_account",
  project_id: process.env.HD_DOWNLOADER_PROJECT_ID,
  private_key_id: process.env.HD_DOWNLOADER_PRIVATE_KEY_ID,
  private_key: process.env.HD_DOWNLOADER_PRIVATE_KEY, // Fix new line issue
  client_email: process.env.HD_DOWNLOADER_CLIENT_EMAIL,
  client_id: process.env.HD_DOWNLOADER_CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.HDX_CLIENT_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
}

const gallery ={
  type: "service_account",
  project_id: process.env.GALLERY_PROJECT_ID,
  private_key_id: process.env.GALLERY_PRIVATE_KEY_ID,
  private_key: process.env.GALLERY_PRIVATE_KEY, // Fix new line issue
  client_email: process.env.GALLERY_CLIENT_EMAIL,
  client_id: process.env.GALLERY_CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.HDX_CLIENT_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
}

const projects = {
    filemanager,
    videoplayer,
    ZxFileManager,
    LightVideoPlayer,
    MusicPlayer,
    vpn,
    collagemaker,
    hdx,
    cast,
    mp3,
    hd_downloader,
    gallery
  };

  
  async function db_connection(mongourl){
        mongoose.connect(mongourl)
        .then(()=> console.log('MongoDB connected...'))
        .catch(err=> console.log(err))
  }
 
  async function getAccessToken(project) {
    try {
      const token = await admin.credential.cert(project).getAccessToken();
      return token.access_token;
    } catch (error) {
      console.error('🚫 \x1b[32m Error getting token: \x1b[0m', error);
      throw error;
    }
  }
  


const slackClient = new WebClient(token, {
    logLevel: LogLevel.DEBUG
});

async function sendSlackMessage(channel, text) {
  try {
    await slackClient.chat.postMessage({
      channel,
      text,
    });
  } catch (err) {
    console.error("⚠️ Failed to send Slack message:", err);
  }
}

async function Scheduler(cronString, project, message, url, timezone) {
  node_cron.schedule(
    cronString,
    async () => {
      try {
        const accessToken = await getAccessToken(projects[project]);

        const response = await axios.post(
          url,
          { message },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log("✅ Notification sent");
          await sendSlackMessage(
            "C092NBGSRLY",
            `[Server]: ✅ Notification sent successfully for *${project}* at ${new Date().toLocaleString("en-IN", { timeZone: timezone })}`
          );
        }
      } catch (error) {
        console.error("❌ Scheduler execution error:", error);

        await sendSlackMessage(
          "C092NBGSRLY",
          `[Server]: ❌ Error sending scheduled notification for *${project}*: ${error.message}`
        );
      }
    },
    {
      scheduled: true,
      timezone: timezone,
    }
  );
}


app.get('/', (req, res) => {
    res.status(200).send('TimeZone Notification Server developed and CI/CDed by Harshit Joshi !!!');
});

app.post("/notification-Scheduler", async (req, res) => {
  const { message, projectid, scheduler, timezone, project, week } = req.body;

  const cronString = `0 ${scheduler?.minute ?? '*'} ${scheduler?.hour ?? '*'} ${scheduler?.day ?? '*'} ${scheduler?.month ?? '*'} ${scheduler?.week ?? '*'}`;
  const url = `https://fcm.googleapis.com/v1/projects/${projectid}/messages:send`;

  if (!projects[project]) {
    return res.status(400).json({ error: "Invalid project name." });
  }

  try {
    await getAccessToken(projects[project]);
  } catch (error) {
    return res.status(400).json({ error: "FCM Token fetch failed.", details: error });
  }

  // Store in DB if week = true
  if (week === true || week === "true") {
    try {
      await new Notification({
        projectid,
        project,
        timezone,
        cronString,
        message: JSON.stringify(message),
      }).save();
    } catch (error) {
      return res.status(500).json({ error: "DB Save Failed", details: error });
    }
  }

  // 🔥 Start scheduler immediately
  await Scheduler(cronString, project, message, url, timezone);

  await sendSlackMessage(
    "C092NBGSRLY",
    `[Server]: ⏰📅 Scheduled *${project}*`
  );

  res.status(200).json({
    status: 200,
    message: "Scheduler started",
    data: { cronString, project, timezone },
  });
});


app.listen(port, async() => {
  db_connection(mongourl);
  console.log(`⚡️ \x1b[43m [server]: Server is Fired Up at http://localhost:${port} \x1b[0m`);
}); 

(async function init(){
  console.log("🚀 Rebuilding or restarting — registering cron jobs...");
})();