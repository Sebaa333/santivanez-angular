 export function generateRandomString(length: number):string{
    const characters = 'ABCDEFGHIJKMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789'
    let ramdomString = '';

    for(let i =0; i < length;i++) {
        const ramdomIndex =Math.floor(Math.random()*characters.length)
        ramdomString += characters.charAt(ramdomIndex);
    }
    return ramdomString
}