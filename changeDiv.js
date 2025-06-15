function showDiv(number) {
    for (let i = 1; i <= 3; i++) {
        const div = document.getElementById("div" + i);
        
        if (i === number) {
            div.hidden = false;
        } else {
            div.hidden = true;
        }
    }
}