// view.js
class HuffmanView {
  constructor() {
    this.tableBody = document.querySelector('#encodingTable tbody');
    this.canvas = document.getElementById('treeCanvas');
    this.ctx = this.canvas.getContext('2d');
  }

  clearTable() {
    this.tableBody.innerHTML = '';
  }

  renderTable(freqMap, codes) {
    this.clearTable();
    for (const [char, freq] of freqMap.entries()) {
      const row = document.createElement('tr');

      const charCell = document.createElement('td');
      charCell.textContent = char;

      const freqCell = document.createElement('td');
      freqCell.textContent = freq;

      const codeCell = document.createElement('td');
      codeCell.textContent = codes[char];

      row.appendChild(charCell);
      row.appendChild(freqCell);
      row.appendChild(codeCell);

      this.tableBody.appendChild(row);
    }
  }

  drawTree(node, x = 400, y = 50, spacing = 200) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const drawNode = (node, x, y, spacing) => {
      if (!node) return;
      const radius = 20;

      // Dibujar el nodo
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = '#ADD8E6';
      this.ctx.fill();
      this.ctx.stroke();

      // Mostrar frecuencia o char + freq en los nodos
      const label = node.char ? `${node.char} (${node.freq})` : `${node.freq}`;
      this.ctx.fillStyle = '#000';
      this.ctx.textAlign = 'center';
      this.ctx.font = '14px Arial';
      this.ctx.fillText(label, x, y + 4);

      if (node.left) {
        const childX = x - spacing;
        const childY = y + 80;

        // Línea a hijo izquierdo
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + radius);
        this.ctx.lineTo(childX, childY - radius);
        this.ctx.stroke();

        // Dibujar '0' en la línea
        this.ctx.fillText('0', (x + childX) / 2 - 10, (y + childY) / 2);

        drawNode(node.left, childX, childY, spacing / 2);
      }

      if (node.right) {
        const childX = x + spacing;
        const childY = y + 80;

        // Línea a hijo derecho
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + radius);
        this.ctx.lineTo(childX, childY - radius);
        this.ctx.stroke();

        // Dibujar '1' en la línea
        this.ctx.fillText('1', (x + childX) / 2 + 10, (y + childY) / 2);

        drawNode(node.right, childX, childY, spacing / 2);
      }
    };

    drawNode(node, x, y, spacing);
  }
}
