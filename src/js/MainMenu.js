export class MainMenu {

    static NULL_PAGE = {
        id: "-",
        title: "-"
    }

    constructor() {
        this.isOpen = false;
        this.pageStack = [];
    }

    currentPage() {
        if (this.pageStack.length === 0) return MainMenu.NULL_PAGE;
        return this.pageStack[this.pageStack.length - 1];
    }

    openPage(id = "root", title = "Menu", data = {}) {
        if (!this.isOpen){
            this.pageStack.splice(0, this.pageStack.length);
            this.isOpen = true;
        }

        this.pageStack.push({
            id: id,
            title: title,
            ...data
        });
    }

    closePage() {
        this.pageStack.splice(this.pageStack.length - 1, 1);

        if (this.pageStack.length < 1) {
            this.isOpen = false
        }
    }

    reOpenPage() {
        if (this.pageStack.length === 0){
            this.openPage();
        } else if (this.pageStack[0].id !== 'root') {
            this.pageStack.splice(0, this.pageStack.length);
            this.openPage();
        } else {
            this.isOpen = true;
        }
    }

    closeAll() {
        this.isOpen = false;
    }

}