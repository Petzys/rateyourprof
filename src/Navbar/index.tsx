import React from "react"
import {Nav, NavLink, NavBtn, NavBtnLink, NavMenu, Bars} from "./NavbarElements"

const Navbar = () => {
    // @ts-ignore
    return(
        <>
            <Nav>
                <NavLink to={"/"}>
                    <h1>Logo</h1>
                </NavLink>
                <Bars/>
                <NavMenu>
                    <NavLink to={"/home"}>
                        Home
                    </NavLink>
                    <NavLink to={"/about"}>
                        About
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to={"/about"}>Sign in</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    )
}

export default Navbar