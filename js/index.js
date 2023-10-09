let informacion;
fetch(`https://japceibal.github.io/japflix_api/movies-data.json`)
.then (response => response.json())
.then (data => {
    console.log(data);
    informacion = data;     
})
.catch (error => {
    console.log("Error al cargar el recurso "+ error);
})

document.addEventListener('DOMContentLoaded', ()=>{
    let button = document.getElementById('btnBuscar');
    let contenedor = document.getElementById('lista');
    
    button.addEventListener('click', ()=>{
        let search = document.getElementById('inputBuscar').value;
        console.log(search);
        informacion.forEach(dato=>{
            if(dato.title.includes(search)||dato.tagline.includes(search)||dato.overview.includes(search)||dato.genres.includes(search)){
                contenedor.innerHTML += `
                <li>
                    <div>
                    <h3>${dato.title}</h3>
                    <p>${dato.tagline}</p>
                    </div>
                </li>
                `;
            }
        })

    })
    
})