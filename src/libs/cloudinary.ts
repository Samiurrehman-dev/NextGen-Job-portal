import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export const uploadToCloudinary = (file: File, folder: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder},
      (error, result) => {
        if (error) return reject(error);
        if (result?.secure_url) resolve(result.secure_url);
        else reject(new Error("No secure URL returned from Cloudinary"));
      }
    );

    // Convert File to buffer and pipe (async IIFE)
    (async () => {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const readable = Readable.from(buffer);
        readable.pipe(stream);
      } catch (err) {
        reject(err);
      }
    })();
  });
};
