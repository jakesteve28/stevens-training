import { useEffect, useState } from "react";
import { Button, Col, Container, Row, CloseButton } from "react-bootstrap";
import { setCurrentPage } from "../../features/ui/uiSlice";
import { DefaultChatMsg, Place } from "../../globals";
import { useDispatch } from 'react-redux';
import goldsgym1 from '../../imgs/goldsgym1.jpg';
import goldsgym2 from '../../imgs/goldsgym2.jpg';
import MediaGallery from "./media-gallery";
import PlaceActions from "./places/PlaceActions";
import PlaceStats from "./places/PlaceStats";
import PlaceCheckins from "./places/PlaceCheckins";
import PlaceComments from "./places/PlaceComments";
import * as Icon from 'react-bootstrap-icons'; 
import Chatbox from "./chatbox/chatbox";

interface SinglePlaceViewProps extends React.HTMLAttributes<Element> {
    place: Place;
    
}
export default function SinglePlaceContainer({ place }: SinglePlaceViewProps) {
    const { name, desc, longitude, latitude, open, 
            placeType, uploads, primaryUpload,comments } = place;
    const dispatch = useDispatch();
    const [showExtraInfo, setShowExtraInfo] = useState(false);
    useEffect(() => {
        dispatch(setCurrentPage(name));
    }, [])
    return (
        <>
            <style>
                {
                    `
                        @media only screen and (max-width: 768px) {
                            .media-col {
                                margin-left: 20px;
                            }
                        }
                        .info-col-left {
                            text-align: left;
                        }
                        .info-col-right {
                            text-align: left;
                        }
                        .single-place-cont {
                            margin-top: 85px;
                            border-radius: 15px;
                            color: #CCCCCC;
                            background-color: transparent;                       
                            min-width: 100%;
                            height: 170%;
                        }
                        .single-place-media-row {
                            margin-bottom: 15px;
                        }
                        .single-place-info-row {
                            font-size: 16pt;
                            border-radius: 10px;
                            padding-right: 50px;
                            padding-left: 50px;
                        }
                        .single-place-data-row {
                            font-size: 16pt;
                        }
                        .single-place-actions-row {
                            font-size: 16pt;
                        }
                        .single-place-comments-row {

                        }
                        .place-desc {
                            font-size: 12pt; 
                            color: #aaaaaa;
                        }
                        .info-title {
                            font-size: 38pt; 
                            font-weight: 700; 
                            color: #249A85;
                            padding: 10px;
                            white-space: nowrap;
                        }
                        .info-addr-label {
                            color: #757575;
                            font-size: 13pt;
                        }
                        .extra-info-place {
                            display: none;
                        }
                        .extra-info-button:hover {
                            cursor: pointer;
                        }
                        .extra-info-button {
                            margin-left: 10px;
                        }
                        .place-action-button {
                            font-size: 20pt;
                            padding: 15px;
                            border-radius: 10px;
                            text-align: left;
                            margin-right: 10px;
                            margin-left: 10px;
                            color: #249A85;
                            background-color: #181818;
                            width: 190px;
                            margin: 5px;
                        }
                        .actions-col {
                            text-align: left;
                            padding-top: 15px;
                            white-space: nowrap;
                        }
                        .single-place-title-row {
                            background-color: rgba(8, 8, 8, 0.8);
                            text-align: left;
                            padding-top: 10px;
                        }
                    `
                }
                
            </style>
            <Container fluid className="single-place-cont">
                <Row className="mb-3 single-place-title-row sticky-top" >
                    <Col xs="12" sm="12" md="6" className="info-col-left info-title">
                        <span>Gold's Gym<Icon.ThreeDotsVertical className="extra-info-button" onClick={() => setShowExtraInfo(!showExtraInfo)} color={"#34dcbe"} width={25} height={25} /></span>
                    </Col> 
                    <Col className="actions-col">
                        <span>
                            <Button className="place-action-button" variant="dark" size="lg">
                                <Icon.GeoFill /> &nbsp;
                                Check In  
                            </Button>
                            <Button className="place-action-button" variant="dark" size="lg">
                                <Icon.PencilFill /> &nbsp;
                                Edit 
                            </Button>
                        </span>
                    </Col>     
                    <Row className="single-place-info-row">
                        <Col></Col>
                        <Col xs="10" sm="8" md="6">
                            <Row className={`${(!showExtraInfo) ? "extra-info-place" : ""}`}>
                                <Col className="info-col-right" xs="6">
                                    <span className="info-addr-label">Address:<br></br></span> 660 Vancouver Mall Dr.<br></br> Vancouver WA
                                </Col>     
                                <Col className="info-col-left place-desc" xs="6">
                                    Full feature fitness facility located in Vancouver Mall
                                </Col>
                                <Col className="info-col-right" xs="6">
                                    (123) 456-7890
                                </Col>
                            </Row>
                        </Col>
                        <Col></Col>
                    </Row>                                
                </Row>
             
                <Row className="single-place-media-row">
                    <Col className="media-col" xs="12" md="7">
                        <MediaGallery images={[goldsgym2, goldsgym1]} hidden={false} />
                    </Col>
                    <Col xs="12" md="5">
                        <Chatbox messages={[DefaultChatMsg, DefaultChatMsg, DefaultChatMsg, {
                                                commentText: "VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY VERY LONG MESSAGE!",
                                                created: "1649808000000", 
                                                username: "Jacob Stevens"
                                            }]}/>
                    </Col>
                </Row>
                <Row className="single-place-data-row">
                    <Col xs="12" md="6">
                        <PlaceStats place={place}/>
                    </Col>
                    <Col xs="12" md="6">
                        <PlaceCheckins place={place}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}