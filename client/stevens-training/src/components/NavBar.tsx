import React from 'react'; 
import { Container, Nav, Navbar, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons';
import pic from '../imgs/weight-plate.png';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentWorkout, selectLoggedIn } from '../features/user/userSlice';
import { selectCurrentPage, selectShowBottomNav, showAbout } from '../features/ui/uiSlice';
import { useHistory } from 'react-router-dom';

export function StevensBottomNavBar(){
    const currentWorkout = useSelector(selectCurrentWorkout); 
    const showBottomNav = useSelector(selectShowBottomNav);
    return (
        <>
        <style type="text/css">
           {
               `
                .bot-nav {
                    max-height: 120px;
                    height: 120px;
                    background-color: rgba(0, 61, 50) !important;
                    border-top: 3px solid #303030;
                }

                .footer-text {
                    color: #DDDDDD;
                    text-align: left;
                    font-size: 15pt;
                    font-weight: 200;
                }

                .footer-text:hover {
                    color: #ff0000;
                    cursor: pointer;
                }
               `
           } 
        </style>
        {(showBottomNav && currentWorkout.id) ?
            <Navbar fixed="bottom" bg="dark" variant="dark" className="bot-nav">
                <Container fluid>
                    <span className="footer-text">Name:  {currentWorkout.name}</span>
                </Container>
            </Navbar> : <></>
        } 
        </>
    )
}

export default function StevensNavBar() {
    const loggedIn = useSelector(selectLoggedIn);
    const currentPage = useSelector(selectCurrentPage); 
    const dispatch = useDispatch();
    const history = useHistory();
    const AccountIcon = (props: any) => {
        const history = props.history;
        const loggedIn = props.loggedIn;
        const AccountTooltip = (props: any) => { 
            return (
                    <Tooltip id="button-tooltip" {...props}>
                        {(loggedIn) ? "Click to view your account" : "Click to go to login page"  }
                    </Tooltip>
                )
        }
        const navLogin = () => {
            if(history && !loggedIn) {
                history.push('/login');
            }
        }
        return  (
            <OverlayTrigger
                placement="bottom-start"
                delay={{ show: 250, hide: 400 }}
                overlay={AccountTooltip}
            >
                <Icon.PersonCircle className="prsn-icon" size={28} onClick={navLogin}></Icon.PersonCircle>
            </OverlayTrigger>
        )   
    }

    const NotificationsIcon = (props: any) => {
        const NotificationTooltip = (props: any) => {
            return (
                <Tooltip id="button-tooltip" {...props}>
                    Click to view your notifications
                </Tooltip>
            )
        }
        return  (
            <OverlayTrigger
                placement="bottom-start"
                delay={{ show: 250, hide: 400 }}
                overlay={NotificationTooltip}
            >
                <Icon.BellFill className="prsn-icon" size={22}></Icon.BellFill>
            </OverlayTrigger>
        )   
    }

    return (
        <>
            <style type="text/css">
                    {`
                    .prsn-icon:hover {
                        filter: brightness(1.2);
                        color: #34e5eb;
                        cursor: pointer;
                    }
                    .prsn-icon {
                        color: ${(loggedIn) ? "#0098be" : "#404040" };
                        margin-left: 20px;
                        margin-top: 8px;
                        margin-right: 15px;
                    }
                    .brand-title {
                        color: #DDDDDD !important;
                        font-size: 27pt;
                        font-weight: 600;
                        -webkit-text-stroke: 1px #17396e;
                    }
                    .login-text {
                        margin-left: auto;
                    }
                    .image-custom {
                        background-color: transparent;
                        width: 60px; 
                        height: 60px;
                        padding: -10px !important;
                        display: inline;
                        filter: brightness(1.5);
                        filter: opacity(45%);
                        border: none;
                        outline: none;
                        transition: all 1.25s ease;
                        margin-left: 40px;
                    }
                    @media screen and (max-width: 500px) {
                        .image-custom {
                            margin-left: 10px;
                        }
                        .prsn-icon {
                            margin-left: auto;
                            margin-right: auto;
                            margin-top: 30px;
                            transform: scale(1.25);
                        }
                    }
                    @media screen and (max-width: 800px) {
                        .current-page-label {
                            display: none;
                        }
                        .about-nav {
                            margin-right: auto;
                        }
                    }
                    .image-custom {     
                        filter: brightness(1.5); 
                    }
                    .image-custom:hover {
                        transform: scale(1.10);         
                        cursor: pointer;
                    }
                    .image-custom:active {
                        transform: scale(1.50);
                    }
                    .logo {
                        font-weight: 600;
                        color: #DDDDDD;
                        display: inline;
                        transition: 1.0s all ease;
                        cursor: pointer;
                        margin-top: auto; 
                        margin-bottom: auto;
                    }
                    .span-inline {
                        display: inline;
                        transition: all .75s ease;
                        white-space: nowrap;
                    }
                    .logo:hover {
                        transform: scale(1.05);
                        color: #34ebde;
                        text-shadow: 2px 2px 2px #DDDDDD;
                    }
                    .custom-toggle::after {
                        display:none;
                    }
                    .custom-toggle {
                        width: 70; 
                        height: 70;
                        border-radius: 15px;
                        background-color: transparent; 
                        outline: none; 
                        border: none;
                    }
                    .login-btn {
                        color: #DDDDDD;
                        margin-right: 30px;
                        margin-bottom: 10px;
                        font-weight: bolder;
                    }
                    .login-btn:hover { 
                        filter: brightness(1.2);
                        cursor: pointer;
                    }
                    .nav-link-ctm {
                        color: #DDDDDD;
                        font-weight: bolder;
                        margin-left: 20px;
                        margin-right: 20px;
                    }
                    .nav-link-ctm:hover {
                        filter: brightness(0.8);
                        cursor: pointer;
                    }
                    .login-link:hover {
                        filter: brightness(0.8);
                        cursor: pointer;
                    }
                    .stevens-nav {
                        background-color: #222222 !important;
                        border-bottom: 3px solid #303030;
                    }
                    .login-link {
                        margin-top: auto;
                        margin-bottom: auto;
                        font-size: 18pt;
                        color: #DDDDDD;
                    }
                    .currpage {
                        color: #34dcbe;
                        text-align: left;
                        font-size: 32pt;
                        font-weight: 500;
                        white-space: nowrap;
                    }
                    .current-page-label {
                        margin-left: 50px;
                    }
                    .about-nav {

                    }
                    `}
                </style>
                <Navbar collapseOnSelect fixed="top" expand="md" bg="dark" variant="dark"  className="stevens-nav">
                    <Container fluid>
                        <Navbar.Brand><span className="nav-link-ctm login-link"><h3 className="logo" onClick={() => { if(history) history.push('/home')}}>stephanos</h3><Image src={pic} onClick={() => { if(history) history.push('/home')}}  roundedCircle className="image-custom" /></span></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="about-nav">
                            {(loggedIn) ? (<Nav.Link href="/app"><span className="nav-link-ctm">App</span></Nav.Link>) : ""} 
                            <Nav.Link onClick={(e) => { e.preventDefault(); dispatch(showAbout()); }}><span className="nav-link-ctm login-link">About</span></Nav.Link>
                        </Nav>
                        <Nav className="me-auto current-page-label">
                            <span className="currpage">{currentPage}</span>
                        </Nav>
                        <Nav>
                            {(loggedIn) ? <NotificationsIcon /> : <span id="link-login" onClick={() =>{ return (!loggedIn && history) ? history.push('/login') : null }} className="nav-link-ctm login-link">Login</span>}
                            <AccountIcon history={history} loggedIn={loggedIn}></AccountIcon>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        </>
    )
}