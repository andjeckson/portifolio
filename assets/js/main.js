// Cria uma funcao $ para consultar elementos.
var $ = document.querySelector.bind(document)

// Cria um método para adicionar eventos.
HTMLElement.prototype.on = function(evt, fnc) {
  const elm = this
  return elm.addEventListener(evt, fnc)
}

// MENU

let hamburguer = $('.hamburguer')
let navegacao  = $('.navegacao')
let itensMenu  = document.querySelectorAll('.navegacao li')

    hamburguer.on('click', ()=>{
         // Abre ou fecha o hambúrguer.
         hamburguer.classList.toggle('fechar')
         // Abre ou fecha o menu
         navegacao.classList.toggle('abrir')
    })

itensMenu.forEach((li)=>{
    li.on('click',(evt)=>{
     //Seleciona o elemento "a" filho do elemento "li"
     const a = li.querySelector('a')
     const destino = a.getAttribute('href')

     // Remove a classe dos itens do menu
        itensMenu.forEach((item)=> item.classList.remove('ativar'))
        
     //Fecha o menu
     fecharMenu()
     
     // Ativa o item que foi clicado
     li.classList.add('ativar')
     
     // Chama a função de rolagem
     rolarPagina( destino )
    })
})


// Abre o menu
function abrirMenu(){
  navegacao.classList.add('abrir')
  hamburguer.classList.add('fechar')
}

// Fecha o menu
function fecharMenu(){
  navegacao.classList.remove('abrir')
  hamburguer.classList.remove('fechar')
}

// Rola a página até o elemento de destino

function rolarPagina(destino){
   let elemento = $(destino)
   let destinoY = elemento.offsetTop - 100
   
   window.scroll(0, destinoY)
}

// Marca os itens no menu após a rolagem da página

window.addEventListener('scroll', ()=> marcarItemDeMenu())

function marcarItemDeMenu(){
 
  itensMenu.forEach((item)=> item.classList.remove('ativar'))
 
   let scrollY = window.pageYOffset
   
   let sections = document.querySelectorAll('section')
       sections.forEach((section)=>{
          let sectionHeight = section.offsetHeight
          let sectionTop    = section.offsetTop - 100
          let sectionId = section.getAttribute('id')
          
          
           if(scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight){
             let a = $(`a[href="#${sectionId}"]`)
             let li = a.parentElement
                 li.classList.add('ativar')
          }else{
             let a = $(`a[href="#${sectionId}"]`)
             let li = a.parentElement
                 li.classList.remove('ativar')
          }
          
          
       })
  
}

 // Cria uma função que adicina o efeito de bolha estourando.
 
 function ripple(elm, evt){

     const RIPPLED_EVENT = new CustomEvent('RIPPLED') // Cria um evento personalizado.
     const {target} = evt
     const {clientX, clientY, pageX, pageY} = evt
     const {offsetLeft, offsetTop, scrollHeight} = target
     const {scrollX, scrollY } = window // distância de rolagem

     const {width, height} = target.getBoundingClientRect()
     let [x, y, d] = [
                     (clientX - offsetLeft),
                     (clientY - offsetTop),
                     (width + height) / 2 * Math.PI + 'px'
      ]
      
      
      x < 0  ? x += scrollX : x = x
      y < 0  ? y += scrollY : y = y
      y > scrollHeight ? y = scrollHeight : y = y
      
      x = x + 'px'
      y = y + 'px'
      
      // Cria uma bolha que é adicionada ao elemento
      var criarBolha = function(obj = {}){
          const {elmentoPai, posicaoX, posicaoY, diametro} = obj
          const bolha = document.createElement('span')
                bolha.classList.add('bolha')
                bolha.style.setProperty('left', posicaoX)
                bolha.style.setProperty('top', posicaoY)
                bolha.style.setProperty('--diametro', diametro)
                elmentoPai.appendChild(bolha)
                
                elmentoPai.onanimationend = ()=>{
                   bolha.remove() // Remove a bolha
                   elmentoPai.dispatchEvent(RIPPLED_EVENT) // Dispara o evento "RIPPLED"
                }
      }
      
      criarBolha({
        elmentoPai: elm,
         posicaoX : x,
         posicaoY : y,
         diametro : d
      })

 }
 
 // Cria uma barra de progresso circular.

class BarraDeProgressoCircular{
 constructor(elm)
 {
 let porcentagem = elm.dataset.porcentagem
 let conteudo    = elm.innerHTML
 let timer = null
 let t = this
 elm.animar = false
 
  elm.innerHTML = `
           <div class="barra-de-progresso-circular" style="--porcentagem: ${porcentagem}">
               <svg  width="120" height="120" fill="none" stroke="#eeeeee" stroke-width="8" stroke-linecap="round" transform="rotate(-90)">
                   <circle cx="60" cy="60" r="50" stroke="#555555"></circle>
                   <circle cx="60" cy="60" r="50" stroke="var(--cor-principal)"></circle>
                   <span>${porcentagem}</span>
               </svg>
           </div>`
           
           elm.innerHTML += conteudo
           let circulo = elm.querySelector('circle:nth-child(2)') // Seleciona o segundo círculo.
           let elmPorcentagem = elm.querySelector('.barra-de-progresso-circular span') // Elemento que recebe os valores de porcentagem.
           
           function animarScroll(){
// Anima a barra de progresso quando a página é rolada até ela.

              let offsetTop = elm.offsetTop
              let pageY = window.pageYOffset
                 
                 if( (pageY/3)*4 >= offsetTop && elm.animar === false){
                    t.animar()
                    elm.animar = true;
                 }else if((pageY/3)*4 < offsetTop && elm.animar === true){
                    elm.animar = false
                 }
           }
           
           window.addEventListener('scroll', animarScroll)
           
           this.animar = function(){
            elm.animar = true
           // Anima a barra de progresso, fazendo ela ir de 0 a porcentagem final.
           circulo.animate([{
               strokeDashoffset : 312
           },{
               strokeDashoffset: (312 - (312 * porcentagem ) / 100)
               
           }], 2500)
          
          // Anima o valor da porcentagem.
          let n = 0;
          timer = setInterval(()=>{
                   n < porcentagem ? n++ : (n = porcentagem, clearInterval(timer));
                   
                   elmPorcentagem.innerHTML = n+'%'
           }, Math.round(2500/porcentagem))
           
        }
    }

}

 
 // Seleciona todos os elementos com a classe "ripple" e adiciona a função "ripple"
 let elmRipple = document.querySelectorAll('.ripple')
     elmRipple.forEach((elm)=>{
        elm.on('click', (evt)=> ripple(elm, evt))
 })
 

// Adiciona o efeito "ripple" no botão da tela inicial
 let btnExplorar = $('#btn-explorar')
     btnExplorar.on('RIPPLED', ()=>{
         let offsetY = window.pageYOffset + 600
             window.scroll(0, offsetY)
     })


// Cria  barras de progresso circular
document.querySelectorAll('.barra-de-progresso')
     .forEach((elm)=>{
       let progresso =  new BarraDeProgressoCircular(elm)
           
     })


// Chama a biblioteca ScrollReveal e define os parâmetros

const $scrollReveal = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1200,
    delay: 150,
    interval: 1200,
    reset: true,
});

// Adiciona os efeitos de rolagem aos respectivos elementos

$scrollReveal.reveal('.apresentacao .titulo span, .biografia .titulo, .projetos h1:not(.card h1), .titulo-sublinhado, .barra-de-progresso, .redes-sociais, .inicio button',{})

$scrollReveal.reveal('.redes-sociais, .conhecimentos p, .biografia p',{delay: 100, origin: 'bottom'})

$scrollReveal.reveal('footer .redes-sociais i',{ origin: 'bottom'})

$scrollReveal.reveal('.blob, .imagem, .card',{
   scale: 0.7,
   distance: '0px'
})


$scrollReveal.reveal(' footer h1, footer p, footer .redes-sociais',{
  opacity: 0,
  scale: 0,
  distance: 0
})
