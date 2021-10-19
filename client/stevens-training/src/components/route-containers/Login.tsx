import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
export var socket: Socket<DefaultEventsMap, DefaultEventsMap>; 
export default function Login() {
    // const [uname, setUname] = useState('');
    // const [pw, setPw] = useState('');
    return (<>
        <style type="text/css">
            {`
            .btn-flat {
            background-color: purple;
            color: white;
            }

            .btn-xxl {
            padding: 1rem 1.5rem;
            font-size: 1.5rem;
            }

            .ctn-login {
                background-color: #191919;
                color: #CCCCCC;
                height: 500px;
            }

            .ctn-creds {
                text-align: center;
                margin-top: 150px; 
            }
            `}
        </style>
        <Container fluid className="ctn-login">
            <Row>
                <Col xs="2"></Col>
                <Col>
                    <Container fluid className="ctn-creds"> 
                        <h1>Stevens</h1>
                    </Container>
                </Col>
                <Col xs="2"></Col>
            </Row>
        </Container>
        </>
    )
}
// const socketOptions = {
//     transportOptions: {
//         polling: {
//             extraHeaders: {
//                 credentials: "include"
//             }
//         }
//     },
//     reconnectionAttempts: 5
// }
// const attemptLogin = async (uname: string, pw: string) => {
//     const res = await fetch(`https://localhost:3000/signon/login`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify( {
//             userName: uname, 
//             password: pw
//         })
//     })
//     const result = await res.json(); 
//     if(!result.user) {
//       alert("Cannot login");
//       return;
//     } else {
//       alert(result.user);
//       socket = io(`https://localhost:3000/notifications`, socketOptions); 
//       if(socket) alert(socket); 
//     }
// }
