const btnKorsina = document.querySelector(".korsina");
const btnHider = document.querySelector(".drop_menu");


btnKorsina.addEventListener("mouseenter",(event)=> {

    btnHider.style.display="block";
});

btnHider.addEventListener("mouseleave",(event)=> {
    btnHider.style.display="none";
});

let date = new Date("Jul 15 2022 21:44:35");

function counts (){
    // записываем в переменную текущую дату
    let now = new Date();
    // находим оставшееся время до окончания
    gap = date - now;
    // Делим милисекунды на 1000 получаем секунды,делим на 60 
    //получаем кол-во минут и часов и делим на 24 получаем кол-во дней.
    let days = Math.floor(gap / 1000 / 60 / 60 / 24);
    let hours = Math.floor(gap / 1000 / 60 / 60) % 24;
    let minets = Math.floor(gap / 1000 / 60) % 60;
    let second = Math.floor(gap / 1000) % 60;
      
    if (gap < 0) {
        // чтобы таймер остановился
       /* document.getElementById("group").innerText = "Акция Завершена";
        // чтобы таймер обновился*/
        days = days + 2;
        hours = hours + 24;
        minets = minets + 60;
        second = second + 60;
    } 
    //Добавляем и Заменяем на самом сайте id на переменные
    // получаем элемент по id
    document.getElementById("d").innerText = days;
    document.getElementById("h").innerText = hours;
    document.getElementById("m").innerText = minets;
    document.getElementById("s").innerText = second;
     
}
counts();

//чтобы счётчик обновлялся Каждую секунду Добавляем интервал.
//1000 млсек переодичность обновлениия
setInterval(counts,1000);