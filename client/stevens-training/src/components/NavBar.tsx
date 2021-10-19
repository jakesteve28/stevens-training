import React from 'react'; 
import { Container, Nav, Navbar, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons';
import pic from '../imgs/weight-plate.png';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../features/user/userSlice';

export function StevensBottomNavBar(){
    return (
        <>
        <style type="text/css">
           {
               `
                .bot-nav {
                    max-height: 50px;
                    height: 50px;
                    opacity: 0.5 !important;
                    background-color: #101010 !important;
                }

                .footer-text {
                    color: #999999;
                    text-align: right;
                    margin-left: auto;
                    font-size: 6pt;
                    font-weight: bold;
                }

                .footer-text:hover {
                    color: #ff0000;
                    cursor: pointer;
                }
               `
           } 
        </style>
        <Navbar fixed="bottom" expand="sm" bg="dark" variant="dark" className="bot-nav">
             <Container fluid>
                <span className="footer-text">Created by Jacob Stevens, 2021</span>
            </Container>
        </Navbar>
        </>
    )
}

export default function StevensNavBar() {
    const loggedIn = useSelector(selectLoggedIn);

    const AccountIcon = (props: any) => {
        const AccountTooltip = (props: any) => { 
            return (
                    <Tooltip id="button-tooltip" {...props}>
                        {(loggedIn) ? "Click to view your account" : "Click to go to login page"  }
                    </Tooltip>
                )
        }
        return  (
            <OverlayTrigger
                placement="bottom-start"
                delay={{ show: 250, hide: 400 }}
                overlay={AccountTooltip}
            >
                <Icon.PersonCircle className="prsn-icon" size={28}></Icon.PersonCircle>
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
                        color: ${(loggedIn) ? "#34ebde" : "#404040" };
                        margin-left: 20px;
                    }

                    .brand-title {
                        color: #AAAAAA !important;
                        font-size: 27pt;
                        font-weight: 600;
                        -webkit-text-stroke: 1px #17396e;
                    }

                    .login-text {
                        margin-left: auto;
                    }

                    .image-custom {
                        background-color: transparent;
                        width: 70px; 
                        height: 70px;
                        padding: -10px !important;
                        margin: -15px;
                        display: inline;
                        filter: brightness(1.5);
                        filter: opacity(95%);
                        border: none;
                        outline: none;
                        transition: all 1.0s ease;
                        -webkit-transition: all 1.0s ease; 
                        margin-left: 10px;
                    }

                    .image-custom:hover {
                        filter: brightness(2.0);
                        filter: drop-shadow(0px 0px 10px #34ebde);
                        transform: scale(1.02);
                    }

                    .logo {
                        font-weight: 600;
                        color: #DDDDDD;
                        display: inline;
                        transition: 0.5s all ease;
                    }

                    .span-inline {
                        display: inline;
                        transition: all .75s ease;
                        white-space: nowrap;
                    }

                    .logo:hover {
                        transform: scale(1.05);
                        color: #34ebde;
                        text-shadow: 2px 2px 2px #ff0000;
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
                        color: #34e5eb;
                        margin-right: 30px;
                        margin-bottom: 10px;
                        font-weight: bolder;
                    }

                    .login-btn:hover { 
                        filter: brightness(1.2);
                        cursor: pointer;
                    }

                    .nav-link-ctm {
                        color: #34e5eb;
                        font-weight: bolder;
                        margin-left: 20px;
                        margin-right: 20px;
                    }

                    .nav-link-ctm:hover {
                        filter: brightness(0.8);
                        cursor: pointer;
                    } 

                    .login-link {
                    }

                    .login-link:hover {
                        filter: brightness(0.8);
                        cursor: pointer;
                    }

                    .stevens-nav {
                        background-color: #101010 !important;
                        opacity: 0.87;
                    }
                    `}
                </style>
                <Navbar collapseOnSelect fixed="top" expand="sm" bg="dark" variant="dark"  className="stevens-nav">
                    <Container fluid>
                        <Navbar.Brand href="/home"><span className="span-inline"><h3 className="logo">Stevens Strength</h3><Image src={pic} roundedCircle className="image-custom" /></span></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {(loggedIn) ? (<Nav.Link href="/app"><span className="nav-link-ctm">App</span></Nav.Link>) : ""} 
                            <Nav.Link href="/about"><span className="nav-link-ctm">About</span></Nav.Link>
                        </Nav>
                        <Nav>
                            {(loggedIn) ? <NotificationsIcon /> : <span className="nav-link-ctm login-link">Login</span>}
                            <AccountIcon></AccountIcon>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        </>
    )
}