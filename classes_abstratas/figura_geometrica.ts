abstract class FiguraGeometrica {
    protected altura: number;
    protected base: number;
    constructor(altura: number, base: number) {
        this.altura = altura;
        this.base = base;
    }
    abstract area(): number;

    abstract perimetro(): number;
}

class Quadrado extends FiguraGeometrica {
    area(): number {
        return this.altura * this.base;
    }

    perimetro(): number {
        return 2 * (this.altura + this.base);
    }
}

class Triangulo extends FiguraGeometrica {
    area(): number {
        return (this.altura * this.base) / 2;
    }

    perimetro(): number {
        let lado = Math.hypot(this.altura, this.base)
        return this.altura + this.base + lado
    }
}

let quadrado1: Quadrado = new Quadrado(30, 30);
console.log("area quadrado: ", quadrado1.area());
console.log("perimetro quadrado: ", quadrado1.perimetro());

let triangulo1: Triangulo = new Triangulo(42, 10)
console.log("area triangulo: ", triangulo1.area());
console.log("perimetro triangulo: ", triangulo1.perimetro());