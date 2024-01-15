let listaNumeros = []; 
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag); //esse document.querySelector busca um elemento do HTML;
    campo.innerHTML = texto; // .innerHTML é literalmente dentro do HTML;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2}); 
    // Isso aqui é pra ter voz no site, inútil nesse caso, mas pode ser útil em outros.
}

function exibirMensagemInicial(){
    exibirTextoNaTela("h1","Jogo do Número Secreto"); 
    exibirTextoNaTela("p", "Escolha um número de 1 a 10");
} 
exibirMensagemInicial(); 
// essa função usa a função anterior pra executar e é por isso que precisa declarar (mesmo vazia) depois.

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); 
    // possibilita que gere um numero aleatório; usando numeroLimite (10) + 1 faz ser de 1 a 10.
    let quantidadeElementosLista = listaNumeros.length; // Para saber quantos elementos tem na lista vazia criada no começo do código.

    if (quantidadeElementosLista == numeroLimite) {
        listaNumeros = []; 
    } 

    if (listaNumeros.includes(numeroEscolhido)) { 
        return gerarNumeroAleatorio();
        // A listaNumeros inclui o numeroEscolhido e por isso devolve a função gerarNumeroAleatorio
    } else { 
        listaNumeros.push(numeroEscolhido); 
        return numeroEscolhido; 
        // O push adiciona o item ao final da lista; Nesse caso, adiciona o numeroEscolhido para a listaNumeros e devolve o valor do numeroEscolhido;
    }
} 

function verificarChute() {
    let chute = document.querySelector("input").value; 
    // input é onde o usuário consegue dar uma entrada de dados
    // o .value define/obtem valores de entrada, como campos de texto, caixa de seleção; 
    if (chute == numeroSecreto){ 
        exibirTextoNaTela("h1", "Acertou"); 
        let palavraTentativas = tentativas > 1 ? "tentativas" : "tentativa"; 
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled"); 
        // getElementById - quando já tem um elemento igual, para diferenciar, se tem um id e é por ele que nos atribuimos. 
        // sempre que for removeAtribute e for disable no HTML, precisa ficar como disabled (já que está no passado); 

    } else {
        if(chute > numeroSecreto) {
            exibirTextoNaTela("p", "O número é menor");
          
        } else {
            exibirTextoNaTela("p", "O número secreto é maior"); 
            
        }
        tentativas++; // Se a variável for igual a 0; dá para colocar tentativas++ ali no começo
        limparCampo();
    }
}


function limparCampo() {
    chute = document.querySelector("input");
    chute.value = " ";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    
    // Esse setAttribute modifica o atributo; como tinha sido disabilitado quando ganhava, quando reiniciar, ele volta a ficar desabilitado.
}
