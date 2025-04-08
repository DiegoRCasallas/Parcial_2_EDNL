// view.js

class ArbolBinarioView {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext("2d");
      this.nodoRadio = 20; // Radio de cada nodo
      this.horizSpacing = 50; 
      this.vertSpacing = 70; 
    }
  
    /**
     * Limpia el canvas.
     */
    limpiarCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    /**
     * Dibuja el árbol binario recibido, a partir de la raíz.
     */
    dibujarArbol(arbol) {
      this.limpiarCanvas();
      // Iniciamos la recursión desde la raíz en el centro horizontal
      if (arbol.raiz) {
        const startX = this.canvas.width / 2;
        const startY = 50;
        this._dibujarNodo(arbol.raiz, startX, startY, this.canvas.width / 4);
      }
    }
  
    /**
     * Función recursiva que dibuja cada nodo y sus ramas.
     * offsetX se usa para ir moviendo los hijos a izquierda/derecha.
     */
    _dibujarNodo(nodo, x, y, offsetX) {
      if (!nodo) return;
  
      // Dibuja el nodo
      this._dibujarCirculo(x, y, this.nodoRadio, nodo.data);
  
      // En caso de hijo izquierdo
      if (nodo.izquierdo) {
        this._dibujarLinea(x, y, x - offsetX, y + this.vertSpacing);
        this._dibujarNodo(nodo.izquierdo, x - offsetX, y + this.vertSpacing, offsetX / 2);
      }
  
      // En caso de hijo derecho
      if (nodo.derecho) {
        this._dibujarLinea(x, y, x + offsetX, y + this.vertSpacing);
        this._dibujarNodo(nodo.derecho, x + offsetX, y + this.vertSpacing, offsetX / 2);
      }
    }
  
    /**
     * Dibuja una línea entre dos puntos.
     */
    _dibujarLinea(x1, y1, x2, y2) {
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.strokeStyle = "#000";
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    }
  
    /**
     * Dibuja un círculo (nodo) en la posición (x, y) con un texto dentro.
     */
    _dibujarCirculo(x, y, radio, texto) {
      // Círculo
      this.ctx.beginPath();
      this.ctx.arc(x, y, radio, 0, 2 * Math.PI);
      this.ctx.fillStyle = "#fff";
      this.ctx.fill();
      this.ctx.strokeStyle = "#000";
      this.ctx.stroke();
  
      // Texto dentro del círculo
      this.ctx.fillStyle = "#000";
      this.ctx.font = "16px Arial";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText(texto, x, y);
    }
  }
  