export default interface userInterface {
    email: string,
    confirmEmail: string,
    password: string,
    username: string,
    month: string,
    day: number | string,
    year: number | string,
    gender: string,
    share: boolean,
    loggedIn: boolean,
}

export default interface loginInterface {
    email: string,
    password: string,
    loggedIn: boolean
}