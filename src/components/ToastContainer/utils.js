// Adjust error messages
export const adjustErrorMessageForToast = ({
    message: errorMessage,
    eventType: errorsMap
}) => {
    let adjustedMessage = errorMessage;

    for (const message of errorsMap) {
        if (errorMessage.includes(message[0])) {
            adjustedMessage = message[1];
        }
    }

    return adjustedMessage;
};
