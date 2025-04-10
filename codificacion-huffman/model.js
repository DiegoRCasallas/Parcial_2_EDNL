class HuffmanNode {
  constructor(char, freq, left = null, right = null) {
    this.char = char;
    this.freq = freq;
    this.left = left;
    this.right = right;
  }
}

class HuffmanModel {
  constructor() {
    this.codes = {};
  }

  buildFrequencyMap(text) {
    const freqMap = new Map();
    for (let char of text) {
      freqMap.set(char, (freqMap.get(char) || 0) + 1);
    }
    return freqMap;
  }

  buildTree(freqMap) {
    const nodes = Array.from(freqMap.entries()).map(
      ([char, freq]) => new HuffmanNode(char, freq)
    );

    while (nodes.length > 1) {
      nodes.sort((a, b) => a.freq - b.freq);
      const left = nodes.shift();
      const right = nodes.shift();
      const parent = new HuffmanNode(null, left.freq + right.freq, left, right);
      nodes.push(parent);
    }

    return nodes[0];
  }

  generateCodes(node, code = '') {
    if (!node) return;
    if (!node.left && !node.right) {
      this.codes[node.char] = code;
    }
    this.generateCodes(node.left, code + '0');
    this.generateCodes(node.right, code + '1');
  }

  getEncodingTable() {
    return this.codes;
  }
}