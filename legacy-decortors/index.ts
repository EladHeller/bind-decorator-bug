
class Base {
    count = 0;

    incButton: HTMLButtonElement;
    decButton: HTMLButtonElement;
    result: HTMLDivElement;

    constructor() {
        this.init();
    }

    init() {
        const root = document.querySelector('.without-bind')!;
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
  
new Base();