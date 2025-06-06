const form = document.querySelector("form");
const lista = document.getElementById("lista");

const btnAdicionar = document.getElementById("Adicionar");
const btnUrgencia = document.getElementById("Urgência");
const btnAtender = document.getElementById("Atender");

let emAtendimento = localStorage.getItem("emAtendimento") || "";
let listaUrgencia = JSON.parse(localStorage.getItem("listaUrgencia")) || [];
let listaEspera = JSON.parse(localStorage.getItem("listaEspera")) || [];

btnAdicionar.addEventListener("click", (e) => {
    e.preventDefault();

    const nome = form.paciente.value.trim();
    const arquivo = form.imagem.files[0];

    if (nome && arquivo) {
        if (!listaEspera.includes(nome) && !listaUrgencia.includes(nome)) {

            const leitor = new FileReader();
            leitor.onload = (e) => {
                const imagem = e.target.result;
                const paciente = {
                    nome: nome,
                    imagem: imagem,
                    hora: new Date().toLocaleTimeString('pt-BR', {
                        timeZone: 'America/Sao_Paulo',
                        hour12: false
                    })
                };
                localStorage.setItem(nome, JSON.stringify(paciente));
                listaEspera.push(nome);
                localStorage.setItem("listaEspera", JSON.stringify(listaEspera));
                atualizarLista();
                form.reset();  
            };
            leitor.readAsDataURL(arquivo);
        } else {
            alert("Já existe um paciente com esse nome");
        }
    } else {
        alert("Por favor preencha todos os campos");
    }
});

btnUrgencia.addEventListener("click", (e) => {
    e.preventDefault();

    const nome = form.paciente.value.trim();
    const arquivo = form.imagem.files[0];

    if (nome && arquivo) {
        if (!listaUrgencia.includes(nome) && !listaEspera.includes(nome)) {

            const leitor = new FileReader();
            leitor.onload = (e) => {
                const imagem = e.target.result;
                const paciente = {
                    nome: nome,
                    imagem: imagem,
                    hora: new Date().toLocaleTimeString('pt-BR', {
                        timeZone: 'America/Sao_Paulo',
                        hour12: false
                    })
                };
                localStorage.setItem(nome, JSON.stringify(paciente));
                listaUrgencia.push(nome);
                localStorage.setItem("listaUrgencia", JSON.stringify(listaUrgencia));
                atualizarLista();
                form.reset();  
            };
            leitor.readAsDataURL(arquivo);
        } else {
            alert("Já existe um paciente com esse nome");
        }
    } else {
        alert("Por favor preencha todos os campos");
    }
});

btnAtender.addEventListener("click", (e) => {
    e.preventDefault();

    if (emAtendimento) {
        localStorage.removeItem(emAtendimento);
    }

    if (listaUrgencia.length > 0) {
        emAtendimento = listaUrgencia.shift();
        localStorage.setItem("listaUrgencia", JSON.stringify(listaUrgencia));
    } else if (listaEspera.length > 0) {
        emAtendimento = listaEspera.shift();
        localStorage.setItem("listaEspera", JSON.stringify(listaEspera));
    } else {
        emAtendimento = "";
    }

    localStorage.setItem("emAtendimento", emAtendimento);

    atualizarLista();
});

function atualizarLista() {
    lista.innerHTML = ``;

    if (emAtendimento) {
        const paciente = JSON.parse(localStorage.getItem(emAtendimento));
        if (paciente) {
            lista.innerHTML += `
                <div class="divAtendimento">
                    <p class="pacienteAtendimento">
                        <img class="imgLista" src="${paciente.imagem}" alt="Imagem de ${paciente.nome}">
                        ${paciente.nome} (${paciente.hora})
                    </p>
                </div>
            `;
        }
    }

    listaUrgencia.forEach(nome => {
        const paciente = JSON.parse(localStorage.getItem(nome));
        if (paciente) {
            lista.innerHTML += `
                <div class="divUrgencia">
                    <p class="pacienteUrgencia">
                        <img class="imgLista" src="${paciente.imagem}" alt="Imagem de ${paciente.nome}">
                        ${paciente.nome} (${paciente.hora})
                    </p>
                </div>
            `;
        }
    });

    listaEspera.forEach(nome => {
        const paciente = JSON.parse(localStorage.getItem(nome));
        if (paciente) {
            lista.innerHTML += `
                <div class="divEspera">
                    <p class="pacienteEspera">
                        <img class="imgLista" src="${paciente.imagem}" alt="Imagem de ${paciente.nome}">
                        ${paciente.nome} (${paciente.hora})
                    </p>
                </div>
            `;
        }
    });
}

atualizarLista();
