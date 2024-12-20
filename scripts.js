const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
});

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
    });
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
});

const inputTags = document.getElementById("categoria");
const listaTags = document.getElementById("lista-tags");


listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagRemovida = evento.target.parentElement; // Pega o elemento pai que é o <li> onde se encontra a imagem do X
        listaTags.removeChild(tagRemovida);
    }
});

const tagsDisponiveis = ["Front-End", "Programação", "Data Science", "Full Stack", "Banco de Dados", "HTML", "CSS", "JS"];

//Simula como seria se tivesse uma requisição para um banco
async function verficaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000);
    });
}

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            try {
                const tagExiste = await verficaTagsDisponiveis(tagTexto);
                if (tagExiste) {
                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="img/close-black.svg" class="remove-tag">`;
                    listaTags.appendChild(tagNova);
                    inputTags.value = "";
                } else {
                    alert("Tag não encontrada");
                }
            } catch (error) { //Caso ocorra erro na requisição
                console.error("Erro ao verificar a existência da Tag");
                alert("Erro ao verificar a existência da Tag. Verifique o console.")
            }
        }
    }
});


