class Bind {
    count = 0;

    incButton: HTMLButtonElement;
    decButton: HTMLButtonElement;
    result: HTMLDivElement;

    constructor() {
        this.init();
    }

    init() {
        const root = document.querySelector('.with-bind')!;
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

    inc() {
        console.log(this.constructor.name);
        this.count++;
        this.render();
    }

    dec() {
        this.count--;
        this.render();
    }

    render() {
        this.result.textContent = `count: ${this.count}`;
    }
}
new Bind();
