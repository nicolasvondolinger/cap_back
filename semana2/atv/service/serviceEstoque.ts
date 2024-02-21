import * as fs from 'fs';
import {Item} from '../model/readCSV';

export default class Service{
  static salvarEstoque(estoque: Item[], estoqueFileName: string): void{
    let csvData = 'Nome,Peso,Valor,Quantidade\n';
    for(const item of estoque){
      csvData += `${item.nome},${item.peso},${item.valor},${item.quantidade}\n`;
    }
    fs.writeFileSync(estoqueFileName, csvData);
  }
}