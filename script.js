function main(){
    //getProcessos
    let p1 = [document.getElementById('p1Chegada').value, document.getElementById('p1Pico').value, document.getElementById('p1Prioridade').value]
    let p2 = [document.getElementById('p2Chegada').value, document.getElementById('p2Pico').value, document.getElementById('p2Prioridade').value]
    let p3 = [document.getElementById('p3Chegada').value, document.getElementById('p3Pico').value, document.getElementById('p3Prioridade').value]
    let p4 = [document.getElementById('p4Chegada').value, document.getElementById('p4Pico').value, document.getElementById('p4Prioridade').value]
    let p5 = [document.getElementById('p5Chegada').value, document.getElementById('p5Pico').value, document.getElementById('p5Prioridade').value]
    //tratamento de erros
    //trataErros(p1,p2,p3,p4,p5); //implementar tratamento de erros. AINDA NAO FEITO
    count(p1,p2,p3,p4,p5); 
    calculaAlgoritmo(p1,p2,p3,p4,p5,count);
    
}
var count = function calculaQtprocessos(p1,p2,p3,p4,p5) { //calcula quantos processos estao sendo executados
    for(i=0;i<5;i++){
        if(p1[0] != '' && p2[0] == '' && p3[0] == '' && p4[0] == '' && p5[0] == ''){
            count = 1
        }else if(p1[0] != '' && p2[0] != '' && p3[0] == '' && p4[0] == '' && p5[0] == ''){
            count = 2
        }else if(p1[0] != '' && p2[0] != '' && p3[0] != '' && p4[0] == '' && p5[0] == ''){
            count = 3
        }else if(p1[0] != '' && p2[0] != '' && p3[0] != '' && p4[0] != '' && p5[0] == ''){
            count = 4
        }else if(p1[0] != '' && p2[0] != '' && p3[0] != '' && p4[0] != '' && p5[0] != ''){
            count = 5
        }else{
            alert('Revise as entradas e digite novamente')
            main()
        }
    }
    return count
} //nao permite chegada de procesos vazia.

function calculaAlgoritmo(p1,p2,p3,p4,p5,count){
    //getTipo de algoritmo
    let select = document.getElementById('tipoEscalonamento');
    let getTipoEscalonamento = select.options[select.selectedIndex].value;
    switch(getTipoEscalonamento){
        case 'fcfs':
            calculaFCFS(p1,p2,p3,p4,p5,count);
        break;
        case 'sjf':
            calculaSJF(p1,p2,p3,p4,p5,count);
        break;
        case 'prioridades':
            calculaPrioridades(p1,p2,p3,p4,p5,count);
        break;
        case 'rr':
            calculaRR(p1,p2,p3,p4,p5,count);
        break;
        default: alert('Deu ruim.')
    }   
}
//-----------------------------------------------------------
var inicialP = [0,0,0,0,0]; //inicial e final de cada processo
var finalP = [0,0,0,0,0];
var tmeP1 = 0; //tempo medio de cada processo. global.
var tmeP2 = 0;
var tmeP3 = 0;
var tmeP4 = 0;
var tmeP5 = 0;
var tmeTotal = 0; //tme total.
//------------------------------------------------------------
//CALCULA FCFS
function calculaFCFS(p1,p2,p3,p4,p5,count){

//----P1-----
    inicialP[0] = Number(p1[0]); // no FCFS o processo 1 tem iniciais = chegada e final = pico.  
    finalP[0] = Number(p1[1]);
    //----P2-----
    inicialP[1] = finalP[0] // Inicial de p2 = fim do processo anterior.
    finalP[1] = finalP[0] + Number(p2[1]); // Final de p2 = fim do processo anterior + Pico CPU.
    //----P3-----
    inicialP[2] = finalP[1];
    finalP[2] = finalP[1] + Number(p3[1]);
//----P4-----
    inicialP[3] = finalP[2];
    finalP[3] = finalP[2] + Number(p4[1]);
//----P5-----
    inicialP[4] = finalP[3];
    finalP[4] = finalP[3] + Number(p5[1]);
    tmeP1 = Number(inicialP[0]) - Number(p1[0]); // TME do p1 é quando ele entrou e nao saiu mais - (chegada + tempo que executou antes) 
    tmeP2 = Number(inicialP[1]) - Number(p2[0]);
    tmeP3 = Number(inicialP[2]) - Number(p3[0]);
    tmeP4 = Number(inicialP[3]) - Number(p4[0]);
    tmeP5 = Number(inicialP[4]) - Number(p5[0]);
 
    //Determina o total do TME de acordo com quantidade de processos e faz os calculos em tela.
    switch(count){
        case 1: tmeTotal = tmeP1;
            corpoContas.innerHTML = `<br>Cálculo de TME:<br><br>
            P1) Chegada: ${inicialP[0]}. Saída: ${finalP[0]}<br>
            TE.P1 = (${inicialP[0]} - (${p1[0]} + 0)) = ${tmeP1})<br><br>
            TME = (${inicialP[0]} - (${p1[0]} + 0)) / 1<br>
            TME = ${tmeTotal}`
        break;
        case 2: tmeTotal = ((tmeP1 + tmeP2)/ 2);
            corpoContas.innerHTML = `<br>Cálculo de TME:<br><br>
            P1) Chegada: ${inicialP[0]}. Saída: ${finalP[0]}<br>
            TE.P1 = (${inicialP[0]} - (${p1[0]} + 0)) = ${tmeP1}<br><br>
            P2) Chegada: ${inicialP[1]}. Saída: ${finalP[1]}<br>
            TE.P2 = (${inicialP[1]} - (${p2[0]} + 0)) = ${tmeP2}<br><br>
            TME = (${tmeP1} + ${tmeP2}) / 2<br>
            TME = ${tmeTotal}`
        break;
        case 3: tmeTotal = ((tmeP1 + tmeP2 + tmeP3) / 3)
            corpoContas.innerHTML = `<br>Cálculo de TME:<br><br>
            P1) Chegada: ${inicialP[0]}. Saída: ${finalP[0]}<br>
            TE.P1 = (${inicialP[0]} - (${p1[0]} + 0)) = ${tmeP1}<br><br>
            P2) Chegada: ${inicialP[1]}. Saída: ${finalP[1]}<br>
            TE.P2 = (${inicialP[1]} - (${p2[0]} + 0)) = ${tmeP2}<br><br>
            P3) Chegada: ${inicialP[2]}. Saída: ${finalP[2]}<br>
            TE.P3 = (${inicialP[2]} - (${p3[0]} + 0)) = ${tmeP3}<br><br>
            TME = (${tmeP1} + ${tmeP2} + ${tmeP3}) / 3<br>
            TME = ${tmeTotal}`
        break;
        case 4: tmeTotal = ((tmeP1 + tmeP2 + tmeP3 + tmeP4) / 4)
        corpoContas.innerHTML = `<br>Cálculo de TME:<br><br>
            P1) Chegada: ${inicialP[0]}. Saída: ${finalP[0]}<br>
            TE.P1 = (${inicialP[0]} - (${p1[0]} + 0)) = ${tmeP1}<br><br>
            P2) Chegada: ${inicialP[1]}. Saída: ${finalP[1]}<br>
            TE.P2 = (${inicialP[1]} - (${p2[0]} + 0)) = ${tmeP2}<br><br>
            P3) Chegada: ${inicialP[2]}. Saída: ${finalP[2]}<br>
            TE.P3 = (${inicialP[2]} - (${p3[0]} + 0)) = ${tmeP3}<br><br>
            P4) Chegada: ${inicialP[3]}. Saída: ${finalP[3]}<br>
            TE.P4 = (${inicialP[3]} - (${p4[0]} + 0)) = ${tmeP4}<br><br>
            TME = (${tmeP1} + ${tmeP2} + ${tmeP3} + ${tmeP4}) / 4<br>
            TME = ${tmeTotal}`
        break;
        case 5: tmeTotal = ((tmeP1 + tmeP2 + tmeP3 + tmeP4 + tmeP5) / 5)
            corpoContas.innerHTML = `<br>Cálculo de TME:<br>
            P1) Chegada: ${inicialP[0]}. Saída: ${finalP[0]}<br>
            TE.P1 = (${inicialP[0]} - (${p1[0]} + 0)) = ${tmeP1}<br><br>
            P2) Chegada: ${inicialP[1]}. Saída: ${finalP[1]}<br>
            TE.P2 = (${inicialP[1]} - (${p2[0]} + 0)) = ${tmeP2}<br><br>
            P3) Chegada: ${inicialP[2]}. Saída: ${finalP[2]}<br>
            TE.P3 = (${inicialP[2]} - (${p3[0]} + 0)) = ${tmeP3}<br><br>
            P4) Chegada: ${inicialP[3]}. Saída: ${finalP[3]}<br>
            TE.P4 = (${inicialP[3]} - (${p4[0]} + 0)) = ${tmeP4}<br><br>
            P5) Chegada: ${inicialP[4]}. Saída: ${finalP[4]}<br>
            TE.P5 = (${inicialP[4]} - (${p5[0]} + 0)) = ${tmeP5}<br><br>
            TME = (${tmeP1} + ${tmeP2} + ${tmeP3} + ${tmeP4} + ${tmeP5}) / 4<br>
            TME = ${tmeTotal}`
        break;
        default: alert('Erro no cálculo de TME Total')
    }
    geraLinhaTempo(inicialP, finalP);
}
function calculaSJF(p1,p2,p3,p4,p5,count){ 
    var getPreempcao = document.getElementsByName('preempcao')
    if(getPreempcao[1].checked){ //calculo sem preempcao
        ordenaSJF(p1,p2,p3,p4,p5);
    }

}
function ordenaSJF(p1,p2,p3,p4,p5){
    pPico = [Number(p1[1]), Number(p2[1]), Number(p3[1]), Number(p4[1]), Number(p5[1])];
    pPicoClone = [Number(p1[1]), Number(p2[1]), Number(p3[1]), Number(p4[1]), Number(p5[1])];
    inicialP[0] = p1[1];
    finalP[0] = p1[1];

    alert(pPico[0])
    alert(pPico[1])
    alert(pPico[2])
    alert(pPico[3])
    alert(pPicoClone[0])
    alert(pPicoClone[1])
    alert(pPicoClone[2])
    alert(pPicoClone[3])

    var count = 0;

    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(pPico[j] == Number(pPicoOrdenado[i])){
                inicialP[j] = finalP[count];
                finalP[j] = inicialP[j] + Number(pPico[j]);
                count = j;
            }
        }
    }
    alert(inicialP[0] + 'outra coisa')
    alert(final[0])
    alert(inicialP[1])
    alert(final[1])
    alert(inicialP[2])
    alert(final[2])
    alert(inicialP[3])
    alert(final[3])
    alert(inicialP[4])
    alert(final[4])
}
    /*Para gerar a linha do tempo vamos gerar imagens dos blocos e
    alterar o width de acordo com o tempo final de cada processo.
    o finalP[4] e o fim da linha. Faca a proporcao 
    inicioP[0] = 0px; finalP[4] = 1000px,
    Imagens dos processos serão todas de 1000px. Suponha:
    finalP[4] = 250, então 250 = 1000px.
    então finalP[n] = X px. Regra de tres e setAttribute.
     */
function geraLinhaTempo(incialP, finalP){
    let inicioLinha = Number(inicialP[0]);
    let fimLinha = Number(finalP[4]); //independente se ha 5 elementos ou nao.
    
    //Processo1
    var imgProporcaoNumber = ((Number(finalP[0]) * Number(1000)) / Number(fimLinha));
    var imgProporcaoString = imgProporcaoNumber.toString() + 'px';
    var img = document.createElement('img')
        img.setAttribute('src', 'images/processo1.png')
        img.setAttribute('width', imgProporcaoString)
        img.setAttribute('height', '20px')
        linhaTempo.appendChild(img)
        
    //Processo2
    var imgProporcaoNumber2 = (((Number(finalP[1]) - Number(finalP[0])) * Number(1000)) / Number(fimLinha));
    var imgProporcaoString2 = imgProporcaoNumber2.toString() + 'px';
    var img2 = img.cloneNode(true)
        img2.setAttribute('src', 'images/processo2.png')
        img2.setAttribute('width', imgProporcaoString2)
        img2.setAttribute('height', '20px')
        linhaTempo.appendChild(img2)

    //Processo3
    var imgProporcaoNumber3 = (((Number(finalP[2]) - Number(finalP[1])) * Number(1000)) / Number(fimLinha));
    var imgProporcaoString3 = imgProporcaoNumber3.toString() + 'px';
    var img3 = img2.cloneNode(true)
        img3.setAttribute('src', 'images/processo3.png')
        img3.setAttribute('width', imgProporcaoString3)
        img3.setAttribute('height', '20px')
        linhaTempo.appendChild(img3)

        //Processo4
    var imgProporcaoNumber4 = (((Number(finalP[3]) - Number(finalP[2])) * Number(1000)) / Number(fimLinha));
    var imgProporcaoString4 = imgProporcaoNumber4.toString() + 'px';
    var img4 = img3.cloneNode(true)
        img4.setAttribute('src', 'images/processo4.png')
        img4.setAttribute('width', imgProporcaoString4)
        img4.setAttribute('height', '20px')
        linhaTempo.appendChild(img4)
    //Processo5
    var imgProporcaoNumber5 = (((Number(finalP[4]) - Number(finalP[3])) * Number(1000)) / Number(fimLinha));
    var imgProporcaoString5 = imgProporcaoNumber5.toString() + 'px';
    var img5 = img4.cloneNode(true)
        img5.setAttribute('src', 'images/processo5.png')
        img5.setAttribute('width', imgProporcaoString5)
        img5.setAttribute('height', '20px')
        linhaTempo.appendChild(img5)
    
}
