import { useLocation, useNavigate } from "react-router-dom";

import logo from "assets/Logo_small.svg"
import BreadCrumbs from "../BreadCrumbs"
import BurgerMenu from "../BurgerMenu";

import styled from "styled-components"

import { font } from "src/styles/mixins";
import { colors } from "src/styles/vars";
import { useDispatch, useSelector } from "react-redux";
import { setSpot } from "src/store/appSlice";
import { RootState } from "src/store/store";
import { checkBreadCrumbsAndMenuIsOnPage, makePlaceFromString } from "src/utils/utils";
import { useContext } from "react";
import { WidthContext } from "../HomeLayout";

const HeaderContent = styled.header<{ path: string; }>`
    padding-top: 23px;
    padding-left: 25px;
    display: flex;
    position: relative;
    align-items: center;
    text-align: center;
    justify-content:  ${props => props.path.startsWith("/choosePlace") ? "center" : ""};

    nav {
        display: ${props => props.path.startsWith("/choosePlace") ? "none" : ""}
    }

    @media screen and (max-width: 768px) {
        & {
            justify-content:  ${props => !props.path.startsWith("/choosePlace") ? "space-between" : "center;"};
        }
    }

    @media screen and (max-width: 645px) {
        & {
            padding-top: ${props => !props.path.startsWith("/choosePlace") ? "0" : "70px"};
            padding-left: 5px;
            padding-right: 5px;
            position: relative;
            z-index: 4;
            background-color: #fff;
        }
        ${props => (props.path.startsWith("/choosePlace") || props.path.startsWith("/contradictions")) && `& .logotype {
            display: none;
        }`}

        .workPlaceTitle {
            position: static;
            left: 0%;
        }
    }

    @media screen and (max-width: 370px) {
        & {
            ${props => !props.path.startsWith("/choosePlace") && !props.path.startsWith("/database") && `
                display: grid;
                grid-template-columns: 1fr auto;
            `}
        }
    }

    @media screen and (max-width: 640px) {
        & {
            ${props => !props.path.startsWith("/choosePlace") && !props.path.startsWith("/database") && `
                display: grid;
                grid-template-columns: 1fr auto;
        `}


            .logotype {
                grid-column: 1/3;
                margin-inline: auto;
            }
        }
    }

    @media screen and (max-width: 530px) {
        & {
            ${props => props.path.startsWith("/database") && `
                justify-content: center;
                padding-top: 23px;
            `}
        }
    }

    .workPlaceTitle {
        color: ${colors.primary};
        ${font("3rem", "4.3rem", "400")}
    }
`

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const width = useContext(WidthContext);

    const path = useLocation().pathname;
    const isChoosePlacePage = path.startsWith("/choosePlace");

    const { department, house, floor } = useSelector((state: RootState) => state.appReducer.workPlace)

    const isBreadCrumbsAndMenuOnPage = checkBreadCrumbsAndMenuIsOnPage(path);
    const breadCrumbs = isBreadCrumbsAndMenuOnPage ? [department, makePlaceFromString(house.toString(), "house"), makePlaceFromString(floor.toString(), "floor")] : [];

    const logoLink = path === "/" ? "/choosePlace" : "/";

    return (
        <HeaderContent path={path}>
            {!isChoosePlacePage && (
                <img src={logo} alt="" className="logotype" onClick={() => {
                    path === "/" && dispatch(setSpot({ department: "", house: 0, floor: 0 }));
                    navigate(logoLink);
                }} />
            )}
            {breadCrumbs ? <BreadCrumbs links={breadCrumbs} isHeader={true} /> : null}
            {isBreadCrumbsAndMenuOnPage && <BurgerMenu />}
            {isChoosePlacePage && (function () {
                return <h1 className="workPlaceTitle">{width > 480 ? "Where do you want to work today?" : "Choose workplace"}</h1>
            })()}
        </HeaderContent>
    )
}

export default Header