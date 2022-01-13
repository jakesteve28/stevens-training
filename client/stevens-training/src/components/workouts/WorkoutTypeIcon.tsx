import React from 'react';
import global from '../../globals';
import { ReactComponent as WorkoutLogo } from '../../imgs/svgs/strength.svg';
import { ReactComponent as PowerLogo } from '../../imgs/svgs/power.svg';

export default function WorkoutTypeIcon({ workoutType = "default" }) {
    switch(workoutType) {
        case 'strength': return (
            <WorkoutLogo className="ctm-svg-icon" width="100" height="100" viewBox="50 60 350 350"/>
        );
        case 'power': return (
            <PowerLogo width="100" height="100" viewBox="70 55 325 325"/>
        )
        default: return (
            <PowerLogo className="ctm-svg-icon" width="75px" height="75px" viewBox="0 -80 400 400"/>
        )
   } ;
    }
    