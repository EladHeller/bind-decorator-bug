const symbol = Symbol('bind');

function bindDecorator(target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const original = descriptor.value;
    target[symbol] = target[symbol] || {};

    target[symbol][key] = {
        ...descriptor,
        action: 'bind'
    };
    return descriptor;
}

function applyDecorators(target: any) {
    const keys = Object.getOwnPropertyNames(target[symbol]);
    keys.forEach(key => {
        const descriptor = target[symbol][key];
        if (descriptor.action === 'bind') {
            target[key] = target[key].bind(target);
        }
    });
}

class BindFix {
    count = 0;

    incButton: HTMLButtonElement;
    decButton: HTMLButtonElement;
    result: HTMLDivElement;

    @bindDecorator
    inc() {
        this.count++;
        this.render();
    }

    @bindDecorator
    dec() {
        this.count--;
        this.render();
    }

    @bindDecorator
    render() {
        this.result.textContent = `count: ${this.count}`;
    }

    constructor() {
        applyDecorators(this);
        this.init();
    }

    init() {
        const root = document.querySelector('.with-bind-decorator')!
        this.incButton = root.querySelector('.inc')!;
        this.decButton = root.querySelector('.dec')!;
        this.result = root.querySelector('.result')!;

        if (!this.incButton || !this.decButton || !this.result) {
            throw new Error('Element not found');
        }

        this.incButton.addEventListener('click', this.inc);
        this.decButton.addEventListener('click', this.dec);
        this.render();
    }
}


// @applyDecorators
class BindFixDouble extends BindFix {
    @bindDecorator
    override inc() {
        super.inc();
        super.inc();
    }

    @bindDecorator
    override dec() {
        super.dec();
        super.dec();
    }

    override init() {
        const root = document.querySelector('.with-bind-decorator-double-fix')!
        this.incButton = root.querySelector('.inc')!;
        this.decButton = root.querySelector('.dec')!;
        this.result = root.querySelector('.result')!;

        if (!this.incButton || !this.decButton || !this.result) {
            throw new Error('Element not found');
        }

        this.incButton.addEventListener('click', () => {
            this.inc()
        });
        this.decButton.addEventListener('click', this.dec);
        this.render();
    }
    constructor() {
        super();
        applyDecorators(this);
    }
}

new BindFixDouble();