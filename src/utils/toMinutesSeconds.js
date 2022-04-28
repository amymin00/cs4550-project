export default function toMinutesSeconds(ms) {
    const date = new Date(ms);
    return `${date.getMinutes()}:${date.getSeconds()}`;
}