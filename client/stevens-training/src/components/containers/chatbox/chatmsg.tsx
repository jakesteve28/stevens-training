import { Container, Row, Col } from "react-bootstrap"
import { ChatMsg } from "../../../globals"
import * as Icon from 'react-bootstrap-icons';

interface ChatboxMessageProps extends React.HTMLAttributes<Element> {
    message: ChatMsg;
}

export default function ChatboxMessage({ message }: ChatboxMessageProps) {
    return (
        <>
            <style type="text/css">
                {
                    `
                        .chat-msg-text {
                            font-weight: 300; 
                            font-size: 12pt; 
                            white-space: pre-line;
                            color: #AAAAAA;
                            padding-right: 5px;
                        }
                        .chat-msg-username {
                            font-weight: 600; 
                            color: #34dcbe; 
                            white-space: nowrap;
                            font-size: 10pt; 
                            margin-top: 5px; 
                        }
                        .chat-msg-row {
                            white-space: nowrap;
                            word-break: anywhere;
                            padding-right: 15px;
                            padding-top: 4px;
                            padding-bottom: 4px;

                        }
                        .chat-msg-row:hover {
                            background-color: #252525;
                            cursor: pointer;
                        }
                        .chat-msg-row:hover .extra-info-chat-msg {
                            display: inline-block; 
                        }

                        .extra-info-chat-msg {
                            display: none; 

                        }
                    `
                }
            </style>
            <Row className="chat-msg-row">
                <span className="chat-msg-username">
                    {message.username}:&nbsp;<span className="chat-msg-text">{message.commentText}</span>
                    <span className="extra-info-chat-msg"><Icon.ThreeDots width={15} height={15} /></span>
                </span>
            </Row>
        </>
    )
}