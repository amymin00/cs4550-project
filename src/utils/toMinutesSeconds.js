export default function toMinutesSeconds(ms) {
    const date = new Date(ms);
    const padZero = seconds =>  seconds < 10 ? `0${seconds}` : seconds;
    return `${date.getMinutes()}:${padZero(date.getSeconds())}`;
}