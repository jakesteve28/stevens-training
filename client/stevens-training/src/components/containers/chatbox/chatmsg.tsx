import { Container, Row, Col } from "react-bootstrap"
import { ChatMsg } from "../../../globals"

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
                            white-space: nowrap;
                            color: #AAAAAA;
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
                        }
                    `
                }
            </style>
            <Row className="chat-msg-row">
                <span className="chat-msg-username">{message.username}:&nbsp;<span className="chat-msg-text">{message.commentText}</span></span>
            </Row>
        </>
    )
}