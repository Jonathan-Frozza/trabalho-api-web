document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formCadastro");
   
    const dadosSalvos = JSON.parse(localStorage.getItem("cadastro"));
    if (dadosSalvos) {
        document.getElementById("nome").value = dadosSalvos.nome;
        document.getElementById("email").value = dadosSalvos.email;
        document.getElementById("cep").value = dadosSalvos.cep;
        document.getElementById("rua").value = dadosSalvos.rua;
        document.getElementById("bairro").value = dadosSalvos.bairro;
        document.getElementById("cidade").value = dadosSalvos.cidade;
        document.getElementById("estado").value = dadosSalvos.estado;
    }

    document.getElementById("cep").addEventListener("blur", () => {
        const cep = document.getElementById("cep").value.replace(/\D/g, "");
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById("rua").value = data.logradouro;
                        document.getElementById("bairro").value = data.bairro;
                        document.getElementById("cidade").value = data.localidade;
                        document.getElementById("estado").value = data.uf;
                    } else {
                        alert("CEP nao encontrado.");
                    }
                })
                .catch(() => alert("Erro ao buscar o CEP."));
        }
    });

    
    form.addEventListener("submit", (e) => {
        e.preventDefault(); 

        const dados = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            cep: document.getElementById("cep").value,
            rua: document.getElementById("rua").value,
            bairro: document.getElementById("bairro").value,
            cidade: document.getElementById("cidade").value,
            estado: document.getElementById("estado").value
        };

        localStorage.setItem("cadastro", JSON.stringify(dados));
        alert("Dados salvos com sucesso");
    });
});
