import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../card';

@Pipe({
  name: 'cardArray'
})
export class CardArrayPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let valueArray: number[] = value;
    let returnValue: Card[] = [];

    for (let card of valueArray) returnValue.push(Card.getCard(card));

    return returnValue;
  }

}
