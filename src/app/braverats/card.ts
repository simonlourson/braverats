export class Card {
  public value: number;
  public name: string;
  public ruleText: string;
  public imageUrl: string;


  public static getCard(value: number) {
    for (let card of Card.cards)
      if (card.value == value) return card;

    return Card.cards[0];
  }

  public static cards: Card[] = [
    {
      value: -2,
      name: 'Carte vide',
      imageUrl: '',
      ruleText: ''
    },
    {
      value: -1,
      name: 'Carte face cachée',
      imageUrl: '',
      ruleText: ''
    },
    {
      value: 0,
      name: 'Bouffon',
      ruleText: 'Cette manche est annulée et mise en attente.',
      imageUrl: ''
    },
    {
      value: 1,
      name: 'Princesse',
      ruleText: 'Si votre adversaire a joué son Prince, vous remportez la partie.',
      imageUrl: ''
    },
    {
      value: 2,
      name: 'Espion',
      ruleText: 'A la prochaine manche, votre adversaire révèle sa carte avant que vous choisissiez la votre.',
      imageUrl: ''
    },
    {
      value: 3,
      name: 'Assassin',
      ruleText: 'La valeur la plus faible l\'emporte.',
      imageUrl: ''
    },
    {
      value: 4,
      name: 'Ministre',
      ruleText: 'Si vous gagnez avec cette carte, cela compte pour 2 Victoires.',
      imageUrl: ''
    },
    {
      value: 5,
      name: 'Magicien',
      ruleText: 'Annule la capacité spéciale de la carte jouée par l\'adversaire.',
      imageUrl: ''
    },
    {
      value: 6,
      name: 'General',
      ruleText: 'Votre carte de la prochaine manche voit sa valeur augmentée de +2.',
      imageUrl: ''
    },
    {
      value: 7,
      name: 'Prince',
      ruleText: 'Vous gagnez la manche.',
      imageUrl: ''
    },

  ]
}