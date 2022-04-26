import { Container, Row, Col, Button } from "react-bootstrap"
import { ChatMsg } from "../../../globals"
import ChatboxMessage from "./chatmsg";
import * as Icon from 'react-bootstrap-icons';

interface ChatBoxMsgProps extends React.HTMLAttributes<Element> {
    messages: Array<ChatMsg>
}

export default function Chatbox({ messages }: ChatBoxMsgProps) {
    return (
        <>
            <style>
            {
                `
                    .chatbox-cont {
                        width: 100%;
                        max-width: 800px;
                        max-height: 500px;
                        height: 400px;
                        background-color: #202020;
                        margin-top: 20px;
                        border-radius: 10px;
                        overflow: hidden;
                        min-width: 300px;
                        overflow-x: hidden;
                    }
                    .chatbox-cont::-webkit-scrollbar-track {
                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                        border-radius: 10px;
                        background-color: #171717;
                    }
                    .chatbox-cont::-webkit-scrollbar {
                        width: 12px;
                        background-color: #171717;
                    }
                    .chatbox-cont::-webkit-scrollbar-thumb {
                        border-radius: 10px;
                        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                        background-color:#404040;
                    }    
                    .chatbox-title-row {

                    }
                    .chatbox-messages-row {
                        height: 70%;
                        background-color: #181818;
                        width: 120%;
                        margin-left: -25px;
                        overflow-y: auto;
                    }   
                    .chatbox-sendmsg-row {
                        padding-top: 10px;
                    }   
                    .send-msg-input {

                    }
                    .chatbox-title-row {
                        text-align: left; 
                        font-size: 22pt;
                        font-weight: 500;
                        padding-left: 15px;
                        padding-bottom: 5px;
                        padding-top: 5px;
                        border-bottom: 1px solid #404040;
                    }
                    .chatbox-sendmsg-input {
                        white-space: nowrap;
                        width: 100%;
                        text-align: left;
                    }
                    .send-msg-input {
                        color: #34dcbe; 
                        background-color: #181818;
                         border: none; 
                         outline: none;
                         width: 50%;
                         min-width: 160px;
                         height: 40px;
                         margin-right: 15px;
                         border-radius: 5px;
                         padding-left: 10px;
                         font-size: 12pt;
                    }
                    .more-chat-icon { cursor: pointer; color: #34dcbe; }
                    .send-btn-chat { background-color: #34abbe; }
                    `
            }
            </style>
            <Container fluid className="chatbox-cont">
                <Row className="chatbox-title-row">
                    <Col>
                        <span>
                            Chat
                        </span>
                    </Col>
                    <Col><Icon.ThreeDotsVertical className="more-chat-icon" /></Col>
                </Row>
                <Row className="chatbox-messages-row">
                    <Col>
                        {
                            messages.map((chatmsg) => {
                                return (
                                    <ChatboxMessage message={chatmsg} />
                                )
                            })
                        }
                    </Col>
                </Row> 
                <Row className="chatbox-sendmsg-row">
                    <Col>
                        <span className="chatbox-sendmsg-input">
                            <input type="text" className="send-msg-input" placeholder="Type your message" />
                            <Button className="send-btn-chat" variant="dark">Send</Button>
                        </span>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

