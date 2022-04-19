// @ts-nocheck
import { useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import { Comment } from "../../../globals";
import global from '../../../globals';
interface PlaceCommentsProps extends React.HTMLAttributes<Element> {
    place: any;
}
export default function PlaceComments({ place }: PlaceCommentsProps) {
    const [addComment, setAddComment] = useState(false); 
    return (
        <>
            <style type="text/css">
                {
                    `
                        .place-comments-cont {
                            width: 100%;
                            max-width: 800px;
                            min-height: 350px;
                            max-height: 500px;
                            background-color: #202020;
                            margin-top: 20px;
                            border-radius: 10px;
                            overflow-y: auto;
                        }
                        .place-comments-cont::-webkit-scrollbar-track {
                            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                            border-radius: 10px;
                            background-color: #171717;
                        }
                        .place-comments-cont::-webkit-scrollbar {
                            width: 12px;
                            background-color: #171717;
                        }
                        .place-comments-cont::-webkit-scrollbar-thumb {
                            border-radius: 10px;
                            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                            background-color:#404040;
                        }
                        .comments-title-row {
                            text-align: left; 
                            font-size: 22pt;
                            font-weight: 500;
                            paddding-left: 15px;
                            padding-bottom: 5px;
                            padding-top: 5px;
                            border-bottom: 1px solid #404040;
                        }
                        .no-data-checkins {
                            text-align: center;
                            font-size: 13pt; 
                            color: #404040;
                        }
                        .comment-row {
                            min-height: 100px;
                            height: auto;
                            background-color: #171717;
                            border-radius: 10px;
                            margin: 15px; 
                            padding: 5px;
                        }
                        .dark-row {
                            background-color: #212121; 
                        }
                        .comment-text-col {
                            margin-top: auto;
                            margin-bottom: auto;
                            text-align: left;
                        }
                        .comment-name-col {
                            margin-top: auto;
                            margin-bottom: auto;
                            font-size: 12pt;
                            text-align: left;
                            font-weight: bolder;
                            color: #34dcbe;
                        }  
                        .comment-icon-col {
                            visibility: hidden;
                        }
                        .comment-row:hover .comment-icon-col {
                            visibility: visible;
                        } 
                        .comment-icon-col {
                            cursor: pointer;
                            margin-top: auto;
                            margin-bottom: auto;
                        }
                        .add-comment-icon {
                            color: #34dcbe;
                            cursor: pointer;

                        }
                        .close-add-comment-icon {
                            color: #ff0000;
                            cursor: pointer;
                        }
                        .add-comment-input {

                        }
                        .hide-add {
                            height: 0px;
                            overflow: hidden;
                            transition: height 0.5s ease;
                        }
                        .add-comment-row {
                            transition: height 0.5s ease;
                        }
                    `
                }
            </style>
            <Container fluid className="place-comments-cont">
                <Row className="comments-title-row">
                    <Col xs="9" md="10">Comments&nbsp;&nbsp;
                        <Icon.Plus className="add-comment-icon" width={40} height={40} onClick={() => setAddComment(!addComment)}></Icon.Plus>
                        {
                            (addComment) ? (<Icon.X className="close-add-comment-icon" width={40} height={40} onClick={() => setAddComment(!addComment)} />) : (<></>)
                        }
                    </Col>
                    <Col><Icon.ThreeDotsVertical className="more-stats-icon" /></Col>
                </Row>
                <Row className={(addComment) ? "add-comment-row" : "add-comment-row hide-add"}>
                    <Row>
                        Add A Comment
                    </Row>
                    <Row>
                        <input type="text" className="add-comment-input" />
                    </Row>
                </Row>
                {
                    (place.comments) ? place.comments.map((comment: Comment, idx: number) => (
                        <>
                            <Row className="comment-row">
                                <Col xs="3" className="comment-name-col">
                                    {comment.username}:
                                </Col>
                                <Col xs="8" className="comment-text-col">{
                                    comment.commentText
                                }</Col>
                                <Col xs="1" className="comment-icon-col"><Icon.ThreeDotsVertical width={25} height={25} /></Col>
                            </Row>
                        </>
                    )) : <Row className="no-data-checkins"><Col>No comments found</Col></Row>
                }
            </Container>
        </>
    );
}