/**
 * Map, child component
 *
 * @description Geocode field, will lookup for an address and autocomplete using Google Maps
 * @author Bortoli German <german@borto.li>
 */

import React, {useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import {InputAdornment} from "@material-ui/core";
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
declare const google: any;

interface GeoFieldProps {
    onAutocompleted: any;
};


/**
 * Child component of search
 * @constructor
 */
export default function GeoCodeField(props: GeoFieldProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    let inputAutocomplete: any = null;
    let autocompleteListener: any = null;

    const initializeGoogleMapService = (anchorEl: HTMLElement) => {
        inputAutocomplete = new google.maps.places.Autocomplete(
            anchorEl,
            {types: ["geocode"]}
        );
        autocompleteListener = inputAutocomplete.addListener("place_changed", (data: any) => {
            const place = inputAutocomplete.getPlace();
            props.onAutocompleted(place);
        });
    };

    useEffect(() => {
        if (anchorEl) {
            initializeGoogleMapService(anchorEl);
        }
    }, [anchorEl]);
    return (
        <TextField
            required
            label="Search address"
            placeholder="Eg, Saint Collins, New York ..."
            fullWidth
            name="country"
            inputRef={(node: HTMLInputElement | null) => {
                setAnchorEl(node);
            }}
            autoComplete="on"
            margin="normal"
            variant="outlined"
            helperText="Will autocomplete using Google APIs"
            InputProps={{
                endAdornment: <InputAdornment position="end"><PageviewOutlinedIcon /></InputAdornment>,
            }}
            InputLabelProps={{
                shrink: true,
            }}
        />
    );
}