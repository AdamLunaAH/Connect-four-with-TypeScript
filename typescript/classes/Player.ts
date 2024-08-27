export default class Player {

    name: string;
    color: 'X' | 'O';

    constructor(name: string, color: 'X' | 'O' ) {
        this.name = name;
        this.color = color;
    }

}