const dino = document.querySelector('.dino');                               // Funciona como uma gaveta onde a gente seleciona o nosso elemento dino, essa constante não pode ser sobrescrita
                                                                            //console.log(dino); //Verificação se o código está funcionando corretamente, o console log sempre auxília nessa parte
const background = document.querySelector('.background');
let isJumping = false;                                                      // Criado para a verificação se está pulando
let position = 0;                                                           // Posição inicial do dinossauro, sempre começará embaixo


function handleKeyUp(event) {                                               // Função é enviada toda vez que a tecla for pressionada
    if (event.keyCode === 32) {                                             // Verificação se a tecla que foi pressionada, de fato é o "espaço" no caso    
                                                                            //console.log('Pressionou espaço!');
      if (!isJumping) {                                                     // Boolean que retorna o contrátio, se ele não estiver pulando, ele pula 
          
    jump();
    }
  }
}

function jump() {                                                        // Função responsável pelo pulo do dinossauro 
    isJumping = true;                                                    // Indica que ele está pulando
    
    let upInterval = setInterval(() => {                                // Para deifinir intervalos, tudo que for executado dentro dessa lógica, será executado sme parar no intervalo que definirmos      
     if (position >=150){
         clearInterval(upInterval);
      
       //Descendo
       let downInterval = setInterval(() => {                           // Lógica para centralizr o dino após os pulos
        if (position <= 0) {
            clearInterval(downInterval);
            isJumping = false;                                          // Indica que terminou de pular
        }else {   
            position -= 20;
            dino.style.bottom = position + 'px';
        }
        }, 20);
     }else {
      //Subindo  
        position += 20;
        dino.style.bottom = position + 'px';
     }

    }, 20);                                                             // Nesse caso, definimos em 20 milisegundos  
}                                           

function createCactus() {
    const cactus = document.createElement('div');           
    let cactusPosition = 1000;                              
    let randomTime = Math.random() * 6000;

                                                                        // console.log(randomTime); // Verificação se a lógica de gerar cactus aleatórios estão funcionando

    cactus.classList.add('cactus');                                     // Adicionando a classe para que depois mudar o estilo com o css
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);
    
    let leftInterval = setInterval(() => {
        cactusPosition -= 10;                                            // Velocidade com que se move para a esquerda
        cactus.style.left = cactusPosition +'px';
        
        if (cactusPosition < -60) {                                     // Se a posição for menor que 60, que é o tamanho do cactus, devemos limpar a tela  
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            // Game Over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
        }else{
            cactusPosition -= 10;                             
            cactus.style.left = cactusPosition +'px';
        }
    }, 20);


    setTimeout(createCactus, randomTime);

}

createCactus();
document.addEventListener ('keyup', handleKeyUp);                       // Tudo que faz no navegador, ele gera eventos, e iremos ecutar o evento key up no caso, que será o pulo do dinossauro
                                                                        //  console.log('pressionou a tecla'); //Verificação se de fato está funcionando a lógica
  