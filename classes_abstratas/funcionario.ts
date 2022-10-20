abstract class Funcionario {
    protected salario: number;
    constructor(salario: number){
        this.salario = salario;
        }
    abstract getBonificacao(): number;
}

class Gerente extends Funcionario {
    getBonificacao(): number {
        return this.salario * 0.4;
    }
}

class Diretor extends Gerente {
    getBonificacao(): number {
        return this.salario * 0.6;
    }
}

class Presidente extends Funcionario {
    getBonificacao(): number {
        return this.salario + 1000;
    }
}

let g: Gerente = new Gerente(2000);
console.log("gerente: ",g.getBonificacao());

let d: Diretor = new Diretor(3000);
console.log("diretor: ",d.getBonificacao());

let p: Presidente = new Presidente(9000);
console.log("gerente: ",p.getBonificacao());

