import { useLocation } from "react-router-dom"

import styled from "styled-components"

import { colors } from "src/styles/vars"
import { font } from "src/styles/mixins"



interface BreadCrumbs {
    links: string[]
    isHeader: boolean
}

const BreadCrumbsContent = styled.nav<{ page?: string, isHeader: boolean }>`
    ${props => props.isHeader && "margin-left: 7vw;"}

    .breadCrumbs {
        padding-left: 0;
        display: flex;
        gap: 5px;
        list-style-type: none;

        .crumb {
            color: ${colors.primary};
            ${font("2.4rem", "3.432rem", "400")}
        }
    }

    @media screen and (max-width: 768px) {
        & {
            margin-left: 0;

            .breadCrumbs .crumb{
                ${font("1.8rem", "2.6rem", "400")}
            }
        }
    }

    @media screen and (max-width: 480px) {
        & .breadCrumbs .crumb {
            @include font(1.4rem, 2rem, 400);
        }
    }

    @media screen and (max-width: ${props => props.page?.startsWith("/choosePlace") ? "480px" : "515px"}) {
        & {
            ${props => !props.page?.startsWith("/choosePlace") && !props.isHeader && "width: 100%;"}
            .breadCrumbs {
                flex-direction: column;
                gap: 0;

                .crumb {
                    ${font("1.8rem", "1.8rem", "400")}
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .crumbDelimiter {
                        flex-grow: 0;
                        text-align: center;
                        transform: rotate(90deg);
                    }
                }
            }
        }

    }

    @media screen and (max-width: 370px) {
        & {
            .breadCrumbs {
                .crumb {
                    ${props => props.page?.startsWith("/choosePlace") && font("1.6rem", "1.6rem", "400")}
                }
            }
        }
    }
`

function BreadCrumbs({ links, isHeader }: BreadCrumbs) {
    const path = useLocation().pathname;

    return (
        <BreadCrumbsContent page={path} isHeader={isHeader}>
            <ol className="breadCrumbs">
                {links.map((i: string) => {
                    return (
                        <li key={i} className="crumb">{i}
                            <span className="crumbDelimiter">
                                {(links.indexOf(i) < links.length - 1 ? " >" : "")}
                            </span>
                        </li>)
                })}
            </ol>
        </BreadCrumbsContent>
    )
}

export default BreadCrumbs