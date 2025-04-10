document.addEventListener('DOMContentLoaded', () => {
  const model = new HuffmanModel();
  const view = new HuffmanView();

  document.getElementById('compressBtn').addEventListener('click', () => {
    const text = document.getElementById('inputText').value.trim();
    if (!text) return;

    const freqMap = model.buildFrequencyMap(text);
    const root = model.buildTree(freqMap);
    model.generateCodes(root);
    const codes = model.getEncodingTable();

    view.renderTable(freqMap, codes);
    view.drawTree(root);
  });
});