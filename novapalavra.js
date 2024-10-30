const palavra = document.querySelector("#palavra");
const categoria = document.querySelector("#categoria");
const dica = document.querySelector("#dica");

document.querySelector("button").addEventListener("click", async (e) => {
    e.preventDefault();

    if (palavra.value.trim() && dica.value.trim() && categoria.value.trim()) {
        const result = await fetch(
            `https://forcaapi.vercel.app/add?palavra=${palavra.value.toLowerCase()}&categoria=${categoria.value.toLowerCase()}&dica=${dica.value.toLowerCase()}`
        );
        const data = await result.json();

        document.querySelector("#situacao").textContent = `${data}`;

        categoria.value = "";
        dica.value = "";
        palavra.value = "";
    } else {
        alert("Favor preencher todos os campos");
    }
});
