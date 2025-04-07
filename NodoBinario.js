class NodoBinario {
    //constructor
    constructor(elemento) {
      this.dato = elemento;
      this.hizq= null;
      this.hder= null;
    }

    //metodos
    insertar(nuevoValor) {
        if (nuevoValor < this.valor) {
          if (this.hizq === null) {
            this.hizq = new NodoBinario(nuevoValor);
          } else {
            this.hizq.insertar(nuevoValor);
          }
        } else {
          if (this.hder === null) {
            this.hder = new NodoBinario(nuevoValor);
          } else {
            this.hder.insertar(nuevoValor);
          }
        }
      }
    
      buscar(valorBuscado) {
        if (this.valor === valorBuscado) {
          return this;
        } else if (valorBuscado < this.valor && this.hizq !== null) {
          return this.hizq.buscar(valorBuscado);
        } else if (valorBuscado > this.valor && this.hder !== null) {
          return this.hder.buscar(valorBuscado);
        } else {
          return null; // No encontrado
        }
      }
    
      imprimirEnOrden() {
        if (this.hizq) this.hizq.imprimirEnOrden();
        console.log(this.valor);
        if (this.hder) this.hder.imprimirEnOrden();
      }
      imprimirPreOrden() {
        console.log(this.valor);
        if (this.izquierda) this.izquierda.imprimirPreOrden();
        if (this.derecha) this.derecha.imprimirPreOrden();
      }
}