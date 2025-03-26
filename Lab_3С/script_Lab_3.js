document.getElementById("gameButton").addEventListener("click", function () {
    alert("Добро пожаловать в игру Побег из лабиринта!");
    
    if (!confirm("Хотите попробовать выбраться?")) {
        alert("Может, в следующий раз!");
        return;
    }

    let position = 1; 
    let hasSword = false;

    while (true) {
        let choice;

        switch (position) {
            case 1:
                choice = prompt("Вы в темном коридоре. Перед вами три двери: 'Первая', 'Вторая' и 'Третья'. Куда идем?");
                if (choice === null) return alert("Вы остались в лабиринте.");
                if (choice.toLowerCase() === "первая") position = 2;
                else if (choice.toLowerCase() === "вторая") position = 3;
                else if (choice.toLowerCase() === "третья") position = 4;
                else alert("Неверный ввод! Введите 'Первая', 'Вторая' и 'Третья'.");
                break;

            case 2:
                choice = prompt("Вы зашли в темную комнату, но вдруг почувствовали, что пол уходит из-под ног! Прыгнуть или Остановиться?");
                if (choice === null) return alert("Вы остались в лабиринте.");
                if (choice.toLowerCase() === "прыгнуть") {
                    alert("Вы перепрыгнули яму и оказались в тупике...");
                    position = 5; // Переход в тупик
                } else if (choice.toLowerCase() === "остановиться") {
                    alert("Вы вовремя заметили ловушку и вернулись обратно.");
                    position = 1;
                } else {
                    alert("Неправильный ввод! Введите 'Прыгнуть' или 'Остановиться'.");
                }
                break;

            case 3:
                choice = prompt("Вы попали в комнату с монстром! Драться или убежать?");
                if (choice === null) return alert("Вы остались в лабиринте.");
                if (choice.toLowerCase() === "драться") {
                    if (hasSword) {
                        alert("Вы победили монстра с помощью меча! Двигаемся дальше.");
                        position = 6;
                    } else {
                        alert("Монстр оказался сильнее... Вы проиграли.");
                        return;
                    }
                } else if (choice.toLowerCase() === "убежать") {
                    position = 1;
                } else {
                    alert("Неправильный ввод!");
                }
                break;

            case 4:
                choice = prompt("Вы нашли старый сундук. Открыть его?");
                if (choice === null) return alert("Вы остались в лабиринте.");
                if (choice.toLowerCase() === "да") {
                    alert("Внутри лежит меч! Теперь у вас есть оружие.");
                    hasSword = true;
                }
                position = 1;
                break;

            case 5:
                choice = prompt("Вы в тупике. Можно только вернуться обратно. Вернуться?");
                if (choice === null) return alert("Вы остались в лабиринте.");
                if (choice.toLowerCase() === "да") {
                    position = 1;
                } else {
                    alert("Неправильный ввод! Введите 'Да', чтобы вернуться.");
                }
                break;

            case 6:
                choice = prompt("Вы видите свет в конце туннеля! Выход рядом! Бежать или осмотреться?");
                if (choice === null) return alert("Вы остались в лабиринте.");
                if (choice.toLowerCase() === "бежать") {
                    alert("Вы выбрались из лабиринта! Победа!");
                    return;
                } else if (choice.toLowerCase() === "осмотреться") {
                    alert("Монстр ожил и догнал... Вы проиграли.");
                        return;
                } else {
                    alert("Неправильный ввод!");
                }
                break;
        }
    }
});
