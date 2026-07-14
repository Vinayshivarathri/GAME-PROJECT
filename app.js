let userscore = 0;
let serverscore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userscorepara = document.querySelector("#user-score");
const serverscorepara = document.querySelector("#server-score");

const genserverchoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randomIdx = Math.floor(Math.random() * 3);
    return options[randomIdx];
};

const drawgame = () => {
    msg.innerText = "Game was a draw, play again";
    msg.style.backgroundColor = "#081b31";
};

const showwinner = (userwin, userchoice, serverchoice) => {
    if (userwin) {
        userscore++;
        userscorepara.innerText = userscore;
        msg.innerText = `You win! ${userchoice} beats ${serverchoice}`;
        msg.style.backgroundColor = "green";
    } else {
        serverscore++;
        serverscorepara.innerText = serverscore;
        msg.innerText = `You lost! ${serverchoice} beats your ${userchoice}`;
        msg.style.backgroundColor = "red";
    }
};

const playgame = (userchoice) => {
    console.log("user choice =", userchoice);
    const serverchoice = genserverchoice();
    console.log("serverchoice =", serverchoice);

    if (userchoice === serverchoice) {
        drawgame();
    } else {
        let userwin = true;
        if (userchoice === "rock") {
            userwin = serverchoice === "paper" ? false : true;
        } else if (userchoice === "paper") {
            userwin = serverchoice === "scissors" ? false : true;
        } else if (userchoice === "scissors") {
            userwin = serverchoice === "rock" ? false : true;
        }
        showwinner(userwin, userchoice, serverchoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userchoice = choice.getAttribute("id");
        playgame(userchoice);
    });
});
