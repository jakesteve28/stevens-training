import { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CheckinsContainer } from "../checkins/checkins-container";
import { setCurrentPage } from "../../../features/ui/uiSlice";

export const CheckinsView: FunctionComponent = () => { 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentPage("Workout Checkins"));
    }, []);
    return (
        <CheckinsContainer />
    )
}

export default CheckinsView; 