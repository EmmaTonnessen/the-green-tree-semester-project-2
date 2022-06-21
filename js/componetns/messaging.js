export default function messaging(messageType, message, targetElement) {
    const element = document.querySelector(targetElement);

    element.innerHTML = `<div class=" message ${messageType}">${message}</div>`
}