const calendar = document.getElementById("calendar");

const cores = ["verde", "azul", "amarela", "vermelha"];
const datasFolgaIniciais = {
  verde: new Date("2025-07-25"),
  azul: new Date("2025-07-27"),
  amarela: new Date("2025-07-29"),
  vermelha: new Date("2025-07-31")
};

function gerarFolgas(cor, inicio, fim) {
  const folgas = [];
  let data = new Date(inicio);

  while (data <= fim) {
    folgas.push(new Date(data));
    data.setDate(data.getDate() + 1);
    folgas.push(new Date(data));
    data.setDate(data.getDate() + 6);
  }

  return folgas;
}

function gerarCalendario(ano) {
  calendar.innerHTML = "";
  const inicio = new Date(`${ano}-01-01`);
  const fim = new Date(`${ano}-12-31`);

  const folgasPorCor = {};
  for (const cor of cores) {
    folgasPorCor[cor] = gerarFolgas(cor, datasFolgaIniciais[cor], fim);
  }

  let dataAtual = new Date(inicio);
  while (dataAtual <= fim) {
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth() + 1;
    const ano = dataAtual.getFullYear();
    const div = document.createElement("div");
    div.className = "day";
    div.textContent = `${dia}/${mes}`;

    for (const cor of cores) {
      if (folgasPorCor[cor].some(f => f.toDateString() === dataAtual.toDateString())) {
        div.classList.add(`folga-${cor}`);
      }
    }

    calendar.appendChild(div);
    dataAtual.setDate(dataAtual.getDate() + 1);
  }
}

gerarCalendario(2025);

document.body.insertAdjacentHTML("afterbegin", `<button class="toggle-theme">Alternar tema</button>`);

document.querySelector(".toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
