function bind(original: Function, context: DecoratorContext) {
    if (!context.name || context.kind !== 'method') {
        throw new Error('This decorator can only be applied to methods');
    }
    const name = context.name.toString();
    context.addInitializer(function () {
        this[name] = this[name].bind(this);
    });
}

class BindDecorator {
    count = 0;

    incButton: HTMLButtonElement;
    decButton: HTMLButtonElement;
    result: HTMLDivElement;

    @bind
    inc() {
        this.count++;
        this.render();
    }

    @bind
    dec() {
        this.count--;
        this.render();
    }

    @bind
    render() {
        this.result.textContent = `count: ${this.count}`;
    }

    constructor() {
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

new BindDecorator();

class BindDecoratorDouble extends BindDecorator {
    @bind
    override inc() {
        super.inc();
        super.inc();
    }

    @bind
    override dec() {
        super.dec();
        super.dec();
    }

    override init() {
        const root = document.querySelector('.with-bind-decorator-double')!
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
    }
}

new BindDecoratorDouble();