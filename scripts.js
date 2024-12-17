const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

//verficação de tamanho e tipo
inputUpload.addEventListener('change', function(event) {
    var arquivo = event.target.files[0];

    if (!arquivo.type.match("image/")) {
        alert("Por favor, inserir uma Imagem!");
        inputUpload.value = "";
        return;
    }

    if (arquivo.size > 2 * 1024 * 1024) {
        alert("A Imagem deve ter no máximo 2MB");
        inputUpload.value = "";
        return;
    }

    console.log("Olha a pedra", arquivo);
})

