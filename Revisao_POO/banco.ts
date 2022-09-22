class Conta {
	private _numero: String;
	private _saldo: number;

	constructor(numero: String, saldoInicial: number) {
		this._numero = numero;
		this._saldo = 0;
		this.depositar(saldoInicial);
	}

	get numero(): String {
		return this._numero;
	}

	get saldo(): number {
		return this._saldo;
	}

	private validarValor(valor: number) {
		if (valor <= 0) {
			throw new ValorInvalidoError("Valor inválido (menor ou igual a zero)")
		} return
	}

	sacar(valor: number): void { // debitar
		this.validarValor(valor) // se valor <= 0 acontece a exceção, caso valor > 0, continua
		if (this._saldo >= valor) {
			this._saldo = this._saldo - valor;
		} else { throw new SaldoInsuficienteError("Saldo insuficiente na conta a debitar") }
	}

	depositar(valor: number): void { //creditar
		this.validarValor(valor)
		this._saldo = this._saldo + valor;
	}

	transferir(contaDestino: Conta, valor: number): void {
		this.sacar(valor);
		contaDestino.depositar(valor);
	}
}

class Poupanca extends Conta {
	private _taxaJuros: number;

	constructor(numero: String, saldo: number, taxaJuros: number) {
		super(numero, saldo);
		this._taxaJuros = taxaJuros;
	}

	public renderJuros(): void {
		this.depositar(this.saldo * this._taxaJuros / 100);
	}

	get taxaJuros(): number {
		return this._taxaJuros
	}
}

class PoupancaInvalidaError extends Error {
	constructor(message: string) {
		super(message);
	}
}

class AplicacaoError extends Error {
	constructor(message: string) {
		super(message);
	}
}

class ContaInexistenteError extends AplicacaoError {
	constructor(message: string) {
		super(message);
	}
}

class SaldoInsuficienteError extends AplicacaoError {
	constructor(message: string) {
		super(message);
	}
}

class ValorInvalidoError extends AplicacaoError {
	constructor(message: string) {
		super(message);
	}
}

class Banco {
	private _contas: Conta[] = [];

	inserir(conta: Conta): void {
		try {
			this.consultar(conta.numero);
		} catch (e: any) { // ao consultar, nao encontrou, entao pode inserir uma nova
			this._contas.push(conta);
			return
		}
	}

	consultar(numero: String): Conta {
		let contaConsultada: Conta;
		for (let conta of this._contas) {
			if (conta.numero == numero) {
				contaConsultada = conta;
				return contaConsultada; // se encontrar, retorna
			}
		} // se nao encontrar, o for acaba e lança exceção
		throw new ContaInexistenteError("Conta não encontrada")
	}

	private consultarPorIndice(numero: String): number { // devolve o indice da conta de numero 'numero'
		let indice: number;
		for (let i: number = 0; i < this._contas.length; i++) {
			if (this._contas[i].numero == numero) {
				indice = i;
				return indice;
			}
		}
		throw new ContaInexistenteError("Indice da conta não encontrado")
	}

	alterar(conta: Conta): void {
		let indice: number = this.consultarPorIndice(conta.numero);
		this._contas[indice] = conta;

	}

	excluir(numero: string): void {
		let indice: number = this.consultarPorIndice(numero);

		if (indice != -1) {
			for (let i: number = indice; i < this._contas.length; i++) {
				this._contas[i] = this._contas[i + 1];
			}

			this._contas.pop();
		}
	}

	depositar(numero: String, valor: number): void {
		let contaConsultada = this.consultar(numero);
		contaConsultada.depositar(valor);
	}

	sacar(numero: String, valor: number): void {
		let contaConsultada = this.consultar(numero);
		contaConsultada.sacar(valor);
	}

	transferir(numeroDebito: string, numeroCredito: string, valor: number) {
		let contaCredito: Conta = this.consultar(numeroCredito);
		let contaDebito: Conta = this.consultar(numeroDebito);
		contaDebito.transferir(contaCredito, valor);
	}

	calcularQuantidadeContas(): number {
		return this._contas.length;
	}

	calcularTotalSaldos(): number {
		let totalSaldo: number = 0;
		for (let conta of this._contas) {
			totalSaldo += conta.saldo;
		}

		return totalSaldo;
	}

	calcularMediaSaldos() {
		return this.calcularTotalSaldos() / this.calcularQuantidadeContas();
	}

	renderJuros(numero: String) {
		let contaConsultada = this.consultar(numero); // consulta a conta e coloca na variavel contaConsultada

		if (contaConsultada instanceof Poupanca) { // se a conta consultada for uma instancia de polpanca (se for polpanca)
			let poupanca: Poupanca = <Poupanca>contaConsultada;
			poupanca.renderJuros(); // rende juros
		} else { throw new PoupancaInvalidaError("Não é uma conta poupança") }
	}

	getContas(): Conta[] {
		return this._contas
	}
}

let banco: Banco = new Banco();
let opcao: any = ""

import readline from 'readline'; // importa readline

const rl = readline.createInterface({ // cria interface do readline
	input: process.stdin,
	output: process.stdout
})

import util from 'util';
const question = util.promisify(rl.question).bind(rl);

async function pergunta(texto: string) { // funcao faz uma pergunta e retorna a resposta, assincrona (pra poder esperar o resultado)
	try {
		const answer = await question(texto); // espera ser respondido
		return answer
	} catch (err) {
		console.error('Question rejected', err);
	}
}

async function criar_conta() {
	var tipo: any = await pergunta('1 para Conta Corrente, 2 para Conta Poupanca: ')
	if (tipo == 1) {
		var numero: any = await pergunta('Numero da conta: ')
		numero = numero.toString() // transformar em string
		var valor: any = await pergunta('Saldo inicial: ')
		valor = +valor // transformar em numero 
		return (new Conta(numero, valor))
	} else if (tipo == 2) {
		var numero: any = await pergunta('Numero da conta: ')
		numero = numero.toString() // transformar em string
		var valor: any = await pergunta('Saldo inicial: ')
		valor = +valor // transformar em numero
		var taxa: any = await pergunta('Definir taxa de juros ( Mínimo 0.1 ): ')
		taxa = +taxa // transformar em numero
		if (taxa <= 0) {
			throw new AplicacaoError('Valor de Taxa inválido')
		}
		else {
			return (new Poupanca(numero, valor, taxa))
		}
	} else { throw new AplicacaoError('Opção inválida de tipo de conta.') }
}

async function pegar_numero() {
	var numero: any = await pergunta('Numero da conta: ')
	numero = numero.toString() // transformar em string
	return numero
}

async function pegar_valor() {
	var valor: any = await pergunta('Valor: ')
	valor = +valor // transformar em numero
	return valor
}

const main = async () => {
	do {
		//exibir menu com opções
		try {
			//ler uma opção pelo teclado"
			console.log("(1) Criar conta\n(2) Listar todas as contas\n(3) Listar conta por numero\n(4) Sacar\n(5) Depositar\n(6) Transferir\n(7) Alterar\n(8) Deletar conta\n(9) Render juros\n(0) Sair") // listando o menu
			opcao = await pergunta('Selecione: ') // perguntando a opcao, await pra o programa esperar a resposta
			switch (opcao) {
				case "1":
					// opção cadastrar... (C)
					banco.inserir(await criar_conta())
					console.clear()
					break
				case "2":
					// listar todos (R)
					console.log(banco.getContas())
					await pergunta('... Pressione qualquer tecla para continuar ...')
					console.clear()
					break
				case "3":
					// listar por numero (R)
					var numero: any = await pegar_numero()
					console.log(banco.consultar(numero))
					await pergunta('... Pressione qualquer tecla para continuar ...')
					console.clear()
					break
				case "4":
					// Sacar (U)
					numero = await pegar_numero()
					var valor: any = await pegar_valor()
					banco.sacar(numero, valor)
					console.clear()
					break
				case "5":
					// Depositar (U)
					numero = await pegar_numero()
					valor = await pegar_valor()
					banco.depositar(numero, valor)
					console.clear()
					break
				case "6":
					// Transferir (U)
					console.log("--Conta a debitar--")
					var num_conta1: any = await pegar_numero()
					console.log("--Conta a creditar--")
					var num_conta2: any = await pegar_numero()
					valor = await pegar_valor()
					banco.transferir(num_conta1, num_conta2, valor)
					console.clear()
					break
				case "7":
					// Alterar (U)
					var conta_a_alterar: any = await criar_conta()
					banco.alterar(conta_a_alterar)
					console.clear()
					break
				case "8":
					// Exclutir (DE)
					numero = await pegar_numero()
					banco.excluir(numero)
					console.clear()
					break
				case "9":
					// render juros
					numero = await pegar_numero()
					banco.renderJuros(numero)
					console.clear()
					break
				case "0":
					process.exit(1)
			}
		} catch (e: any) {
			if (e instanceof AplicacaoError) {
				console.log("###########\nMensagem de erro: " + e.message);
			}
			//... outros ifs ou elses
			if (e instanceof Error) {
				console.log("\nErro no sistema. Contate o administrador.\n###########");
				await pergunta('... Pressione qualquer tecla para continuar ...')
				console.clear()
			}
		} finally {
			console.log("Operação finalizada.");
		}
	} while (opcao != "0");
	rl.close()
	console.log("Aplicação encerrada");
}

main()