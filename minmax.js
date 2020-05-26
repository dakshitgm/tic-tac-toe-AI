var user;
function start() {
    if (document.getElementById("x").checked) {
        human = "X";
        ai = "O";
        user = "human";
    } else {
        human = "O";
        ai = "X";
        user = "ai";
        update();
        selauto();

    }
}
function mark(source) {
    update();
    if (isVacant(source.innerHTML) && (!checkwin())) {
        if (user == "human") {
            source.innerHTML = human;
            user = "ai";
            update();
            if (!checkwin()) {
                selauto();
            }
        } else {
            source.innerHTML = ai;
            user = "human";
            update();
        }
        if (checkwin()) {
            if (user == human) {
                alert("human is winner")
            }
            else {
                alert("ai is winner");
            }
        }
    }
}
function isVacant(source) {
    return source == "";
}

var v = []
function update() {
    for (var i = 1; i <= 9; i++) {
        v[i] = document.getElementById(i).innerHTML;
    }
}
function checkwin() {
    for (var i = 1; i <= 9; i = i + 3) {
        if (v[i] == v[i + 1] && v[i + 1] == v[i + 2] && (!isVacant(v[i]))) {
            return true;
        }
    }
    for (var i = 1; i <= 3; i++) {
        if (v[i] == v[i + 3] && v[i] == v[i + 6] && (!isVacant(v[i]))) {
            return true;
        }
    }
    if (((v[1] == v[5] && v[1] == v[9]) || (v[3] == v[5] && v[3] == v[7])) && (!isVacant(v[5]))) {
        return true;
    }

    return false;
}
function isDraw() {
    var draw = true;
    if (checkwin()) {
        return false
    }
    for (var i = 1; i <= 9; i++) {
        if (v[i] == "") {
            draw = false;
            break;
        }
    }
    return draw;
}
function selauto() {
    var sel, best = -Infinity;
    for (var i = 1; i < 10; i++) {
        if (isVacant(v[i])) {
            v[i] = ai;
            let score = minmax(false);
            console.log(i + "--" + score);
            v[i] = "";
            if (score > best) {
                best = score;
                sel = i;
            }
        }
    }
    source = document.getElementById(sel);
    mark(source);
}
function minmax(ismax) {
    if (isDraw()) {
        return 0;
    }
    if (ismax) {
        if (checkwin()) {
            return -1;
        }
        var best = -Infinity;
        for (var i = 1; i < 10; i++) {
            if (isVacant(v[i])) {
                v[i] = ai;
                let score = minmax(false);
                v[i] = "";
                best = Math.max(best, score);
            }
        }
        return best;

    } else {
        if (checkwin()) {
            return 1;
        }
        var least = Infinity;
        for (var i = 1; i < 10; i++) {
            if (isVacant(v[i])) {
                v[i] = human;
                let score = minmax(true);
                v[i] = "";
                least = Math.min(least, score);
            }
        }
        return least;
    }

}