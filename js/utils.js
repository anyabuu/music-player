//чтобы время было в минутах и секундах
export const calcTime = (seconds) => {
    const date = new Date(seconds * 1000);

    return `${date.getMinutes()}:${date.getSeconds().toString().padStart(2,'0')}`;
}