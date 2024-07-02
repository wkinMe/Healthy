import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components"
import styles from "./BurgerMenu.module.scss"

import { toggleMenu } from "src/store/appSlice";
import { RootState } from "src/store/store";
import { useContext } from "react";
import { WidthContext } from "../HomeLayout";

const BurgerLines = styled.div<{ $isCrossShown: boolean; }>`
    width: 30px;
    height: 15px;
    display: flex;
    flex-direction: column;

    position: relative;
    gap: 3px;
    margin-left: 4px;

    :nth-child(n) {
        height: 3px;
        width: 30px;
        background-color: #FF5A5A;
        transition: all .3s ease-in;

        transform-origin: 7px;
    }

    :first-child {
        transform: rotate(${props => props.$isCrossShown ? "45" : "0"}deg);
    }

    :nth-child(2) {
        opacity: ${props => props.$isCrossShown ? "0" : "1"};
        transform: translate(${props => props.$isCrossShown ? "5px" : "0"})
    }

    :nth-child(3) {
        transform: rotate(${props => props.$isCrossShown ? "-45" : "0"}deg);
    }
`

function BurgerMenu() {
    let notificationsNumber = 3;

    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.appReducer.menuOpened);
    const width = useContext(WidthContext);

    const isCrossShown = (width <= 600) && isOpen;

    return (
        <button
            className={styles.burgerMenu}
            onClick={() => {
                dispatch(toggleMenu({ open: !isOpen }))
            }}
        >
            {notificationsNumber ? <span className={styles.notifications}>{notificationsNumber}</span> : null}
            <div className={styles.lines}>
                <BurgerLines $isCrossShown={isCrossShown}>
                    <span></span>
                    <span></span>
                    <span></span>
                </BurgerLines>

            </div>
        </button>
    )
}

export default BurgerMenu;