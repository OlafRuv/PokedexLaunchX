const fetchPokemon = () => {
    const pokeIdInput = document.getElementById("pokeId");
    let pokeId = pokeIdInput.value;
    pokeId = pokeId.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            setWhosThat();
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            deleteTypeImg();
            deleteMoves();
            getPokeName(data);
            getPokeStats(data);
            getpokeImage(data);
            getPokeType(data);
            getMovements(data);
        }
    });
}

function getPokeName (data){
    let name = data.forms[0].name;
    let id = data.id;
    let printable = `${name} - ${id}`;
    console.log(printable);
    document.getElementById("pokeName").innerHTML = printable;
}

function getpokeImage (data) {
    let pokeImg = data.sprites.front_default;
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = pokeImg;
    pokePhoto.style = "width: 400px";
}

const getPokeStats = (data) =>  {
    let stats = data.stats;
    let hp = stats[0].base_stat;
    let attack = stats[1].base_stat;
    let defense = stats[2].base_stat;
    let sp_attack = stats[3].base_stat;
    let sp_defense = stats[4].base_stat;
    let speed = stats[5].base_stat;
    
    move(hp,"hp");
    move(attack,"attack");
    move(defense,"defense");
    move(sp_attack,"special-attack");
    move(sp_defense,"special-defense");
    move(speed,"speed");
}

function move(newWidth,idElement) {
    var elem = document.getElementById(idElement);   
    var width = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= newWidth) {
        clearInterval(id);
      } else {
        width++; 
        elem.style.width = (width/2) + '%'; 
        elem.innerHTML = width * 1  + '%';
      }
    }
}

function getPokeType (data){
    let type = data.types;
    //  console.log(type.length);
    type.forEach(element => {
        // console.log(element.type.name);
        // console.log(`./assets/pk_types/${element.type.name}.svg`);
        show_type(`./assets/pk_types/${element.type.name}.svg`,
            100, 100, `${element.type.name} image`);
    });
}

function show_type(src, width, height, alt) {
    var img = document.createElement("img");
    img.id = "poke-type"
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;

    document.getElementById('types-container').appendChild(img);
}

function deleteTypeImg(){
    let imgToDelete = document.getElementById("poke-type");
    while(imgToDelete!=null){
        document.getElementById('types-container').removeChild(imgToDelete);
        imgToDelete = document.getElementById("poke-type");
    }
}

function getMovements (data){
    let i = 0;
    let moves = data.moves;
    while (i < 10) {
        console.log(moves[i].move.name);
        let rand = Math.floor((Math.random() * 10) + 12);
        console.log(rand);
        showMove(moves[i].move.name,rand);
        i++;
    }
}

function showMove(move,size){
    var p = document.createElement("p");
    p.id = "poke-move";
    p.style.fontsize = size;
    p.innerText = move;
    p.className = "pixel-font2";
    document.getElementById('moves-container').appendChild(p);
}

function deleteMoves(){
    let movetoDelete = document.getElementById("poke-move");
    while(movetoDelete!=null){
        document.getElementById('moves-container').removeChild(movetoDelete);
        movetoDelete = document.getElementById("poke-move");
    }
}

function setWhosThat () {
    let pokeImg = "./assets/WhosThat.webp";
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = pokeImg;
    pokePhoto.style = "width: 400px";

    move(1,"hp");
    move(1,"attack");
    move(1,"defense");
    move(1,"special-attack");
    move(1,"special-defense");
    move(1,"speed");
    deleteTypeImg();
    deleteMoves();
}

$(document).keyup(function(event) {
    if ($("#pokeId").is(":focus") && event.key == "Enter") {
        fetchPokemon();
    }
});