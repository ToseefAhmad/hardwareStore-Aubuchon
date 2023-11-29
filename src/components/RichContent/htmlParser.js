/**
 * Parse base64 encoded content. Used in UPWARD responses.
 */
const parseBase64 = html =>
    html.replace(/B64::(.*)::B64/, (m, p1) => Buffer.from(p1, 'base64'));

export const parseHtml = html => {
    return parseBase64(html);
};
