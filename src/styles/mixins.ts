import {css} from "styled-components"

export const font = (fz: string, lh: string, fw: string) => {
    return css`
        font-size: ${fz};
        line-height: ${lh};
        font-weight: ${fw};
    `
}