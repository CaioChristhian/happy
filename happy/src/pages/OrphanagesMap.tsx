import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import mapMarkerImg from '../images/local.svg';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import happyMapIcon from '../utils/mapIcon';
import '../styles/pages/orphanages-map.css';
import api from '../services/api';


interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap () {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data)
    })
  }, [])

  return (
   <div id="page-map">
     <aside>
       <header>
         <img src={mapMarkerImg} alt="" />

         <h2>Escolha um orfanato no mapa</h2>
         <p>Muitas crianças estão esperando a sua visita :)</p>
       </header>

        <footer>
          <strong>Paraíso do Tocantins</strong>
          <span>Tocantins</span>
        </footer>
     </aside>

     <MapContainer 
        center={[-10.1709565, -48.8900668]} 
        zoom={15} 
        style={{ width: '100%', height: '100%' }}
        >

          <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          {orphanages.map(orphanage => {
            return (
              <Marker 
                position={[orphanage.latitude, orphanage.longitude]} 
                icon={happyMapIcon}
                key={orphanage.id}
              >
                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                  {orphanage.name}
                  <Link to={`/orphanages/${orphanage.id}`}>
                    <FiArrowRight size={20} color="#FFF"/>
                  </Link>
                </Popup>
            </Marker>
            )
          })}
      </MapContainer>
     
     <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
     </Link>
   </div> 
  )
}

export default OrphanagesMap;