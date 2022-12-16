import { setCssVar , getCssVar } from "./libs/utils"
import { getThemeInfo } from "@/api/userInfo"


export const varMap = {
    'menuBg': '#ffffff',
    'menuHover': '#a1a1b4',
    'MenuItemBg': '#e5e5e5',
    'MenuItemHover': '#acb6ac'
}


export const initStyle = function (){
    getThemeInfo()
    .then((res) => {
        if(res.code === 200){
            //给标签加全局css变量
            let { colors } = res.data
            for (const cssvar in colors) {
                setCssVar(cssvar,colors[cssvar])
            }
        }
    })
}





