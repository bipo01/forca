const palavraInp = document.querySelector("#palavra");
const situacao = document.querySelector("#situacao");

document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const palavra = palavraInp.value.trim().toLowerCase();
    const response = await fetch(
        `https://forcaapi.vercel.app/delete?palavra=${palavra}`
    );
    const data = await response.json();
    console.log(data);

    palavraInp.value = "";
    situacao.textContent = data;
});
