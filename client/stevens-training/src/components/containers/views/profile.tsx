import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Image, ListGroup, Card } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { selectUser } from '../../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export function EditableProfileAttribute(...props: any) {
    return (
        <>
        </>
    )
}

export function ProfileCheckin() {
    return (
        <div className="check-in">
            <Container fluid className="cont-check-in">
                <Row >
                    <Col xs="7">
                        <div className="gyms-title">Recent Workouts:</div>
                    </Col>
                </Row>
                <Row className="checkin-row">
                    <Col xs="7" className="quick-check-in-workouts">
                        <div className="workout-gym-label">Legs @ Gold's Gym</div>
                        <div className="workout-gym-label">Chest @ Home</div>
                        <div className="workout-gym-label">Chest @ Gold's Gym</div>
                        <div className="workout-gym-label">Back @ The Fitness Center (North Spokane)</div>
                    </Col>
                    <Col className="quick-check-in" xs="5">
                        <Row>
                            <span className="quick-check-title">Check in / Start Workout</span>
                        </Row>
                        <Row>
                            <span className="quick-check-icon"><Icon.GeoAltFill width={"50px"} height={"50px"}/></span>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default function ProfileScreen() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [editingStatus, setEditingStatus] = useState(false);
    const [editingBio, setEditingBio] = useState(false);
    const [bio, setBio] = useState(() => user.bio || "(empty)");
    const [status, setStatus] = useState(() => user.status || "(empty)");
    const [submitIconColor, setIconColor] = useState("green");
    const submitStatusUpdate = () => {
        alert("new status updated: " + status);
        if(status.length > 64) setStatus(status.slice(0, 64))
        setEditingStatus(false);
    }
    const submitBioUpdate = () => {
        alert("new bio updated: " + bio);
        setEditingBio(false);
    }
    const editing = `
        background-color: #171717; 
        font-style:italic;
        color: #34dbce;
        outline: none;
        border: none; 
    `;
    const styleEditing = editingStatus ? editing : "";
    const styleBioEditing = editingBio ? editing : "";
    return (
        <>
        <style type="text/css">
        {`      
                .quick-check-in-workouts::-webkit-scrollbar-track {
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    border-radius: 10px;
                    background-color: #191919;
                }
                .quick-check-in-workouts::-webkit-scrollbar {
                    width: 12px;
                    background-color: #191919;
                }
                .quick-check-in-workouts::-webkit-scrollbar-thumb {
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                    background-color: rgba(52, 220, 190, 0.5)
                }
                .workout-gym-label {
                    text-align: left;
                    min-height: 50px;
                    padding: 5px;
                    font-weight: 500; 
                    font-size: 16pt;
                }

                .gyms-title {
                    text-align: left;
                    font-size: 10pt;
                    padding-left: 25px;
                    color: #AAAAAA;
                    padding-top: 15px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #444444;
                    font-size: 20pt;
                }
                
                .quick-check-in-workouts {
                    max-height: 85%;
                    padding: 25px;
                }
                
                .quick-check-title {
                    font-weight: 650;
                    color: #34bcde;
                    font-size: 18pt;
                    cursor: pointer;
                    padding: 5px;
                }

                .quick-check-title:hover {
                    color: #DCDCDC;
                }

                .quick-check-title:hover ~ .quick-check-icon {
                    color: #DCDCDC;
                }

                .quick-check-icon:hover {
                    color: #DCDCDC;
                }

                .quick-check-icon {
                    cursor: pointer;
                }
                
                .cont-check-in {
                    height: 100%;
                }

                .checkin-row {
                    height: 200px;
                    overflow: hidden;
                }
            
                .quick-check-in { 
                    height: 200px !important;
                    margin-top: 0px;
                }
                
                .background-container-cstm {
                    background-color: #191919;
                    height: 100vh;
                }
                .check-in {
                    width: 100%;
                    height: 250px;
                    background-color: #282828;
                    box-shadow 1px 1px 5px #101010;
                }
                .submit-status-icon {
                    transition: ease all 0.4s;
                    padding-left: 15px;
                }
                .submit-status-icon:hover {
                    cursor: pointer;
                    transform: scale(1.15);
                }
                .user-cover {
                    background-color: #000000;
                    position: fixed;
                    top: 0; 
                    left: 0;
                    height: 40vh;
                    width: 100vw;
                }
                .profile-cont {
                    position: relative;
                    text-align: left;
                    width: 90%;
                    max-width: 768px;
                    color: #34dcbe;
                    margin-left: auto;
                    margin-right: auto;
                    background-color: transparent;
                    height: 100%;
                    transition: all ease 0.70s;
                } 
                .profile-pic {
                    text-align: center;
                }
                .profile-title {
                    text-align: center;
                    cursor: text;
                    font-size: 30pt;
                    font-weight: 500;
                    color: #00a3be;
                    text-shadow: 0.5px 1px #34dcbe;
                    margin-bottom: 10px;
                }
                .profile-name:hover {
                    cursor: pointer;
                    opacity: 0.5;
                }
                .profile {
                    width: 100%;  
                    position: absolute;
                    top: 17%;    
                }
                .profile-row {
                    text-align: center;
                }

                @media only screen and (max-width: 500px) {
                    .profile-cont {
                        width: 95%;
                    }
                }
                .profile-img {
                    width: 100px; 
                    height: 100px;
                    border-radius: 50px;
                    box-shadow: 2px 2px 5px #202020;
                    display: inline;
                    transition: all ease 1.0s;
                    border: solid 3px #aaaaaa;
                }
                .profile-img:hover {
                    opacity: 0.7;
                    cursor: pointer;
                }
                .profile-info-bar {
                    background-color: transparent;
                    width: 100%;
                    height: 50px;
                }
                .profile-info-bar > * {
                    width: 100%;
                    min-width: 120px;
                    margin: 10px;
                    border-radius: 8px;
                    box-shadow: 1px 1px 5px #000000;
                }
                .profile-summary-bar {
                    background-color: transparent;
                    width: 90%;
                    height: 150px;
                    display: flex;
                }
                .profile-summary-bar > * {
                    width: 100%;
                    min-width: 125px;
                    margin: 25px;
                    border-radius: 8px;
                    box-shadow: 1px 1px 5px #000000;
                }
                .profile-quick-info {
                    box-shadow: none;
                    border-radius: 0px;
                }
                .status-info-span {
                    color: #34bcde;
                    font-weight: 250;
                    background-color: #202020;
                    padding: 15px;
                    text-shadow: 1px 1px 5px #101010;
                    border-radius: 5px;
                    padding-left: 15px;
                    width: 100%;
                    display: inline-block;
                    text-align: left;
                    ${styleEditing}
                }
                .bio-text-area {
                    color: #34bcde;
                    font-weight: 250;
                    background-color: #202020;
                    padding: 15px;
                    text-shadow: 1px 1px 5px #101010;
                    border-radius: 5px;
                    padding-left: 15px;
                    width: 100%;
                    display: inline-block;
                    text-align: left;
                    outline: none; 
                    border: none;
                    margin-bottom: 50px;
                    ${styleBioEditing}
                }
                .bio-text-area:hover, .status-info-span:hover {
                    background-color: #212121 !important;
                    cursor: text;
                    box-shadow: 1px 1px 5px 5px rgba(52, 205, 190, 0.1);
                }
                .status-info-span::placeholder, .bio-text-area::placeholder {
                    color: #666666;
                }
                .edit-icon {
                    margin-left: 10px;
                    display:inline;
                    color: #660000;
                }

                .edit-icon:hover {
                    color: #860000;
                    cursor: pointer;
                    transform: scale(1.15);
                }
                .edit-icon-pencil {
                    display: inline-block;
                    cursor: pointer;
                    margin-top: 15px;
                    color: #303030;
                    transition: transform ease 0.45s;
                }
                .edit-icon-pencil:hover {
                    color: #909090;
                    transform: rotate(-360deg) scale(1.10);
                }
                .profile-actions {
                    max-height: 50px;
                    margin-top: 0px;
                }
                .profile-accordion {
                    background-color: #191919 !important;
                    color: #34dcbe;
                    border: 1px solid #101010;
                    outline: 1px #101010 !important;
                }
                .profile-accordion > * {
                    background-color: #191919 !important;
                    color: #34dcbe;
                    border: 1px solid #101010;
                    outline: 1px #101010 !important;
                }
                .action-col:hover {
                    background-color: #060606 !important;
                    color: #34dcbe;
                    opacity: 0.7;
                    cursor: pointer;
                }
                .action-col:active {
                    background-color: #060606 !important;
                    color: #34dcbe;
                    border: 1px blue solid;
                    opacity: 0.7;
                }
                .action-col:focus {
                    background-color: #060606 !important;
                    color: #34dcbe;
                    opacity: 0.7;
                }
                .list-item-title {
                    width: 200px !important;
                    min-width: 100px !important;
                    display: inline-block;
                    font-weight: 500;
                    font-size: 25pt;
                    margin-top: auto; 
                    margin-bottom: auto;
                }
                .profile-cont {
                    overflow-x: hidden;
                }
                .field-label {
                    text-align: left;
                    margin-left: 20%;
                    min-height: 30px;
                    color: #606060;
                    font-weight: 700;
                    font-size: 15pt;
                    margin-bottom: 10px;
                    margin-top: 10px;
                }
                .editing-status {
                    cursor: text !important;

                }
                .editing-status:hover, .editing-bio:hover {
                    cursor: text;
                }
                .checkin, .view-stats {
                    font-weight: 700;
                    font-size: 25pt;
                    background-color: #202020;
                    padding-top: 25px;
                    padding-bottom: 25px;
                    max-width: 225px;
                    margin: 15px;
                    color: #777777;
                    border-radius:7px;
                    transition: ease all 0.5s;
                }
                .checkin:hover, .view-stats:hover {
                    color: #34dcbe;
                    cursor: pointer;
                    transform: scale(1.10);
                    box-shadow: 1px 1px 5px 5px rgba(52, 205, 190, 0.1);
                }
                .pencil {
                    text-align: left;
                }
            `}
            </style>
            <Container fluid className="background-container-cstm"> 
                    <Container fluid className="profile-cont">
                        <div className="user-cover"></div>
                        <div className="profile">
                            <Container fluid>
                                <Row>
                                    <div className="profile-pic">
                                        <Image src="https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg" className="profile-img"></Image>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="profile-title">
                                        <span className="profile-name">Jacob&nbsp;Stevens</span>
                                    </div>
                                </Row>
                                <Row>
                                    <Col></Col>
                                    <Col xs="4" className="text-center checkin">Check In<br></br><Icon.PinMapFill></Icon.PinMapFill></Col>
                                    <Col xs="4" className="text-center view-stats">View Stats<br></br><Icon.BarChartFill></Icon.BarChartFill></Col>
                                    <Col></Col>
                                </Row>
                                <Row className="profile-row">
                                    <Col>
                                        <Row>
                                            <span className="field-label">Status:</span>                                          
                                        </Row>   
                                        <Row>
                                                <Col xs="2"></Col>                                               
                                                <Col xs="8">
                                                    {
                                                    styleEditing 
                                                            ? 
                                                            (
                                                                <span>
                                                                    <input type="text" onChange={(e) => setStatus(e.target.value)} className="status-info-span editing-status" placeholder="Enter new status" id="status-edit-profile-input"                                  
                                                                    />
                                                                </span>
                                                            ) 
                                                            :
                                                                (<span className="status-info-span">{`${status}`}</span>)
                                                    }  
                                                </Col>
                                               <Col xs="2" className="text-left pencil">
                                                    <span onClick={() => setEditingStatus(!editingStatus)}>
                                                                {
                                                                styleEditing ? (
                                                                    <>
                                                                        <Icon.CheckLg width={40} height={40} color={submitIconColor} className="submit-status-icon" onClick={() => submitStatusUpdate()}/>
                                                                        <Icon.XLg className="edit-icon" width={20} height={20} />
                                                                    </>
                                                                ) : (
                                                                    <Icon.PencilFill className="edit-icon-pencil" width={20} height={20} />
                                                                )
                                                                }
                                                    </span>    
                                                </Col>                                                                   
                                        </Row>
                                        <Row>
                                            <span className="field-label">Biography:</span>                                          
                                        </Row>   
                                        <Row>
                                            <Col xs="2"></Col>                                               
                                                <Col xs="8">
                                                            <textarea
                                                                className="bio-text-area editing-bio"
                                                                rows={3}
                                                                placeholder={bio}
                                                                readOnly={!editingBio} 
                                                                value={bio}     
                                                                onChange={(e) => setBio(e.currentTarget.value)}                                
                                                            ></textarea>
                                                        </Col> 
                                                       <Col xs="2" className="pencil"><span onClick={() => setEditingBio(!editingBio)}>
                                                                {
                                                                styleBioEditing ? (
                                                                    <>
                                                                        <Icon.CheckLg width={40} height={40} color={submitIconColor} className="submit-status-icon" onClick={() => submitBioUpdate()}/>
                                                                        <Icon.XLg className="edit-icon" width={20} height={20} />
                                                                    </>
                                                                ) : ( 
                                                                    <Icon.PencilFill className="edit-icon-pencil" width={20} height={20} />
                                                                )
                                                                }
                                                        </span>  </Col>
                                                                                                                            
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Container>
            </Container>
            </>
    )
}