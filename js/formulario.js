window.onload = () => {
    let query = new URLSearchParams(location.search)
    let idPelicula = query.get('id');
    let urlGetMovie="http://localhost:3031/api/movies/" + idPelicula
    //Levantamos los inputs del formulario
    let tituloPelicula = document.querySelector("#title");
    let ratingPelicula = document.querySelector("#rating");
    let awardsPelicula = document.querySelector("#awards");
    let fechaPelicula = document.querySelector("#release_date");
    let duracionPelicula = document.querySelector("#length");

    let genreId = ""

    fetch(urlGetMovie)
    .then((rta)=>{
        return rta.json();
    })
    .then(function(pelicula) {
        console.log(pelicula.data);
        let data = pelicula.data
        //Precompletamos titulo en formulario        
            tituloPelicula.setAttribute("value", data.title);
        //Precompletamos rating en formulario
            ratingPelicula.setAttribute("value", data.rating);
        //Precompletamos premios en formulario
            awardsPelicula.setAttribute("value", data.awards);
        //Precompletamos fecha en formulario
            //Primero capturamos la fecha en el formato necesario trabajando el dato de fecha como string
                let nuevaFecha = data.release_date.slice(0,data.release_date.indexOf("T"))
            //completamos fecha en formulario
                fechaPelicula.setAttribute("value", nuevaFecha);
        //Precompletamos duración en formulario
            duracionPelicula.setAttribute("value", data.length);
        //Completamos el genero para usar luego en la edición de la película
        genreId = data.genre_id

    })
    .catch(function(error){
        console.log(error);
    })

    //Edicion de películas
    //url de la API
    let urlPutMovie="http://localhost:3031/api/movies/update/" + idPelicula
    //capturamos el boton de editar
    let botonEditar = document.querySelector('.botonModificar');
    botonEditar.addEventListener('click',function(e){
        e.preventDefault();
        //Creamos la película que vamos a editar
        let peliculaEditada = {
            title:tituloPelicula.value,
            rating:ratingPelicula.value,
            awards:awardsPelicula.value,
            release_date:fechaPelicula.value,
            length:duracionPelicula.value,
            genre_id: genreId
        }

        console.log(peliculaEditada)
        //pisa esa peli con los datos que te paso
        fetch(urlPutMovie + '?_method=PUT',{
            method:'POST',
            body: JSON.stringify(peliculaEditada),
            headers:{
                "content-type":"application/json"
                //acá podría vaijar la clave de la API
            }
        })
        .then(function(rta){
            return rta.json()
        })
        .then(function(datos){
            console.log(datos.data);
        })
        .catch(function(error){
            console.log(error);
        })
    })
}