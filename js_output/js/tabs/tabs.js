class Tabs {
    constructor() {
        const tabs = document.querySelectorAll('.tab');
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener('click', this.showContentHandler);
        }
    }

    showContentHandler = (event) => {
        const tabs = document.querySelectorAll('.tab');
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove('active');
        }

        event.target.classList.add('active');

        const contents = document.querySelectorAll('.content');
        for (let i = 0; i < contents.length; i++) {
            contents[i].classList.add('hide');
        }

        document.getElementById(event.target.dataset.contentClass).classList.remove('hide');
    }
}
