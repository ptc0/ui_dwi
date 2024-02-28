function updatePreviewinConfig() {
    var wb_pictureINCONFIG = localStorage.getItem('webhookProfilePic');
    var wb_namingINCONFIG = localStorage.getItem('webhookProfileName');
    var savedNameCONFIG = localStorage.getItem('webhookProfileName');
    var savedPicCONFIG = localStorage.getItem('webhookProfilePic');

    if (wb_namingINCONFIG == null) {
        document.getElementById("preview_username_config").textContent = "username";
    } else {
        document.getElementById("preview_username_config").textContent = savedNameCONFIG;
    }

    if (wb_pictureINCONFIG == null) {
        document.getElementById("preview_img_config").src = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";
    } else {
        document.getElementById("preview_img_config").src = savedPicCONFIG;
    }
}

window.onload = updatePreviewinConfig;