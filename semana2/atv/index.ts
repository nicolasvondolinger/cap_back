import ControleEstoque from './controller/controleEstoque';

const estoqueFileName = './db/estoque.csv';
const controleEstoque = new ControleEstoque(estoqueFileName);

controleEstoque.adicionarItem('Produto A', 1.5, 10.99, 20);
