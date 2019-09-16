/**
 * Map, child component
 *
 * @description Will render all the services into the map
 * @author Bortoli German <german@borto.li>
 */

import React, {useEffect} from 'react';
import useStyles from '../Search.styles';
import {GeoCenter, ServiceType} from "../../../api-clients/findservices.api";
declare const google: any;

interface MapProps {
    center: GeoCenter | any;
    services: ServiceType[];
}
/**
 * Child component of search
 * @constructor
 */
export default function Map(props: MapProps) {
    const classes = useStyles();

    const {center} = props;
    let map: any = null;
    let markers = [];

    /**
     * Load markers and set boundaries
     */
    const loadMarkers = () => {
        if (!map) {
            return false;
        }
        markers = props.services.map((serv: ServiceType) => {
            const mLat = serv.geolocation.coordinates[1];
            const mLng = serv.geolocation.coordinates[0];

            const marker = new google.maps.Marker({
                position: {lat: mLat, lng: mLng},
                title:"Hello World!"
            });

            const infowindow = new google.maps.InfoWindow({
                content: serv.title,
            });

            // To add the marker to the map, call setMap();
            marker.setMap(map);

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });

            // const bounds = new google.maps.LatLngBounds();
            // bounds.extend(marker.position);
            // map.fitBounds(bounds);
        });

        //(optional) restore the zoom level after the map is done scaling
        const listener = google.maps.event.addListener(map, "idle", function () {
            map.setZoom(14);
            google.maps.event.removeListener(listener);
        });
    };

    const generateMap = () => {
        map = new google.maps.Map(document.getElementById('services-map'), {
            center: {lat: center.lat, lng: center.lng},
            zoom: 15,
            maptypeId: 'roadmap',
            disableDefaultUI: true,
        });

        setTimeout(() => {
            loadMarkers();
        }, 500);

    };
    /**
     * Generate the map
     */
    useEffect(() => {

        setTimeout(() => {
            generateMap();
        }, 500);

    }, [center, props.services]);

    return (
        <div className={classes.map} id="services-map">

        </div>
    );
}