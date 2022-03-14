import React from 'react';
import { PadInterface } from '../models/Calculator.model';
import Tile from './Tile';

interface PadProps extends PadInterface { }

interface PadState { }

class Pad extends React.Component<PadProps, PadState>{
    constructor(props: PadProps) {
        super(props);
    }

    render() {
        return (
            <div className='pad'>
                <ul>
                    <li><Tile tileValue='↑' pressKey={this.props.moveUp} /></li>
                    <li><Tile tileValue='7' pressKey={this.props.addSymbol} /></li>
                    <li><Tile tileValue='8' pressKey={this.props.addSymbol} /></li>
                    <li><Tile tileValue='9' pressKey={this.props.addSymbol} /></li>
                    <li><Tile tileValue='÷' pressKey={this.props.addSymbol} /></li>

                    <li><Tile tileValue='↓' pressKey={this.props.moveDown} /></li>
                    <li><Tile tileValue='4' pressKey={this.props.addSymbol} /></li>
                    <li><Tile tileValue='5' pressKey={this.props.addSymbol} /></li>
                    <li><Tile tileValue='6' pressKey={this.props.addSymbol} /></li>
                    <li><Tile tileValue='x' pressKey={this.props.addSymbol} /></li>

                    <li><Tile tileValue='C' pressKey={this.props.eraseScreen} /></li>
                    <li><Tile tileValue='1' pressKey={this.props.addSymbol} /></li>
                    <li><Tile tileValue='2' pressKey={this.props.addSymbol} /></li>
                    <li><Tile tileValue='3' pressKey={this.props.addSymbol} /></li>
                    <li><Tile tileValue='-' pressKey={this.props.addSymbol} /></li>

                    <li><Tile tileValue='AC' pressKey={this.props.eraseHistory} /></li>
                    <li><Tile tileValue='0' pressKey={this.props.addSymbol} /></li>
                    <li><Tile tileValue='.' pressKey={this.props.addSymbol} /></li>
                    <li><Tile tileValue='=' pressKey={this.props.submit} /></li>
                    <li><Tile tileValue='+' pressKey={this.props.addSymbol} /></li>
                </ul>
            </div>
        )

    }
}

export default Pad;