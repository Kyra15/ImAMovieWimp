var verdict = document.getElementsByClassName("verdict")[0];
console.log(verdict.childNodes[1].innerHTML)

if (verdict.childNodes[1].innerHTML.includes("Yes :D")) {
    verdict.style.backgroundColor = "#e8cb4c" 
    verdict.childNodes[1].innerHTML = "Probably Yes <i class='fa fa-check' aria-hidden='true'></i>"
} else if (verdict.childNodes[1].innerHTML.includes("No :(")) {
    verdict.style.backgroundColor = "#679df5"
    verdict.childNodes[1].innerHTML = "Probably Not <i class='fa fa-times' aria-hidden='true'></i>"
} else {
    verdict.style.backgroundColor = "#b4cf68"
     verdict.childNodes[1].innerHTML = "Kinda? <i class='fa fa-question' aria-hidden='true'></i>"
}