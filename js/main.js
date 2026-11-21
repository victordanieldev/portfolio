const botaoTema = document.getElementById("theme-toggle");

botaoTema.setAttribute("aria-label", "Ativar tema claro");
botaoTema.addEventListener("click", function () {
    const temaClaro = document.body.classList.toggle("claro");

    botaoTema.textContent = temaClaro ? "☾" : "☀";
    botaoTema.setAttribute(
        "aria-label",
        temaClaro ? "Ativar tema escuro" : "Ativar tema claro"
    );
});

const menuBotao = document.querySelector(".menu-toggle");
const menuPrincipal = document.getElementById("menu-principal");
const telaMobile = window.matchMedia("(max-width: 768px)");

function atualizarMenu(aberto) {
    menuBotao.setAttribute("aria-expanded", String(aberto));
    menuBotao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
}

menuBotao.addEventListener("click", function () {
    atualizarMenu(menuBotao.getAttribute("aria-expanded") !== "true");
});

menuPrincipal.addEventListener("click", function (evento) {
    if (telaMobile.matches && evento.target.closest("a")) {
        atualizarMenu(false);
    }
});

document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && telaMobile.matches &&
        menuBotao.getAttribute("aria-expanded") === "true") {
        atualizarMenu(false);
        menuBotao.focus();
    }
});

telaMobile.addEventListener("change", function () {
    atualizarMenu(false);
});

menuBotao.hidden = false;

document.querySelectorAll(".eva-carrossel").forEach(function (carrossel) {
    const imagens = carrossel.querySelectorAll("img");
    const controles = carrossel.querySelector(".eva-carrossel-controles");
    const status = carrossel.querySelector(".eva-carrossel-status");
    let imagemAtual = 0;

    function trocarImagem(direcao) {
        imagens[imagemAtual].hidden = true;
        imagemAtual = (imagemAtual + direcao + imagens.length) % imagens.length;
        imagens[imagemAtual].hidden = false;
        status.textContent = `${imagemAtual + 1} de ${imagens.length}`;
    }

    controles.querySelector(".eva-anterior").addEventListener("click", function () {
        trocarImagem(-1);
    });

    controles.querySelector(".eva-proxima").addEventListener("click", function () {
        trocarImagem(1);
    });

    controles.hidden = false;
});

// cursor

const cursor = document.getElementById("cursor");

if (cursor) {
    document.addEventListener("mousemove", function (evento) {
        cursor.style.left = evento.clientX + "px";
        cursor.style.top = evento.clientY + "px";
    });
}
