// vista.js
class VistaHuffman {
  constructor() {
    this.cuerpoTabla = document.querySelector('#tablaCodificacion tbody');
    this.lienzo = document.getElementById('lienzoArbol');
    this.ctx = this.lienzo.getContext('2d');
  }

  limpiarTabla() {
    this.cuerpoTabla.innerHTML = '';
  }

  mostrarTabla(mapaFrecuencias, codigos) {
    this.limpiarTabla();
    for (const [caracter, frecuencia] of mapaFrecuencias.entries()) {
      const fila = document.createElement('tr');

      const celdaCaracter = document.createElement('td');
      celdaCaracter.textContent = caracter;

      const celdaFrecuencia = document.createElement('td');
      celdaFrecuencia.textContent = frecuencia;

      const celdaCodigo = document.createElement('td');
      celdaCodigo.textContent = codigos[caracter];

      fila.appendChild(celdaCaracter);
      fila.appendChild(celdaFrecuencia);
      fila.appendChild(celdaCodigo);

      this.cuerpoTabla.appendChild(fila);
    }
  }

  dibujarArbol(nodo, x = 400, y = 50, espacio = 200) {
    this.ctx.clearRect(0, 0, this.lienzo.width, this.lienzo.height);

    const dibujarNodo = (nodo, x, y, espacio) => {
      if (!nodo) return;
      const radio = 20;

      this.ctx.beginPath();
      this.ctx.arc(x, y, radio, 0, 2 * Math.PI);
      this.ctx.fillStyle = '#ADD8E6';
      this.ctx.fill();
      this.ctx.stroke();

      const etiqueta = nodo.caracter ? `${nodo.caracter} (${nodo.frecuencia})` : `${nodo.frecuencia}`;
      this.ctx.fillStyle = '#000';
      this.ctx.textAlign = 'center';
      this.ctx.font = '14px Arial';
      this.ctx.fillText(etiqueta, x, y + 4);

      if (nodo.izquierdo) {
        const xHijo = x - espacio;
        const yHijo = y + 80;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + radio);
        this.ctx.lineTo(xHijo, yHijo - radio);
        this.ctx.stroke();
        this.ctx.fillText('0', (x + xHijo) / 2 - 10, (y + yHijo) / 2);
        dibujarNodo(nodo.izquierdo, xHijo, yHijo, espacio / 2);
      }

      if (nodo.derecho) {
        const xHijo = x + espacio;
        const yHijo = y + 80;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + radio);
        this.ctx.lineTo(xHijo, yHijo - radio);
        this.ctx.stroke();
        this.ctx.fillText('1', (x + xHijo) / 2 + 10, (y + yHijo) / 2);
        dibujarNodo(nodo.derecho, xHijo, yHijo, espacio / 2);
      }
    };

    dibujarNodo(nodo, x, y, espacio);
  }
}
