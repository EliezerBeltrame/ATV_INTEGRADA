// ================= ANIMAÇÃO ENTRE TELAS =================
function irParaProxima() {
  const container = document.getElementById("container");
  container.style.transform = "translateY(-100vh)";
}

// ================= GRÁFICO =================
let ctx = document.getElementById("grafico");

let dados = {
  labels: [],
  datasets: [
    {
      label: "Temperatura",
      data: [],
      backgroundColor: "#38bdf8",
      borderColor: "#0ea5e9",
      borderWidth: 2
    },
    {
      label: "Umidade",
      data: [],
      backgroundColor: "#60a5fa",
      borderColor: "#2563eb",
      borderWidth: 2
    }
  ]
};

let chart = new Chart(ctx, {
  type: "bar",
  data: dados,
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white"
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "white" }
      },
      y: {
        ticks: { color: "white" }
      }
    }
  }
});

// ================= ATUALIZAÇÃO DE DADOS =================
function atualizarDados() {
  let temp = (20 + Math.random() * 10).toFixed(1);
  let umid = (40 + Math.random() * 20).toFixed(1);
  let hora = new Date().toLocaleTimeString();

  document.getElementById("temp").innerText = temp + " °C";
  document.getElementById("umid").innerText = umid + " %";

  dados.labels.push(hora);
  dados.datasets[0].data.push(temp);
  dados.datasets[1].data.push(umid);

  if (dados.labels.length > 6) {
    dados.labels.shift();
    dados.datasets[0].data.shift();
    dados.datasets[1].data.shift();
  }

  chart.update();

  let linha = `
    <tr>
      <td>${hora}</td>
      <td>${temp}</td>
      <td>${umid}</td>
    </tr>
  `;

  document.getElementById("tabela").innerHTML =
    linha + document.getElementById("tabela").innerHTML;
}

// atualiza a cada 2 segundos
setInterval(atualizarDados, 2000);

// ================= HISTÓRICO =================
function abrirHistorico() {
  const panel = document.getElementById('historico-panel');
  const button = document.querySelector('.historico');
  if (panel.style.left === '0px') {
    panel.style.left = '-350px';
    button.style.display = 'block';
  } else {
    panel.style.left = '0px';
    button.style.display = 'none';
    panel.innerHTML = '<h2>Histórico de Leituras</h2><button onclick="fecharHistorico()" style="float:right;">X</button><table border="1" style="width:100%; margin:20px auto;"><thead><tr><th>Hora</th><th>Temperatura</th><th>Umidade</th></tr></thead><tbody>' + document.getElementById('tabela').innerHTML + '</tbody></table>';
  }
}

function fecharHistorico() {
  document.getElementById('historico-panel').style.left = '-350px';
  document.querySelector('.historico').style.display = 'block';
}

// ================= LOGOUT =================
function logout() {
  const container = document.getElementById("container");
  container.style.transform = "translateY(0)";
  document.getElementById('historico-panel').style.left = '-350px';
  document.querySelector('.historico').style.display = 'block';
}