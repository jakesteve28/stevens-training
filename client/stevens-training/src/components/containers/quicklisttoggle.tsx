import { useContext } from "react";
import { AccordionContext, useAccordionButton } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';

interface CtxAwareToggleProps extends React.HTMLAttributes<Element> {
    children: React.ReactNode;
    eventKey: any; 
    callback?: any;
    setOpen: any;
}

export default function QuickListToggle({ children, eventKey, callback, setOpen }: CtxAwareToggleProps): JSX.Element {
  const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
    eventKey,
    () => {
        if(callback && callback(eventKey)) {
            return true;
        }
        let isCurrentEventKey = activeEventKey === eventKey;
        setOpen(!isCurrentEventKey);
        ;
      }
    ,
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
      <>
        <style type="text/css">
        {
            `
                .chevron-single-title {
                    transition: ease all 0.5s;
                }
                .chevron-single-title-active {
                    font-weight: 500; 
                    color: #11dc9c;
                    transform: scale(1.05);
                }
                .chevron-single-title-active::after {
                    content: "Click to minimize";
                    color: #757575;
                    padding-left: 20px;
                    font-size: 12pt; 
                    font-weight: 500;
                }
                .chevron-single-span {
                    transition: ease all 0.5s;
                }
                .chevron-single-active {
                    color: #58fdcf; 
                    transform: rotate(180deg) scale(1.05); 
                }
                .quick-list-toggle-name {
                    background-color: transparent; 
                    width: 100%; 
                    display: flex; 
                    justify-content: space-between; 
                    transition: all ease  0.5s; 
                    height: 100%;
                }
                .quick-list-toggle-name-active {
                    backdrop-filter: blur(2px);                
                }
                .quick-list-toggle-name:hover {
                    filter: brightness(1.5);
                    background-color: #030303;
                }
            `
        }
        </style>
        <div
            className={`quick-list-toggle-name ${(isCurrentEventKey) ? "quick-list-toggle-name-active" : ""}`}
            onClick={decoratedOnClick}
        >
          <div className={`chevron-single-title ${(isCurrentEventKey) ? "chevron-single-title-active" : ""}`}>{children}</div>
          <div><Icon.ChevronDown className={`chevron-single-span ${(isCurrentEventKey) ? "chevron-single-active" : ""}`} color="rgba(33, 87, 88, 1)"/></div>
      </div>
    </>
  );
}