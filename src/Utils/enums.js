import { faBorderTopLeft,  } from "@fortawesome/free-solid-svg-icons"
import {  faSquare } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const allEnums = {
    borderStyle : [
        "solid","dashed ","dotted","ridge","double","groove","inset","outset","none","hidden"
    ],
    
    fontStyle : [
        "normal","italic","oblique"
    ],
    
    textAlign : [
        "left","center","right"
    ],
    fontFamily : [
        "serif","sans-serif","cursive","fantasy","monospace","system-ui"
    ],
    textDecoration :[
        "none","underline","overline","line-through"
    ],
    
    resizingUnits : [
        "mm","cm","px","in"
    ],
    fontWeight : [
        "normal","bold","bolder","lighter","100","200","300","400","500","600","700","800","900"
    ],
    backgroundSize : [
        "auto","cover","contain"
    ],
    backgroundRepeat : [
        "repeat","repeat-x","repeat-y","no-repeat"
    ],
    backgroundPosition : [
        "top","right","bottom","left","center","left top",
        "left center",
        "left bottom",
        "right top",
        "right center",
       " right bottom",
        
    ],
    backgroundAttachment : [
        "scroll","fixed"
    ],
    backgroundOrigin : [
        "border-box","padding-box","content-box"
    ],
    backgroundClip : [
        "border-box","padding-box","content-box"
    ],
    backdropFilter : [
        "blur","brightness","contrast","grayscale","hue-rotate","invert","opacity","saturate","sepia","none"
    ],
    verticalAlign : [
        "base-line","text-top","text-bottom","text-bottom","sub","super"
    ],
    borderRadiusIcons : [
        <FontAwesomeIcon icon={faSquare}/>,
        <FontAwesomeIcon icon={faBorderTopLeft}/>,
        <FontAwesomeIcon icon={faBorderTopLeft} className="rotate-90"/>,
        <FontAwesomeIcon icon={faBorderTopLeft}  className="rotate-[270deg]"/>,
        <FontAwesomeIcon icon={faBorderTopLeft} className="rotate-180"/>,
    ]
}


export const getEnum = (enumKey)=>{
 
    return allEnums[enumKey] || []
} 
