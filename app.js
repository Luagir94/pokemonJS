const pkm = [
    {
        id: 01,
        name: "Bulbasaur",
        spriteFront: "./media/img/sprites/front/001.png",
        spriteBack: "./media/img/sprites/back/001.png",
        type: "grass"
    },
    {
        id: 02,
        name: "Yvysaur",
        spriteFront: "./media/img/sprites/front/002.png",
        spriteBack: "./media/img/sprites/back/002.png",
        type: "grass"
    },
    {
        id: 03,
        name: "Venasaur",
        spriteFront: "./media/img/sprites/front/003.png",
        spriteBack: "./media/img/sprites/back/003.png",
        type: "grass"
    },
    {
        id: 004,
        name: "Charmander",
        spriteFront: "./media/img/sprites/front/004.png",
        spriteBack: "./media/img/sprites/back/004.png",
        type: "fire"
    },
    {
        id: 05,
        name: "Charmeleon",
        spriteFront: "./media/img/sprites/front/005.png",
        spriteBack: "./media/img/sprites/back/005.png",
        type: "fire"
    },
    {
        id: 06,
        name: "Charizard",
        spriteFront: "./media/img/sprites/front/006.png",
        spriteBack: "./media/img/sprites/back/006.png",
        type: "fire"
    },
    {
        id: 07,
        name: "Squirtle",
        spriteFront: "./media/img/sprites/front/007.png",
        spriteBack: "./media/img/sprites/back/007.png",
        type: "water"
    },
    {
        id: 08,
        name: "Warturtle",
        spriteFront: "./media/img/sprites/front/008.png",
        spriteBack: "./media/img/sprites/back/008.png",
        type: "water"
    },
    {
        id: 09,
        name: "Blastoise",
        spriteFront: "./media/img/sprites/front/009.png",
        spriteBack: "./media/img/sprites/back/009.png",
        type: "water"
    },
    {
        id: 10,
        name: "Caterpie",
        spriteFront: "./media/img/sprites/front/010.png",
        spriteBack: "./media/img/sprites/back/010.png",
        type: "bug"
    },
    {
        id: 11,
        name: "Metapod",
        spriteFront: "./media/img/sprites/front/011.png",
        spriteBack: "./media/img/sprites/back/011.png",
        type: "bug"
    },
    {
        id: 12,
        name: "Butterfree",
        spriteFront: "./media/img/sprites/front/012.png",
        spriteBack: "./media/img/sprites/back/012.png",
        type: "bug"
    },
    {
        id: 13,
        name: "Weedle",
        spriteFront: "./media/img/sprites/front/013.png",
        spriteBack: "./media/img/sprites/back/013.png",
        type: "bug"
    },
    {
        id: 14,
        name: "Kakuna",
        spriteFront: "./media/img/sprites/front/014.png",
        spriteBack: "./media/img/sprites/back/014.png",
        type: "bug"
    },
    {
        id: 15,
        name: "Beedrill",
        spriteFront: "./media/img/sprites/front/015.png",
        spriteBack: "./media/img/sprites/back/015.png",
        type: "bug"
    },
    {
        id: 16,
        name: "Pidgey",
        spriteFront: "./media/img/sprites/front/016.png",
        spriteBack: "./media/img/sprites/back/016.png",
        type: "normal"
    },
    {
        id: 17,
        name: "Pidgeotto",
        spriteFront: "./media/img/sprites/front/017.png",
        spriteBack: "./media/img/sprites/back/017.png",
        type: "normal"
    },
    {
        id: 18,
        name: "Pidgeot",
        spriteFront: "./media/img/sprites/front/018.png",
        spriteBack: "./media/img/sprites/back/018.png",
        type: "normal"
    },
    {
        id: 19,
        name: "Ratatta",
        spriteFront: "./media/img/sprites/front/019.png",
        spriteBack: "./media/img/sprites/back/019.png",
        type: "normal"
    },
    {
        id: 20,
        name: "Raticate",
        spriteFront: "./media/img/sprites/front/020.png",
        spriteBack: "./media/img/sprites/back/020.png",
        type: "normal"
    }, {
        id: 21,
        name: "Spearow",
        spriteFront: "./media/img/sprites/front/021.png",
        spriteBack: "./media/img/sprites/back/021.png",
        type: "normal"
    },
    {
        id: 22,
        name: "Fearow",
        spriteFront: "./media/img/sprites/front/022.png",
        spriteBack: "./media/img/sprites/back/022.png",
        type: "normal"
    },
    {
        id: 23,
        name: "Ekans",
        spriteFront: "./media/img/sprites/front/023.png",
        spriteBack: "./media/img/sprites/back/023.png",
        type: "poison"
    },
    {
        id: 24,
        name: "Arbok",
        spriteFront: "./media/img/sprites/front/024.png",
        spriteBack: "./media/img/sprites/back/024.png",
        type: "poison"
    },
    {
        id: 25,
        name: "Pikachu",
        spriteFront: "./media/img/sprites/front/025.png",
        spriteBack: "./media/img/sprites/back/025.png",
        type: "electric"
    },
    {
        id: 26,
        name: "Raichu",
        spriteFront: "./media/img/sprites/front/026.png",
        spriteBack: "./media/img/sprites/back/026.png",
        type: "electric"
    },
    {
        id: 27,
        name: "Sandshrew",
        spriteFront: "./media/img/sprites/front/027.png",
        spriteBack: "./media/img/sprites/back/027.png",
        type: "ground"
    },
    {
        id: 28,
        name: "Sandslash",
        spriteFront: "./media/img/sprites/front/028.png",
        spriteBack: "./media/img/sprites/back/028.png",
        type: "ground"
    },
    {
        id: 29,
        name: "Nidoran♀",
        spriteFront: "./media/img/sprites/front/029.png",
        spriteBack: "./media/img/sprites/back/029.png",
        type: "poison"
    },
    {
        id: 30,
        name: "Nidorina",
        spriteFront: "./media/img/sprites/front/030.png",
        spriteBack: "./media/img/sprites/back/030.png",
        type: "poison"
    },
    {
        id: 31,
        name: "Nidoqueen",
        spriteFront: "./media/img/sprites/front/031.png",
        spriteBack: "./media/img/sprites/back/031.png",
        type: "poison"
    },
    {
        id: 32,
        name: "Nidoran♂",
        spriteFront: "./media/img/sprites/front/032.png",
        spriteBack: "./media/img/sprites/back/032.png",
        type: "poison"
    },
    {
        id: 33,
        name: "Nidorino",
        spriteFront: "./media/img/sprites/front/033.png",
        spriteBack: "./media/img/sprites/back/033.png",
        type: "poison"
    },
    {
        id: 34,
        name: "Nidoking",
        spriteFront: "./media/img/sprites/front/034.png",
        spriteBack: "./media/img/sprites/back/034.png",
        type: "poison"
    },
    {
        id: 35,
        name: "Clefairy",
        spriteFront: "./media/img/sprites/front/035.png",
        spriteBack: "./media/img/sprites/back/035.png",
        type: "fairy"
    },
    {
        id: 36,
        name: "Clefable",
        spriteFront: "./media/img/sprites/front/036.png",
        spriteBack: "./media/img/sprites/back/036.png",
        type: "fairy"
    },
    {
        id: 37,
        name: "Vulpix",
        spriteFront: "./media/img/sprites/front/037.png",
        spriteBack: "./media/img/sprites/back/037.png",
        type: "fire"
    },
    {
        id: 38,
        name: "Ninetales",
        spriteFront: "./media/img/sprites/front/038.png",
        spriteBack: "./media/img/sprites/back/038.png",
        type: "fire"
    },
    {
        id: 39,
        name: "Jigglypuff",
        spriteFront: "./media/img/sprites/front/039.png",
        spriteBack: "./media/img/sprites/back/039.png",
        type: "normal"
    },
    {
        id: 40,
        name: "Wigglytuff",
        spriteFront: "./media/img/sprites/front/040.png",
        spriteBack: "./media/img/sprites/back/040.png",
        type: "normal"
    },
    {
        id: 41,
        name: "Zubat",
        spriteFront: "./media/img/sprites/front/041.png",
        spriteBack: "./media/img/sprites/back/041.png",
        type: "poison"
    },
    {
        id: 42,
        name: "Golbat",
        spriteFront: "./media/img/sprites/front/042.png",
        spriteBack: "./media/img/sprites/back/042.png",
        type: "poison"
    },
    {
        id: 43,
        name: "Odish",
        spriteFront: "./media/img/sprites/front/043.png",
        spriteBack: "./media/img/sprites/back/043.png",
        type: "grass"
    },
    {
        id: 44,
        name: "Gloom",
        spriteFront: "./media/img/sprites/front/044.png",
        spriteBack: "./media/img/sprites/back/044.png",
        type: "grass"
    },
    {
        id: 45,
        name: "Vileplume",
        spriteFront: "./media/img/sprites/front/045.png",
        spriteBack: "./media/img/sprites/back/045.png",
        type: "grass"
    },
    {
        id: 46,
        name: "Paras",
        spriteFront: "./media/img/sprites/front/046.png",
        spriteBack: "./media/img/sprites/back/046.png",
        type: "bug"
    },
    {
        id: 47,
        name: "Parasect",
        spriteFront: "./media/img/sprites/front/047.png",
        spriteBack: "./media/img/sprites/back/047.png",
        type: "bug"
    },
    {
        id: 48,
        name: "Venonat",
        spriteFront: "./media/img/sprites/front/048.png",
        spriteBack: "./media/img/sprites/back/048.png",
        type: "bug"
    },
    {
        id: 49,
        name: "Venomoth",
        spriteFront: "./media/img/sprites/front/049.png",
        spriteBack: "./media/img/sprites/back/049.png",
        type: "bug"
    },
    {
        id: 50,
        name: "Diglett",
        spriteFront: "./media/img/sprites/front/050.png",
        spriteBack: "./media/img/sprites/back/050.png",
        type: "ground"
    },
    {
        id: 51,
        name: "Dugtrio",
        spriteFront: "./media/img/sprites/front/051.png",
        spriteBack: "./media/img/sprites/back/051.png",
        type: "ground"
    },
    {
        id: 52,
        name: "Meowth",
        spriteFront: "./media/img/sprites/front/052.png",
        spriteBack: "./media/img/sprites/back/052.png",
        type: "normal"
    },
    {
        id: 53,
        name: "Persian",
        spriteFront: "./media/img/sprites/front/053.png",
        spriteBack: "./media/img/sprites/back/053.png",
        type: "normal"
    },
    {
        id: 54,
        name: "Psyduck",
        spriteFront: "./media/img/sprites/front/054.png",
        spriteBack: "./media/img/sprites/back/054.png",
        type: "water"
    },
    {
        id: 55,
        name: "Golduck",
        spriteFront: "./media/img/sprites/front/055.png",
        spriteBack: "./media/img/sprites/back/055.png",
        type: "water"
    },


]

let pkmListSelection = document.getElementById("pkmToChoose")
for (const pokemons of pkm) {
    let btnPkm = document.createElement("li")

    btnPkm.innerHTML = `<button class="selectionButton">
    <figure>
        <img src="${pokemons.spriteFront}" alt="boton${pokemons.name}">
        <figcaption>${pokemons.name} <div id="" class="${pokemons.type}Type">${pokemons.type}</div></figcaption>
    </figure>
</button>`
    pkmListSelection.appendChild(btnPkm)

}

const pkmSelected = [pkm[6-1], pkm[34-1], pkm[15-1], pkm[25-1], pkm[55-1],pkm[44-1] ]

let pkmListSelected = document.getElementById("pkmChosen")
for (const pokemons of pkmSelected) {
    let btnPkm = document.createElement("li")

    btnPkm.innerHTML = `<button class="selectionButton">
    <figure>
        <img src="${pokemons.spriteFront}" alt="boton${pokemons.name}">
        <figcaption>${pokemons.name} <div id="" class="${pokemons.type}Type">${pokemons.type}</div></figcaption>
    </figure>
</button>`
pkmListSelected.appendChild(btnPkm)

}