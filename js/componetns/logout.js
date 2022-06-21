import { clearStorage } from "../utils/storage.js";

export default function logout() {
    const logoutBtn = document.querySelector(".logout");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", onLogout);

        function onLogout() {
            const confirmationCheck = confirm("Do you want to logout?");

            if(confirmationCheck) {
                clearStorage();
                location.href = "index.html";
            }
        }
    }
}