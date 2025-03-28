import { Request, Response } from "express";
import { db } from "../utils/firestore.js";
const GetFiles = async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection("uploads").get();
    const files = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Failed to fetch files" });
  }
};

export default GetFiles;
