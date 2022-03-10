import React from 'react';
import global from '../../globals';
import { ReactComponent as PowerLogo } from '../../imgs/svgs/power.svg';
import { ReactComponent as AerobicLogo } from '../../imgs/svgs/aerobic.svg';
import { ReactComponent as AnaerobicLogo } from '../../imgs/svgs/anaerobic.svg';
import { ReactComponent as BodybuildingLogo } from '../../imgs/svgs/bodybuilding.svg';
import { ReactComponent as ControlLogo } from '../../imgs/svgs/control.svg';
import { ReactComponent as DropsetLogo } from '../../imgs/svgs/dropset.svg';
import { ReactComponent as EnduranceLogo } from '../../imgs/svgs/endurance.svg';
import { ReactComponent as ExplosiveLogo } from '../../imgs/svgs/explosive.svg';
import { ReactComponent as FlexibilityLogo } from '../../imgs/svgs/flexibility.svg';
import { ReactComponent as HeavyLogo } from '../../imgs/svgs/heavy.svg';
import { ReactComponent as IntervalsLogo } from '../../imgs/svgs/intervals.svg';
import { ReactComponent as MaxLogo } from '../../imgs/svgs/max.svg';
import { ReactComponent as MixLogo } from '../../imgs/svgs/mix.svg';
import { ReactComponent as OtherLogo } from '../../imgs/svgs/other.svg';
import { ReactComponent as PumpLogo } from '../../imgs/svgs/pump.svg';
import { ReactComponent as SpeedLogo } from '../../imgs/svgs/speed.svg';
import { ReactComponent as StabilityLogo } from '../../imgs/svgs/stability.svg';
import { ReactComponent as StrengthLogo } from '../../imgs/svgs/strength.svg';


export default function WorkoutTypeIcon({ workoutType = "default" }) {
    switch(workoutType) {
        case 'Bodybuilding': return (
            <BodybuildingLogo className="ctm-svg-icon" width="100" height="100" viewBox="-75 -50 350 350"/>
        );
        case 'Flexibility': return (
            <FlexibilityLogo className="ctm-svg-icon" width="100" height="100" viewBox="50 60 350 350"/>
        );
        case 'Mix': case 'Dynamic': return (
            <MixLogo className="ctm-svg-icon mix-icon" width="100" height="100" viewBox="15 0 500 500"/>
        );
        case 'Other': return (
            <OtherLogo className="ctm-svg-icon" width="100" height="100" viewBox="-15 -20 275 275"/>
        );
        case 'Stability': return (
            <StabilityLogo className="ctm-svg-icon" width="100" height="100" viewBox="100 100 350 350"/>
        );
        case 'Strength': return (
            <StrengthLogo className="ctm-svg-icon strength-icon" width="100" height="100" viewBox="50 0 350 350"/>
        );
        default: return (
            <PowerLogo className="ctm-svg-icon" width="75px" height="75px" viewBox="0 -80 400 400"/>
        )
   } ;
    }
    