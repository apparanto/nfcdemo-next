'use client'

import { IVisitor } from '@/models/visitor/Visitor';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

type Props = {
  v: IVisitor;
}

export const AxMap = ({ v }: Props) => {
  return (
    <MapContainer center={[v.latitude!, v.longitude!]} zoom={13} scrollWheelZoom={false} className='flex-auto w-full'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[v.latitude!, v.longitude!]}>
        <Popup>
          {v.visitCount === 1 ? 'You are new here!' : `You visited ${v.visitCount} times`}
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default AxMap;