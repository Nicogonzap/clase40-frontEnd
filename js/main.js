window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  
  

  // Aqui debemos agregar nuestro fetch
  let url="http://localhost:3031/api/movies/"
  fetch(url)
  .then((rta)=>{
    return rta.json();
  })
  .then(function(peliculas) {
    let data = peliculas.data;
    //console.log(data);
    data.forEach((movie) => {
      /*const link = document.createElement("a");
      link.setAttribute("href", "http://localhost:3031/api/movies/" + movie.id);
      link.setAttribute("class","card");*/
      const card = document.createElement("a");
      card.setAttribute("class", "card");
      /* Busca todas las películas a través de la ruta get, necesitamos que muestre el formulario
      card.setAttribute("href", "http://localhost:3031/api/movies/" + movie.id);*/
      card.setAttribute("href", "./formulario.html?id=" + movie.id);
      

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      const estrellita = document.createElement("input");
      estrellita.setAttribute("type", "button");
      estrellita.setAttribute("value", "Agregar a Favoritos");
      estrellita.setAttribute("class", "botonFav");

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
      card.appendChild(estrellita);


    });
    totalButtons = document.querySelectorAll('.botonFav');
    totalButtons.forEach(button => {
      button.addEventListener('click',function(e){
        e.preventDefault();
        let listaFavoritos = []
        if (localStorage.getItem('favoritos')) {
          //Incluyo en listaFavoritos lo que ya tenemos en storage
          listaFavoritos = JSON.parse(localStorage.getItem('favoritos'))
          
        }
        
        //Valdiar si la pelicula que queremos agregar, ya está en favoritos, solo incluir si no existe (if negado)
        if(!listaFavoritos.includes(button.parentNode.children[0].innerText)){
          //ahora agrego el favorito que acabamos de presionar con el evento que estamos escuchando
          listaFavoritos.push(button.parentNode.children[0].innerText);
          localStorage.setItem("favoritos",JSON.stringify(listaFavoritos))
        }

      })
    })
  })
  .catch(function(error) {
    console.log(error);
  })



};
