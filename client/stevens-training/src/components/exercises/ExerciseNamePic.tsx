import React from 'react'; 
import { Col } from 'react-bootstrap';

interface ExerciseNamePicProps extends React.HTMLAttributes<Element> {
    logo: any; 
    name: string; 
    xs: any; 
    sm: any; 
}

export default function ExerciseNamePic({ logo, name, xs, sm }: ExerciseNamePicProps ){
    return (
        <>
            <style type="text/css">
                {`
                    .block-img {
                        text-align: left;
                        border: 1px solid #191919;
                        box-shadow: 3px 3px 2px 2px #151515;
                        border-radius: 75px;
                        width: 100px;
                        height: 100px;
                        object-fit: cover;
                    }
                    .block-name {
                        font-weight: 500;
                        font-size: 14pt !important;
                        padding-bottom: 10px;
                        min-height: 50px;
                        overflow-wrap: break-word;
                    }
                `}
            </style>
            <Col xs={xs} sm={sm}>                 
                    <div>
                        <img src={logo} alt="Bench Logo" className="block-img"></img>
                    </div>  
                    <div className="block-name">
                        {name}
                    </div>                            
            </Col>
        </>
    )
}