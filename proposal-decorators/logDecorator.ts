function log(original: Function, context: DecoratorContext) {

    function newFunction(...args: any[]) {
        if (context.kind !== 'method') {
            throw new Error('This decorator can only be applied to methods');
        }
        console.log(`${this.constructor.name}.${context.name.toString()}(${args.join(', ')})`);
        return original.apply(this, args);
    };

    return newFunction;
}

class Log {
    count = 0;

    incButton: HTMLButtonElement;
    decButton: HTMLButtonElement;
    result: HTMLDivElement;

    constructor() {
        this.init();
    }

    init() {
        const root = document.querySelector('.with-log')!;
        this.incButton = root.querySelector('.inc')!;
        this.decButton = root.querySelector('.dec')!;
        this.result = root.querySelector('.result')!;

        if (!this.incButton || !this.decButton || !this.result) {
            throw new Error('Element not found');
        }
        this.inc = this.inc.bind(this);

        this.incButton.addEventListener('click', this.inc);
        this.decButton.addEventListener('click', this.dec.bind(this));
        this.render();
    }

    @log
    inc() {
        this.count++;
        this.render();
    }

    @log
    dec() {
        this.count--;
        this.render();
    }

    @log
    render() {
        this.result.textContent = `count: ${this.count}`;
    }
}

new Log();
