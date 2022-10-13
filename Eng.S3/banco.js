var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Conta = /** @class */ (function () {
    function Conta(numero, saldoInicial) {
        this._numero = numero;
        this._saldo = saldoInicial;
    }
    Object.defineProperty(Conta.prototype, "numero", {
        get: function () {
            return this._numero;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Conta.prototype, "saldo", {
        get: function () {
            return this._saldo;
        },
        enumerable: false,
        configurable: true
    });
    Conta.prototype.sacar = function (valor) {
        if (this._saldo >= valor) {
            this._saldo = this._saldo - valor;
        }
    };
    Conta.prototype.depositar = function (valor) {
        this._saldo = this._saldo + valor;
    };
    Conta.prototype.transferir = function (contaDestino, valor) {
        this.sacar(valor);
        contaDestino.depositar(valor);
    };
    return Conta;
}());
var Poupanca = /** @class */ (function (_super) {
    __extends(Poupanca, _super);
    function Poupanca(numero, saldo, taxaJuros) {
        var _this = _super.call(this, numero, saldo) || this;
        _this._taxaJuros = taxaJuros;
        return _this;
    }
    Poupanca.prototype.renderJuros = function () {
        this.depositar(this.saldo * this._taxaJuros / 100);
    };
    Object.defineProperty(Poupanca.prototype, "taxaJuros", {
        get: function () {
            return this._taxaJuros;
        },
        enumerable: false,
        configurable: true
    });
    return Poupanca;
}(Conta));
var AplicacaoError = /** @class */ (function (_super) {
    __extends(AplicacaoError, _super);
    function AplicacaoError(message) {
        return _super.call(this, message) || this;
    }
    return AplicacaoError;
}(Error));
var ContaInexistenteError = /** @class */ (function (_super) {
    __extends(ContaInexistenteError, _super);
    function ContaInexistenteError(message) {
        return _super.call(this, message) || this;
    }
    return ContaInexistenteError;
}(AplicacaoError));
var SaldoInsuficienteError = /** @class */ (function (_super) {
    __extends(SaldoInsuficienteError, _super);
    function SaldoInsuficienteError(message) {
        return _super.call(this, message) || this;
    }
    return SaldoInsuficienteError;
}(AplicacaoError));
var Banco = /** @class */ (function () {
    function Banco() {
        this._contas = [];
    }
    Banco.prototype.inserir = function (conta) {
        var contaConsultada = this.consultar(conta.numero);
        if (contaConsultada == null) {
            this._contas.push(conta);
        }
    };
    Banco.prototype.consultar = function (numero) {
        var contaConsultada;
        for (var _i = 0, _a = this._contas; _i < _a.length; _i++) {
            var conta_1 = _a[_i];
            if (conta_1.numero == numero) {
                contaConsultada = conta_1;
                return contaConsultada; // se encontrar, retorna
            }
        } // se nao encontrar, o for acaba e lança exceção
        throw new ContaInexistenteError("Conta não encontrada");
    };
    Banco.prototype.consultarPorIndice = function (numero) {
        var indice;
        for (var i = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                indice = i;
                return indice;
            }
        }
        throw new ContaInexistenteError("Indice da conta não encontrado");
    };
    Banco.prototype.alterar = function (conta) {
        var indice = this.consultarPorIndice(conta.numero);
        if (indice != -1) {
            this._contas[indice] = conta;
        }
    };
    Banco.prototype.excluir = function (numero) {
        var indice = this.consultarPorIndice(numero);
        if (indice != -1) {
            for (var i = indice; i < this._contas.length; i++) {
                this._contas[i] = this._contas[i + 1];
            }
            this._contas.pop();
        }
    };
    Banco.prototype.depositar = function (numero, valor) {
        var contaConsultada = this.consultar(numero);
        if (contaConsultada != null) {
            contaConsultada.depositar(valor);
        }
    };
    Banco.prototype.sacar = function (numero, valor) {
        var contaConsultada = this.consultar(numero);
        if (contaConsultada != null) {
            contaConsultada.sacar(valor);
        }
    };
    Banco.prototype.transferir = function (numeroDebito, numeroCredito, valor) {
        var contaCredito = this.consultar(numeroCredito);
        var contaDebito = this.consultar(numeroDebito);
        if (contaCredito != null && contaDebito != null) {
            contaDebito.transferir(contaCredito, valor);
        }
    };
    Banco.prototype.calcularQuantidadeContas = function () {
        return this._contas.length;
    };
    Banco.prototype.calcularTotalSaldos = function () {
        var totalSaldo = 0;
        for (var _i = 0, _a = this._contas; _i < _a.length; _i++) {
            var conta_2 = _a[_i];
            totalSaldo += conta_2.saldo;
        }
        return totalSaldo;
    };
    Banco.prototype.calcularMediaSaldos = function () {
        return this.calcularTotalSaldos() / this.calcularQuantidadeContas();
    };
    Banco.prototype.renderJuros = function (numero) {
        var contaConsultada = this.consultar(numero);
        if (contaConsultada instanceof Poupanca) {
            var poupanca_1 = contaConsultada;
            poupanca_1.renderJuros();
        }
    };
    return Banco;
}());
var conta = new Conta("1", 100);
var poupanca = new Poupanca("2", 100, 0.5);
poupanca.renderJuros();
console.log("Saldo reque rendeu 'poupanca': ", poupanca.saldo);
var poupanca2 = new Poupanca("3", 100, 1);
poupanca2.depositar(100);
poupanca2.renderJuros();
console.log("Saldo reque rendeu 'poupanca2': ", poupanca2.saldo);
var banco = new Banco();
banco.inserir(new Conta("1", 100));
banco.inserir(new Poupanca("2", 100, 0.5));
banco.depositar("2", 200);
banco.renderJuros("2");
//console.log(banco.consultar("2").saldo);
banco.renderJuros("1");
console.log(banco.consultar("1").saldo);
/*

banco.transferir("1","2",50);
console.log(banco.consultar("1").saldo); //250
console.log(banco.consultar("2").saldo); //150

let  p: Poupanca = new Poupanca("2", 100, 0.5);
p.depositar(100);

p.renderJuros();
console.log(p.saldo); //
*/
