import { Patient } from "src/interfaces/IPatient"

export const firstSymbolToNumber = (str: string) => {
    return Number(str.split(" ")[0])
}

// Функция которая делает строку с номером корпуса или этажа, нужна для того,
// чтобы делать строку с информацией о месте работы из числа, которое хранить
// ся в state
export const makePlaceFromString = (str: string, type: string) => {
    let resultStr = str
    switch (type) {
        case "floor": {
            resultStr = str + " этаж"
            break;
        }
        case "house": {
            resultStr = str + " корпус"
            break;
        }
    }
    return resultStr
}

// Функция, которая проверяет есть ли на страинице элементы хлебных крошек
// и меню
export const checkBreadCrumbsAndMenuIsOnPage = (path: string) => {
    return path === "/" || path.startsWith("/ward") || path.startsWith("/assignments")
}

// Функция определяющая количество палат *костыль*
export const getWardsAmount = (patients: Patient[]) => {
    const wards: number[] = [];
    patients.map((i) => {
        if (!wards.includes(i.spot.ward)) {
            wards.push(i.spot.ward)
        }
    })

    let max = wards[0];
    wards.map(i => i > max ? max = i : null)
    return max;
}