export function strUcFirst(a: string): string {
    return (a+'').charAt(0).toUpperCase() + (a+'').substr(1);
}

export function removeAfterDash(str: string): string {
    return str.split('-')[0];
}
