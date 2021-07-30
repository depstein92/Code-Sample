import React from 'react';
import {useStyles} from '@material-ui/core';
import {NumberedIcon} from '../components/MaterialUICustomIcons';

export default {
    title: 'Numbered Icons',
    component: NumberedIcon,
}

const Template = ({color, number}) => {
    return <NumberedIcon color={color} number={number} />
};

export const NumberedIconComponent = Template.bind({});
NumberedIconComponent.args = {
    color: '#A1FCE2',
    number: 2
}