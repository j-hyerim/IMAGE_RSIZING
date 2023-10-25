document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById("imageInput");
    const resizeButton = document.getElementById("resizeButton");
    const downloadLink = document.getElementById("downloadLink");

    // 이미지 크기 변경 함수
    function resizeImage(image) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const originalWidth = image.width;
        const originalHeight = image.height;

        const size = Math.min(originalWidth, originalHeight);

        // 정사각형으로 크기 조절
        canvas.width = size;
        canvas.height = size;

        const xOffset = (originalWidth - size) / 2;
        const yOffset = (originalHeight - size) / 2;

        ctx.drawImage(image, -xOffset, -yOffset, originalWidth, originalHeight);

        return canvas.toDataURL("image/jpeg");
    }

    // 이미지 업로드 시
    imageInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const originalImage = new Image();
                originalImage.src = e.target.result;
                originalImage.onload = function () {
                    const resizedImage = resizeImage(originalImage);
                    downloadLink.href = resizedImage;
                    downloadLink.style.display = "block";
                };
            };
            reader.readAsDataURL(file);
        }
    });

    // 이미지 다운로드
    resizeButton.addEventListener("click", function () {
        downloadLink.click();
    });
});