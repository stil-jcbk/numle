document.getElementById("num").addEventListener("keyup", (event) => {
    var num_val = document.getElementById("num").value
    if(num_val > 100000 || num_val[0] == 0 && num_val.length > 1 || num_val < 0){
        event.target.classList.add("too_high")
    }else{
        event.target.classList.remove("too_high")
    }
});

document.getElementById("num").addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        var num_val = document.getElementById("num").value
        if (num_val > 100000 || num_val <0 || num_val == "") return;
        if (localStorage.getItem("win") == 1) return;
        if (num_val.length > 1 && num_val[0] == "0") return;
        if (Math.ceil(num_val) != num_val) return;
        var guesses = localStorage.getItem("guesses");
        if (guesses > 14) return;
        localStorage.setItem("guesses", parseInt(guesses) + 1)
        localStorage.setItem("history", `${document.getElementById("num").value};` + localStorage.getItem("history"))
        document.getElementById("guesses").innerHTML = `guesses <b>${parseInt(guesses)+1}/15</b>`
        const history_arr = localStorage.getItem("history").split(";").slice(0, -1).reverse()
        const good = []
        const bad = []
        const num_l = num_val.split("");
        const gue_l = localStorage.getItem("number").split("");
        //checks good numbers
        try {
            num_l.forEach(function (item, index, array) {
                if (item == gue_l[index]) {
                    good.push(item)
                } else {
                    var i = index;
                    console.log(i)
                    while (i < num_l.length) {
                        console.log("try", num_l[i])
                        bad.push(num_l[i])
                        i++;
                    }
                    throw "Break";
                }
            });
        } catch (e) {
            if (e !== "Break") throw e;
        }
        console.log(good, bad)
        if(document.getElementById("history").children.length > 9){
            document.getElementById("history").removeChild(document.getElementById("history").lastElementChild)
        }
        document.getElementById("history").innerHTML = `<p class="number" id="g${guesses}"><span class="correct">${good.join("")}</span>${bad.join("")} ${higherORlower(num_val)}</p>` + document.getElementById("history").innerHTML
        var rgb_json = JSON.parse(localStorage.getItem("rgb"));
        rgb_json[guesses] = { "r": 255, "g": g(num_val), "b": 0 }
        localStorage.setItem("rgb", JSON.stringify(rgb_json))
        console.log(document.getElementById("num").value)
        // document.getElementById(`g${guesses}`).style.color = `rgb(255, ${g(num_val)}, 0)`
        guess(num_val)
    }
})

function higherORlower(num_val) {
    const num = localStorage.getItem("number");
    if (parseInt(num_val) > parseInt(num)) {
        return `<svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m18.707 12.707-1.414-1.414L13 15.586V6h-2v9.586l-4.293-4.293-1.414 1.414L12 19.414z"></path></svg>`;
    } else if (parseInt(num_val) == parseInt(num)) {
        return '<svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>'
    } else {
        return '<svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z"></path></svg>';
    }
}

function g(num_val) {
    var val = (Math.floor(num_val / localStorage.getItem("number") * 255))
    if (val > 255) {
        val = 255 - (val - 255);
    }
    return val
}

function loader() {
    localStorage.setItem("free", 1)
    if (localStorage.getItem("free") == 1) {
        localStorage.setItem("guesses", 0);
        localStorage.setItem("history", "");
        localStorage.setItem("win", 0);
        localStorage.setItem("date", "");
        localStorage.setItem("rgb", "{}")
    } else {
        if (localStorage.getItem("guesses") == null) {
            localStorage.setItem("guesses", 0);
        }
        if (localStorage.getItem("history") == null) {
            localStorage.setItem("history", "");
        }
        if (localStorage.getItem("win") == null) {
            localStorage.setItem("win", 0);
        }
        if (localStorage.getItem("date") == null) {
            localStorage.setItem("date", "");
        }
        if (localStorage.getItem("win") == 1) {
            const winDialog = document.getElementById("winDialog")
            winDialog.showModal()
        }
    }

    localStorage.setItem("number", generateNumber())

    document.getElementById("history").innerText = localStorage.getItem("history")
    document.getElementById("guesses").innerHTML = `guesses <b>${localStorage.getItem("guesses")}/15</b>`
}

function generateNumber() {
    var num;
    num = Math.floor(Math.random() * (100001 - 0) + 0);
    return num;
}

function guess(num) {
    if (num == localStorage.getItem("number")) {
        win(num);
    }
}

function win(num) {
    const winDialog = document.getElementById("winDialog");
    winDialog.showModal();
    document.getElementById("win_solution").innerText = num;
    localStorage.setItem("win", 1);
}