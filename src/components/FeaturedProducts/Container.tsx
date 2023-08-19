import update from 'immutability-helper';
import { useCallback, useState } from 'react';

import { Card } from './Card';
import { Product } from '~/types/Product';

const style = {
  width: 400,
};

type Props = {
  data: Product[];
};

export interface ContainerState {
  cards: Product[];
}

export function Container({ data }: Props) {
  {
    const [cards, setCards] = useState(data);

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: Product[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Product],
          ],
        }),
      );
    }, []);

    const renderCard = useCallback((card: Product, index: number) => {
      return (
        <Card
          product={card}
          key={card.id}
          index={index}
          id={card.id}
          text={card.title}
          moveCard={moveCard}
        />
      );
    }, []);

    return (
      <>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
          {cards.map((card, i) => renderCard(card, i))}
        </div>
      </>
    );
  }
}
