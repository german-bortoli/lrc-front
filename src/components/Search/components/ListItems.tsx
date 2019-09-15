/**
 * ListItems, child component
 *
 * @description Will list all the services
 * @author Bortoli German <german@borto.li>
 */

import React, {Fragment} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {ServiceType} from "../../../api-clients/findservices.api";

import useStyles from '../Search.styles';

interface ListItemsProps {
    services: object[];
    isLoggedIn: boolean;
    setDeleteService: any;
    editService: any;
}
/**
 * List items class
 * @constructor
 */
export default function ListItems(props: ListItemsProps) {
    const classes = useStyles();

    const bull = <span className={classes.bullet}>•</span>;
    /**
     * Render card actions buttons
     */
    const renderCardActions = (service: ServiceType) => {
        if (!props.isLoggedIn) {
            return false;
        }
        return (
            <CardActions>
                <Button size="small" onClick={() => props.editService(service)}>Edit</Button>
                <Button color="secondary" size="small" onClick={() => props.setDeleteService(service)}>Delete</Button>
            </CardActions>
        );
    };

    /**
     * Render item on listing
     * @param service
     */
    const renderServiceItem = (service: any) => {

        return (
            <Card key={service.id.toString()} className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {service.country} {bull} {service.city} {bull} {service.state}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {service.title}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {service.address} {bull} {service.zip_code}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {service.description}
                    </Typography>
                </CardContent>
                {renderCardActions(service)}
            </Card>
        );
    };

    const services = props.services.map(service => renderServiceItem(service));

    return (
        <Fragment>
            {services}
        </Fragment>
    );
}