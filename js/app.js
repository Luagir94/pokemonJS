
let runGame = document.getElementById("runGame")
let getStatus = document.getElementById("okStatusPkm")
let getScoreText = document.getElementById("scoreText")
const pkmSelected = []
class Trainer {
    constructor(name, gender, team, score) {
        this.name = name;
        this.gender = gender;
        this.team = team
        this.score = score
    }
}

// =========== MODAL DE REGLAS===========
const modalAbrir = document.getElementById('modal-abrir')
const modalCerrar = document.getElementById('modal-cerrar')
const modalContainer = document.getElementsByClassName('modal-container')[0]
const modal = document.getElementsByClassName('modal')[0]

modalAbrir.addEventListener('click', () => {
    modalContainer.classList.add('modal-active')
})

modalCerrar.addEventListener('click', () => {
    modalContainer.classList.remove('modal-active')
})


modal.addEventListener('click', (e) => {
    e.stopPropagation()
})

// =========== MODAL DE REDES===========
const modalRedesAbrir = document.getElementById('modalRedes-abrir')
const modalRedesCerrar = document.getElementById('modalRedes-cerrar')
const modalRedesContainer = document.getElementsByClassName('modalRedes-container')[0]
const modalRedes = document.getElementsByClassName('modalRedes')[0]

modalRedesAbrir.addEventListener('click', () => {
    modalRedesContainer.classList.add('modal-active')
})

modalRedesCerrar.addEventListener('click', () => {
    modalRedesContainer.classList.remove('modal-active')
})


modalRedes.addEventListener('click', (e) => {
    e.stopPropagation()
})



// =========== INICIALIZA EL JUEGO===========
//
// =========== AVANZA A LA SELECCION DE PERSONAJE ===========
const runGameFunction = () => {
    console.log(pkmSelected)

    console.log(pkmSelected)
    pkmSelected.splice(0, pkmSelected.length)
    console.log(pkmSelected)



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
                        <p>
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
    // =========== SELECCION DE GENERO ===========
    genderFemale.onclick = () => {
        characterGender = "female"

        genderFemale.classList.add('char-active')
        genderMale.classList.remove('char-active')
    }

    genderMale.onclick = () => {
        characterGender = "male"

        genderMale.classList.add('char-active')
        genderFemale.classList.remove('char-active')
    }
    // =========== PREVENCION DEL REFRESCO DE LA PAGINA ===========
    playerNameInput.onsubmit = (e) => e.preventDefault()
    // =========== EVENTO PARA PROCEDER A LA SELECCION DE POKEMONS ===========
    goToPkmSelection.onclick = (e) => {
        if (characterGender) {
            e.preventDefault()
            // =========== SELECCION DE NOMBRE ===========
            characterName = document.getElementById("playerName").value

            // =========== INICIALIZA LA SELECCION DE POKEMONS ===========
            if (characterName.length > 2) {
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
                                        </div>`
                monitor.appendChild(createPkmSelection)
                let generatePkm = () => {
                    for (const pokemons of pkm) {
                        let pkmListSelection = document.getElementById("pkmToChoose")
                        let btnPkm = document.createElement("li")
                        btnPkm.innerHTML = `<button class="selectionButton" id="selectionButton${pokemons.id}">
                    <figure>
                        <img src="${pokemons.spriteFront}" alt="boton${pokemons.name}">
                        <figcaption>${pokemons.name} <div id="" class="${pokemons.type}Type">${pokemons.type}</div> <span>${pokemons.id}</span></figcaption>
                    </figure>
                </button>`
                        pkmListSelection.appendChild(btnPkm)
                        btnPkm.onclick = () => {
                            const pkmEnLista = pkmSelected.find((pkm) => pkm.id === pokemons.id)
                            if (pkmSelected.length <= 5 && !pkmEnLista) {
                                pkmSelected.push(pokemons)

                                addToList(pokemons.name, pokemons.type, pokemons.spriteFront)
                            }
                        }
                    }
                }
                generatePkm()
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
                    console.log(pkmSelected)
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
                                <img src="./media/img/pokeball.png" alt=""><img src="./media/img/pokeball.png" alt=""><img src="./media/img/pokeball.png" alt=""><img src="./media/img/pokeball.png" alt=""><img src="./media/img/pokeball.png" alt=""><img src="./media/img/pokeball.png" alt="">
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
                                <button class="actionButton" id="resetBattle">Reiniciar</button>
                                <button class="actionButton" id="exitBattle">Salir</button>
                            </div>
                            <div id="pkmBox">
                            </div>
                        </div>
                    </div>
            
            
            `
                    monitor.appendChild(mainGame)
                }
                let generateEnemy = document.getElementById("generateEnemy")
                // =========== GENERO ENEMIGO AL AZAR ===========
                generateEnemy.onclick = () => {
                    if (enemybattlinPkm.length === 0) {
                        let chosenEnemy = pkm[Math.floor(Math.random() * pkm.length)]
                        enemybattlinPkm.push(chosenEnemy)
                        let enemyPkm = document.getElementById("enemyPkm")
                        enemyPkm.innerHTML = `<figure id="myEnemyPkm"><img src="${enemybattlinPkm[0].spriteFront}" id="enemyPkmSprite" alt=""></figure>
                        <button id="enemyPkmCard"><figure>
                                        <img src="${enemybattlinPkm[0].spriteFront}"  id="enemyPkmCardSprite"alt="">
                                        <figcaption>${enemybattlinPkm[0].name} <div id="" class="${enemybattlinPkm[0].type}Type">${enemybattlinPkm[0].type}</div><div id="statusEnemy" class="${enemybattlinPkm[0].status}StatusPkm">Status</div> </figcaption>
                                    </figure></button>
                        
                        `

                    }
                }

                let exitBattle = document.getElementById("exitBattle");
                exitBattle.onclick = () => {

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
                    resetGameFunction()

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
                    let myChoose = document.getElementById(`myPkm${pokemons.id}`)
                    // =========== SELECCION DE MIS POKEMON ===========
                    myChoose.onclick = () => {
                        if (pokemons.active === true) {
                            myPkm.innerHTML = `<figure id="myChosenPkm">
                <img src="${pokemons.spriteBack}" alt="">
                </figure>`
                            myBattlinPkm = pkmSelected.findIndex((pkm) => pkm === pokemons);

                        }
                    }
                    let pkmFight = document.getElementById("pkmFight")
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
                        }
                    }
                     // =========== CAMBIOS DE STATUS ===========
                    let koMyPkmByInjuries = () => {
                        if (pkmSelected[myBattlinPkm].status === "ok") {
                            pkmSelected[myBattlinPkm].status = "ko"
                        } else {
                            pkmSelected[myBattlinPkm].active = false
                            pkmSelected[myBattlinPkm].status = "ko"
                            let myChosedPkm = document.getElementById("myChosenPkm")
                            myChosedPkm.parentNode.removeChild(myChosedPkm)
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
                            
                        }

                    }
                     // =========== PELEA PERDIDA ===========
                    let failedBattle = () => {
                        pkmSelected[myBattlinPkm].status = "ko"
                        pkmSelected[myBattlinPkm].active = false

                        let myChosedPkm = document.getElementById("myChosenPkm")
                        myChosedPkm.parentNode.removeChild(myChosedPkm)
                    }


                    // =========== TRIGGER DE LA PELEA ===========
                    pkmFight.onclick = () => {

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

                    }
                }
            }
        }
    }

}

runGame.onclick = () => {
    runGameFunction()
}
const resetGameFunction = () => {
    let resetGame = document.getElementById("runGame")
    console.log(pkmSelected)
    resetGame.onclick = () => {

        
        runGameFunction()
    }
}