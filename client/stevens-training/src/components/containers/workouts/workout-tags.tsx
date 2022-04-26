import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap' ;
import * as Icon from 'react-bootstrap-icons'; 
import { Workout } from '../../../globals';
interface WorkoutTagsProps extends React.HTMLAttributes<Element> {
    workout: Workout;
    hidden: boolean;
} 
export default function WorkoutTags({ workout, hidden }: WorkoutTagsProps){
    const [tagEditing, setTagEditing] = useState(false);
    const [tagAdd, setTagAdd] = useState(false);
    return (
        <>
        <style type="text/css"> 
        {
            `
                    ${hidden ? 
                            `
                                .hidden-exercises-open {
                                    display: none !important;
                                }
                                .field-single-workout {

                                }
                            `: 
                            `
                                
                            `
                    }
            .single-workout-tags-row {
                border-top: 1px solid #303030;
                border-bottom: 1px solid #303030;
                padding-bottom: 15px;
                padding-top: 15px;
                margin-left: 15px;
                margin-right: 15px;
            }
            .workout-tags {
                white-space: pre;
                word-wrap: break-word;
                height: fit-content;
            }          
           
            .icon-tag-add {
                ${(tagAdd) ? 'color: #34ffbe; transform: scale(1.3);' : ''}                      
            }
            .icon-tag-edit {
                ${(tagEditing) ? 'color: #34ffbe; transform: scale(1.3);' : ''}                      
            }
            .icon-tag-add,
            .icon-tag-edit {
                transition: all ease 0.25s;
            }
            .icon-tag-add:hover,
            .icon-tag-edit:hover {
                cursor: pointer;
                transform: scale(1.1);
                color: #34dcbe;
            }
            .single-workout-add-tag {
                background-color: #303030;
                box-shadow: 5px 5px 5px 5px #191919;
                border: none; 
                outline: none;
                color: #34dcbe;
                margin-left: 20px;
            }
            .icon-tag-confirm {
                color: #22dd44;
            }
            .icon-tag-confirm:hover,
            .icon-tag-confirm:active,
            .icon-tag-confirm:focus {
                color: #66FF99;
                cursor: pointer;
            }
            .icon-tag-delete {
                color: #990000;
            }
            .tag-label {
                text-align: center;
                margin-bottom: 20px;
                font-size: 14pt;
                color: #34dcbe;
                font-weight: 600;
                whitespace: nowrap;
                margin-right: 15px;
                overflow-wrap: anywhere;
                word-break: break-all;
            }
            .tag-bubble-div {
                display: flex;
                overflow-wrap: anywhere;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: flex-start;
                align-items: flex-start;
                padding: 15px;
            }
            `
        }
        </style>
            <Row className="mt-3 mb-3 single-workout-tags-row hidden-exercises-open">
                <Col className="workout-tags">
                    <div className="tag-bubble-div"> 
                    <span className="tag-label">
                        Tags&nbsp;&nbsp;&nbsp;
                        <Icon.PlusCircle onClick={() => {setTagAdd(!tagAdd); setTagEditing(false);}} className="icon-tag-add" width={25} height={25} />&nbsp;&nbsp;&nbsp;
                        <Icon.PencilFill onClick={() => {setTagEditing(!tagEditing); setTagAdd(false);}} className="icon-tag-edit" width={25} height={25} />
                        {
                            (tagAdd) ? (<><input className="single-workout-add-tag" type="text" autoFocus={true}/><Icon.Check className="icon-tag-confirm" width={25} height={25} /></>) : (<></>)
                        }
                    </span>          
                        {workout.tags.map(tag => 
                            (<div className="tag-bubble">{`${tag}`}{(tagEditing) ? (<Icon.X className="icon-tag-delete" width={20} height={20} />) : (<></>)}</div>))
                        }
                    </div> 
                </Col>
            </Row>
        </>
        )
} 