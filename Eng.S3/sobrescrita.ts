class Empregado {
    _salario: number = 500;

    constructor(_salario: number) {
        this._salario = _salario;
    }

    calcularSalario(): number {
        return this._salario
    }


}

class Diarista extends Empregado {

    constructor(_salario: number) {
        super(_salario);
    }

    calcularSalario(): number {
        return super.calcularSalario() / 30
    }
}

class Horista extends Diarista {
    constructor(_salario: number) {
        super(_salario);
    }

    calcularSalario(): number {
        return super.calcularSalario() / 24
    }
}

class Pessoa {
    private _nome: string;
    private _sobrenome: string;

    constructor(_nome: string, _sobrenome: string) {
        this._nome = _nome;
        this._sobrenome = _sobrenome;
    }

    getNome() {
        return this._nome
    }

    getSobrenome() {
        return this._sobrenome
    }

    getNomeCompleto() {
        return this._nome + " " + this._sobrenome
    }
}

class Funcionario extends Pessoa {
    private matricula: string;
    private _salario: number;

    constructor(_nome: string, _sobrenome: string, matricula: string, _salario: number) {
        super(_nome, _sobrenome);
        this.matricula = matricula;
        if (_salario >= 0) {
            this._salario = _salario;
        } else {
            this._salario = 0;       // fazer uma excessao pra isso
        }

    }

    calcularSalarioPrimeiraParcela() {
        return this._salario * 0.6
    }

    calcularSalarioSegundaParcela() {
        return this._salario * 0.4
    }
}

class Professor extends Funcionario {
    private _titulacao: string;

    constructor(_nome: string, _sobrenome: string, matricula: string, _salario: number, _titulacao: string) {
        super(_nome, _sobrenome, matricula, _salario)
        this._titulacao = _titulacao
    }

    calcularSalarioPrimeiraParcela() {
        return super.calcularSalarioPrimeiraParcela() / 0.6
    }

    calcularSalarioSegundaParcela() {
        return super.calcularSalarioSegundaParcela() * 0

    }
}

let emp = new Empregado(100)
console.log("Salário do empregado: ", emp.calcularSalario())

let diar = new Diarista(3000)
console.log("Salário da diarista (diária): ", diar.calcularSalario())

let p = new Pessoa("Fulano", "Ciclano")
console.log("Nome da pessoa: ", p.getNome(), "| Sobrenome da pessoa: ", p.getSobrenome(), "| Nome completo: ", p.getNomeCompleto())

let f = new Funcionario("Fulano", "da Silva", "1", 1000)
console.log("parcela 1 do funcionario: ", f.calcularSalarioPrimeiraParcela())
console.log("parcela 2 do funcionario: ", f.calcularSalarioSegundaParcela())
console.log("Nome completo do Funcionario: ", f.getNomeCompleto())

let prof = new Professor("Ciclano", "Nunes", "2", 1000, "nsei")
console.log("parcela 1 do professor: ", prof.calcularSalarioPrimeiraParcela())
console.log("parcela 2 do professor: ", prof.calcularSalarioSegundaParcela())
console.log("Nome completo do Professor: ", prof.getNomeCompleto())


