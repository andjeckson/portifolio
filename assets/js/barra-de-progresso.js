class BarraDeProgressoCircular extends HTMLElement{
    constructor(){
        super()
        this._root = this.attachShadow({mode: 'open'})
        this.animated = false
    }
    
    connectedCallback(){
          const uri = 'http://www.w3.org/2000/svg'
          let tamanho = (this.getAttribute('tamanho') || 120)
          let tamanhoDaBorda = this.getAttribute('tamanho-da-borda') || 2
          let tema = this.getAttribute('tema')
          let corDoTexto = this.getAttribute('cor-do-texto') || '#ffffff'
          let porcentagem = Math.min( Math.max( parseFloat(this.getAttribute('porcentagem')), 0), 100) || 0
          
          let svg = document.createElementNS(uri, 'svg')
                svg.setAttribute('width',tamanho + 'px')
                svg.setAttribute('height', tamanho + 'px')
            
            
          let raio = (tamanho/2) - (tamanhoDaBorda/2)
          let perimetro = 2 * Math.PI * raio
          let barra = (p)=> (perimetro - (perimetro * p) / 100)
          
          let circulo1 = `<circle cx="${(tamanho/2)}" cy="${(tamanho/2)}" r="${raio}" fill="transparent" stroke="#eeeeee45" stroke-width="${tamanhoDaBorda}" ></circle>`
          
          let circulo2 = `<circle cx="${(tamanho/2)}" cy="${(tamanho/2)}" r="${raio}" fill="transparent" stroke="${tema}" stroke-width="${tamanhoDaBorda}" stroke-linecap="round" stroke-dasharray="${perimetro}" transform="rotate(-90 ${tamanho/2} ${tamanho/2})" id="circulo" stroke-dashoffset="${barra(0)}"></circle>`
          
          svg.innerHTML += circulo1
          svg.innerHTML += circulo2
          
          let texto = `<text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="HarmonyOS" fill="${corDoTexto}" font-size="${tamanho/ 4.5}" id="texto">0%</text>`
          
          svg.innerHTML += texto
          
          this._root.appendChild(svg)
          
         window.addEventListener('scroll', ()=>{
            let posicaoY = this.offsetTop
            let pageYOffset = window.pageYOffset

            if( (pageYOffset/3) * 4 >= posicaoY && this.animated === false){
            
            this.animated = true
            
            for( let i = 0; i <= porcentagem; i++){
                setTimeout(()=>{
                    svg.querySelector('#texto').innerHTML = i +'%'
                    svg.querySelector('#circulo').setAttribute('stroke-dashoffset', barra(i))
                    
                }, (3000/porcentagem) * i);
                
             }
             
            }else if((pageYOffset/3) * 4 <= posicaoY && this.animated === true){
                          this.animated = false
                    }
         })
    }
}



window.customElements.define('barra-de-progresso-circular', BarraDeProgressoCircular)