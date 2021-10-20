// =========== VARIABLES Y GETS GLOBALES ===========
let runGame = document.getElementById("runGame")
let getStatus = document.getElementById("okStatusPkm")
let getScoreText = document.getElementById("scoreText")
let lista = false
lista = JSON.parse(localStorage.getItem("topTen"))
const pkmSelected = []
const topTen = []
let trainer = undefined
let pkmBackup = []
let ableToFight = true
let ableToPick = true
const loadersGifs = ["loading", "loading2", "loading3"]
const pkm = []
// =========== LLAMADA A LA API ===========
const getPkm = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    pkm.push(data)
};
for (let i = 1; i <= 898; i++) {
    getPkm(i)
}

// =========== OST ===========
const audio = new Audio("./media/audio/mainAudio.mp3");
audio.volume = 0.2
const audio2 = new Audio("./media/audio/battleMusic.mp3");
audio2.volume = 0.2
const audioAccept = new Audio("./media/audio/accept.mp3")
audioAccept.volume = 0.2
audioAccept.playbackRate = 1.5
const koAudio = new Audio("./media/audio/ko.mp3")
koAudio.volume = 0.2
const perdisteAudio = new Audio("./media/audio/perdiste.mp3")
const fightAudio = new Audio("./media/audio/fight.mp3")
fightAudio.volume = 0.2
const whosh = new Audio("./media/audio/whosh.mp3")
whosh.duration = 1
whosh.playbackRate = 2
// =========== AUDIO CON JQUERY ===========
const volumButton = $("#volButton");
const volumeInput = $("#volumeInput")
const musica = $("#musica");
volumButton.on('click', () => {
    volumButton.toggleClass('mute')
    if (audio.muted === false) {
        audio.muted = true;
        audio2.muted = true;
        audioAccept.muted = true;
        koAudio.muted = true;
        perdisteAudio.muted = true;
        whosh.muted = true;
        fightAudio.muted = true;
    } else {
        audio.muted = false;
        audio2.muted = false;
        audio.muted = false;
        audio2.muted = false;
        audioAccept.muted = false;
        koAudio.muted = false;
        perdisteAudio.muted = false;
        whosh.muted = false;
        fightAudio.muted = false;

    }
});
$('#volume').on('change', function () {
    let volValue = volumeInput.val() / 100
    perdisteAudio.volume = volValue * 5
    whosh.volume = volValue * 5
    koAudio.volume = volValue * 5
    audioAccept.volume = volValue
    audio.volume = volValue;
    audio2.volume = volValue;
    fightAudio.volume = volValue * 5
})
// =========== RENDER DEL TOP 10===========
const renderTopTen = () => {
    topTen.splice(0, topTen.length)
    
    
topTen.push(...lista)
    topTen.sort((a, b) => (b.score) - (a.score))
    if (topTen.length > 10) {
        topTen.splice(10, 1)
    }
    let topTenTable = document.getElementById("topTenTableBody")
    let order = 0

    topTen.forEach((topTen) => {
        let playersTopTen = document.createElement("tr")
        let att = document.createAttribute("id")
        order += 1
        att.value = `lugar${order}`
        playersTopTen.setAttributeNode(att)
        playersTopTen.innerHTML = `
                        <td>
                            ${topTen.name}
                        </td>
                        <td>
                            ${topTen.score}
                        </td>
            `
        topTenTable.appendChild(playersTopTen)
    })
}


if (lista !== null) {
    renderTopTen()
}
// =========== FUNCION PARA SETEAR EL SCORE ===========
const setScore = (name, totalScore) => {
    let limpiarTopTen = document.getElementById("topTenTable")
    limpiarTopTen.parentNode.removeChild(limpiarTopTen)
    let table = document.getElementById("table")
    let refreshTabla = document.createElement("table")
    let att = document.createAttribute("id")
    att.value = "topTenTable"
    refreshTabla.setAttributeNode(att)
    refreshTabla.innerHTML = `
                <tbody id="topTenTableBody">
                <tr>
                    <th>
                        Nombre
                    </th>
                    <th>
                        Score
                    </th>
                </tr>
            </tbody>
                
                `
    table.appendChild(refreshTabla)
    trainer = {
        name: name,
        score: totalScore,
    }
    topTen.push(trainer)
    topTen.sort((a, b) => (b.score) - (a.score))
    console.log(topTen)
    localStorage.clear()
    const guardarTopTen = (key, value) => {
        localStorage.setItem(key, value)
    }
    if (topTen.length > 10) {
        topTen.splice(10, 1)
    }
    guardarTopTen("topTen", JSON.stringify(topTen))

    renderTopTen()
}

// =========== MODAL DE REGLAS===========
const modalAbrir = document.getElementById('modal-abrir')
const modalCerrar = document.getElementById('modal-cerrar')
const modalContainer = document.getElementsByClassName('modal-container')[0]
const modal = document.getElementsByClassName('modal')[0]
modalAbrir.onclick = () => {
    modalContainer.classList.add('modal-active')
    audioAccept.play()
}
modalCerrar.onclick = () => {
    modalContainer.classList.remove('modal-active')
    audioAccept.play()
}
modal.onclick = (e) => {
    e.stopPropagation()
}
// =========== MODAL DE REDES===========
const modalRedesAbrir = document.getElementById('modalRedes-abrir')
const modalRedesCerrar = document.getElementById('modalRedes-cerrar')
const modalRedesContainer = document.getElementsByClassName('modalRedes-container')[0]
const modalRedes = document.getElementsByClassName('modalRedes')[0]
modalRedesAbrir.onclick = () => {
    modalRedesContainer.classList.add('modal-active')
    audioAccept.play()
}
modalRedesCerrar.onclick = () => {
    modalRedesContainer.classList.remove('modal-active')
    audioAccept.play()
}
modalRedes.onclick = (e) => {
    e.stopPropagation()
}

// =========== MODAL TOP TEN===========
const modalTopTenAbrir = document.getElementById('modalTopTen-abrir')
const modalTopTenCerrar = document.getElementById('modalTopTen-cerrar')
const modalTopTenContainer = document.getElementsByClassName('modalTopTen-container')[0]
const modalTopTen = document.getElementsByClassName('modalTopTen')[0]
modalTopTenAbrir.onclick = () => {
    modalTopTenContainer.classList.add('modal-active')
    audioAccept.play()
}
modalTopTenCerrar.onclick = () => {
    modalTopTenContainer.classList.remove('modal-active')
    audioAccept.play()
}
modalTopTen.onclick = (e) => {
    e.stopPropagation()
}
// =========== MODAL DE ALERTA===========
const modalAlertCerrar = document.getElementById('modalAlert-cerrar')
const modalAlertContainer = document.getElementById("alertModal")
const alertText = document.getElementById("alertText")


const selectionAlert = () => {
    alertText.innerHTML = `Debes elegir 6 Pokemon.`
    modalAlertContainer.classList.add('modal-active')
    audioAccept.play()
}

modalAlertCerrar.onclick = () => {
    audioAccept.play()
    modalAlertContainer.classList.remove('modal-active')
}


// =========== APP ===========
const runGameFunction = () => {

    audio.play();
    audio2.pause()
    // =========== SE ELIMINA QUIEN QUEDO FUERA DEL TOP10 ===========

    // =========== RESETEOS DE VARIABLES Y ARRAYS===========
    pkmSelected.splice(0, pkmSelected.length)
    pkmBackup.splice(0, pkmSelected.length)
    trainer = undefined
    const enemybattlinPkm = []
    let myBattlinPkm = undefined
    let characterGender = undefined
    let characterName = undefined
    let pokelist = false
    let mainGame = false
    let score = 0
    // =========== CREACION DE PERSONAJE ===========
    let presentation = document.getElementById("presentation")
    presentation.parentNode.removeChild(presentation)
    let monitor = document.getElementById("monitor")
    let characterCreation = document.createElement("div")
    let att = document.createAttribute("id")
    att.value = "characterCreation"
    characterCreation.setAttributeNode(att)
    characterCreation.innerHTML = `
    <div id="dataDiv">
                        <h2>Completa los siguientes datos</h2>
                        <div id="genderSelection">
                            <p>Elige al entrenador</p>
                            <div id="genderButtons">
                                <button id="femaleSelection"><img src="./media/img/characterSprites/genderFemale.png" alt=""></button>
                                <button id="maleSelection"><img src="./media/img/characterSprites/genderMale.png" alt=""></button>
                            </div>
                        </div>
                        <form id="playerNameInput">
                            <Label for="playerName">Selecciona Tu Nombre</Label>
                            <input type="text" name="playerName" id="playerName" placeholder="M i n i m o   3   l e t r a s . . .">
                            <input type="submit" value="Acept"  id="goToPkmSelection"></input>
                        </form>
                        
                    </div>
                    <div id="oakDiv">
                        <p id="oakText">
                            Bienvenido, Soy el Profesor Oak, 
                            antes de que comience el juego 
                            te voy a hacer algunas preguntas:
                        </p>
                        <figure>
                            <img src="./media/img/characterSprites/professorOak.png" alt="">
                        </figure>
                    </div>
    `
    monitor.appendChild(characterCreation)
    let genderFemale = document.getElementById("femaleSelection")
    let genderMale = document.getElementById("maleSelection")
    let goToPkmSelection = document.getElementById("goToPkmSelection")
    let playerNameInput = document.getElementById("playerNameInput")
    // =========== SELECCION DE ENTRENADOR ===========
    genderFemale.onclick = () => {
        characterGender = "female"
        genderFemale.classList.add('char-active')
        genderMale.classList.remove('char-active')
        whosh.play()
    }
    genderMale.onclick = () => {
        characterGender = "male"
        genderMale.classList.add('char-active')
        genderFemale.classList.remove('char-active')
        whosh.play()
    }
    // =========== PREVENCION DEL REFRESCO DE LA PAGINA ===========
    playerNameInput.onsubmit = (e) => e.preventDefault()
    // =========== EVENTO PARA PROCEDER A LA SELECCION DE POKEMONS ===========
    goToPkmSelection.onclick = (e) => {
        let oakText = document.getElementById("oakText")
        if (!characterGender && !characterName) {
            oakText.innerHTML = "Debes elegir un entrenador y un nombre"
        }
        if (characterGender) {
            e.preventDefault()
            // =========== SELECCION DE NOMBRE ===========
            characterName = document.getElementById("playerName").value
            // =========== INICIALIZA LA SELECCION DE POKEMONS ===========
            if (characterName.length > 2) {
                audioAccept.play()
                let characterCreation = document.getElementById("characterCreation")
                characterCreation.parentNode.removeChild(characterCreation)
                let monitor = document.getElementById("monitor")
                let createPkmSelection = document.createElement("div")
                let att = document.createAttribute("id")
                att.value = "pkmSelection"
                createPkmSelection.setAttributeNode(att)
                createPkmSelection.innerHTML = `
                                        <p>Select your Pokemon</p>
                                        <div id="pkmList">
                                        <form id="pokeSearch">
                                                <label for="fname">Buscador:</label><br>
                                                    <input type="text" id="pokeSearchInput" name="fname" placeholder="Nombre, Tipo,Nro Pokedex..."><br>
                                        </form>
                                            <ol id="pkmToChoose">
                                                
                                            </ol>
                                        </div>
                                        <div id="selectedBox">
                                            <p>Your Pokemon</p>
                                            <div id="selectedPkm">
                                            </div>
                                            <div id="deleteNext">
                                                <button class="actionButton" id="deletePkm">Delete Pokemons</button>
                                                <button class="actionButton" id="toGame">Next</button>
                                            </div>
                                        </div>
                                        <div>
                                        </div>
                                        `
                monitor.appendChild(createPkmSelection)



                const generatePkm = (array) => {
                    let pkmListSelection = document.getElementById("pkmToChoose")
                    pkmListSelection.innerHTML = ''
                    pkm.sort((a, b) => (a.id) - (b.id))
                    array.forEach((pokemons) => {
                        pkmListSelection = document.getElementById("pkmToChoose")
                        let btnPkm = document.createElement("li")
                        let att = document.createAttribute("id")
                        att.value = `pokemon${pokemons.id}`
                        btnPkm.setAttributeNode(att)
                        btnPkm.innerHTML = `<button class="selectionButton" id="selectionButton${pokemons.id}">
                <figure>
                    <img src="${pokemons.sprites.front_default}" alt="boton${pokemons.name}">
                    <figcaption>${pokemons.name} <div id="" class="${pokemons.types[0].type.name}Type">${pokemons.types[0].type.name}</div> <span>${pokemons.id}</span></figcaption>
                </figure>
            </button>`
                        pkmListSelection.appendChild(btnPkm)
                        let pokeSearch = document.getElementById("pokeSearch")
                        // =========== PREVENCION DEL REFRESCO DE LA PAGINA ===========
                        pokeSearch.onsubmit = (e) => e.preventDefault()
                        // =========== ELIMINAR TODOSPOKEMON ===========
                        btnPkm.onclick = () => {
                            const pkmEnLista = pkmSelected.find((pkm) => pkm.id === pokemons.id)
                            if (pkmSelected.length <= 5 && !pkmEnLista) {
                                whosh.play()
                                pkmSelected.push(pokemons)
                                addToList(pokemons.name, pokemons.types[0].type.name, pokemons.sprites.front_default, pokemons.id)
                                let addFilter = document.getElementById(`pokemon${pokemons.id}`)
                                addFilter.classList.add("koPokeball")
                            }
                            let eraseFromList = document.getElementById(`pkmChosen${pokemons.id}`)
                            eraseFromList.onclick = () => {
                                const deleteIndex = pkmSelected.findIndex((pkm) => pkm === pokemons)
                                pkmSelected.splice(pkmSelected[deleteIndex], 1)
                                eraseFromList.parentNode.removeChild(eraseFromList)
                                let removeFilter = document.getElementById(`pokemon${pokemons.id}`)
                                removeFilter.classList.remove("koPokeball")
                                whosh.play()
                            }
                        }
                        // =========== EVENTO PARA BORRAR TODOS LOS POKEMON DE LA LISTA ===========
                        let erasePkm = document.getElementById("deletePkm")
                        erasePkm.onclick = () => {
                            for (let i = 0; i < pkmSelected.length; i++) {
                                let removeFilter = document.getElementById(`pokemon${pkmSelected[i].id}`)
                                removeFilter.classList.remove("koPokeball")
                            }
                            pkmSelected.splice(0, pkmSelected.length)
                            let liItems = document.getElementById("pkmChosen")
                            liItems.parentNode.removeChild(liItems)

                            pokelist = false

                        }
                        // =========== BUSCADOR DE POKEMON ===========
                        let pokeSearchInput = document.getElementById("pokeSearchInput")
                        let buscarName = (search) => pkm.filter((pokemon) => pokemon.name.toLowerCase().includes(search))
                        let buscarType = (search) => pkm.filter((pokemon) => pokemon.types[0].type.name.toLowerCase().includes(search))
                        let buscarId = (search) => pkm.filter((pokemon) => pokemon.id == search)
                        pokeSearchInput.oninput = () => {
                            const search = pokeSearchInput.value.trim().toLowerCase()
                            const searchId = pokeSearchInput.value
                            const nameSearch = buscarName(search)
                            const typeSearch = buscarType(search)
                            const idSearch = buscarId(searchId)
                            const generalSearch = [...nameSearch, ...typeSearch, ...idSearch]
                            generatePkm(generalSearch)

                        }
                    });
                }
                generatePkm(pkm)
            } else if (characterName.length <= 2 && characterName.length >= 1 && characterGender) {
                oakText.innerHTML = "Ingresaste un nombre demasiado corto."
            } else if (characterName.length === 0 && characterGender) {
                oakText.innerHTML = "Debes ingresar un nombre."
            }
        }
    }
    // =========== FUNCION QUE AGREGA POKEMONS A LA LISTA ===========
    const addToList = function (name, type, spriteFront, id) {
        let selectedPkm = document.getElementById("selectedPkm")
        if (!pokelist) {
            pokelist = document.createElement("ol")
            let att = document.createAttribute("id")
            att.value = "pkmChosen"
            pokelist.setAttributeNode(att)
            selectedPkm.appendChild(pokelist)
            let pkmListSelected = document.getElementById("pkmChosen")
            let btnPkm = document.createElement("li")
            let attTwo = document.createAttribute("id")
            attTwo.value = `pkmChosen${id}`
            btnPkm.setAttributeNode(attTwo)
            btnPkm.innerHTML = `<button class="desSelectionButton">
        <figure>
            <img src="${spriteFront}" alt="boton${name}">
            <figcaption>${name} <div id="" class="${type}Type">${type}</div></figcaption>
        </figure>
    </button>`
            pkmListSelected.appendChild(btnPkm)
        } else {
            let pkmListSelected = document.getElementById("pkmChosen")
            let btnPkm = document.createElement("li")
            let att = document.createAttribute("id")
            att.value = `pkmChosen${id}`
            btnPkm.setAttributeNode(att)
            btnPkm.innerHTML = `<button class="desSelectionButton">
        <figure>
            <img src="${spriteFront}" alt="boton${name}">
            <figcaption>${name} <div id="" class="${type}Type">${type}</div></figcaption>
        </figure>
    </button>`
            pkmListSelected.appendChild(btnPkm)


        }

        let goToGame = document.getElementById("toGame")
        // =========== EVENTO DISPARADOR DEL JUEGO PRINCIPAL ===========
        goToGame.onclick = () => {
            if (pkmSelected && (pkmSelected.length === 6)) {

                pkmSelected.forEach(() => {
                    const status = {
                        status: 'ok'
                    };
                    const active = {
                        active: true
                    };
                    Object.assign(status, active);
                });

                // =========== LOADER ===========
                audioAccept.play()
                let selectionStage = document.getElementById("pkmSelection")
                selectionStage.parentNode.removeChild(selectionStage)
                let monitor = document.getElementById("monitor")
                let loading = document.createElement("div")
                let att = document.createAttribute("id")
                att.value = "loading"
                loading.setAttributeNode(att)
                const randomLoader = () => loadersGifs[Math.floor(Math.random() * loadersGifs.length)]
                let loaders = randomLoader()
                loading.innerHTML = `
                <img src="./media/img/${loaders}.gif" alt="">
                <p id="loadingText" class="animate__animated animate__flash animate__infinite">Loading...</p>
                `
                monitor.appendChild(loading)
                // =========== INICIALIZACION PANTALLA PRINCIPAL ===========
                setTimeout(() => {
                    for (let i = 0; i < pkmSelected.length; i++) {
                        pkmSelected[i].status = "ok"
                        pkmSelected[i].active = true
                    }
                    audio.pause()
                    audio.currentTime = 0
                    audio2.play();
                    loading.parentNode.removeChild(loading)
                    mainGame = document.createElement("div")
                    let att = document.createAttribute("id")
                    att.value = "game"
                    mainGame.setAttributeNode(att)
                    mainGame.innerHTML = `
            <div id="battleField">
                            <div id="myPokeballs">
                                
                            </div>
                            <div id="score">
                            <p>SCORE:    ${score} </p>
                            </div>
                            <div id="myPkm">
                            </div>
                            <div id="enemyPkm">
                            </div>
                        </div>
                        <div id="display">
                            <div id="actionButtons">
                                <button class="actionButton" id="pkmFight">Pelear</button>
                                <button class="actionButton" id="generateEnemy">Generar Enemigo</button>
                                <button class="actionButton" id="rulesButton">Reglas</button>
                                <button class="actionButton" id="exitBattle">Reiniciar</button>
                            </div>
                            <div id="pkmBox">
                            </div>
                        </div>
                        <div id="perdisteModal" class="modalPerdiste-container">
                        <div class="modalPerdiste">
                            <div id="perdisteTexto">
                            <div>
                            <p>PERDISTE!</p>
                            </div>
                            <div>
                            <p id="finalScore">Score</p>
                            </div>
                                
                            
                            </div>
                            <button id="modalPerdiste-cerrar">cerrar</button>
                        </div>
                    </div>
                    </div>`
                    monitor.appendChild(mainGame)
                    for (const pokemons of pkmSelected) {
                        let pkmBox = document.getElementById("pkmBox")
                        let btnPkm = document.createElement("button")
                        let att = document.createAttribute("id")
                        att.value = `myPkm${pokemons.id}`
                        btnPkm.setAttributeNode(att)
                        let statusPkms = `statusPkm${pokemons.id}`
                        btnPkm.innerHTML = `<figure>
                                            <img src="${pokemons.sprites.front_default}" alt="">
                                            <figcaption>${pokemons.name} <div id="" class="${pokemons.types[0].type.name}Type">${pokemons.types[0].type.name}</div><div id="${statusPkms}" class="okStatusPkm">Status</div> </figcaption>
                                        </figure>`
                        pkmBox.appendChild(btnPkm)
                        let myPokeballs = document.getElementById("myPokeballs")
                        let pokeball = document.createElement("img")
                        let attBallID = document.createAttribute("id")
                        attBallID.value = `pokeball${pokemons.id}`
                        pokeball.setAttributeNode(attBallID)
                        let attBallSrc = document.createAttribute("src")
                        attBallSrc.value = `./media/img/pokeball.png`
                        pokeball.setAttributeNode(attBallSrc)
                        myPokeballs.appendChild(pokeball)
                        let myChoose = document.getElementById(`myPkm${pokemons.id}`)
                        // =========== SELECCION DE MIS POKEMON ===========
                        myChoose.onclick = () => {
                            if (ableToPick) {
                                if (pokemons.active === true) {
                                    whosh.play()
                                    ableToFight = true
                                    myPkm.innerHTML = `
                                    <button id="myPkmCard"><figure>
                                    <img src="${pokemons.sprites.front_default}"  id="myPkmCardSprite"alt="">
                                    <figcaption>${pokemons.name} <div id="" class="${pokemons.types[0].type.name}Type">${pokemons.types[0].type.name}</div><div id="cardStatusPkm${pokemons.id}" class="${pokemons.status}StatusPkm">Status</div> </figcaption>
                                </figure></button>
                                    <figure id="myChosenPkm">
                        <img id="animation" class="myPkmSprite" src="${pokemons.sprites.back_default}" alt="">
                        </figure>`
                                    myBattlinPkm = pkmSelected.findIndex((pkm) => pkm === pokemons);
                                }
                            }

                        }
                        let pkmFight = document.getElementById("pkmFight")
                        pkmBackup = [...pkmSelected]


                        let rulesButton = document.getElementById("rulesButton")
                        rulesButton.onclick = () => {
                            audioAccept.play()
                            modalContainer.classList.add('modal-active')
                        }
                        generateEnemyF()
                        let generateEnemy = document.getElementById("generateEnemy")
                        // =========== GENERO ENEMIGO AL AZAR ===========
                        generateEnemy.onclick = () => {
                            audioAccept.play()
                            generateEnemyF()
                        }
                        let exitBattle = document.getElementById("exitBattle");
                        // =========== RESET DEL JUEGO===========
                        exitBattle.onclick = () => {
                            audioAccept.play()
                            resetGameConfirmationFunction()
                        }


                        // =========== VALIDACIONES DE LAS PELEAS ===========
                        // =========== PELEA GANADA ===========
                        let succesBattle = () => {
                            enemybattlinPkm.splice(0, enemybattlinPkm.length)
                            let liItems = document.getElementById("myEnemyPkm")
                            liItems.parentNode.removeChild(liItems)
                            let getScore = document.getElementById("score")
                            if (enemybattlinPkm.length === 0) {
                                score += 1
                                getScore.innerHTML = `<p>SCORE:    ${score} </p>`
                                koAudio.play()
                                dataLayer.push({
                                    'win': 1,
                                })
                            }
                            ableToPick = true
                        }
                        // =========== CAMBIOS DE STATUS ===========
                        let koMyPkmByInjuries = () => {
                            if (pkmSelected[myBattlinPkm].status === "ok") {
                                pkmSelected[myBattlinPkm].status = "injured"
                                let statusChange = document.getElementById(`statusPkm${pkmSelected[myBattlinPkm].id}`)
                                let cardStatusChange = document.getElementById(`cardStatusPkm${pkmSelected[myBattlinPkm].id}`)
                                statusChange.classList.remove("okStatusPkm")
                                statusChange.classList.add("injuredStatusPkm")
                                cardStatusChange.classList.remove("okStatusPkm")
                                cardStatusChange.classList.add("injuredStatusPkm")
                                let animation = document.getElementById("animation")
                                animateCSS('animation', 'flash')
                            } else {
                                pkmSelected[myBattlinPkm].active = false
                                pkmSelected[myBattlinPkm].status = "ko"
                                let koPokeball = document.getElementById(`pokeball${pkmSelected[myBattlinPkm].id}`)
                                koPokeball.classList.add("koPokeball")
                                let statusChange = document.getElementById(`statusPkm${pkmSelected[myBattlinPkm].id}`)
                                statusChange.classList.remove("injuredStatusPkm")
                                statusChange.classList.add("koStatusPkm")
                                let myChosedPkm = document.getElementById("myChosenPkm")
                                myChosedPkm.parentNode.removeChild(myChosedPkm)
                                ableToFight = false
                                pkmSelected.splice(myBattlinPkm, 1)
                                ableToPick = true
                                koAudio.play()
                            }
                        }
                        let koEnemyPkmByInjuries = () => {
                            if (enemybattlinPkm[0].status === "ok") {
                                enemybattlinPkm[0].status = "injured"
                                let statusEnemyColor = document.getElementById("statusEnemy")
                                statusEnemyColor.classList.remove('okStatusPkm')
                                statusEnemyColor.classList.add('injuredStatusPkm')
                                animateCSS('enemyPkmSprite', 'flash')
                            } else {
                                enemybattlinPkm.splice(0, enemybattlinPkm.length)
                                let liItems = document.getElementById("myEnemyPkm")
                                liItems.parentNode.removeChild(liItems)
                                let getScore = document.getElementById("score")
                                score += 1
                                getScore.innerHTML = `<p>SCORE:    ${score} </p>`
                                koAudio.play()
                                dataLayer.push({
                                    'win': 1,
                                })
                                ableToPick = true
                            }
                        }
                        // =========== PELEA PERDIDA ===========
                        let failedBattle = () => {
                            pkmSelected[myBattlinPkm].status = "ko"
                            pkmSelected[myBattlinPkm].active = false
                            let myChosedPkm = document.getElementById("myChosenPkm")
                            myChosedPkm.parentNode.removeChild(myChosedPkm)
                            let statusChange = document.getElementById(`statusPkm${pkmSelected[myBattlinPkm].id}`)
                            statusChange.classList.add("koStatusPkm")
                            statusChange.classList.remove("okStatusPkm")
                            let koPokeball = document.getElementById(`pokeball${pkmSelected[myBattlinPkm].id}`)
                            koPokeball.classList.add("koPokeball")
                            pkmSelected.splice(myBattlinPkm, 1)
                            ableToFight = false
                            koAudio.play()
                            ableToPick = true
                        }
                        // =========== ALERTA DE PERDISTE===========
                        const modalPerdisteCerrar = document.getElementById('modalPerdiste-cerrar')
                        const modalPerdisteContainer = document.getElementById("perdisteModal")



                        modalPerdisteCerrar.onclick = () => {

                            modalPerdisteContainer.classList.remove('modal-active')
                        }
                        // =========== FUNCION DE CHECKEO ===========
                        const perdiste = () => {
                            audio2.pause()
                            perdisteAudio.play()
                            const modalAlert = document.querySelector(".modalAlert")
                            modalAlertContainer.classList.add('modal-active')
                            modalAlert.innerHTML = `
                        <p id="alertText">
                        Tu Score: ${score}
                        <br>
                        Desea reiniciar el juego?
                        </p>
                        <div id="divButt">
                        <button id="resetGame" class="actionButton">Si</button>
                        <button id="modalReset-cerrar" class="actionButton">No</button>
                        <div>
                        `
                            let resetGame = document.getElementById("resetGame")
                            let modalResetCerrar = document.getElementById("modalReset-cerrar")
                            modalResetCerrar.onclick = () => {

                                modalAlertContainer.classList.remove('modal-active')
                            }

                            resetGame.onclick = () => {
                                audio.play();
                                audio2.pause()
                                audio2.currentTime = 0
                                let mainGame = document.getElementById("game")
                                mainGame.parentNode.removeChild(mainGame)
                                let monitor = document.getElementById("monitor")
                                let presentation = document.createElement("div")
                                let att = document.createAttribute("id")
                                att.value = "presentation"
                                presentation.setAttributeNode(att)
                                presentation.innerHTML = `
                                <button id="runGame">Start Game</button>
                                `
                                monitor.appendChild(presentation)
                                modalAlertContainer.classList.remove('modal-active')
                                resetGameFunction()
                            }
                        }
                        // =========== CHECKEO DEL TEAM ===========
                        let teamCheck = () => {
                            if (pkmSelected.length === 0) {

                                perdiste()
                                setScore(characterName, score)
                            }
                        }
                        // =========== TRIGGER DE LA PELEA ===========
                        pkmFight.onclick = () => {
                            audioAccept.play()
                            ableToPick = false
                            setTimeout(() => {
                                if (ableToFight) {

                                    let animation = document.getElementById("animation")
                                    const animationBattle = () => {
                                        animation.classList.add('animation')
                                        fightAudio.play()
                                        setTimeout(() => {
                                            animation.classList.remove('animation')
                                        }, 0300);
                                    }
                                    animationBattle()
                                    setTimeout(() => {
                                        if (pkmSelected[myBattlinPkm].types[0].type.name === "fairy") {
                                            if ((enemybattlinPkm[0].types[0].type.name === "dragon") || (enemybattlinPkm[0].types[0].type.name === "fighting") || (enemybattlinPkm[0].types[0].type.name === "dark")) {
                                                succesBattle()
                                            } else if ((enemybattlinPkm[0].types[0].type.name === "poison") || (enemybattlinPkm[0].types[0].type.name === "steel")) {
                                                failedBattle()
                                            } else {
                                                koMyPkmByInjuries()
                                                koEnemyPkmByInjuries()
                                            }
                                        } else if (pkmSelected[myBattlinPkm].types[0].type.name === "dragon") {
                                            if ((enemybattlinPkm[0].types[0].type.name === "dragon")) {
                                                succesBattle()
                                                pkmSelected[myBattlinPkm].status === "ko"
                                                pkmSelected[myBattlinPkm].active = false
                                                let myChosedPkm = document.getElementById("myChosenPkm")
                                                myChosedPkm.parentNode.removeChild(myChosedPkm)
                                            } else if ((enemybattlinPkm[0].types[0].type.name === "ice") || (enemybattlinPkm[0].types[0].type.name === "fairy")) {
                                                failedBattle()
                                            } else {
                                                koMyPkmByInjuries()
                                                koEnemyPkmByInjuries()
                                            }
                                        } else if (pkmSelected[myBattlinPkm].types[0].type.name === "ghost") {
                                            if ((enemybattlinPkm[0].types[0].type.name === "ghost")) {
                                                succesBattle()
                                                pkmSelected[myBattlinPkm].status === "ko"
                                                pkmSelected[myBattlinPkm].active = false
                                                let myChosedPkm = document.getElementById("myChosenPkm")
                                                myChosedPkm.parentNode.removeChild(myChosedPkm)
                                            } else if ((enemybattlinPkm[0].types[0].type.name === "psychic")) {
                                                succesBattle()
                                            } else if ((enemybattlinPkm[0].types[0].type.name === "dark")) {
                                                failedBattle()
                                            } else if ((enemybattlinPkm[0].types[0].type.name === "normal")) {} else {
                                                koMyPkmByInjuries()
                                                koEnemyPkmByInjuries()
                                            }
                                        } else if (pkmSelected[myBattlinPkm].types[0].type.name === "rock") {
                                            if ((enemybattlinPkm[0].types[0].type.name === "fire") || (enemybattlinPkm[0].types[0].type.name === "ice") || (enemybattlinPkm[0].types[0].type.name === "flying") || (enemybattlinPkm[0].types[0].type.name === "bug")) {
                                                succesBattle()
                                            } else if ((enemybattlinPkm[0].types[0].type.name === "water") || (enemybattlinPkm[0].types[0].type.name === "grass") || (enemybattlinPkm[0].types[0].type.name === "fighting") || (enemybattlinPkm[0].types[0].type.name === "ground") || (enemybattlinPkm[0].types[0].type.name === "steel")) {
                                                failedBattle()
                                            } else {
                                                koMyPkmByInjuries()
                                                koEnemyPkmByInjuries()
                                            }
                                        } else if (pkmSelected[myBattlinPkm].types[0].type.name === "bug") {
                                            if ((enemybattlinPkm[0].types[0].type.name === "grass") || (enemybattlinPkm[0].types[0].type.name === "psychic") || (enemybattlinPkm[0].types[0].type.name === "dark")) {
                                                succesBattle()
                                            } else if ((enemybattlinPkm[0].types[0].type.name === "fire") || (enemybattlinPkm[0].types[0].type.name === "flying") || (enemybattlinPkm[0].types[0].type.name === "rock")) {
                                                pkmSelected[myBattlinPkm].status = "ko"
                                                pkmSelected[myBattlinPkm].active = false
                                                let myChosedPkm = document.getElementById("myChosenPkm")
                                                myChosedPkm.parentNode.removeChild(myChosedPkm)
                                            } else {
                                                koMyPkmByInjuries()
                                                koEnemyPkmByInjuries()
                                            }
                                        } else if (pkmSelected[myBattlinPkm].types[0].type.name === "psychic") {
                                            if ((enemybattlinPkm[0].types[0].type.name === "fighting") || (enemybattlinPkm[0].types[0].type.name === "poison")) {
                                                succesBattle()
                                            } else if ((enemybattlinPkm[0].types[0].type.name === "bug") || (enemybattlinPkm[0].types[0].type.name === "ghost") || (enemybattlinPkm[0].types[0].type.name === "dark")) {
                                                failedBattle()

                                            } else {
                                                koMyPkmByInjuries()
                                                koEnemyPkmByInjuries()
                                            }
                                        } else if (pkmSelected[myBattlinPkm].types[0].type.name === "flying") {
                                            if ((enemybattlinPkm[0].types[0].type.name === "grass") || (enemybattlinPkm[0].types[0].type.name === "fighting") || (enemybattlinPkm[0].types[0].type.name === "bug")) {
                                                succesBattle()
                                            } else if ((enemybattlinPkm[0].types[0].type.name === "electric") || (enemybattlinPkm[0].types[0].type.name === "ice") || (enemybattlinPkm[0].types[0].type.name === "rock")) {
                                                failedBattle()

                                            } else {
                                                koMyPkmByInjuries()
                                                koEnemyPkmByInjuries()
                                            }
                                        } else if (pkmSelected[myBattlinPkm].types[0].type.name === "ground") {
                                            if ((enemybattlinPkm[0].types[0].type.name === "fire") || (enemybattlinPkm[0].types[0].type.name === "electric") || (enemybattlinPkm[0].types[0].type.name === "poison") || (enemybattlinPkm[0].types[0].type.name === "rock") || (enemybattlinPkm[0].types[0].type.name === "steel")) {
                                                succesBattle()
                                            } else if ((enemybattlinPkm[0].types[0].type.name === "water") || (enemybattlinPkm[0].types[0].type.name === "grass") || (enemybattlinPkm[0].types[0].type.name === "ice")) {
                                                failedBattle()

                                            } else {
                                                koMyPkmByInjuries()
                                                koEnemyPkmByInjuries()
                                            }
                                        } else if (pkmSelected[myBattlinPkm].types[0].type.name === "poison") {
                                            if ((enemybattlinPkm[0].types[0].type.name === "grass") || (enemybattlinPkm[0].types[0].type.name === "fairy")) {
                                                succesBattle()
                                            } else if ((enemybattlinPkm[0].types[0].type.name === "ground") || (enemybattlinPkm[0].types[0].type.name === "psychic")) {
                                                failedBattle()

                                            } else {
                                                koMyPkmByInjuries()
                                                koEnemyPkmByInjuries()
                                            }
                                        } else if (pkmSelected[myBattlinPkm].types[0].type.name === "fighting") {
                                            if ((enemybattlinPkm[0].types[0].type.name === "normal") || (enemybattlinPkm[0].types[0].type.name === "ice") || (enemybattlinPkm[0].types[0].type.name === "rock") || (enemybattlinPkm[0].types[0].type.name === "dark") || (enemybattlinPkm[0].types[0].type.name === "steel")) {
                                                succesBattle()
                                            } else if ((enemybattlinPkm[0].types[0].type.name === "flying") || (enemybattlinPkm[0].types[0].type.name === "psychic") || (enemybattlinPkm[0].types[0].type.name === "fairy")) {
                                                failedBattle()

                                            } else {
                                                koMyPkmByInjuries()
                                                koEnemyPkmByInjuries()
                                            }
                                        } else if (pkmSelected[myBattlinPkm].types[0].type.name === "ice") {
                                            if ((enemybattlinPkm[0].types[0].type.name === "grass") || (enemybattlinPkm[0].types[0].type.name === "ground") || (enemybattlinPkm[0].types[0].type.name === "flying") || (enemybattlinPkm[0].types[0].type.name === "dragon")) {
                                                succesBattle()
                                            } else if ((enemybattlinPkm[0].types[0].type.name === "fire") || (enemybattlinPkm[0].types[0].type.name === "fighting") || (enemybattlinPkm[0].types[0].type.name === "rock") || (enemybattlinPkm[0].types[0].type.name === "steel")) {
                                                failedBattle()

                                            } else {
                                                koMyPkmByInjuries()
                                                koEnemyPkmByInjuries()
                                            }
                                        } else if (pkmSelected[myBattlinPkm].types[0].type.name === "grass") {
                                            if ((enemybattlinPkm[0].types[0].type.name === "water") || (enemybattlinPkm[0].types[0].type.name === "ground") || (enemybattlinPkm[0].types[0].type.name === "rock")) {
                                                succesBattle()
                                            } else if ((enemybattlinPkm[0].types[0].type.name === "fire") || (enemybattlinPkm[0].types[0].type.name === "ice") || (enemybattlinPkm[0].types[0].type.name === "poison") || (enemybattlinPkm[0].types[0].type.name === "flying") || (enemybattlinPkm[0].types[0].type.name === "bug")) {
                                                failedBattle()

                                            } else {
                                                koMyPkmByInjuries()
                                                koEnemyPkmByInjuries()
                                            }
                                        } else if (pkmSelected[myBattlinPkm].types[0].type.name === "electric") {
                                            if ((enemybattlinPkm[0].types[0].type.name === "water") || (enemybattlinPkm[0].types[0].type.name === "flying")) {
                                                succesBattle()
                                            } else if ((enemybattlinPkm[0].types[0].type.name === "ground")) {
                                                failedBattle()

                                            } else {
                                                koMyPkmByInjuries()
                                                koEnemyPkmByInjuries()
                                            }
                                        } else if (pkmSelected[myBattlinPkm].types[0].type.name === "water") {
                                            if ((enemybattlinPkm[0].types[0].type.name === "fire") || (enemybattlinPkm[0].types[0].type.name === "ground") || (enemybattlinPkm[0].types[0].type.name === "rock")) {
                                                succesBattle()
                                            } else if ((enemybattlinPkm[0].types[0].type.name === "electric") || (enemybattlinPkm[0].types[0].type.name === "grass")) {
                                                failedBattle()

                                            } else {
                                                koMyPkmByInjuries()
                                                koEnemyPkmByInjuries()
                                            }
                                        } else if (pkmSelected[myBattlinPkm].types[0].type.name === "fire") {
                                            if ((enemybattlinPkm[0].types[0].type.name === "grass") || (enemybattlinPkm[0].types[0].type.name === "ice") || (enemybattlinPkm[0].types[0].type.name === "bug") || (enemybattlinPkm[0].types[0].type.name === "steel")) {
                                                succesBattle()
                                            } else if ((enemybattlinPkm[0].types[0].type.name === "water") || (enemybattlinPkm[0].types[0].type.name === "rock") || (enemybattlinPkm[0].types[0].type.name === "ground")) {
                                                failedBattle()

                                            } else {
                                                koMyPkmByInjuries()
                                                koEnemyPkmByInjuries()
                                            }
                                        } else if (pkmSelected[myBattlinPkm].types[0].type.name === "normal") {
                                            if ((enemybattlinPkm[0].types[0].type.name === "fighting")) {
                                                failedBattle()
                                            } else if ((enemybattlinPkm[0].types[0].type.name === "ghost")) {} else {
                                                koMyPkmByInjuries()
                                                koEnemyPkmByInjuries()
                                            }
                                        } else if (pkmSelected[myBattlinPkm].types[0].type.name === "steel") {
                                            if ((enemybattlinPkm[0].types[0].type.name === "ice") || (enemybattlinPkm[0].types[0].type.name === "rock") || (enemybattlinPkm[0].types[0].type.name === "fairy")) {
                                                succesBattle()
                                            } else if ((enemybattlinPkm[0].types[0].type.name === "fire") || (enemybattlinPkm[0].types[0].type.name === "fighting") || (enemybattlinPkm[0].types[0].type.name === "ground")) {
                                                failedBattle()

                                            } else {
                                                koMyPkmByInjuries()
                                                koEnemyPkmByInjuries()
                                            }
                                        } else if (pkmSelected[myBattlinPkm].types[0].type.name === "dark") {
                                            if ((enemybattlinPkm[0].types[0].type.name === "psychic") || (enemybattlinPkm[0].types[0].type.name === "ghost")) {
                                                succesBattle()
                                            } else if ((enemybattlinPkm[0].types[0].type.name === "fighting") || (enemybattlinPkm[0].types[0].type.name === "bug") || (enemybattlinPkm[0].types[0].type.name === "fairy")) {
                                                failedBattle()

                                            } else {
                                                koMyPkmByInjuries()
                                                koEnemyPkmByInjuries()
                                            }
                                        }
                                        teamCheck()


                                    }, 0750);




                                }
                            }, 1000);

                        }
                    }

                }, 3000);
            } else if (pkmSelected && (pkmSelected.length < 6)) {
                selectionAlert()
            }

            function generateEnemyF() {
                if (enemybattlinPkm.length === 0) {
                    let chosenEnemy = pkm[Math.round(Math.random() * pkm.length)]
                    enemybattlinPkm.push(chosenEnemy)
                    enemybattlinPkm[0].status = "ok"
                    let enemyPkm = document.getElementById("enemyPkm")
                    enemyPkm.innerHTML = `<figure id="myEnemyPkm"><img src="${enemybattlinPkm[0].sprites.front_default}" id="enemyPkmSprite" alt=""></figure>
                        <button id="enemyPkmCard"><figure>
                                        <img src="${enemybattlinPkm[0].sprites.front_default}"  id="enemyPkmCardSprite"alt="">
                                        <figcaption>${enemybattlinPkm[0].name} <div id="" class="${enemybattlinPkm[0].types[0].type.name}Type">${enemybattlinPkm[0].types[0].type.name}</div><div id="statusEnemy" class="${enemybattlinPkm[0].status}StatusPkm">Status</div> </figcaption>
                                    </figure></button>
                        
                        `
                }
            }

        }
    }
}
// =========== INICIALIZA EL JUEGO===========
// =========== AVANZA A LA SELECCION DE PERSONAJE ===========
runGame.onclick = () => {
    runGameFunction()
    audioAccept.play()
}
// =========== RESET DEL JUEGO ===========
const resetGameConfirmationFunction = () => {

    const modalAlert = document.querySelector(".modalAlert")
    modalAlertContainer.classList.add('modal-active')
    modalAlert.innerHTML = `
        <p id="alertText">
        Estas seguro que deseas reiniciar el juego?
        No se guardara el progreso realizado
        hasta terminar el juego.
        
        </p>
        <div id="divButt">
        <button id="resetGame" class="actionButton">Si</button>
        <button id="modalReset-cerrar" class="actionButton">No</button>
        <div>
        `
    let resetGame = document.getElementById("resetGame")
    let modalResetCerrar = document.getElementById("modalReset-cerrar")
    modalResetCerrar.onclick = () => {

        modalAlertContainer.classList.remove('modal-active')
    }

    resetGame.onclick = () => {

        audio2.pause()
        audio2.currentTime = 0
        let mainGame = document.getElementById("game")
        mainGame.parentNode.removeChild(mainGame)
        let monitor = document.getElementById("monitor")
        let presentation = document.createElement("div")
        let att = document.createAttribute("id")
        att.value = "presentation"
        presentation.setAttributeNode(att)
        presentation.innerHTML = `
                <button id="runGame">Start Game</button>
                `
        monitor.appendChild(presentation)
        modalAlertContainer.classList.remove('modal-active')
        resetGameFunction()

    }

}


// =========== FUNCION RESETEO ===========
const resetGameFunction = () => {
    let resetGame = document.getElementById("runGame")
    resetGame.onclick = () => {

        runGameFunction()
        audioAccept.play()
    }
}
// =========== FUNCION ANIMACION ===========
const animateCSS = (element, animation, prefix = 'animate__') =>
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const node = document.getElementById(element);

        node.classList.add(`${prefix}animated`, animationName);

        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, {
            once: true
        });
        ableToPick = true

    });