// Se instancia el modelo (árbol) y la vista.
const arbol = new ArbolBinario();
const vista = new ArbolBinarioView("treeCanvas");

/**
 * Función para actualizar la vista cada vez que cambie el árbol.
 */
function actualizarVista() {
  vista.dibujarArbol(arbol);
}

/**
 * Manejadores de eventos
 */

// Insertar nodo
document.getElementById("btnInsertar").addEventListener("click", () => {
  const valor = document.getElementById("inputValue").value;
  if (valor !== "") {
    arbol.insertar(valor);
    document.getElementById("inputValue").value = "";
    actualizarVista();
  }
});

// Buscar nodo
document.getElementById("btnBuscar").addEventListener("click", () => {
  const valor = document.getElementById("inputValue").value;
  if (valor !== "") {
    const encontrado = arbol.buscar(valor);
    document.getElementById("resultText").textContent =
      encontrado
        ? `El valor '${valor}' SÍ está en el árbol.`
        : `El valor '${valor}' NO está en el árbol.`;
  }
});

// Borrar nodo
document.getElementById("btnBorrar").addEventListener("click", () => {
  const valor = document.getElementById("inputValue").value;
  if (valor !== "") {
    arbol.borrar(valor);
    document.getElementById("inputValue").value = "";
    actualizarVista();
    document.getElementById("resultText").textContent = `Se ha borrado '${valor}' (si existía).`;
  }
});

// Recorridos
document.getElementById("btnInOrder").addEventListener("click", () => {
  const recorrido = arbol.inOrder();
  document.getElementById("resultText").textContent =
    "Recorrido In-Order: " + recorrido.join(", ");
});

document.getElementById("btnPreOrder").addEventListener("click", () => {
  const recorrido = arbol.preOrder();
  document.getElementById("resultText").textContent =
    "Recorrido Pre-Order: " + recorrido.join(", ");
});

document.getElementById("btnPostOrder").addEventListener("click", () => {
  const recorrido = arbol.postOrder();
  document.getElementById("resultText").textContent =
    "Recorrido Post-Order: " + recorrido.join(", ");
});

document.getElementById("btnBFS").addEventListener("click", () => {
  const recorrido = arbol.bfs();
  document.getElementById("resultText").textContent =
    "Búsqueda en Amplitud (BFS): " + recorrido.join(", ");
});

// Calcular grado del árbol
document.getElementById("btnGrado").addEventListener("click", () => {
  const grado = arbol.calcularGrado();
  document.getElementById("resultText").textContent =
    `Grado del árbol: ${grado}`;
});

// Calcular altura del árbol
document.getElementById("btnAltura").addEventListener("click", () => {
  const altura = arbol.calcularAltura();
  document.getElementById("resultText").textContent =
    `Altura del árbol: ${altura}`;
});

// Calcular nivel de un nodo específico
document.getElementById("btnNivelNodo").addEventListener("click", () => {
  const valor = document.getElementById("inputValue").value;
  if (valor !== "") {
    const nivel = arbol.nivelDeNodo(valor);
    document.getElementById("resultText").textContent =
      nivel !== -1
        ? `El nivel del nodo '${valor}' es: ${nivel}`
        : `El nodo '${valor}' no se encuentra en el árbol.`;
  }
});
