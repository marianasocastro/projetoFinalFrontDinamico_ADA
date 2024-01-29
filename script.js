document.addEventListener('DOMContentLoaded', function () {
    const storedData = localStorage.getItem('userData');
    
    if (storedData) {
        const userData = JSON.parse(storedData);

        document.getElementById('nome').value = userData.nome;
        document.getElementById('email').value = userData.email;
        document.getElementById('cep').value = userData.cep;
        document.getElementById('promocoes').checked = userData.promocoes;
    }
});

async function validarFormulario(event) {
    event.preventDefault();

    // Obter os elementos do formulário
    let nome = document.getElementById("nome");
    let email = document.getElementById("email");
    let cep = document.getElementById("cep");
    let promocoes = document.getElementById("promocoes").checked;

    const userData = {
        nome: nome.value,
        email: email.value,
        cep: cep.value,
        promocoes: promocoes
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    let erros = 0;

    // Validar os dados (exemplo simples)
    if (nome.value.length < 3) {
        let errorNome = document.getElementById("error-message-name");
        errorNome.style.display = 'block';
        nome.style.boxShadow = "0 0 5px 1px red";
        nome.style.border = "1px solid red";
        erros++;
    }

    if (email.value.length === 0 || !email.value.includes("@")) {
        let errorEmail = document.getElementById("error-message-email");
        errorEmail.style.display = 'block';
        email.style.boxShadow = "0 0 5px 1px red";
        email.style.border = "1px solid red";
        erros++;
    }

    if (cep.value.length !== 8 || isNaN(cep.value)) {
        let errorCep = document.getElementById("error-message-cep");
        errorCep.style.display = 'block';
        cep.style.boxShadow = "0 0 5px 1px red";
        cep.style.border = "1px solid red";
        erros++;
    }

    if (erros === 0) {
        try {
            await carregarCalculadora();
            alert("Dados cadastrados com sucesso!");
 
        } catch (error) {
            console.error("Erro:", error);
        }
    }
}

function carregarCalculadora() {
    return new Promise((resolve) => {
        let main = document.getElementById("main-div");

        main.innerHTML = `<p>Precisa de uma ajudinha com o churrasco? :)<br><br>Quantas pessoas vão participar?</p>
        <form class="form-calculadora">
            <div class="containers-calculadora">
                <div class="number-input">
                    <label for="quantity-man">Homens</label>
                    <input id="quantity-man" min="0" name="quantity-man" value="0" type="number">
                    <div class="btn-calculadora">
                        <button onclick="stepDown('quantity-man', event)" class="minus"></button> 
                        <button onclick="stepUp('quantity-man', event)" class="plus"></button>
                    </div>
                </div>
                <div class="number-input">
                    <label for="quantity-women">Mulheres</label>
                    <input id="quantity-women" min="0" name="quantity-women" value="0" type="number">
                    <div class="btn-calculadora">
                        <button onclick="stepDown('quantity-women', event)" class="minus"></button> 
                        <button onclick="stepUp('quantity-women', event)" class="plus"></button>
                    </div>
                </div>
                <div class="number-input">
                    <label for="quantity-children">Crianças</label>
                    <input id="quantity-children" min="0" name="quantity-children" value="0" type="number">
                    <div class="btn-calculadora">
                        <button onclick="stepDown('quantity-children', event)" class="minus"></button> 
                        <button onclick="stepUp('quantity-children', event)" class="plus"></button>
                    </div>
                </div>
                <div class="number-input">
                    <label for="quantity-drink">Quantos adultos bebem?</label>
                    <input id="quantity-drink" min="0" name="quantity-drink" value="0" type="number">
                    <div class="btn-calculadora">
                        <button onclick="stepDown('quantity-drink', event)" class="minus"></button> 
                        <button onclick="stepUp('quantity-drink', event)" class="plus"></button>
                    </div>
                </div>
            </div>
            <input type="submit" value="Calcular" class="btn-send" onclick="calcular()">
        </form>
        `;

        
        resolve();
        
    });
}

function stepDown(id, event){
    event.preventDefault(); 
    let elemento = document.getElementById(id);
    let number = parseInt(elemento.value);

    if(number <= 0){
        alert("Não é possível manter a quantidade de pessoas abaixo de 0.")
    } else{
        elemento.value = --number;
    }
}

function stepUp(id, event){
    event.preventDefault(); 
    let elemento = document.getElementById(id);
    let number = parseInt(elemento.value);
    elemento.value = ++number;
    console.log(elemento.value)
}

function calcular(){
    let homens = parseInt(document.getElementById("quantity-man").value);
    let mulheres = parseInt(document.getElementById("quantity-women").value);
    let criancas = parseInt(document.getElementById("quantity-children").value);
    let pessoasQueBebem = parseInt(document.getElementById("quantity-drink").value);
    let totalPessoas = homens + mulheres + criancas;

    let carne = (homens * 0.4 + mulheres * 0.32 + criancas * 0.2).toFixed(1);
    let paoDeAlho = ((homens + mulheres) * 2 + criancas * 1).toFixed(0);
    let carvao = totalPessoas;
    let sal = (totalPessoas * 0.4).toFixed(1);
    let gelo = (totalPessoas / 5).toFixed(1);
    let refrigerante = (parseInt(totalPessoas/5)).toFixed(0);
    let agua = (parseInt(totalPessoas/5)).toFixed(0);
    let cerveja = pessoasQueBebem * 3;

    let main = document.getElementById("main-div");

    main.innerHTML = `<p>Confira a lista para o seu churrasco:</p>
    <p class="total-convidados">${totalPessoas} convidados</p>
    <div class="convidados">
        <span>${homens} homens</span>
        <span>${mulheres} mulheres</span>
        <span>${criancas} crianças</span>
    </div>
    <table>
        <thead>
            <tr>
                <th style="text-align: left;">ITEM</th>
                <th style="text-align: right;">QUANTIDADE</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="text-align: left;">Carne</td>
                <td style="text-align: right;">${carne}kg</td>
            </tr>
            <tr>
                <td style="text-align: left;">Pão de alho</td>
                <td style="text-align: right;">${paoDeAlho} unidades</td>
            </tr>
            <tr>
                <td style="text-align: left;">Refrigerante</td>
                <td style="text-align: right;">${refrigerante} garrafas de 2L</td>
            </tr>
            <tr>
                <td style="text-align: left;">Água</td>
                <td style="text-align: right;">${agua} garrafas de 1L</td>
            </tr>
            <tr>
                <td style="text-align: left;">Cerveja</td>
                <td style="text-align: right;">${cerveja} garrafas de 600mL</td>
            </tr>
            <tr>
                <td style="text-align: left;">Carvão</td>
                <td style="text-align: right;">${carvao}kg</td>
            </tr>
            <tr>
                <td style="text-align: left;">Sal</td>
                <td style="text-align: right;">${sal}kg</td>
            </tr>
            <tr>
                <td style="text-align: left;">Gelo</td>
                <td style="text-align: right;">${gelo}kg</td>
            </tr>
        </tbody>

    </table>
    <button class="btn-send" onclick="carregarCalculadora()">Novo cálculo</button>
    
    `
}