const equipeFolgaInicial = {
  verde: new Date(2025, 6, 25),     // Julho = 6 em JS
  azul: new Date(2025, 6, 27),
  amarela: new Date(2025, 6, 29),
  vermelha: new Date(2025, 6, 31),
};

const cicloDias = 8;  // 6 dias trabalho + 2 dias folga
const folgaDuracao = 2; // 2 dias de folga

const equipeSelect = document.getElementById('equipe');
const mesAnoDisplay = document.getElementById('mes-ano');
const corpoCalendario = document.getElementById('corpo-calendario');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

let dataAtual = new Date();
let anoAtual = dataAtual.getFullYear();
let mesAtual = dataAtual.getMonth();

function diasNoMes(ano, mes) {
  return new Date(ano, mes + 1, 0).getDate();
}

function primeiraSemanaDia(ano, mes) {
  return new Date(ano, mes, 1).getDay();
}

function getClasseFolga(equipe, dia) {
  // Retorna a classe CSS da folga para a equipe no dia, ou null se não for folga

  const folgaInicial = equipeFolgaInicial[equipe];
  if (!folgaInicial) return null;

  const diaData = new Date(dia.getFullYear(), dia.getMonth(), dia.getDate());
  const diffTempo = diaData - folgaInicial;
  const diffDias = Math.floor(diffTempo / (1000 * 60 * 60 * 24));

  if (diffDias < 0) return null;

  const posCiclo = diffDias % cicloDias;

  if (posCiclo >= 0 && posCiclo < folgaDuracao) {
    // É folga, retorna a classe correta
    switch (equipe) {
      case 'verde': return 'folga-verde';
      case 'azul': return 'folga-azul';
      case 'amarela': return 'folga-amarela';
      case 'vermelha': return 'folga-vermelha';
      default: return null;
    }
  }

  return null;
}

function gerarCalendario(ano, mes, equipe) {
  corpoCalendario.innerHTML = '';

  const totalDias = diasNoMes(ano, mes);
  const inicioSemana = primeiraSemanaDia(ano, mes);

  let linha = document.createElement('tr');

  // Preenche os primeiros dias vazios da semana
  for (let i = 0; i < inicioSemana; i++) {
    const td = document.createElement('td');
    linha.appendChild(td);
  }

  for (let dia = 1; dia <= totalDias; dia++) {
    if (linha.children.length === 7) {
      corpoCalendario.appendChild(linha);
      linha = document.createElement('tr');
    }

    const td = document.createElement('td');
    const dataDia = new Date(ano, mes, dia);

    td.textContent = dia;

    const classeFolga = getClasseFolga(equipe, dataDia);
    if (classeFolga) {
      td.classList.add(classeFolga);
      td.title = 'Folga';
    }

    linha.appendChild(td);
  }

  // Completa a última linha com células vazias se necessário
  while (linha.children.length < 7) {
    const td = document.createElement('td');
    linha.appendChild(td);
  }
  corpoCalendario.appendChild(linha);

  // Atualiza título mês/ano
  const opcoesData = { month: 'long', year: 'numeric' };
  mesAnoDisplay.textContent = new Intl.DateTimeFormat('pt-BR', opcoesData).format(new Date(ano, mes));
}

equipeSelect.addEventListener('change', () => {
  gerarCalendario(anoAtual, mesAtual, equipeSelect.value);
});

btnPrev.addEventListener('click', () => {
  mesAtual--;
  if (mesAtual < 0) {
    mesAtual = 11;
    anoAtual--;
  }
  gerarCalendario(anoAtual, mesAtual, equipeSelect.value);
});

btnNext.addEventListener('click', () => {
  mesAtual++;
  if (mesAtual > 11) {
    mesAtual = 0;
    anoAtual++;
  }
  gerarCalendario(anoAtual, mesAtual, equipeSelect.value);
});

// Inicializa
gerarCalendario(anoAtual, mesAtual, equipeSelect.value);
