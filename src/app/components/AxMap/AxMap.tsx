'use client'

import { IVisitor } from '@/models/visitor/Visitor';
import { Map } from 'leaflet';
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, CircleMarker, Popup, Tooltip } from 'react-leaflet';

type Props = {
  v: IVisitor;
}

export const AxMap = ({ v }: Props) => {
  const [isClient, setIsClient] = React.useState(false);
  const [visitors, setVisitors] = React.useState<IVisitor[]>([]);
  const mapRef = React.createRef<Map>();

  useEffect(() => {
    setIsClient(true);
    fetch('/api/visitor/latest')
      .then(res => res.json())
      .then((data: IVisitor[]) => {
        setVisitors(data);
      })
      .catch(console.error);
  }, []);

  return (
    <MapContainer ref={mapRef} center={[v.latitude!, v.longitude!]} zoom={5} scrollWheelZoom={true} className='flex-auto w-full'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[v.latitude!, v.longitude!]}>
        <Popup>
          {v.visitCount === 1 ? 'You are new here!' : `You visited ${v.visitCount} times`}
        </Popup>
      </Marker>
      {
        visitors.map((v, i) => (
          <CircleMarker key={i} center={[v.latitude!, v.longitude!]} radius={10}>
            <Tooltip>
              {v._id.city}, {v._id.country}: {v.visitCount} visit{v.visitCount > 1 ? 's' : ''}
            </Tooltip>
          </CircleMarker>
        ))
      }
    </MapContainer>
  )
}

export default AxMap;