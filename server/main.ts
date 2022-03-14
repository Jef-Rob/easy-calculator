import { Meteor } from 'meteor/meteor';
import { Result, ResultCollection } from '../imports/api/results';
import { check } from 'meteor/check';
import { CalculatorEnum } from '../imports/models/Calculator.model';

let index = 0;

function insertResult(value: string): void {
  ResultCollection.insert({ value, createdAt: new Date() });
}

function deleteResults(): number {
  return ResultCollection.remove({});
}

function getResult(): Result | undefined {
  return ResultCollection.findOne({}, { sort: { createdAt: -1 } });
}

function evalResult(value: string): void {
  check(value, String);
  try {
    // Regex to sanitize string
    const evaluatedValue: string = new Function('return ' + value.replace(/[^-()\d/*+.]/g, ''))();
    insertResult(eval(evaluatedValue))
    index = 0;
  } catch (e) {
    if (e instanceof SyntaxError) {
      throw new Meteor.Error(CalculatorEnum.ERROR);
    }
  }
}

function moveUp(): Result | undefined {
  if (ResultCollection.find().count() > index) index++;
  return ResultCollection.findOne({}, { sort: { createdAt: -1 }, skip: index });
}

function moveDown(): Result | undefined {
  if (index > 0) index--;
  return ResultCollection.findOne({}, { sort: { createdAt: -1 }, skip: index });
}

Meteor.startup(() => {
  ResultCollection.createIndex({ createdAt: -1 });
  if (ResultCollection.find().count() === 0) {
    insertResult('0');
  }
});

Meteor.methods({
  'results.eval'({ value }) {
    return evalResult(value);
  },
  'results.delete'({ }) {
    return deleteResults();
  },
  'results.get'({ }) {
    return getResult();
  },
  'results.up'({ }) {
    return moveUp();
  },
  'results.down'({ }) {
    return moveDown();
  }
})
