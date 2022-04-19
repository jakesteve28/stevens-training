// @ts-nocheck  
import { FunctionComponent } from "react";
import { Col, Row } from "react-bootstrap";
import global, { Checkin } from '../../../globals';
import * as Icon from 'react-bootstrap-icons';
interface CheckinListItemProps extends React.HTMLAttributes<Element> {
    checkin: Checkin;
}

export const CheckinListItem = ({ checkin }: CheckinListItemProps) => {
    return (
        <>
            <style type="text/css">
                {
                    `
                        .checkin-list-item {
                            min-height: 80px;
                            border-bottom: 1px solid #404040;
                            padding-top: 20px;
                            padding-bottom: 15px;
                            font-size: 20pt; 
                            font-family: arial;
                            font-weight: 550;
                            transition: all ease 0.5s;
                            color: #23ab9a;
                        }
                        .checkin-list-item:hover,
                        .checkin-list-item:active,
                        .checkin-list-item:focus {
                            transform: scale(1.02);
                            cursor: pointer; 
                            background-color: rgba(40, 40, 40, 0.6);
                        }
                        .checkin-li-name {
                            min-width: 80px;
                            margin-left: -15px;
                        }
                        .checkin-li-gym {
                            text-align: right;
                            color: #23ab9a;
                        }
                        .checkin-li-time {
                        }
                        .checkin-list-item-name-label {
                            display: inline-block;
                            margin-right: 10px;
                            color: #757575;
                            font-size: 14pt; 
                            font-weight: 300;
                        }
                        @media only screen and (max-width: 600px) {
                            .checkin-li-name {
                                min-width: 100px;
                                margin-left: -35px;
                                font-size: 15pt;
                            }
                            .checkin-li-gym {
                                text-align: right;
                                color: #23ab9a;
                                font-size: 15pt;
                                margin-right: 15px;
                            }
                            .checkin-li-time {
                                margin-right: 10px;
                            }
                        }
                    `
                }
            </style>
            <Row className="checkin-list-item">
                <Col xs='1' sm="2" md='2'>
                    
                </Col>
                <Col xs='2' className="checkin-li-name">
                    <span className="checkin-list-item-name-label">Workout:</span>{checkin.workout.name} 
                </Col>
                <Col xs='2' className="checkin-li-gym">
                    <span className="checkin-list-item-name-label">Place:</span>{checkin.place.name}
                </Col>
                <Col xs='3' className="checkin-li-time">
                    <Row>
                        <span className="checkin-list-item-name-label">{`${new Date(parseFloat(checkin.timeEntered)).toLocaleDateString("en-US", global.datePrintLocaleOptions)}`}</span>
                    </Row>
                </Col>
                <Col xs='1'>
                    <Icon.ThreeDotsVertical width={30} height={30} />
                </Col>
            </Row>
        </>
    )
}

export default CheckinListItem;