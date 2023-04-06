import React from "react";
import './MainMenu.scss'
import { Link, useLocation } from "react-router-dom"
import gameInfo from 'data/games.json'

const getMenu =() =>{
    let menu = [{path:'/Casino', display: 'Title Screen' },]
    gameInfo.forEach((game)=>{
        menu.push(
            {
                path:game.path,
                display: game.label
            }
        )
    })
return menu;
}

function MainMenu(){
    const location = useLocation();
    const menuList = getMenu();
    const iscurrentURL = (url:string)=> {
        const currentPath = location.pathname.toLowerCase();
        const pathToCheck = menuList.findIndex(ml => ml.path === currentPath) !== -1 ? currentPath: '/casino';
        return pathToCheck === url.toLowerCase();
    }

    const onMenu = iscurrentURL('/Casino');

    return (
        <div className="menuBar">
            
            {
                
                menuList.map((link)=>
                    !iscurrentURL(link.path)? 
                        <span key={link.path}>
                        <Link className="menuLink" to={link.path}> {link.display}</Link>
                        </span>
                    :null
                )
            }
            {
                onMenu &&
                <Link className="wideButton button" to={'/'}> {'Back to Portfolio'}</Link>
            }            
       </div>
    );
}

export default MainMenu;