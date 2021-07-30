import * as React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { MenuItemLink, getResources } from 'react-admin';
import DefaultIcon from '@material-ui/icons/ViewList';
import { MapIcon, UploadIcon, UserIcon } from './images/nav/convertedSVG';


const Menu = ({ onMenuClick, logout }) => {
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources);
    return (
        <div>
            {/* <MenuItemLink
                to="/"
                primaryText="Dashboard"
                leftIcon={<DashboardIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
            /> */}
            <MenuItemLink
                to="/map"
                primaryText="Map"
                leftIcon={<MapIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
            />
            {resources.map(resource => (
                <MenuItemLink
                    key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={
                        (resource.options && resource.options.label) ||
                        resource.name
                    }
                    leftIcon={
                        resource.icon ? <resource.icon /> : <DefaultIcon />
                    }
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                />
            ))}
            <MenuItemLink
                to="/users"
                primaryText="Users"
                leftIcon={<UserIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
            />
            <MenuItemLink
                to="/upload"
                primaryText="Upload"
                leftIcon={<UploadIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
            />
            {isXSmall && logout}
        </div>
    );
};

export default Menu;