import mongoose from 'mongoose';

export interface Visitors extends mongoose.Document {
  ipAddress: string,
  ipVersion: number | null,
  latitude: number | null,
  longitude: number | null,
  countryName: string | null,
  countryCode: string | null,
  timeZone: string | null,
  zipCode: string | null,
  cityName: string | null,
  regionName: string | null,
  continent: string | null,
  continentCode: string | null,
  firstVisit: Date,
  lastVisit: Date,
  visitCount: number
}

const VisitorSchema = new mongoose.Schema({
  ipAddress: { type: String, required: true, index: true },
  ipVersion: { type: Number, required: false },
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
  countryName: { type: String, required: false },
  countryCode: { type: String, required: false },
  timeZone: { type: String, required: false },
  zipCode: { type: String, required: false },
  cityName: { type: String, required: false },
  regionName: { type: String, required: false },
  continent: { type: String, required: false },
  continentCode: { type: String, required: false },
  firstVisit: { type: Date, required: true },
  lastVisit: { type: Date, required: true },
  visitCount: { type: Number, required: true }
});

export default mongoose.models.Visitor ||
  mongoose.model<Visitors>("Visitor", VisitorSchema);