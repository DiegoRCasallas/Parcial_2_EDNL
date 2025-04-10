// model.js
class NodoHuffman {
  constructor(caracter, frecuencia) {
    this.caracter = caracter;
    this.frecuencia = frecuencia;
    this.izquierdo = null;
    this.derecho = null;
  }
}

class ModeloHuffman {
  construirArbol(texto) {
    const mapaFrecuencias = new Map();
    for (const caracter of texto) {
      mapaFrecuencias.set(caracter, (mapaFrecuencias.get(caracter) || 0) + 1);
    }

    const cola = Array.from(mapaFrecuencias.entries()).map(
      ([caracter, frecuencia]) => new NodoHuffman(caracter, frecuencia)
    );

    cola.sort((a, b) => a.frecuencia - b.frecuencia);

    while (cola.length > 1) {
      const izquierdo = cola.shift();
      const derecho = cola.shift();
      const nuevoNodo = new NodoHuffman(null, izquierdo.frecuencia + derecho.frecuencia);
      nuevoNodo.izquierdo = izquierdo;
      nuevoNodo.derecho = derecho;
      cola.push(nuevoNodo);
      cola.sort((a, b) => a.frecuencia - b.frecuencia);
    }

    return cola[0];
  }

  generarCodigos(nodo) {
    const codigos = {};
    const recorrer = (nodo, camino) => {
      if (!nodo) return;
      if (nodo.caracter !== null) {
        codigos[nodo.caracter] = camino;
      }
      recorrer(nodo.izquierdo, camino + '0');
      recorrer(nodo.derecho, camino + '1');
    };
    recorrer(nodo, '');
    return codigos;
  }
}
