var sentSound = new Audio("sent.mp3");
var sendSound = new Audio("send.mp3");
var errorSound = new Audio("error.mp3");

function updatePreview() {
    var message = document.getElementById("msg_contents").value;
    var wb_picture = document.getElementById("preview_img").src;
    var wb_naming = document.getElementById("preview_username").value;

    document.getElementById("preview_msgcontent").textContent = message;

    if (wb_naming == null) {
        document.getElementById("preview_username").textContent = "username";
    } else {
        document.getElementById("preview_username").textContent = wb_naming;
    }

    if (wb_picture == null) {
        document.getElementById("preview_img").src = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";
    } else {
        document.getElementById("preview_img").src = wb_picture;
    }

    localStorage.setItem('messageContent', message);
}

function loadSavedData() {
    var savedMessage = localStorage.getItem('messageContent');
    var savedName = localStorage.getItem('webhookProfileName');
    var savedPic = localStorage.getItem('webhookProfilePic');

    if (savedMessage) {
        document.getElementById("msg_contents").value = savedMessage;
        updatePreview();
    }

    if (savedName) {
        if (savedName == null) {
            document.getElementById("preview_username").value = "username"
            updatePreview();
        } else {
            document.getElementById("preview_username").value = savedName
            updatePreview();
        }
    }

    if (savedPic) {
        if (savedPic == null) {
            document.getElementById("preview_img").src = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            updatePreview();
        } else {
            document.getElementById("preview_img").src = savedPic
            updatePreview();
        }
    }
}

window.onload = loadSavedData;
document.getElementById("msg_contents").addEventListener("input", updatePreview);

function saveConfig() {
    var TEMPwb_picture = document.getElementById("wb_image_insert").value;
    var TEMPwb_naming = document.getElementById("wb_name_insert").value;
    localStorage.setItem('webhookProfilePic', TEMPwb_picture);
    localStorage.setItem('webhookProfileName', TEMPwb_naming);
}

function sendWebhookSolicitation() {
    var webhook_url = document.getElementById("wb_url").value;
    var webhook_name = document.getElementById("preview_username").value;
    var webhook_image = document.getElementById("preview_img").src;
    var message = document.getElementById("msg_contents").value;
    var successMsg = document.getElementById("successmsg");
    var errorMsg = document.getElementById("errormsg");
    var infoMsg = document.getElementById("infomsg");

    infoMsg.textContent = "uidwi >> << discord";
    successMsg.textContent = "";
    errorMsg.textContent = "";

    sendSound.play();

    if (!webhook_url.trim()) {
        errorMsg.textContent = "webhook url cannot be empty.";
        infoMsg.textContent = ""; 
        return;
    }

    var request = new XMLHttpRequest();
    request.open("POST", webhook_url, true);
    request.setRequestHeader('Content-type', 'application/json');

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            errorMsg.textContent = "";
            successMsg.textContent = "sent webhook message sucessfully!";
            sentSound.play();
        } else {
            successMsg.textContent = "";
            if (request.status === 404) {
                errorMsg.textContent = "the webhook was not found in discord's api";
                errorSound.play();
            } else {
                errorMsg.textContent = "error while sending the message, status code: " + request.status;
                errorSound.play();
            }
        }
        infoMsg.textContent = "";
    };

    request.onerror = function() {
        successMsg.textContent = "";
        errorMsg.textContent = "error ocourred during the communication with server";
        errorSound.play();
        infoMsg.textContent = "";
    };

    var params = {
        username: webhook_name,
        avatar_url: webhook_image,
        content: message
    };

    request.send(JSON.stringify(params));
}
