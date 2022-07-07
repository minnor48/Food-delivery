//Forms

const forms = document.querySelectorAll("form");

const message = {
    loading: "Загрузка",
    success: "Спасибо! скоро мы с вами свяжемся",
    failure: "Что-то пошло не так..."
};

forms.forEach(item => {
    bindPostData(item)
});

const postData = async (URL, data) => {
    const res = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: data
    });

    return await res.json();
};

function bindPostData(form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const statusMessage = document.createElement("div");
        statusMessage.classList.add("status");
        statusMessage.textContent = message.loading;
        form.append(statusMessage);



        const formData = new FormData(form);
        //перевод в формат json
        const json = JSON.stringify(Object.fromEntries(formData.entries()));



        postData("http://localhost:3000/requests", json)
            .then(data => {
                show(message.success);
                // удаляем сообщение через
                statusMessage.remove();
            }).catch(() => {
                show(message.failure);
            }).finally(() => {
                form.reset();
            })

    });

    //добавление  окна 


    function show(message) {
        const prevModalDialog = document.querySelector(".modal-content");

        prevModalDialog.style.display = "none";

        openModal();

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal-content");
        thanksModal.innerHTML = `
        
                    <span data-close class="close">&times;</span>
                <p>${message}</p>
                   
        `;

        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add("hide");
            prevModalDialog.classList.remove("show");
            closeModal();
        }, 4000);
    };


};



const modalTrigger = document.querySelectorAll("[data-modal]");
const modal = document.querySelector(".modal");


modalTrigger.forEach(btnM => {
    btnM.addEventListener("click", openModal);
});

function openModal() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
}

modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
        closeModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
        closeModal();
    }
});