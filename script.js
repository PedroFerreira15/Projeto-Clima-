document.querySelector('.busca').addEventListener('submit',async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if (input!== '')  { clearinfo() ;showwarning('carregando...') 

    let url= `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=6efdca1f72696b549f9a7800dc6feb56&units=metric&lang=pt_br` //Encode para colocar como faz para ir para uma url
    
               //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
      
     let Results = await fetch (url)//await = faz a requisição e espera o resultado --> guardando ou armazenando o /  fetch faz requisições https e traz dados da url que vc especifica como argumento
     let json=await Results.json() //para conseguir lê o objeto javascript
          if(json.cod===200){showinfo({
              name:json.name,
              country:json.sys.country,
              temp:json.main.temp,
              tempicon:json.weather[0].icon,
              windspeed:json.wind.speed,
              windangle: json.wind.deg,
        });}
       else{clearinfo()                  //veio antes do showwaning
            showwarning('Não encontramos esta localização');
            }
     } else {clearinfo()} //Limpa Tudo
});


function showinfo(oi){       //para exibir as informações na tela
      showwarning ('<b class=olá>Deu certo</b> '); //substitui por nada
      document.querySelector('.titulo').innerHTML=`${oi.name} ${oi.country}`;
      document.querySelector ('.tempInfo').innerHTML= `${oi.temp} <sup>ºC</sup>`;
      document.querySelector ('.ventoInfo').innerHTML= `${oi.windspeed} <span>km/h </span>` ;
      document.querySelector ('.temp img').setAttribute('src' , `http://openweathermap.org/img/wn/${oi.tempicon}@2x.png`);
      document.querySelector ('.ventoPonto').style.transform = `rotate(${oi.windangle-90} deg)`;
      document.querySelector('.resultado').style.display='block';}
   
function clearinfo(){showwarning('');document.querySelector('.resultado').style.display='none';}

function showwarning (mensagem) {document.querySelector('.aviso').innerHTML=mensagem}