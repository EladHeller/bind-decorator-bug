function log(target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const original = descriptor.value;

    function newFunction(...args: any[]) {
        console.log(`${this.constructor.name}.${key}(${args.join(', ')})`);
        return original.apply(this, args);
    };

    return {
        ...descriptor,
        value: newFunction
    };
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
