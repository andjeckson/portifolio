


let $ = document.querySelector.bind(document)


const MENU_HAMBURGUER = $('.menu-hamburguer')
const BARRA_LATERAL   = $('.barra-lateral')
const ITENS_MENU      = document.querySelectorAll(".barra-lateral li")

// Rola a página até o elemento de destino
function rolarPagina(destino){
   const elemento = $(destino)
   const destinoY = elemento.offsetTop 
   window.scroll(0, destinoY)
   fecharMenu()
}

ITENS_MENU.forEach((li)=>{
    let a = li.querySelector('a')
        a.onclick = (evt)=>{
            evt.preventDefault()
            rolarPagina(a.getAttribute('href'))
        }
})


// Abre e fecha o menu
function alternarMenu(){
     MENU_HAMBURGUER.classList.toggle('x')
     BARRA_LATERAL.classList.toggle('abrir')
}

function fecharMenu(){
    MENU_HAMBURGUER.classList.remove('x')
    BARRA_LATERAL.classList.remove('abrir')
}


MENU_HAMBURGUER.onclick = ()=> alternarMenu()

//Marca os itens no menu após a rolagem da página

window.addEventListener('scroll', ()=> marcarItemDeMenu())

function marcarItemDeMenu(){
 
ITENS_MENU.forEach((item)=> item.classList.remove('ativar'))
 
   let scrollY = window.pageYOffset
   
   let sections = document.querySelectorAll('section')
       sections.forEach((section)=>{
          let sectionHeight = section.offsetHeight
          let sectionTop    = section.offsetTop - 100
          let sectionId = section.getAttribute('id')
          
          
           if(scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight){
             let a = $(`a[href="#${sectionId}"]`)
             let li = a.parentElement
                 li.classList.add('marcar')
          }else{
             let a = $(`a[href="#${sectionId}"]`)
             let li = a.parentElement
                 li.classList.remove('marcar')
          }
          
          
       })
}


let btnEnviarEmail = $('.btn-enviar-email')
let iconeBotao     = btnEnviarEmail.querySelector('i')
let btnTexto       = btnEnviarEmail.querySelector('span')


 $('.formulario-de-email').addEventListener("submit", function(e){
        e.preventDefault();
        enviarEmail(this)
        iconeBotao.className = 'bx bx-loader'
        btnTexto.innerText = 'Enviando…'
 })
 
 
 function enviarEmail(formulario) {
// Envia o e-mail

emailjs.init("Qnxm85EQWmOpa8Gzb");

    emailjs.sendForm("service_l9hqv2l", "template_72s8djn", formulario)
    
        .then(() => {
            alerta('Eviado! Obrigado pelo feedback!', 'sucesso')
            
            iconeBotao.className = 'bx bx-send'
            btnTexto.innerText = 'Enviar'
        }, (error) =>{
        
            alerta('Falha ao enviar. Por favor, tente novamente.', 'erro')
            iconeBotao.className = 'bx bx-send'
            btnTexto.innerText = 'Reenviar'
        
        });
        
}



let $scrollReveal = ScrollReveal({
    duration: 1000,
    reset: true
})


document.querySelectorAll('.apresentacao h1 *').forEach( (elm, i)=>{
$scrollReveal.reveal( elm ,{
      opacity: 0,
      origin: 'bottom',
      distance: '50px',
      delay: i * 200
})
})


document.querySelectorAll('.links-rapidos ul li').forEach( (elm, i)=>{
$scrollReveal.reveal( elm ,{
      opacity: 0,
      origin: 'bottom',
      distance: '50px',
      delay: i * 150
})
})



$scrollReveal.reveal('.blob, .sobre h2, .biografia img, .conhecimentos .card',{
    delay: 200,
    origin: 'bottom',
    distance: '40px'
})

$scrollReveal.reveal('.projetos .card, .formulario-de-email label',{
    delay: 100,
    origin: 'top',
    distance: '40px'
})


