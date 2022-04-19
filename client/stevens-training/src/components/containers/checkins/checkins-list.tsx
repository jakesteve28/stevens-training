import { FunctionComponent } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectCheckins } from "../../../features/user/userSlice";
import { Checkin } from "../../../globals";
import CheckinListItem from "./checkin-item";
export const CheckinsListView: FunctionComponent = () => {
    const checkins = useSelector(selectCheckins);
    return (
        <>
            {
                (checkins) ? checkins.map((checkin : Checkin) => {
                    return (
                        <>
                            <CheckinListItem checkin={checkin} />
                        </>
                    );
                }) : null
            }
        </>
    )
}

export default CheckinsListView;