import { Storage } from "@google-cloud/storage";

export default async function handler(req, res) {
  const { fileName } = req.body;

  // Initialize Google Cloud Storage with your credentials
  const storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    credentials: {
      client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
  });

  const bucketName = "your-bucket-name";
  const originalFile = storage.bucket(bucketName).file(fileName);

  // Create the destination file path in the "protected" subfolder
  const destinationFileName = `protected/${fileName.split("/").pop()}`;
  const destinationFile = storage.bucket(bucketName).file(destinationFileName);

  try {
    // Copy the file to the "protected" subfolder
    await originalFile.copy(destinationFile);

    // Once copied, delete the original file
    await originalFile.delete();

    res.status(200).json({ message: `File moved to ${destinationFileName}` });
  } catch (error) {
    console.error("Error moving the file:", error);
    res.status(500).json({ error: "Failed to move file" });
  }
}
