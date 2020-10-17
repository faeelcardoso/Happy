import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight, FiSkipBack } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapicon';
import api from '../services/api';

import '../styles/pages/orphanagesMap.css';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]); // orphanages vazio

    useEffect(() => { // use effect
        api.get('orphanages').then(resp => { // vai lá na api, busca os dados
            setOrphanages(resp.data); // preenche os dados no array do useState
        });
    }, []);

    const { goBack } = useHistory();

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <button type="button" className="create-back" onClick={goBack}> 
                    <FiArrowLeft size={24} color="#FFF" />
                    </button>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Belo Horizonte</strong>
                    <span>Minas Gerais</span>
                </footer>
            </aside>

            <Map //mapa
                center={[-19.9622165, -43.9685363]} //latitude e longitude
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />*/}
                {/* TileLayer mapa feio */}

                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                {/* TileLayer mapa daora */}

                {/* Map percorro uma lista e retorno algo, forEach percorro uma lista somente */}

                {orphanages.map(orphanage => { // entre chaves porq é um código JS ali dentro
                    return (
                        <Marker
                            icon={mapIcon}
                            position={[orphanage.latitude, orphanage.longitude]}
                            key={orphanage.id} // tudo relacionado a interface, a primeira tem que ter a key, algo em relação com tudo
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                        <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    )
}

export default OrphanagesMap;