import {Item} from '../model/readCSV';
import ReadCSV from '../model/readCSV';
import Service from '../service/serviceEstoque'

export default class ControleEstoque{
  private estoque: Item[];

  constructor(private estoqueFileName: string){
    this.estoque = ReadCSV.carregarEstoque(estoqueFileName);
  }

  adicionarItem(nome: string, peso: number, valor: number, quantidade: number): void{
   
    if(this.estoque.find(Item => Item.nome == nome) != undefined){
      console.log("Item já existe no sistema.")
      return;
    }
    
    const newItem: Item = {nome, peso, valor, quantidade};
    this.estoque.push(newItem);
    Service.salvarEstoque(this.estoque, this.estoqueFileName);
    console.log('Item adicionado com sucesso.')
  }

  removerItem(nome: string): void{
    if(this.estoque.find(Item => Item.nome == nome) == undefined){
      console.log("Item não existe no sistema.")
      return;
    } else {
      let indiceRemover: number = this.estoque.findIndex(Item => Item.nome === nome);
      this.estoque.splice(indiceRemover, 1);
      Service.salvarEstoque(this.estoque, this.estoqueFileName);
      console.log('Item removido com sucesso.');
    }
  }

  listarItem(): void{
    console.log(this.estoque);
  }

  valorTotal(): void{
    let total: number = 0;
    for(let item of this.estoque){
      total += item.valor;
    }
    console.log(total);
  }

  pesoTotal(): void{
    let total: number = 0;
    for(let item of this.estoque){
      total += item.peso;
    }
    console.log(total, " kg");
  }

  mediaValor(): void{
    let total: number = 0;
    for(let item of this.estoque){
      total += item.valor;
    }
    console.log(total/this.estoque.length);
  }

  mediaPeso(): void{
    let total: number = 0;
    for(let item of this.estoque){
      total += item.peso;
    }
    console.log(total/this.estoque.length);
  }

  quantidadeItens(): void{
    let quant: number = 0;
    for(let item of this.estoque){
      quant += item.quantidade;
    }
    console.log(quant);
  }

  quantidadeProdutos(): void{
    console.log(this.estoque.length);
  }

}