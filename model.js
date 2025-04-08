class Nodo {
  constructor(data) {
    this.data = data;
    this.izquierdo = null;
    this.derecho = null;
  }
}

class ArbolBinario {
  constructor() {
    this.raiz = null;
  }

  insertar(data) {
    const nuevoNodo = new Nodo(data);
    if (this.raiz === null) {
      this.raiz = nuevoNodo;
      return;
    }

    let actual = this.raiz;
    while (true) {
      if (data < actual.data) {
        if (actual.izquierdo === null) {
          actual.izquierdo = nuevoNodo;
          break;
        } else {
          actual = actual.izquierdo;
        }
      } else {
        if (actual.derecho === null) {
          actual.derecho = nuevoNodo;
          break;
        } else {
          actual = actual.derecho;
        }
      }
    }
  }

  buscar(data) {
    let actual = this.raiz;
    while (actual !== null) {
      if (actual.data === data) return true;
      actual = data < actual.data ? actual.izquierdo : actual.derecho;
    }
    return false;
  }

  encontrarMinimo(nodo) {
    while (nodo.izquierdo !== null) {
      nodo = nodo.izquierdo;
    }
    return nodo;
  }

  borrar(data) {
    this.raiz = this._borrarNodo(this.raiz, data);
  }

  _borrarNodo(nodo, data) {
    if (nodo === null) return nodo;

    if (data < nodo.data) {
      nodo.izquierdo = this._borrarNodo(nodo.izquierdo, data);
    } else if (data > nodo.data) {
      nodo.derecho = this._borrarNodo(nodo.derecho, data);
    } else {
      if (nodo.izquierdo === null) return nodo.derecho;
      else if (nodo.derecho === null) return nodo.izquierdo;

      const temp = this.encontrarMinimo(nodo.derecho);
      nodo.data = temp.data;
      nodo.derecho = this._borrarNodo(nodo.derecho, temp.data);
    }
    return nodo;
  }

  inOrder() {
    const resultado = [];
    this._inOrderRec(this.raiz, resultado);
    return resultado;
  }

  _inOrderRec(nodo, resultado) {
    if (nodo !== null) {
      this._inOrderRec(nodo.izquierdo, resultado);
      resultado.push(nodo.data);
      this._inOrderRec(nodo.derecho, resultado);
    }
  }

  preOrder() {
    const resultado = [];
    this._preOrderRec(this.raiz, resultado);
    return resultado;
  }

  _preOrderRec(nodo, resultado) {
    if (nodo !== null) {
      resultado.push(nodo.data);
      this._preOrderRec(nodo.izquierdo, resultado);
      this._preOrderRec(nodo.derecho, resultado);
    }
  }

  postOrder() {
    const resultado = [];
    this._postOrderRec(this.raiz, resultado);
    return resultado;
  }

  _postOrderRec(nodo, resultado) {
    if (nodo !== null) {
      this._postOrderRec(nodo.izquierdo, resultado);
      this._postOrderRec(nodo.derecho, resultado);
      resultado.push(nodo.data);
    }
  }

  bfs() {
    const resultado = [];
    const queue = [];
    if (this.raiz !== null) queue.push(this.raiz);

    while (queue.length > 0) {
      const nodo = queue.shift();
      resultado.push(nodo.data);
      if (nodo.izquierdo) queue.push(nodo.izquierdo);
      if (nodo.derecho) queue.push(nodo.derecho);
    }
    return resultado;
  }

  // ✅ Calcular el grado del árbol (máximo número de hijos en un nodo)
  calcularGrado() {
    function recorrer(nodo) {
      if (nodo === null) return 0;
      let grado = 0;
      if (nodo.izquierdo !== null) grado++;
      if (nodo.derecho !== null) grado++;
      return Math.max(grado, recorrer(nodo.izquierdo), recorrer(nodo.derecho));
    }
    return recorrer(this.raiz);
  }

  // ✅ Calcular la altura del árbol (número de niveles - 1)
  calcularAltura() {
    function altura(nodo) {
      if (nodo === null) return -1;
      return 1 + Math.max(altura(nodo.izquierdo), altura(nodo.derecho));
    }
    return altura(this.raiz);
  }

  // ✅ Calcular nivel de un nodo específico
  nivelDeNodo(data) {
    function buscarNivel(nodo, data, nivel) {
      if (nodo === null) return -1;
      if (nodo.data === data) return nivel;
      if (data < nodo.data) {
        return buscarNivel(nodo.izquierdo, data, nivel + 1);
      } else {
        return buscarNivel(nodo.derecho, data, nivel + 1);
      }
    }
    return buscarNivel(this.raiz, data, 0);
  }
}
