
const varMap = {
    'menuBg': '',
    'menuHover': '',
    'MenuItemBg': '',
    'MenuItemHover': ''
}


function setCssVar(cssvar,color){
    cssvar = '--' + cssvar 
    document.getElementsByTagName('body')[0].style.setProperty(cssvar,color)
}

for (const cssvar in varMap) {
    setCssVar(cssvar,varMap[cssvar])
}
