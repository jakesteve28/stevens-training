import { useEffect, useState } from "react";
import { Button, Col, Container, Row, CloseButton } from "react-bootstrap";
import { setCurrentPage } from "../../features/ui/uiSlice";
import { Place } from "../../globals";
import { useDispatch } from 'react-redux';
import goldsgym1 from '../../imgs/goldsgym1.jpg';
import goldsgym2 from '../../imgs/goldsgym2.jpg';
import MediaGallery from "./media-gallery";
import PlaceActions from "./places/PlaceActions";
import PlaceStats from "./places/PlaceStats";
import PlaceCheckins from "./places/PlaceCheckins";
import PlaceComments from "./places/PlaceComments";
import * as Icon from 'react-bootstrap-icons'; 

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
                            background-color: rgba(12, 12, 12, 0.2);                       
                            min-width: 100%;
                            height: 150%;
                        }
                        .single-place-title-row {

                        }
                        .single-place-media-row {
         
                        }
                        .single-place-info-row {
                            font-size: 16pt;
                            padding-top: 30px;
                            border-bottom: 1px solid #404040;
                            margin-bottom: 15px;
                            border-top: 5px solid #404040;
                            min-height: 200px;
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
                        .place-action-button {
                            font-size: 20pt;
                            padding: 15px;
                            border-radius: 10px;
                            text-align: left;
                            margin-right: 10px;
                            margin-left: 10px;
                            color: #249A85;
                            background-color: #191919;
                        }
                        .actions-col {
                            text-align: left;
                            padding-top: 15px;
                        }
                       
                    `
                }
                
            </style>
            <Container fluid className="single-place-cont">
                <Row className="single-place-title-row">

                </Row>  
                <Row className="single-place-media-row">
                    <MediaGallery images={[goldsgym2, goldsgym1]} hidden={false} />
                </Row>
                <Row className="single-place-info-row">
                    <Col></Col>
                    <Col xs="10" sm="8" md="6">
                        <Row className="mb-3">
                            <Col xs="5" className="info-col-left info-title">
                                Gold's Gym &nbsp;&nbsp;&nbsp;&nbsp;<Icon.ThreeDotsVertical className="extra-info-button" onClick={() => setShowExtraInfo(!showExtraInfo)} color={"#34dcbe"} width={25} height={25} />
                            </Col> 
                            <Col className="actions-col">
                                <Button className="place-action-button" variant="dark" size="lg">
                                    <Icon.GeoFill /> &nbsp;
                                    Check In  
                                </Button>
                                <Button className="place-action-button" variant="dark" size="lg">
                                    <Icon.PencilFill /> &nbsp;
                                    Edit 
                                </Button>

                            </Col>                                       
                        </Row>
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
                <Row className="single-place-data-row">
                    <Col xs="12" sm="6" md="4">
                        <PlaceStats place={place}/>
                    </Col>
                    <Col xs="12" sm="6" md="4">
                        <PlaceCheckins place={place}/>
                    </Col>
                    <Col xs="12" sm="6" md="4">
                        <PlaceComments place={place}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}