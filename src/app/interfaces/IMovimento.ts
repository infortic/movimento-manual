export interface IMovimento{
    id?: number,
    datMes: string,
    datAno: string, 
    numeroLacamento: number,
    codProduto: number,
    codCosif: number,
    Descricao: string,
    dataMovimento: Date,
    codUsuario: number,
    valor: number
}