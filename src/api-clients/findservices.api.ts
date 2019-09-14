/**
 * Find your service API Client
 *
 * @description This package will interact with the fys api
 * @author Bortoli German <german@borto.li>
 */
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_SERVICES_URL;

export interface GeolocationPoint {
    type: string;
    coordinates: number[];
}

export interface ServiceType {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    description?: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    geolocation: GeolocationPoint;
}

export interface GeoCenter {
    lat: number;
    lng: number;
}

export interface AuthToken {
    access_token: string | null;
    expires_at: string | null;
    token_type: string | null;
}

export interface AuthResponse {
    data: AuthToken;
}

export default class FyiApliClient {
    auth: AuthToken = {
        access_token: '',
        expires_at: '',
        token_type: '',
    };

    constructor() {
        this.auth.access_token = localStorage.getItem('access_token');
        this.auth.expires_at = localStorage.getItem('expires_at');
        this.auth.token_type = localStorage.getItem('token_type');
    }

    getLoggedInHeaders = () => {
        if (!this.isLoggedIn()) {
            return {};
        }

        return {
            'Authorization': `Bearer ${this.auth.access_token}`,
            'Accept': 'application/json',
        };
    };
    /**
     * List services index
     * @param distance
     * @param center
     */
    listServices = (distance?: number, center?: GeoCenter) => {
        let lat = 0;
        let lng = 0;

        if (center) {
            lat = center.lat;
            lng = center.lng;
        }

        const baseUrl = `${API_URL}services?distance=${distance}&lat=${lat}&lng=${lng}`;
        return axios.get(baseUrl)
            .then(response => response.data.data);
    };

    /**
     * Login action
     */
    login = (email: string, password: string) => {
        return axios
            .post(`${API_URL}auth/login`, {email, password});
    };

    logout = () => {
        //auth/logout
        return axios.get(`${API_URL}auth/logout`, {
            headers: this.getLoggedInHeaders()
        })
    };

    isLoggedIn = () => {
        if (!this.auth.access_token) {
            return false;
        }

        return this.auth.access_token.length > 0;
    };

    storeSession = (response: any) => {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('expires_at', response.data.expires_at);
        localStorage.setItem('token_type', response.data.token_type);
    };

    clearSession = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('token_type');
    };

}