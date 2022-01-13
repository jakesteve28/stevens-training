import React, { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectShowForgotInfo, showForgotInfo as _showForgotInfo } from '../features/ui/uiSlice';

export default function OffCanvasShowForgotInfo() {
  const showForgotInfo = useSelector(selectShowForgotInfo);
  const dispatch = useDispatch();
  const [showInfo, setShowForgotInfo] = useState(false);
  useEffect(() => {
    setShowForgotInfo(showForgotInfo);
  }, [showForgotInfo]);
  return (
    <>
    <style type="text/css">
      {
        `
          .offcanv-bdy {
            background-color: #191919;
            color: #34dbce;
            text-align: center;
            opacity: 0.8;
            height: 100%;
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
            background-color: #191919;
            text-align: center;
          }
        `
      }
    </style>
      <Offcanvas show={showInfo} placement='end' onHide={() => { dispatch(_showForgotInfo()); }} style={{ backgroundColor: "transparent", height: "100vh", minHeight: "250px", overFlowY: "scroll" }}> 
        <Offcanvas.Header closeButton closeVariant="white" className="offcanv-header">
          <Offcanvas.Title className="offcanv-title">Forgot Password?</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanv-bdy">
            TESTING 123
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}