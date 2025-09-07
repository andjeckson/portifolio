// ========= ALERTA =========
function alerta(mensagem, tipo){
     const dialogo = document.createElement('dialog')
           dialogo.classList.add('dialogo')
           
     const caixa  = document.createElement('div')
           caixa.classList.add('caixa')
     
     const icone = document.createElement('i')
           icone.classList.add('bx')
           
           
     const paragrafo = document.createElement('p')
           paragrafo.innerHTML = mensagem
           
           switch(tipo){
                case 'sucesso':
                    icone.classList.add('bx-check')
                    break
                
                case 'erro':
                    icone.classList.add('bx-x')
                    break
           }
           
           caixa.appendChild(icone)
           caixa.appendChild(paragrafo)
           dialogo.appendChild(caixa)
           dialogo.classList.add( tipo )
           
           document.body.appendChild(dialogo)
           
           dialogo.show()
           
           dialogo.animate([{
                     opacity: 0
                },{
                    opacity: 1
                }], 500)
                
           
           setTimeout(()=>{
                dialogo.animate([{
                     opacity: 1,
                },{
                    opacity: 0
                }], 500)
                
                  setTimeout(()=>{
                       dialogo.remove()
                  }, 500)
           }, 3000)
}