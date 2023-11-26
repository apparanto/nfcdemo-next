import mongoose from 'mongoose';

export interface Visitors extends mongoose.Document {
  ipAddress: string,
  ipVersion: number,
    latitude: number,
    longitude: number,
    countryName: string,
    countryCode: string,
    timeZone: string,
    zipCode: string,
    cityName: string,
    regionName: string,
    continent: string,
    continentCode: string
}