import React, { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectShowAbout, showAbout as _showAbout } from '../features/ui/uiSlice';

export default function OffCanvasAbout() {
  const showAbout = useSelector(selectShowAbout);
  const dispatch = useDispatch();
  const [showOff, setShowOff] = useState(false);
  useEffect(() => {
    setShowOff(showAbout);
  }, [showAbout]);
  return (
    <>
    <style type="text/css">
      {
        `
          .offcanv-bdy {
            background-color: #191919;
            color: #34dbce;
            text-align: center;
          }
          .offcanv-title {
            color: #34dbce;
            font-weight: bolder;
            font-size: 35pt;
            transition: all 1.0s ease;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
          }
          .offcanv-title:hover {
            text-shadow: 3px 3px 2px #ff0000;
            cursor: pointer;
          } 
          .offcanv-header {
            background-color:transparent;
            text-align: center;
          }
        `
      }
    </style>
      <Offcanvas show={showOff} placement='top' onHide={() => { dispatch(_showAbout()); }} style={{ backgroundColor: "transparent", height: "25vh", minHeight: "300px" }}> 
        <Offcanvas.Header closeButton closeVariant="white" className="offcanv-header">
          <Offcanvas.Title className="offcanv-title">About</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanv-bdy">
          <span>Created by Jacob Stevens in 2021. Designed to help people connect and </span>
          <br></br>
          <span> collaborate in the context of training for health and competition. </span>
          <br></br>
          Contact: 
          jake.stevens082@gmail.com
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}