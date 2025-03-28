import { getStorage } from "firebase-admin/storage";
import { getFirestore } from "firebase-admin/firestore";
import appAdmin from "./adminsetup.js";
appAdmin;
const db = getFirestore();
const bucket = getStorage().bucket();

export { db, bucket };
