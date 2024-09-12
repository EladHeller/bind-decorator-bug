function bind(target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const original = descriptor.value;
    return {
        configurable: true,
        enumerable: false,
        get() {
            Object.defineProperty(this, key, {
                ...descriptor,
                value: original.bind(this)
            });
            return this[key];
        },
        set() {
            throw new Error('Cannot set value');
        }
    };
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
