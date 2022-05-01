export default function validName(name) {
    if (name.split(' ').length !== 2) {
        throw Error("Given invalid name. Please enter a name of form 'First Last'")
    }
}