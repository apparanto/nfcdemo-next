import mongoose from "mongoose";

export interface TagReads extends mongoose.Document {
  timestamp: Date;
  uid: string;
  sn: string;
  osn: string;
  zone: string;
  section: string;
  post: string;
}

const TagReadSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  uid: { type: String, required: true },
  sn: { type: String, required: true },
  osn: { type: String, required: true },
  zone: { type: String, required: true },
  section: { type: String, required: true },
  post: { type: String, required: true },
});

export default mongoose.models.TagRead ||
  mongoose.model<TagReads>("TagRead", TagReadSchema);
