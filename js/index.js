document.addEventListener('DOMContentLoaded', () => {
    let url = 'https://japceibal.github.io/japflix_api/movies-data.json';
    let info = [];
  
    function fetchData(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          info = data;
          console.log(info);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  
    fetchData(url);
  
    const inputBuscar = document.getElementById('inputBuscar');
    const btnBuscar = document.getElementById('btnBuscar');
    const lista = document.getElementById('lista');
  
    btnBuscar.addEventListener('click', () => {
      const searchTerm = inputBuscar.value.trim().toLowerCase();
      const peliculasFiltradas = info.filter(pelicula => {
        return (
          pelicula.title.toLowerCase().includes(searchTerm) ||
          pelicula.tagline.toLowerCase().includes(searchTerm) ||
          pelicula.genres.some(genre => typeof genre === 'string' && genre.toLowerCase().includes(searchTerm)) ||
          pelicula.overview.toLowerCase().includes(searchTerm)
        );
      });
  
      lista.innerHTML = '';
  
      peliculasFiltradas.forEach(pelicula => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `
          <div class="contenedorPelis" data-title="${pelicula.title}">
            <h5>${pelicula.title}</h5>
            <p>${pelicula.tagline}</p>
            <p>Rating: ${obtnRaiting(pelicula.vote_average)}</p>
          </div>
        `;
        lista.appendChild(listItem);
  
        listItem.addEventListener('click', () => {
          mostrarDetallePelicula(pelicula);
        });
      });
    });
  
    function obtnRaiting(promedio) {
      const estrellasMax = 5;
      const rating = (promedio / 10) * estrellasMax;
      const raitingPromedio = Math.round(rating);
  
      let estrellasHtml = '';
      for (let i = 0; i < estrellasMax; i++) {
        if (i < raitingPromedio) {
          estrellasHtml += '<span class="fa fa-star checked"></span>';
        } else {
          estrellasHtml += '<span class="fa fa-star"></span>';
        }
      }
      return estrellasHtml;
    }
  
    function mostrarDetallePelicula(pelicula) {
      const detalleTitulo = document.getElementById('detalleTitulo');
      const detalleOverview = document.getElementById('detalleOverview');
      const detalleGenres = document.getElementById('detalleGenres');
      const añoSalida = document.getElementById('añoSalida');
      const duracion = document.getElementById('duracion');
      const costeProduccion = document.getElementById('costeProduccion');
      const ganancias = document.getElementById('ganancias');
    
      detalleTitulo.textContent = pelicula.title;
      detalleOverview.textContent = pelicula.overview;
      añoSalida.textContent = `Año de salida: ${new Date(pelicula.release_date).getFullYear()}`; // Extraer el año
      duracion.textContent = `Duración: ${pelicula.runtime} minutos`;
      costeProduccion.textContent = `Coste de producción: $${pelicula.budget}`;
      ganancias.textContent = `Ganancias: $${pelicula.revenue}`;
    
      detalleGenres.innerHTML = '';
    
      
      pelicula.genres.forEach(genre => {
        const genreItem = document.createElement('li');
        genreItem.textContent = genre.name; 
        detalleGenres.appendChild(genreItem);
      });
    
      const offcanvas = new bootstrap.Offcanvas(document.getElementById('detallePelicula'));
      offcanvas.show();
    }
    
  });
  