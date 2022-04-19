import benchlogo from '../../imgs/462bench.jpg';
import { Carousel } from 'react-responsive-carousel';
import * as Icon from 'react-bootstrap-icons';
import { CSSProperties, Key, KeyboardEventHandler, MouseEventHandler, useEffect } from 'react';
import { usePalette } from 'react-palette';

interface MediaGalleryProps extends React.HTMLAttributes<Element> {
    images: Array<string>; 
    hidden: boolean;
}

export default function MediaGallery({ images, hidden }: MediaGalleryProps) {
    //useEffect(() => console.log(benchlogo, typeof benchlogo), []) 
    const { data, loading, error } = usePalette(images[0]);
    console.log(data.darkVibrant);
    const arrowStyles: CSSProperties = {
        position: 'absolute',
        zIndex: 2,
        top: 'calc(50% - 15px)',
        width: 50,
        height: 50,
        cursor: 'pointer',
    };

    const indicatorStyles: CSSProperties = {
        background: '#aaaaaa',
        width: 20,
        height: 20,
        display: 'inline-block',
        margin: '0 8px',
        borderRadius: '10px'
    };
    return (
        <>
        <style type="text/css">
        {
            `   
                ${hidden ? `
                    .carousel-cont {
                        display: none !important;
                        width: 100%;
                        length: 100%;
                    }
                ` 
                : 
                `
                
                `
                }    

                .ctm-carousel {
                    div {
                        ol {
                            li {
                                background-color: red;
                                border-radius: 50%;
                                height: 10px;
                                width: 10px;
                            }
                        }
                    }
                }
                .caption-text {
                    color: #34dcbe; 
                    font-size: 12pt; 
                    font-weight: 500;
                }
                .img-ctm {

                }
                .carousel-cont {
                    transition: all ease 0.5s;
                    background-image: radial-gradient(circle, ${data.darkVibrant}, ${data.darkMuted}, #232323, #202020, #151515, #101010, #000000);
                    width: 100vw;
                    max-width: 100%;
                    margin-left: -20px;
                    opacity: 0.9;
                    height: auto;
                }
                .carousel-cont:hover {
                    filter: brightness(1.05);
                    cursor: pointer;
                }
                .carousel-ctm-slide {
                    text-align: center;
                    margin-left: auto;
                    margin-right: auto;        
                    max-width: 1200px;     
                    height: 100%;
                    margin-top: auto;
                    min-height: 500px;
                }
                .carousel-ctm-slide-img {
                    margin-top: auto;
                    height: 100%;                    
                    min-height: 400px;
                    width: auto;
                    box-shadow: 0px 0px 5px 5px #000000;
                }
            `
        }

        </style>
            <Carousel
                showThumbs={false}
                useKeyboardArrows
                dynamicHeight
                className="carousel-cont"
                showArrows={images.length > 1}
                showStatus={false}
                selectedItem={0}
                renderArrowPrev={(onClickHandler: MouseEventHandler<SVGElement> | undefined, hasPrev: any, label: string | undefined) =>
                    hasPrev && (
                        <Icon.ChevronLeft onClick={onClickHandler} style={{ ...arrowStyles, left: 15, color: "#34dcbe" }} width={50} height={50} />
                    )
                }
                renderArrowNext={(onClickHandler: MouseEventHandler<SVGElement> | undefined, hasNext: any, label: string | undefined) =>
                    hasNext && (
                        <Icon.ChevronRight onClick={onClickHandler} style={{ ...arrowStyles, right: 15, color: "#34dcbe" }} width={50} height={50} />
                    )
                }
                renderIndicator={(onClickHandler: MouseEventHandler, isSelected: any, index: number, label: any) => {
                    if (isSelected) {
                        return (
                            <li
                                style={{ ...indicatorStyles, background: '#34dcbe' }}
                                aria-label={`Selected: ${label} ${index + 1}`}
                                title={`Selected: ${label} ${index + 1}`}
                            />
                        );
                    }
                    return (
                        <li
                            style={indicatorStyles}
                            onClick={onClickHandler}
                            // onKeyDown={onClickHandler}
                            value={index}
                            key={index}
                            role="button"
                            tabIndex={0}
                            title={`${label} ${index + 1}`}
                            aria-label={`${label} ${index + 1}`}
                        />
                    );
                }}
                
            >
                {
                    images.map((img) => {
                        return (
                            <div className="carousel-ctm-slide">
                                <img className="carousel-ctm-slide-img" src={img} />
                            </div>
                        );
                    })
                }
            </Carousel>
        </>
    )
}