import React from 'react';
import { TileInterface } from '../models/Calculator.model';

interface TileProps extends TileInterface {
    pressKey: (key: string) => void;
}

interface TileState extends TileInterface { }

class Tile extends React.Component<TileProps, TileState>{
    constructor(props: TileProps) {
        super(props);
        this.state = {
            tileValue: this.props.tileValue
        };
    }

    pressKey = () => {
        this.props.pressKey(this.state.tileValue);
    }

    render() {
        const { tileValue } = this.state;
        return (
            <button
                className={
                    `tile ${['AC', 'C'].includes(tileValue) ? "tile--is-red" : ""} ${tileValue === '=' ? "tile--is-blue" : ""}`
                }
                onClick={this.pressKey}>
                {tileValue}
            </button>
        )
    }
}

export default Tile;