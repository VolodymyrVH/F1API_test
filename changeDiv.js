function showDiv(number) {
    for (let i = 1; i <= 3; i++) {
        const div = document.getElementById("div" + i);
        const button = document.getElementById("button" + i);
        
        if (i === number) {
            div.hidden = false;
            button.style.color = "white";
            button.style.backgroundColor = "red";
        } else {
            div.hidden = true;
            button.style.color = "red";
            button.style.backgroundColor = "rgba(255, 255, 255, 0)";
        }
    }
}