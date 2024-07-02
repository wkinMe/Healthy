import { ChangeEvent, useState } from "react";

import styles from "./Database.module.scss";
import searchImg from "assets/Search.svg"
import { Link } from "react-router-dom";

interface DatabaseMan {
    id: number
    lastName: string
    firstName: string
    surname: string
    birthDate: string
}

function Database() {
    const [searchText, setSearchText] = useState("");

    const people: DatabaseMan[] = [
        {
            id: 1,
            lastName: "Бондаренко",
            firstName: "Павел",
            surname: "Осипович",
            birthDate: "29.05.2004"
        },
        {
            id: 2,
            lastName: "Бондарчук",
            firstName: "Олег",
            surname: "Витальевич",
            birthDate: "13.07.1968"
        },
        {
            id: 3,
            lastName: "Бондарев",
            firstName: "Виктор",
            surname: "Витальевич",
            birthDate: "13.02.1980"
        },
        {
            id: 4,
            lastName: "Ахрипов",
            firstName: "Прохор",
            surname: "Андреевич",
            birthDate: "15.07.1999"
        }
    ]

    const compFunc = (a: DatabaseMan, b: DatabaseMan) => {
        if (a.lastName < b.lastName) {
            return -1
        } else if (a.lastName > b.lastName){
            return 1;
        }
        return 0;
    }

    const suitedPeople = searchText ? people.filter(i => searchText && i.lastName.startsWith(searchText)).sort(compFunc) : people.sort(compFunc);

    return (
        <div className={styles.databaseContent}>
            <div className={styles.inputBlock}>
                <input
                    type="text"
                    value={searchText}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                    placeholder="Type to search..."
                />
                <img src={searchImg} alt="" />
            </div>
            <ol>
                {suitedPeople.map(i =>(
                    <li>
                        <Link to={`dossier/${i.id}`}>{`${i.lastName} ${i.firstName} ${i.surname}`}</Link>
                        <span>{i.birthDate}</span>
                    </li>
                )
                )}
            </ol>
        </div>
    )
}

export default Database;