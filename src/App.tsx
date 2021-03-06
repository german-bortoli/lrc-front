/**
 * Main Application
 *
 * @author Bortoli German <german@borto.li>
 */
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {getCurrentLocation, GeoPosition} from './api-clients/navigator-location';
import apiClient from './api-clients/findservices.api';
import Topbar from './components/Topbar/Topbar';
import Search from './components/Search/Search';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Login from "./components/Login/Login";
import appThemeOptions from './utils/app-theme';
import AppSnackbar from "./components/AppSnackBar/AppSnackBar";

const DEFAULT_DISTANCE = process.env.REACT_APP_DEFAULT_DISTANCE || 10;
const OPTION_THEME = process.env.REACT_APP_THEME || 'blue';

function usePrevious(value: any) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();

    // Store current value in ref
    useEffect(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
}

export default function App() {

    /**
     * States of the app
     */
    const [appStates, setAppStates] = useState({
        distance: localStorage.getItem('filter_distance') || 0,
        search: '',
    });

    const prevAppState = usePrevious(appStates);
    /**
     * Service array, fetched from the api
     */
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(apiClient.isLoggedIn());

    /**
     * Current user geoposition
     */
    const [geoCenter, setGeoCenter] = useState({
        lat: localStorage.getItem('center_lat')  || 40.7347188,
        lng: localStorage.getItem('center_lng') || -73.9628391,
    });

    const prevGeoCenter = usePrevious(geoCenter);

    /**
     * Login status
     */
    const [loginOpen, setLoginOpen] = useState(false);

    /**
     * Validate authenticated user.
     */
    useEffect(() => {
        if (apiClient.isLoggedIn()) {
            apiClient.me()
                .then(() => {console.log("User token has been validated")})
                .catch(() => {console.warn("Client with wrong token")});
        }
    }, []);

    /**
     * Fetch services from API
     */
    const refreshServices = () => {
        return apiClient.listServices(appStates.distance, geoCenter);
    };

    const updateServicesList = () => {
        return refreshServices().then((services) => setServices(services));
    };

    /**
     * This is used when filtering by distance and current location
     */
    useEffect(() => {
        let didCancel = false;

        let positionChanged = prevGeoCenter !== geoCenter;
        let distanceChanged = prevAppState !== appStates;

        console.log('Position changed:', positionChanged, 'Distance changed:', distanceChanged);
        async function fetchApi() {
            setIsLoading(true);
            const response = await refreshServices();
            setIsLoading(false);
            if (!didCancel) {
                setServices(response);
                console.log("Fetched services with distance", appStates.distance);
            }
        }
        fetchApi();
        return () => { didCancel = true; };
        // eslint-disable-next-line
    }, [appStates.distance, geoCenter]);

    /**
     * Geolocation: Fetch current user location
     */
    useEffect(() => {
        getCurrentLocation()
            .then((data: GeoPosition) => {
                console.log("Retrieved user location");
                setDistance(localStorage.getItem('filter_distance') || DEFAULT_DISTANCE.toString());
                localStorage.setItem('center_lat', data.coords.latitude.toString());
                localStorage.setItem('center_lng', data.coords.longitude.toString());
                setGeoCenter({lat: data.coords.latitude, lng: data.coords.longitude});
            })
            .catch(() => {
                console.warn('Error fetching current location')
            });
        // eslint-disable-next-line
    }, []);


    /**
     * Will trigger a modalbox to login
     */
    const handleLogin = () => {
        setLoginOpen(true);
    };

    /**
     * Will trigger logout action
     */
    const handleLogout = () => {
        apiClient.logout().then(() => {
            apiClient.clearSession();
            setLoggedIn(false);
        });
    };

    /**
     * Will close any modal
     */
    const handleCloseModal = () => {
        setLoginOpen(false);
    };

    /**
     * Set distance to filter services
     * @param distance
     */
    const setDistance = (distance: string) => {
        console.log('Setting distance to:', distance);
        localStorage.setItem('filter_distance', distance.toString());
        setAppStates({...appStates, 'distance': parseInt(distance)});
    };

    /**
     * Set search keyword to filter services
     * @param search
     */
    const setSearchText = (search: string) => {
        console.log('Searching text:', search);
        setAppStates({...appStates, search});
    };


    /**
     * Will search by distance
     * @param event
     */
    const handleDistance = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDistance(event.target.value);
    };

    /**
     * Will handle the serach text
     * @param event
     */
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Do something with response data
        return response;
    }, function (error) {
        if (error.response.status === 401) {
            apiClient.clearSession();
            setLoggedIn(false);
            setTimeout(() => document.location.reload(), 100);
        }
        // Do something with response error
        return Promise.reject(error);
    });

    const muiTheme = createMuiTheme(appThemeOptions[OPTION_THEME]);
    return (
        <MuiThemeProvider theme={muiTheme}>
            <Topbar
                isLoggedIn={loggedIn}
                distance={appStates.distance}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                handleSearch={handleSearch}
                handleDistance={handleDistance}
            />

            <Search
                isLoggedIn={loggedIn}
                isLoading={isLoading}
                services={services}
                searchText={appStates.search}
                center={geoCenter}
                refreshServices={updateServicesList}
            />

            <Login open={loginOpen} closeModal={handleCloseModal} setLoggedIn={setLoggedIn}/>

            <AppSnackbar />
        </MuiThemeProvider>
    );
};
