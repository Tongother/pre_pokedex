const boxPokemons = document.querySelector("#cajaPadre");
let allPokemons = [], allPokemonsNoChanges = [], revertir=false;

//Función para obtener los nombres de cada pokemon de la POKEAPI
const getPokemons = async () =>{
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
    return await response.json();
}

//Función para hacer mayuscula la primera letra del nombre de los pokemons
const capitalizeFirstLetter = (letter)=> letter.charAt(0).toUpperCase() + letter.slice(1);

//Función para agregar los ceros al número del pokemon
const contadorPokemon = (pokemonContador) =>{

        if(pokemonContador<10)
            return "000" +  pokemonContador
        else if(pokemonContador>= 10 && pokemonContador<100)
            return "00" + pokemonContador
        else if(pokemonContador >= 100 && pokemonContador <1000)
            return "0" + pokemonContador
        else if(pokemonContador >=1000 && pokemonContador<10000) 
            return pokemonContador
        else
            return "No registrado"

}

//Función donde se agregan los encapsulados de los pokemones
let maximoDeCartasPokemons=0;
const renderizarPokemons = (response) =>  {
let cartasPokemons = [];
    //Algoritmo para evitar la saturación de datos

        for(let i=0; i< 20; i++){
            cartasPokemons[i] = response[i+maximoDeCartasPokemons];
            if(cartasPokemons[i] == undefined){
                cartasPokemons.pop();
                break;
            }
        }

    //

    cartasPokemons.forEach((pokemon) =>{
        const imgPokemon = document.createElement("img");
        const getcajaPadre = document.getElementById("cajaPadre");
        const cajaElementos = document.createElement("div");
        const cajaImagen = document.createElement("div");
        const cajaCaracteristicas = document.createElement("div");
        let pElement = [];

        const getImagesPokemons = async() =>{
            const response2 = await fetch(pokemon.url);
            return await response2.json();
        }

        getImagesPokemons().then((response2) =>{
            imgPokemon.src = response2.sprites.front_default;
            for(let i=0; i<4; i++){
                pElement[i] = document.createElement("p");
                pElement[i].classList.add("textoCaracteristicas");
            }

            pElement[0].innerHTML = "N. ° " +  contadorPokemon(response2.id);
            pElement[1].innerHTML = capitalizeFirstLetter(response2.types[0].type.name); capitalizeFirstLetter(pokemon.name);
            pElement[2].innerHTML = capitalizeFirstLetter(pokemon.name);
            pElement[3].innerHTML = "Attack: " + capitalizeFirstLetter(response2.abilities[0].ability.name + "<i class=fa-solid" + "fa-dagger iconoPelea></i>");

            if(response2.types[0].type.name == "grass"){
                pElement[1].classList.add("grass");
            }else if(response2.types[0].type.name == "fire"){
                pElement[1].classList.add("fire");
            }else if(response2.types[0].type.name == "water"){
                pElement[1].classList.add("water");
            }else if(response2.types[0].type.name == "bug"){
                pElement[1].classList.add("bug");
            }else if(response2.types[0].type.name == "normal"){
                pElement[1].classList.add("normal");
            }else if(response2.types[0].type.name == "electric"){
                pElement[1].classList.add("electric");
            }else if(response2.types[0].type.name == "ground"){
                pElement[1].classList.add("ground");
            }else if(response2.types[0].type.name == "fairy"){
                pElement[1].classList.add("fairy");
            }else if(response2.types[0].type.name == "poison"){
                pElement[1].classList.add("poison");
            }else if(response2.types[0].type.name == "fighting"){
                pElement[1].classList.add("fighting");
            }else if(response2.types[0].type.name == "psychic"){
                pElement[1].classList.add("psychic");
            }else if(response2.types[0].type.name == "rock"){
                pElement[1].classList.add("rock");
            }else if(response2.types[0].type.name == "ghost"){
                pElement[1].classList.add("ghost");
            }else if(response2.types[0].type.name == "dragon"){
                pElement[1].classList.add("dragon");
            }

            cajaElementos.classList.add("cajaElementos");
            cajaImagen.classList.add("cajaImagen");
            imgPokemon.classList.add("imgPokemones");
            cajaCaracteristicas.classList.add("cajaCaracteristicas")

            getcajaPadre.appendChild(cajaElementos);
            cajaElementos.appendChild(cajaImagen);
            cajaImagen.appendChild(imgPokemon);
            cajaElementos.appendChild(cajaCaracteristicas);
            cajaCaracteristicas.appendChild(pElement[0]);
            cajaCaracteristicas.appendChild(pElement[1]);
            cajaCaracteristicas.appendChild(pElement[2]);
            cajaCaracteristicas.appendChild(pElement[3]);

            const getDescriptionPokemon = async() =>{
                const resposne3 = await fetch(response2.species.url)
                return await resposne3.json();
            }

            //Evento para abrir el pop-up de información de cada pokemon
            cajaElementos.addEventListener("click", () =>{
                showPopup(response2, capitalizeFirstLetter(pokemon.name), getDescriptionPokemon);
            });
    });
    })
};

//Función para agregar al principio a todos los pokemones
getPokemons().then((response) =>{
    maximoDeCartasPokemons = 0;
    renderizarPokemons(response.results);
    allPokemons = response.results;
    allPokemonsNoChanges = response.results;
});

//Funciones de ordenamiento de los pokemons

const ordenarA_Z = () => {
    let pokemonesAZ = [], nombreButtom = document.getElementById("btn_advanced_search"), nombreLista = document.getElementsByClassName("dropdown-item")[2];
    nombreButtom.textContent= nombreLista.textContent;
    getPokemons().then((response) =>{
        boxPokemons.innerHTML = '';
        maximoDeCartasPokemons=0;
        pokemonesAZ = response.results.sort((a, b) => a.name.localeCompare(b.name));
        allPokemons = pokemonesAZ;
        renderizarPokemons(pokemonesAZ);
    });
}

const ordenarZ_A = () => {
    let pokemonesAZ = [], nombreButtom = document.getElementById("btn_advanced_search"), nombreLista = document.getElementsByClassName("dropdown-item")[3];
    nombreButtom.textContent= nombreLista.textContent;
    getPokemons().then((response) =>{
        boxPokemons.innerHTML = '';
        maximoDeCartasPokemons=0;
        pokemonesAZ = response.results.sort((a, b) => b.name.localeCompare(a.name));
        allPokemons = pokemonesAZ;
        renderizarPokemons(pokemonesAZ);
    });
}

const ordenarNumInferior = () => {
    let pokemonesAZ = [], nombreButtom = document.getElementById("btn_advanced_search"), nombreLista = document.getElementsByClassName("dropdown-item")[0];
    nombreButtom.textContent= nombreLista.textContent;
    getPokemons().then((response) =>{
        boxPokemons.innerHTML = '';
        maximoDeCartasPokemons=0;
        pokemonesAZ = response.results;
        allPokemons = pokemonesAZ;
        renderizarPokemons(pokemonesAZ);
    });
}

const ordenarNumSuperior = () => {
    let pokemonesAZ = [], nombreButtom = document.getElementById("btn_advanced_search"), nombreLista = document.getElementsByClassName("dropdown-item")[1];
    nombreButtom.textContent= nombreLista.textContent;
    getPokemons().then((response) =>{
        boxPokemons.innerHTML = '';
        maximoDeCartasPokemons=0;
        pokemonesAZ = response.results.reverse();
        allPokemons = pokemonesAZ;
        renderizarPokemons(pokemonesAZ);
    });
}



//Función para la busqueda de pokemons
const formulario = document.querySelector('#search')

const buscador = (search) => {
    let resultado, a_minusculas;
    boxPokemons.innerHTML = '';
    maximoDeCartasPokemons = 0;
    a_minusculas = search.toLowerCase();
    resultado = allPokemonsNoChanges.filter((pokemon_name) => pokemon_name.name.toLowerCase().includes(a_minusculas));
    allPokemons = resultado;
    renderizarPokemons(resultado);
};

formulario.addEventListener("submit", (event)=> {
  event.preventDefault();
  let valor_buscado = event.target["sPokemon"].value;
  if(valor_buscado == ""){
    //Do nothing
  }else{
    buscador(valor_buscado);
  }
});

//Función para la carga perezosa
    window.addEventListener("scroll", ()=>{
        const scrollY = window.scrollY;
        const windowLapHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const porcentajeScroll = (scrollY / (documentHeight - windowLapHeight)) *100 ;
        if(porcentajeScroll >= 90){
                maximoDeCartasPokemons +=20;
                renderizarPokemons(allPokemons);
        }
    });

    // Función para mostrar el pop-up
const showPopup = (elemento, name, funcion) => {
    const popup = document.getElementById('popup');
    const imgPoke = document.getElementById("imgPoke");
    const names= document.getElementById("namePokemon");
    const descripcion = document.getElementById("parrafoDescripcionPokemon");

    funcion().then((pokemonDescripcion) =>{
        try{
            descripcion.textContent = (pokemonDescripcion.flavor_text_entries.filter((lang) => lang.language.name.includes("es")))[3].flavor_text;
        }catch(error){
            try{
                descripcion.textContent = (pokemonDescripcion.flavor_text_entries.filter((lang) => lang.language.name.includes("es")))[0].flavor_text;
            }catch(error){
                descripcion.textContent = "No se encontro información sobre la descripción de este pokemon";
            }
        }
    })
    imgPoke.src = elemento.sprites.versions["generation-v"]["black-white"].animated.front_default;
    names.textContent = name;
    popup.style.display = 'block';
};

// Función para ocultar el pop-up
const hidePopup = () => {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
};

// Evento para mostrar el pop-up al cargar la página
const cajaElementosPokemones = document.getElementsByClassName("cajaElementos");


// Evento para ocultar el pop-up al hacer clic en el botón "Cerrar"
const closeBtn = document.getElementById('closeBtn');
closeBtn.addEventListener('click', () => {
    hidePopup();
});