import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { styles } from './styles';
import { Product, ProductProps } from '../Product';

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection('products')
      .orderBy('quantity')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as ProductProps[];

        setProducts(data);
      });

    return () => subscribe();
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}

/**
 * .where = é usado para fazer filtros;
 * .limit = usado para quando vc quer limitar a quantidade de coisas mostradas na tela;
 * .onSnapshot = usado para atualizar a tela quando ouver mudanças;
 * .orderBy = usado para ordernar as consultas por ordem asc ou desc, por padrão do menor pro maior
 * o .startAt e o .endAt são usados para o intervalo de consultas e o StartAfter conta a partido do numero depois dele e o endBeroe antes do numero dele
 */