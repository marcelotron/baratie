export class Mesas {
    constructor() {
        this.mesas = []; // armazena todas as mesas
    }

    create(id, status){
        const mesa = { id, status };
        this.mesas.push(mesa);
        return mesa;
    }

    list() {
        return this.mesas; // Sempre retorna o array (vazio ou com elementos)
    }

    delete(id) {
        const index = this.mesas.findIndex(m => m.id == id);
        
        if (index === -1) {
            return false; // Mesa não encontrada
        }
        
        this.mesas.splice(index, 1);
        return true; // Mesa deletada com sucesso
    }
}