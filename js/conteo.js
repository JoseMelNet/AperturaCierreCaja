const monedas = [50, 100, 200, 500, 1000];
const billetes = [2000, 5000, 10000, 20000, 50000, 100000];

function formatearNumero(num) {
  return num.toLocaleString('es-CO');
}

function crearFila(denominacion, tipo) {
  const tbody = document.querySelector(`#tabla${tipo} tbody`);
  const fila = document.createElement('tr');

  const celdaDenominacion = document.createElement('td');
  celdaDenominacion.textContent = `$${formatearNumero(denominacion)}`;

  const celdaCantidad = document.createElement('td');
  const inputCantidad = document.createElement('input');
  inputCantidad.type = 'number';
  inputCantidad.min = 0;
  inputCantidad.value = '';
  inputCantidad.dataset.valor = denominacion;
  inputCantidad.addEventListener('input', actualizarTotales);
  celdaCantidad.appendChild(inputCantidad);

  const celdaTotal = document.createElement('td');
  celdaTotal.textContent = '';
  celdaTotal.classList.add('total');

  fila.appendChild(celdaDenominacion);
  fila.appendChild(celdaCantidad);
  fila.appendChild(celdaTotal);

  tbody.appendChild(fila);
}

function actualizarTotales() {
  let totalMonedas = 0;
  let totalBilletes = 0;

  document.querySelectorAll('#tablaMonedas tbody tr').forEach(row => {
    const input = row.querySelector('input');
    const cantidad = parseInt(input.value) || 0;
    const valor = parseInt(input.dataset.valor);
    const total = cantidad * valor;
    row.querySelector('.total').textContent = formatearNumero(total);
    totalMonedas += total;
  });

  document.querySelectorAll('#tablaBilletes tbody tr').forEach(row => {
    const input = row.querySelector('input');
    const cantidad = parseInt(input.value) || 0;
    const valor = parseInt(input.dataset.valor);
    const total = cantidad * valor;
    row.querySelector('.total').textContent = formatearNumero(total);
    totalBilletes += total;
  });

  document.getElementById('totalMonedas').textContent = formatearNumero(totalMonedas);
  document.getElementById('totalBilletes').textContent = formatearNumero(totalBilletes);
  document.getElementById('granTotal').textContent = formatearNumero(totalMonedas + totalBilletes);
}

monedas.forEach(m => crearFila(m, 'Monedas'));
billetes.forEach(b => crearFila(b, 'Billetes'));
