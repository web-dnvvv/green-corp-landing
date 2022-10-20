// АНИМАЦИЯ для карточки "Нам доверяют"

const INCREASE_NUMBER_ANIMATION_SPEED = 50; //скорость выполнения анимации


//увеличить количество шагов анимации
function increaseNumberAnimationStep(i, element, endNumber){
    if (i<=endNumber){
        if (i===endNumber){
            element.innerText=i + "+"
        } 
        else
        {
            element.innerText=i;
        }

    i+=100;
    setTimeout(function(){
        increaseNumberAnimationStep(i, element, endNumber) 
        }, INCREASE_NUMBER_ANIMATION_SPEED);//вызываем фукцию с интервалом 50мс
    }

    
}

//Анимация Увеличения числа инициализаций
let animationInited = false;
function initIncreaseNumberAnimation(){
    let element=document.querySelector(".features__clients-count");
    increaseNumberAnimationStep(0,element,5000);
}



//ВЫБОР РЕСУРСА ДРУГИЕ В ФОРМЕ ЗАЯВКИ, ДОБОВЛЯЕМ или УДАЛЯЕМ поле ввода суммы
document.querySelector("#budget").addEventListener('change', function handleSelectChange(event){
    if (event.target.value==='other'){
        //Должны добавить еще одно текстовое поле
        const formContainer=document.createElement("div");
        formContainer.classList.add("form__group");
        formContainer.classList.add("form__other-input");

        const input=document.createElement("input");
        input.placeholder="Введите ваш вариант";
        input.type="text";

        formContainer.appendChild(input);

        //вставляем тег div  в наш сайт
        document.querySelector('form').insertBefore(formContainer, document.querySelector('.form__submit')); 
    }

    const otherInput=document.querySelector(".form__other-input");
    if(event.target.value !== 'other' && Boolean(otherInput)){
        //Удаляем ранее добавленное текстовое поле, если оно есть в DOM
        
        document.querySelector("form").removeChild(otherInput);

    }
    console.log(event);
});

//АНИМАЦИЯ ШАПКИ САЙТА и запуск анимации увеличения числа
function updateScroll(){
    let header=document.querySelector("header");
    if(window.scrollY>0){
            header.classList.add("header__scrolled");
    } else {
        header.classList.remove("header__scrolled");
    }

    // для анимации чисел
    let windowBottomPosition=window.scrollY + window.innerHeight;  // позиция скролла
    let countElementPosition=document.querySelector(".features__clients-count").offsetTop; //расстояние от верхней части страницы до элемента с классом features__clients-count
    if (windowBottomPosition >= countElementPosition && !animationInited){
        animationInited=true; //чтобы анимация запускалась один раз меняем значение глобальной переменной
        initIncreaseNumberAnimation();
    }

};

window.addEventListener("scroll",updateScroll); //вызов функции при движении скрола окна браузера



// МЕДЛЕННЫЙ СКРОЛЛ посл нажатия на ссылку

/*функция обработки клика по ссылке НЕПОНЯТНО ДЛЯ ЧЕГО, ВСЕ РЕАЛИЗОВАНО В СДЕДУЩЕЙ 
ФУНКЦИИ addSmoothScroll*/
function onLinkClick(event) {
    event.preventDefault(); // предотвращаем поведение ссылки по умолчанию
    document.querySelector(event.target.getAttribute("href")).scrollIntoView({
        behavior:'smooth'
    });
  }

//вызывает функцию обработки клика 
function addSmoothScroll(anchor){
    anchor.addEventListener("click", function(e){
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: 'smooth'
        });

    });
}

// планый скролл для всех ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    addSmoothScroll(anchor);
  });

  addSmoothScroll(document.querySelector('.more-button')); //плавный скролл для кнопки "Узнать поддробнее"