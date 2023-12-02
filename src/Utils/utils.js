export const calculateFontSize = (height,fontSize)=>{

        let _height = isNaN(parseInt(height)) ? 140 : parseInt(height);
        let _fontSize = isNaN(parseInt(fontSize)) ? 16 : parseInt(fontSize);

        if (_fontSize > (_height / _fontSize)) {
            _fontSize = (_height / _fontSize) 
        }
        console.log("fontsize",fontSize,_fontSize)
        return _fontSize+"px";
    
}