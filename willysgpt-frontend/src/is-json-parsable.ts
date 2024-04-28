export function isJsonParsable(string: string) {
    try {
        JSON.parse(string);
        return true;
    } catch (e) {
        return false;
    }
}