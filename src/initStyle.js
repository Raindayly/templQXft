import { setCssVar , getCssVar } from "./libs/utils"

export const varMap = {
    'menuBg': 'red',
    'menuHover': 'blue',
    'MenuItemBg': 'gray',
    'MenuItemHover': 'green'
}




for (const cssvar in varMap) {
    setCssVar(cssvar,varMap[cssvar])
}
