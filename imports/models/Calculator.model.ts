export interface CalculatorInterface {
    displayedValue: string;
}

export enum CalculatorEnum {
    DEFAULT_VALUE = '0',
    ERROR = 'ERROR'
}

export interface PadInterface {
    addSymbol: (symbol: string) => void;
    eraseScreen: () => void;
    eraseHistory: () => void;
    submit: () => void;
    moveUp: () => void;
    moveDown: () => void;
}

export interface TileInterface {
    tileValue: string;
}