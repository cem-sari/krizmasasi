function clicked() {
    console.log(document.querySelector("input").value);
    if (document.querySelector("input").value == "2020-03-12") {
        alert("True.. Congrats.")
        window.location.href = '/signup'; 
    }else {
        alert("Wrong!")
    }
};