import React from 'react';
import { CalculatorInterface } from '../models/Calculator.model';

interface DisplayerProps extends CalculatorInterface { }

interface DisplayerState extends CalculatorInterface { }

class Displayer extends React.Component<DisplayerProps, DisplayerState>{
    constructor(props: DisplayerState) {
        super(props);
        this.state = { displayedValue: this.props.displayedValue };
    }

    componentDidUpdate(prevProps: DisplayerProps) {
        if (prevProps.displayedValue !== this.props.displayedValue) {
            this.setState({ displayedValue: this.props.displayedValue });
        }
    }

    render() {
        const { displayedValue } = this.state;
        return (
            <div className='displayer'>
                {displayedValue}
            </div>
        )
    }
}

export default Displayer;