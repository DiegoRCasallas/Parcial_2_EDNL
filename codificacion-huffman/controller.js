// controller.js
class ControladorHuffman {
  constructor(modelo, vista) {
    this.modelo = modelo;
    this.vista = vista;
    this._inicializarEventos();
  }

  _inicializarEventos() {
    const formulario = document.getElementById('formularioTexto');
    formulario.addEventListener('submit', (evento) => {
      evento.preventDefault();
      const entrada = document.getElementById('entradaTexto').value;
      if (entrada.trim() === '') return;
      this._procesarTexto(entrada);
    });
  }

  _procesarTexto(texto) {
    const nodoRaiz = this.modelo.construirArbol(texto);
    const codigos = this.modelo.generarCodigos(nodoRaiz);

    const mapaFrecuencias = new Map();
    for (const caracter of texto) {
      mapaFrecuencias.set(caracter, (mapaFrecuencias.get(caracter) || 0) + 1);
    }

    this.vista.mostrarTabla(mapaFrecuencias, codigos);
    this.vista.dibujarArbol(nodoRaiz);
  }
}

const modelo = new ModeloHuffman();
const vista2 = new VistaHuffman();
new ControladorHuffman(modelo, vista2);
