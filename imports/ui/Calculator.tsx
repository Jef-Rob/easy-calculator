import { Meteor } from 'meteor/meteor';
import React from 'react';
import { CalculatorEnum, CalculatorInterface } from '../models/Calculator.model';
import Displayer from './Displayer';
import Pad from './Pad';

interface CalculatorProps { }

interface CalculatorState extends CalculatorInterface { };

class Calculator extends React.Component<CalculatorProps, CalculatorState>{
    constructor(props: CalculatorProps) {
        super(props);
        this.state = { displayedValue: CalculatorEnum.DEFAULT_VALUE };
    }

    componentDidMount() {
        this.getResult();
    }

    getResult() {
        Meteor.call('results.get', {}, (err: any, res: any) => {
            if (err) {
                console.error(err);
            } else {
                const value: string = res && res.value || CalculatorEnum.DEFAULT_VALUE;
                this.setState({ displayedValue: value });
            }
        })
    }

    submitResult(value: string) {
        Meteor.call('results.eval', { value }, (err: any) => {
            if (err) {
                console.error(err)
                this.setState({ displayedValue: err.error });
            } else {
                this.getResult();
            }
        })
    }

    deleteResults() {
        Meteor.call('results.delete', {}, (err: any) => {
            if (err) {
                console.error(err)
            } else {
                this.getResult();
            }
        })
    }

    moveUp() {
        Meteor.call('results.up', {}, (err: any, res: any) => {
            if (err) {
                console.error(err)
            } else {
                const value: string = res && res.value || CalculatorEnum.DEFAULT_VALUE;
                this.setState({ displayedValue: value });
            }
        })
    }

    moveDown() {
        Meteor.call('results.down', {}, (err: any, res: any) => {
            if (err) {
                console.error(err)
            } else {
                const value: string = res && res.value || CalculatorEnum.DEFAULT_VALUE;
                this.setState({ displayedValue: value });
            }
        })
    }

    handleAddSymbol = (symbol: string): void => {
        if ((this.state.displayedValue + '').split('').length <= 20) {
            const value = [CalculatorEnum.DEFAULT_VALUE, CalculatorEnum.ERROR].includes(this.state.displayedValue as CalculatorEnum)
                ? '' : this.state.displayedValue;
            this.setState({ displayedValue: value + symbol });
        }
    }

    handleEraseScreen = (): void => {
        this.setState({ displayedValue: CalculatorEnum.DEFAULT_VALUE });
    }

    handleEraseHistory = (): void => {
        this.deleteResults();
    }

    handleSubmit = (): void => {
        this.submitResult(
            (this.state.displayedValue + '' || '')
                .replace('x', '*')
                .replace('÷', '/')
        );
    }

    handleMoveUp = (): void => {
        this.moveUp();
    }

    handleMoveDown = (): void => {
        this.moveDown();
    }

    render() {
        const { displayedValue } = this.state;
        return (
            <div className='calculator'>
                <h1 className='calculator__brand'>CASIO</h1>
                <Displayer displayedValue={displayedValue} />
                <Pad
                    addSymbol={this.handleAddSymbol}
                    eraseScreen={this.handleEraseScreen}
                    eraseHistory={this.handleEraseHistory}
                    submit={this.handleSubmit}
                    moveUp={this.handleMoveUp}
                    moveDown={this.handleMoveDown}
                />
            </div>
        )
    }
}

export default Calculator;