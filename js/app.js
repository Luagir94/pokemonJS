// =========== VARIABLES Y GETS GLOBALES ===========
let runGame = document.getElementById("runGame")
let getStatus = document.getElementById("okStatusPkm")
let getScoreText = document.getElementById("scoreText")
const pkmSelected = []
const topTen = []
let trainer = undefined
let pkmBackup = []
let ableToFight = true
// =========== OST ===========
const audio = new Audio("./media/audio/mainAudio.mp3" );
audio.volume =0.2
const audio2 = new Audio("./media/audio/battleMusic.mp3" );
audio2.volume = 0.2
const audioAccept = new Audio("./media/audio/accept.mp3")
audioAccept.volume = 0.2
audioAccept.playbackRate = 1.5
const koAudio = new Audio("./media/audio/ko.mp3")
koAudio.volume =0.5
const perdisteAudio = new Audio("./media/audio/perdiste.mp3")
const whosh = new Audio("./media/audio/whosh.mp3")
whosh.duration = 1
whosh.playbackRate =2
// =========== AUDIO CON JQUERY GIT===========
const volumButton = $("#volButton");
const volumeInput =$("#volumeInput")
const musica = $("#musica");
volumButton.on('click', ()=>{
    volumButton.toggleClass('mute')
    if (audio.muted === false || audio2.muted === false) {    
        audio.muted = true;
        audio2.muted = true;
 }

 else {
    audio.muted = false;
    audio2.muted = false;
 }
});
$('#volume').on('change', function() {
    let volValue = volumeInput.val()/100
    perdisteAudio.volume = volValue*5
    whosh.volume = volValue*5
    audioAccept.volume = volValue
    audio.volume= volValue;
    audio2.volume= volValue;})
// =========== FUNCION PARA SETEAR EL SCORE ===========
const setScore = (name, team, totalScore) => {
    trainer = {
        name: name,
        team: team,
        score: totalScore,
    }
    localStorage.clear()
    topTen.push(trainer)
    topTen.sort((a, b) => (a.score) - (b.score))
    console.log(topTen)
    const guardarTopTen = (key, value) => {
        localStorage.setItem(key, value)
    }
    guardarTopTen("Top Ten", JSON.stringify(topTen))
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
    if (topTen.length >= 11) {
        topTen.splice(10, 1)
    }
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
                    array.forEach((pokemons) => {
                        pkmListSelection = document.getElementById("pkmToChoose")
                        let btnPkm = document.createElement("li")
                        let att = document.createAttribute("id")
                        att.value = `pokemon${pokemons.id}`
                        btnPkm.setAttributeNode(att)
                        btnPkm.innerHTML = `<button class="selectionButton" id="selectionButton${pokemons.id}">
                <figure>
                    <img src="${pokemons.spriteFront}" alt="boton${pokemons.name}">
                    <figcaption>${pokemons.name} <div id="" class="${pokemons.type}Type">${pokemons.type}</div> <span>${pokemons.id}</span></figcaption>
                </figure>
            </button>`
                        pkmListSelection.appendChild(btnPkm)
                        let pokeSearch = document.getElementById("pokeSearch")
                        // =========== PREVENCION DEL REFRESCO DE LA PAGINA ===========
                        pokeSearch.onsubmit = (e) => e.preventDefault()
                        btnPkm.onclick = () => {
                            const pkmEnLista = pkmSelected.find((pkm) => pkm.id === pokemons.id)
                            if (pkmSelected.length <= 5 && !pkmEnLista) {
                                whosh.play()
                                pkmSelected.push(pokemons)

                                addToList(pokemons.name, pokemons.type, pokemons.spriteFront)
                            }
                        }
                        // =========== BUSCADOR DE POKEMON ===========
                        let pokeSearchInput = document.getElementById("pokeSearchInput")
                        let buscarName = (search) => pkm.filter((pokemon) => pokemon.name.toLowerCase().includes(search))
                        let buscarType = (search) => pkm.filter((pokemon) => pokemon.type.toLowerCase().includes(search))
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
    const addToList = function (name, type, spriteFront) {
        let selectedPkm = document.getElementById("selectedPkm")
        if (!pokelist) {
            pokelist = document.createElement("ol")
            let att = document.createAttribute("id")
            att.value = "pkmChosen"
            pokelist.setAttributeNode(att)
            selectedPkm.appendChild(pokelist)
            let pkmListSelected = document.getElementById("pkmChosen")
            let btnPkm = document.createElement("li")
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
            btnPkm.innerHTML = `<button class="desSelectionButton">
        <figure>
            <img src="${spriteFront}" alt="boton${name}">
            <figcaption>${name} <div id="" class="${type}Type">${type}</div></figcaption>
        </figure>
    </button>`
            pkmListSelected.appendChild(btnPkm)
        }
        // =========== EVENTO PARA BORRAR LOS POKEMON DE LA LISTA ===========
        let erasePkm = document.getElementById("deletePkm")
        erasePkm.onclick = () => {
            pkmSelected.splice(0, pkmSelected.length)
            let liItems = document.getElementById("pkmChosen")
            liItems.parentNode.removeChild(liItems)
            pokelist = false
        }
        let goToGame = document.getElementById("toGame")
        // =========== EVENTO DISPARADOR DEL JUEGO PRINCIPAL ===========
        goToGame.onclick = () => {
            if (pkmSelected && (pkmSelected.length === 6)) {
                for (let i = 0; i < pkmSelected.length; i++) {
                    pkmSelected[i].status = "ok"
                    pkmSelected[i].active = true
                }
                audio.pause()
                audio.currentTime = 0
                audio2.play();
                let selectionStage = document.getElementById("pkmSelection")
                selectionStage.parentNode.removeChild(selectionStage)
                let monitor = document.getElementById("monitor")
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
            } else if (pkmSelected && (pkmSelected.length < 6)) {
                selectionAlert()
            }
            let rulesButton = document.getElementById("rulesButton")
            rulesButton.onclick = () => {
                modalContainer.classList.add('modal-active')
            }
            generateEnemyF()
            let generateEnemy = document.getElementById("generateEnemy")
            // =========== GENERO ENEMIGO AL AZAR ===========
            generateEnemy.onclick = () => {
                generateEnemyF()
            }
            let exitBattle = document.getElementById("exitBattle");
            // =========== RESET DEL JUEGO===========
            exitBattle.onclick = () => {

                resetGameConfirmationFunction()
            }


            function generateEnemyF(){
                if (enemybattlinPkm.length === 0) {
                    let chosenEnemy = pkm[Math.floor(Math.random() * pkm.length)]
                    enemybattlinPkm.push(chosenEnemy)
                    enemybattlinPkm[0].status = "ok"
                    let enemyPkm = document.getElementById("enemyPkm")
                    enemyPkm.innerHTML = `<figure id="myEnemyPkm"><img src="${enemybattlinPkm[0].spriteFront}" id="enemyPkmSprite" alt=""></figure>
                        <button id="enemyPkmCard"><figure>
                                        <img src="${enemybattlinPkm[0].spriteFront}"  id="enemyPkmCardSprite"alt="">
                                        <figcaption>${enemybattlinPkm[0].name} <div id="" class="${enemybattlinPkm[0].type}Type">${enemybattlinPkm[0].type}</div><div id="statusEnemy" class="${enemybattlinPkm[0].status}StatusPkm">Status</div> </figcaption>
                                    </figure></button>
                        
                        `
                }
            }
            for (const pokemons of pkmSelected) {
                let pkmBox = document.getElementById("pkmBox")
                let btnPkm = document.createElement("button")
                let att = document.createAttribute("id")
                att.value = `myPkm${pokemons.id}`
                btnPkm.setAttributeNode(att)
                let statusPkms = `statusPkm${pokemons.id}`
                btnPkm.innerHTML = `<figure>
                                        <img src="${pokemons.spriteFront}" alt="">
                                        <figcaption>${pokemons.name} <div id="" class="${pokemons.type}Type">${pokemons.type}</div><div id="${statusPkms}" class="okStatusPkm">Status</div> </figcaption>
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
                    if (pokemons.active === true) {
                        whosh.play()
                        ableToFight = true
                        myPkm.innerHTML = `<figure id="myChosenPkm">
                <img src="${pokemons.spriteBack}" alt="">
                </figure>`
                        myBattlinPkm = pkmSelected.findIndex((pkm) => pkm === pokemons);
                    }
                }
                let pkmFight = document.getElementById("pkmFight")
                pkmBackup = [...pkmSelected]
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
                    }
                }
                // =========== CAMBIOS DE STATUS ===========
                let koMyPkmByInjuries = () => {
                    if (pkmSelected[myBattlinPkm].status === "ok") {
                        pkmSelected[myBattlinPkm].status = "injured"
                        let statusChange = document.getElementById(`statusPkm${pkmSelected[myBattlinPkm].id}`)
                        statusChange.classList.remove("okStatusPkm")
                        statusChange.classList.add("injuredStatusPkm")
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
                        koAudio.play()
                    }
                }
                let koEnemyPkmByInjuries = () => {
                    if (enemybattlinPkm[0].status === "ok") {
                        enemybattlinPkm[0].status = "injured"
                        let statusEnemyColor = document.getElementById("statusEnemy")
                        statusEnemyColor.classList.remove('okStatusPkm')
                        statusEnemyColor.classList.add('injuredStatusPkm')
                    } else {
                        enemybattlinPkm.splice(0, enemybattlinPkm.length)
                        let liItems = document.getElementById("myEnemyPkm")
                        liItems.parentNode.removeChild(liItems)
                        let getScore = document.getElementById("score")
                        score += 1
                        getScore.innerHTML = `<p>SCORE:    ${score} </p>`
                        koAudio.play()
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
                }
                const modalPerdisteCerrar = document.getElementById('modalPerdiste-cerrar')
                const modalPerdisteContainer = document.getElementById("perdisteModal")
                const finalScore = document.getElementById("finalScore")


                modalPerdisteCerrar.onclick = () => {

                    modalPerdisteContainer.classList.remove('modal-active')
                }
                const perdiste = () => {
                    audio2.pause()
                    perdisteAudio.play()
                    audio2.pause()
                    perdisteAudio.play()
                    const modalAlert =document.querySelector(".modalAlert")
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
                }}
                // =========== CHECKEO DEL TEAM ===========
                let teamCheck = () => {
                    if (pkmSelected.length === 0) {

                        perdiste()
                        setScore(characterName, pkmBackup, score)
                    }
                }
                // =========== TRIGGER DE LA PELEA ===========
                pkmFight.onclick = () => {
                    if (ableToFight) {

                        if (pkmSelected[myBattlinPkm].type === "fairy") {
                            if ((enemybattlinPkm[0].type === "dragon") || (enemybattlinPkm[0].type === "fight")) {
                                succesBattle()
                            } else if ((enemybattlinPkm[0].type === "poison")) {
                                failedBattle()
                            } else {
                                koMyPkmByInjuries()
                                koEnemyPkmByInjuries()
                            }
                        } else if (pkmSelected[myBattlinPkm].type === "dragon") {
                            if ((enemybattlinPkm[0].type === "dragon")) {
                                succesBattle()
                                pkmSelected[myBattlinPkm].status === "ko"
                                pkmSelected[myBattlinPkm].active = false
                                let myChosedPkm = document.getElementById("myChosenPkm")
                                myChosedPkm.parentNode.removeChild(myChosedPkm)
                            } else if ((enemybattlinPkm[0].type === "ice") || (enemybattlinPkm[0].type === "fairy")) {
                                failedBattle()
                            } else {
                                koMyPkmByInjuries()
                                koEnemyPkmByInjuries()
                            }
                        } else if (pkmSelected[myBattlinPkm].type === "ghost") {
                            if ((enemybattlinPkm[0].type === "ghost")) {
                                succesBattle()
                                pkmSelected[myBattlinPkm].status === "ko"
                                pkmSelected[myBattlinPkm].active = false
                                let myChosedPkm = document.getElementById("myChosenPkm")
                                myChosedPkm.parentNode.removeChild(myChosedPkm)
                            } else if ((enemybattlinPkm[0].type === "psychc")) {
                                succesBattle()
                            } else if ((enemybattlinPkm[0].type === "normal")) {} else {
                                koMyPkmByInjuries()
                                koEnemyPkmByInjuries()
                            }
                        } else if (pkmSelected[myBattlinPkm].type === "rock") {
                            if ((enemybattlinPkm[0].type === "fire") || (enemybattlinPkm[0].type === "ice") || (enemybattlinPkm[0].type === "flying") || (enemybattlinPkm[0].type === "bug")) {
                                succesBattle()
                            } else if ((enemybattlinPkm[0].type === "water") || (enemybattlinPkm[0].type === "grass") || (enemybattlinPkm[0].type === "fight") || (enemybattlinPkm[0].type === "ground")) {
                                failedBattle()
                            } else {
                                koMyPkmByInjuries()
                                koEnemyPkmByInjuries()
                            }
                        } else if (pkmSelected[myBattlinPkm].type === "bug") {
                            if ((enemybattlinPkm[0].type === "grass") || (enemybattlinPkm[0].type === "psychc")) {
                                succesBattle()
                            } else if ((enemybattlinPkm[0].type === "fire") || (enemybattlinPkm[0].type === "flying") || (enemybattlinPkm[0].type === "rock")) {
                                pkmSelected[myBattlinPkm].status = "ko"
                                pkmSelected[myBattlinPkm].active = false
                                let myChosedPkm = document.getElementById("myChosenPkm")
                                myChosedPkm.parentNode.removeChild(myChosedPkm)
                            } else {
                                koMyPkmByInjuries()
                                koEnemyPkmByInjuries()
                            }
                        } else if (pkmSelected[myBattlinPkm].type === "psychc") {
                            if ((enemybattlinPkm[0].type === "fight") || (enemybattlinPkm[0].type === "poison")) {
                                succesBattle()
                            } else if ((enemybattlinPkm[0].type === "bug") || (enemybattlinPkm[0].type === "ghost")) {
                                failedBattle()

                            } else {
                                koMyPkmByInjuries()
                                koEnemyPkmByInjuries()
                            }
                        } else if (pkmSelected[myBattlinPkm].type === "flying") {
                            if ((enemybattlinPkm[0].type === "grass") || (enemybattlinPkm[0].type === "fight") || (enemybattlinPkm[0].type === "bug")) {
                                succesBattle()
                            } else if ((enemybattlinPkm[0].type === "electric") || (enemybattlinPkm[0].type === "ice") || (enemybattlinPkm[0].type === "rock")) {
                                failedBattle()

                            } else {
                                koMyPkmByInjuries()
                                koEnemyPkmByInjuries()
                            }
                        } else if (pkmSelected[myBattlinPkm].type === "ground") {
                            if ((enemybattlinPkm[0].type === "fire") || (enemybattlinPkm[0].type === "electric") || (enemybattlinPkm[0].type === "poison") || (enemybattlinPkm[0].type === "rock")) {
                                succesBattle()
                            } else if ((enemybattlinPkm[0].type === "water") || (enemybattlinPkm[0].type === "grass") || (enemybattlinPkm[0].type === "ice")) {
                                failedBattle()

                            } else {
                                koMyPkmByInjuries()
                                koEnemyPkmByInjuries()
                            }
                        } else if (pkmSelected[myBattlinPkm].type === "poison") {
                            if ((enemybattlinPkm[0].type === "grass") || (enemybattlinPkm[0].type === "fairy")) {
                                succesBattle()
                            } else if ((enemybattlinPkm[0].type === "ground") || (enemybattlinPkm[0].type === "psychc")) {
                                failedBattle()

                            } else {
                                koMyPkmByInjuries()
                                koEnemyPkmByInjuries()
                            }
                        } else if (pkmSelected[myBattlinPkm].type === "fight") {
                            if ((enemybattlinPkm[0].type === "normal") || (enemybattlinPkm[0].type === "ice") || (enemybattlinPkm[0].type === "rock")) {
                                succesBattle()
                            } else if ((enemybattlinPkm[0].type === "flying") || (enemybattlinPkm[0].type === "psychc") || (enemybattlinPkm[0].type === "fairy")) {
                                failedBattle()

                            } else {
                                koMyPkmByInjuries()
                                koEnemyPkmByInjuries()
                            }
                        } else if (pkmSelected[myBattlinPkm].type === "ice") {
                            if ((enemybattlinPkm[0].type === "grass") || (enemybattlinPkm[0].type === "ground") || (enemybattlinPkm[0].type === "flying") || (enemybattlinPkm[0].type === "dragon")) {
                                succesBattle()
                            } else if ((enemybattlinPkm[0].type === "fire") || (enemybattlinPkm[0].type === "fight") || (enemybattlinPkm[0].type === "rock")) {
                                failedBattle()

                            } else {
                                koMyPkmByInjuries()
                                koEnemyPkmByInjuries()
                            }
                        } else if (pkmSelected[myBattlinPkm].type === "grass") {
                            if ((enemybattlinPkm[0].type === "water") || (enemybattlinPkm[0].type === "ground") || (enemybattlinPkm[0].type === "rock")) {
                                succesBattle()
                            } else if ((enemybattlinPkm[0].type === "fire") || (enemybattlinPkm[0].type === "ice") || (enemybattlinPkm[0].type === "poison") || (enemybattlinPkm[0].type === "flying") || (enemybattlinPkm[0].type === "bug")) {
                                failedBattle()

                            } else {
                                koMyPkmByInjuries()
                                koEnemyPkmByInjuries()
                            }
                        } else if (pkmSelected[myBattlinPkm].type === "electric") {
                            if ((enemybattlinPkm[0].type === "water") || (enemybattlinPkm[0].type === "flying")) {
                                succesBattle()
                            } else if ((enemybattlinPkm[0].type === "ground")) {
                                failedBattle()

                            } else {
                                koMyPkmByInjuries()
                                koEnemyPkmByInjuries()
                            }
                        } else if (pkmSelected[myBattlinPkm].type === "water") {
                            if ((enemybattlinPkm[0].type === "fire") || (enemybattlinPkm[0].type === "ground") || (enemybattlinPkm[0].type === "rock")) {
                                succesBattle()
                            } else if ((enemybattlinPkm[0].type === "electric") || (enemybattlinPkm[0].type === "grass")) {
                                failedBattle()

                            } else {
                                koMyPkmByInjuries()
                                koEnemyPkmByInjuries()
                            }
                        } else if (pkmSelected[myBattlinPkm].type === "fire") {
                            if ((enemybattlinPkm[0].type === "grass") || (enemybattlinPkm[0].type === "ice") || (enemybattlinPkm[0].type === "bug")) {
                                succesBattle()
                            } else if ((enemybattlinPkm[0].type === "water") || (enemybattlinPkm[0].type === "rock") || (enemybattlinPkm[0].type === "ground")) {
                                failedBattle()

                            } else {
                                koMyPkmByInjuries()
                                koEnemyPkmByInjuries()
                            }
                        } else if (pkmSelected[myBattlinPkm].type === "normal") {
                            if ((enemybattlinPkm[0].type === "fight")) {
                                failedBattle()
                            } else if ((enemybattlinPkm[0].type === "ghost")) {} else {
                                if (pkmSelected[myBattlinPkm].status === "ok") {
                                    pkmSelected[myBattlinPkm].status = "injured"
                                } else if (pkmSelected[myBattlinPkm].status === "ko") {
                                    pkmSelected[myBattlinPkm].active = false
                                } else if (pkmSelected[myBattlinPkm].status === "injured") {
                                    koMyPkmByInjuries()
                                    koEnemyPkmByInjuries()
                                }
                            }
                        }
                        teamCheck()

                    }



                }
            }
        }
    }
}
// =========== INICIALIZA EL JUEGO===========
// =========== AVANZA A LA SELECCION DE PERSONAJE ===========
runGame.onclick = () => {
    runGameFunction()
}
// =========== RESET DEL JUEGO ===========
const resetGameConfirmationFunction = () => {
    
        const modalAlert =document.querySelector(".modalAlert")
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



const resetGameFunction = () => {
    let resetGame = document.getElementById("runGame")
    resetGame.onclick = () => {


        runGameFunction()

    }
}   



