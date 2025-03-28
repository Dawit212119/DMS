import { Request, Response } from "express";
import { db } from "../utils/firestore.js";
const GetFiles = async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection("upload").get();
    const files = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error + "server error" });
  }
};

export default GetFiles;
