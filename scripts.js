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

});

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({url: leitor.result, nome: arquivo.name})
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo);
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p")

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("erro na leitura do arquivo");
        }
    }
})
