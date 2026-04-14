import { readFileSync } from "fs";
import { Storage } from "@google-cloud/storage";

const envContent = readFileSync(".env.local", "utf8");
const env = {};
for (const line of envContent.split("\n")) {
  const match = line.match(/^([^#=\s][^=]*)="?([^"]*)"?$/);
  if (match) env[match[1].trim()] = match[2];
}

const storage = new Storage({
  projectId: env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

const bucket = storage.bucket("swamiphoto");

await bucket.setCorsConfiguration([{
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "https://swamiphoto.github.io",
  ],
  method: ["GET", "POST", "PUT", "DELETE", "HEAD"],
  responseHeader: ["Content-Type", "Authorization"],
  maxAgeSeconds: 3600,
}]);

console.log("CORS applied successfully!");
