import React from 'react'; 
import { Col, Row } from 'react-bootstrap'; 
import * as Icon from 'react-bootstrap-icons';

interface ExerciseDataActionsProps extends React.HTMLAttributes<Element> {
    xs: any; 
    sm: any; 
    quantity: any; 
    duration: any;
    sets: any;
}

export default function ExerciseDataActions({ xs, sm, quantity, duration, sets }: ExerciseDataActionsProps) {
    return (
        <>
            <style>
            {
               `
                    .block-actions, .block-sets, .block-quant {
                        display: flex;
                        border-bottom: 1px solid #404040;
                        padding-top: 10px;
                        padding-bottom: 10px;
                    }
                    .block-sets {
                        text-align: left;
                        color: #34dcbe;
                        font-weight: 600;
                    }
                    .block-quant {
                        text-align: left;
                        color: #34dcbe;
                        font-weight: 600;
                    }
                    .block-actions {
                        text-align: left;
                        color: #34dcbe;
                        font-weight: 600;
                        border-bottom: none;
                    }
                    .block-actions-label {
                        text-align: left;
                        color: #606060;
                        font-weight: 300;
                        font-size: 12pt;
                    }
                    .block-icon-actions {
                        color: #707070;
                    }
                    .block-share-fill {
                        margin-left: 10px;
                    }
                    .block-icon-action {
                        transition: ease all 0.5s;
                    }
                    .block-icon-action:hover, .block-icon-action:active, .block-icon-action:focus {
                        transform: scale(1.10);
                        color: #34dcbe;
                        cursor: pointer;
                    }
                    .exc-block-sets-text {
                        font-size: 16pt;
                        font-weight: 700;
                    }  
               `     
            }   
            </style>
            <Col xs="4" sm="4">
                <div className="block-sets"><span><span className="exc-block-sets-text">{sets}</span>&nbsp;&nbsp;set(s)</span></div>
                <div className="block-quant"><span className="exc-block-sets-text">{quantity}</span>&nbsp;&nbsp;rep(s)</div>
                <div className="block-actions">                 
                    <span className="block-icon-actions">
                        <Icon.ShareFill className="block-icon-action block-share-fill" height={25} width={25} />
                    </span>
                </div>
            </Col>
        </>
    )
}