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