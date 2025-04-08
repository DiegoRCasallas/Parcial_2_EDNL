// model.js

/**
 * Clase que representa un nodo de un árbol binario.
 * Contiene valor (data), y referencias a hijo izquierdo y derecho.
 */
class Nodo {
    constructor(data) {
      this.data = data;
      this.izquierdo = null;
      this.derecho = null;
    }
  }
  
  /**
   * Clase que representa un árbol binario (con inserción tipo BST).
   * Incluye métodos de insertar, buscar, borrar y recorridos.
   */
  class ArbolBinario {
    constructor() {
      this.raiz = null;
    }
  
    /**
     * Inserta un nuevo valor en el árbol.
     */
    insertar(data) {
      const nuevoNodo = new Nodo(data);
  
      if (this.raiz === null) {
        this.raiz = nuevoNodo;
        return;
      }
  
      let actual = this.raiz;
      while (true) {
        if (data < actual.data) {
          // Insertar a la izquierda
          if (actual.izquierdo === null) {
            actual.izquierdo = nuevoNodo;
            break;
          } else {
            actual = actual.izquierdo;
          }
        } else {
          // Insertar a la derecha (consideramos iguales a la derecha también)
          if (actual.derecho === null) {
            actual.derecho = nuevoNodo;
            break;
          } else {
            actual = actual.derecho;
          }
        }
      }
    }
  
    /**
     * Busca un valor en el árbol.
     * Retorna true si lo encuentra, o false si no está.
     */
    buscar(data) {
      let actual = this.raiz;
      while (actual !== null) {
        if (actual.data === data) {
          return true;
        } else if (data < actual.data) {
          actual = actual.izquierdo;
        } else {
          actual = actual.derecho;
        }
      }
      return false;
    }
  
    /**
     * Función auxiliar para encontrar el nodo mínimo en un subárbol.
     */
    encontrarMinimo(nodo) {
      while (nodo.izquierdo !== null) {
        nodo = nodo.izquierdo;
      }
      return nodo;
    }
  
    /**
     * Borrar un nodo con cierto valor data.
     */
    borrar(data) {
      this.raiz = this._borrarNodo(this.raiz, data);
    }
  
    /**
     * Función recursiva auxiliar para borrar un nodo.
     */
    _borrarNodo(nodo, data) {
      if (nodo === null) {
        return nodo; // no se encontró
      }
  
      if (data < nodo.data) {
        nodo.izquierdo = this._borrarNodo(nodo.izquierdo, data);
      } else if (data > nodo.data) {
        nodo.derecho = this._borrarNodo(nodo.derecho, data);
      } else {
        // Caso 1: nodo hoja o con un solo hijo
        if (nodo.izquierdo === null) {
          return nodo.derecho;
        } else if (nodo.derecho === null) {
          return nodo.izquierdo;
        }
        // Caso 2: nodo con dos hijos
        const temp = this.encontrarMinimo(nodo.derecho);
        nodo.data = temp.data;
        nodo.derecho = this._borrarNodo(nodo.derecho, temp.data);
      }
      return nodo;
    }
  
    /**
     * Recorrido in-order (Izquierda, Nodo, Derecha).
     * Retorna un array con el resultado.
     */
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
  
    /**
     * Recorrido pre-order (Nodo, Izquierda, Derecha).
     * Retorna un array con el resultado.
     */
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
  
    /**
     * Recorrido post-order (Izquierda, Derecha, Nodo).
     * Retorna un array con el resultado.
     */
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
  
    /**
     * Búsqueda en amplitud (BFS).
     * Retorna un array con la secuencia de valores.
     */
    bfs() {
      const resultado = [];
      const queue = [];
  
      if (this.raiz !== null) {
        queue.push(this.raiz);
      }
  
      while (queue.length > 0) {
        const nodo = queue.shift();
        resultado.push(nodo.data);
  
        if (nodo.izquierdo) queue.push(nodo.izquierdo);
        if (nodo.derecho) queue.push(nodo.derecho);
      }
      return resultado;
    }
  }
  