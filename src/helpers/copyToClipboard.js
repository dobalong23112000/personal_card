const copyToClipboard  = (textCopy) => {
    try {
        navigator.clipboard?.writeText && navigator.clipboard.writeText(textCopy);
    } catch (error) {
        console.error('error: ', error);
    }

}
export default copyToClipboard
