
const varMap = {
    'menuBg': '#000',
    'menuHover': '#263445',
    'MenuItemBg': '#7f66a2',
    'MenuItemHover': '#001528'
}


function setCssVar(cssvar,color){
    cssvar = '--' + cssvar 
    document.getElementsByTagName('body')[0].style.setProperty(cssvar,color)
}

for (const cssvar in varMap) {
    setCssVar(cssvar,varMap[cssvar])
}