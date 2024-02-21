import * as fs from 'fs';

export default class ReadCSV{
  static carregarEstoque(estoqueFileName: string): Item[]{
    if (fs.existsSync(estoqueFileName)){
      const data = fs.readFileSync(estoqueFileName, 'utf-8');
      const linhas = data.split('\n').slice(1); //ignora o cabeçalho
      const estoque: Item[] = [];
      for(const linha of linhas){
        const [nome, pesoStr, valorStr, quantidadeStr] = linha.split('.');
        const item: Item = {
          nome: nome.trim(),
          peso: parseFloat(pesoStr),
          valor: parseFloat(valorStr),
          quantidade: parseInt(quantidadeStr)
        };
        estoque.push(item);
      }
      return estoque;
    } else {
      return [];
    }
  }
}

export interface Item {
    nome: string;
    peso: number;
    valor: number;
    quantidade: number;
}