//--------------------------------------------------------------------------------------------------------------------

/*

this website was made by: 
posted to this github page: https://github.com/MassiveManM8?tab=repositories

everything on my github page is 100% free to use, this website is no exception 

ps. im running browserify to use the node.js require feature
so if the website isn't updating you need to run the "npm run build" command in this directory, to build the bundle.js file
which the index.html uses

ps. ps.
this entire thing was made for fun, so if you are strong leaning in either way, this was not made seriously


example sentences used in the video (variations of these work for sure):
* ben shapiro hates gay people
* trump loves god
* obama supports the free market
* Martin Luther King Jr doesnt likes to work 

*/

//--------------------------------------------------------------------------------------------------------------------


// importing ml classify text
const { Classifier } = require('ml-classify-text')


// initilizing the classifiers
const leftRight = new Classifier()
const authLib = new Classifier()

// setting up dom elements
const canvas = document.getElementById("canvas")
const submitBtn = document.getElementById("submit-btn")
const inputEl = document.getElementById("input-el")
const outputEl = document.getElementById("output-el")
const infoEl = document.getElementById("info-el")
const clearBtn = document.getElementById("clear-btn")




// setting up the canvas
const ctx = canvas.getContext("2d")
canvas.height = "327"



// databases
    // since im not releasing this officially,  there is just enough data in her for the video to work
    // but in practise it should work just fine if you just add more data
let auth = [
    "god",
    "invade ukraine",
    "everyone loves god",
    "ben shapiro",

]

let lib = [
    "free",
    "the free market",
    "Paul Jacob",
    "doesnt like to work",
]

let leftist = [
    "black lives matter",
    "trans rights",
    "obama",
    "i like gay people",
    "supports",
    "big tiddy",
    "soviet union",
    "Martin Luther King Jr"

]

let rightist = [
    "vote or die",
    "trump is the best",
    "god , lord the all mighty",
    "take my guns, i take your life",
    "millenials",
    "gen z",
    "ben shapiro",

]


// training the algorith using the labels
authLib.train(auth, "Authoritarian" )
authLib.train(lib, "Libertarian" )

leftRight.train(leftist, 'left')
leftRight.train(rightist, 'right')

// error handling(not really)
let errIndex = 0

// clearing the canvas and the info thing
clearBtn.addEventListener("click", () => {
    console.log("clearing the site")

    inputEl.value = ""
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    infoEl.innerText = ""
}) 

// calculating and visualizing the result
submitBtn.addEventListener("click", () => {

    // predicting the input
    let xPredictions = leftRight.predict(inputEl.value)
    let yPredictions = authLib.predict(inputEl.value)


    // doing the math
    if (xPredictions.length) {
        xPredictions.forEach(prediction => {
            console.log(`${prediction.label} (${prediction.confidence})`)
            console.log(prediction.confidence)

            
            xval = prediction.confidence

            //checking in what direction to put the line
            if (prediction.label == "right") {
                xval = Math.abs(prediction.confidence - 1)
                console.log(xval)

                // de-normalizing the x
                xval = xval * 327
            }
            else if
            (prediction.label == "left") {
                // de-normalizing the x
                xval = xval * 327
            }

            
                // drawing the line for the x
                ctx.beginPath();
                ctx.moveTo(xval, 0);
                ctx.lineTo(xval, 327 );
                ctx.stroke();

        })
    } else {

        // error messages
        infoEl.innerText = "* cant decide if left or right"
        errIndex = 1

        console.log('cant decide if left or right')
        console.log(xPredictions)
    }


    // doing the math for the y
    if (yPredictions.length) {
        yPredictions.forEach(prediction => {
            console.log(`${prediction.label} (${prediction.confidence})`)
            console.log(prediction.confidence)

            // de-normalizing the y
            yval = prediction.confidence

            if (prediction.label == "Libertarian") {
                yval = Math.abs(prediction.confidence - 1)
                console.log(xval)

                yval = yval * 327
            }
            else if
            (prediction.label == "Authoritarian") {
                yval = yval * 327
            }

            // drawing the line for the y
            ctx.beginPath();
            ctx.moveTo(0, yval);
            ctx.lineTo(327, yval);
            ctx.stroke();

            // drawing the circle
            ctx.beginPath()
            ctx.arc(xval, yval, 5, 0, 2 * Math.PI)
            ctx.fillStyle = "#FF0000";
            ctx.fill()

        })
    } else {

        // error messages for the y
        if (errIndex == 1) {
            console.log("it brokey")
            infoEl.innerText = "* cant decide either, it brokey"
        } else {
            infoEl.innerText = "* cant decide if auth or lib"
        }

        console.log('cant decide if lib or auth')
        console.log(yPredictions)
    }
    
})






/*
    'i like gay people',
    'trans rights',
    'BLM',
    'save the environment',
    "black lives matter",
    "lesbian",
    "femboy",
    "tomboy",
    "hitler",
    "nazi",
    "green party",
    "parties",
    "millenials",
    "genz",
    "gen z",
    "boomer",
    "gen x",
    "obama",
    "Nationalism",
    "anti-imperialis",
    "anti-nationalism",
    "russia",
    "progressive",

    "good",
    "evil",
    "Left-wing politics support social equality and egalitarianism, often in opposition of social hierarchy.[1][2][3][4] Left-wing politics typically involve a concern for those in society whom its adherents perceive as disadvantaged relative to others as well as a belief that there are unjustified inequalities that need to be reduced or abolished"

*/


/*
    'guns and bitches',
    'vote or die',
    'trumps my king',
    "god is pretty epic",
    "snowflake",
    "communist",
    "stalin",
    "beta",
    "alfa",
    "chad",
    "usa",
    "america",
    "ww2",
    "ww1",
    "ww3",
    "world war 1",
    "world war 2",
    "world war 3",
    "ukraine",
    "skydaddy",
    "n word",
    "history",
    "Parties of the centre-right generally support liberal democracy, capitalism, the market economy (though they may accept government regulation to control monopolies), private property rights, and a limited welfare state (for example, government provision of education and medical care).",
    "values"
*/