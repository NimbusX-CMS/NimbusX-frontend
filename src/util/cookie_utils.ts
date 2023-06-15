export function getCookieValue(name: string, cookie: string | undefined) {
    const value: string | undefined = (cookie ?? '').match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop();
    return value ?? '';
}