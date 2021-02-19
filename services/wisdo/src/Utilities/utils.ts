export const getFirstNWords = (n: number, string: string) => {
    if (!n) {
        return string;
    }

    if (!string) {
        return null;
    }

    const wordsArray = string.split(' ');
    if (n < wordsArray.length) {
        return string;
    }

    return wordsArray.slice(0,n).join(' ');
}

export const countWords = (string: string) => {
    if (!string) {
        return 0;
    }
    return string.split(' ').length;
}