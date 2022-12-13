import { setCssVar , getCssVar } from "./libs/utils"

export const varMap = {
    'menuBg': '#ffffff',
    'menuHover': 'blue',
    'MenuItemBg': 'gray',
    'MenuItemHover': 'green'
}

//给标签加全局css变量
for (const cssvar in varMap) {
    setCssVar(cssvar,varMap[cssvar])
}
