'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

type Props = {
  lat: number,
  long: number
}

export const AxMap = ({ lat, long }: Props) => {
  return (
    <MapContainer center={[lat, long]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, long]}>
        <Popup>
          Are you here?
        </Popup>
      </Marker>
    </MapContainer>
  )
}