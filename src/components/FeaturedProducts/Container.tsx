import update from 'immutability-helper';
import { useCallback, useEffect, useState } from 'react';

import { Card } from './Card';
import { useAppDispatch } from '~/hooks/redux';
import { setFeaturedCards } from '~/redux/reducers/global/globalSlice';
import { FlatProductsWithTagsAndImages } from '../ProductsTable/columns';

const style = {
  width: 400,
};

type Props = {
  data: FlatProductsWithTagsAndImages[];
};

export interface ContainerState {
  cards: FlatProductsWithTagsAndImages[];
}

export function Container({ data }: Props) {
  {
    const dispatch = useAppDispatch();
    const [cards, setCards] = useState(data);

    useEffect(() => {
      dispatch(setFeaturedCards(cards));
    }, [cards]);

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: FlatProductsWithTagsAndImages[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [
              hoverIndex,
              0,
              prevCards[dragIndex] as FlatProductsWithTagsAndImages,
            ],
          ],
        }),
      );
    }, []);

    const renderCard = useCallback(
      (card: FlatProductsWithTagsAndImages, index: number) => {
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
      },
      [],
    );

    return (
      <>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
          {cards.map((card, i) => renderCard(card, i))}
        </div>
      </>
    );
  }
}
