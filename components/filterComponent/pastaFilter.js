import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import {
  Overlay,
  ListItem,
  CheckBox,
  Text,
  Divider,
} from 'react-native-elements'
import { useDispatch } from 'react-redux'
import * as productsActions from '../../store/actions/products'

import LongPastaIcon from '../../assets/longPastaIcon'
import ShortPastaIcon from '../../assets/shortPastaIcon'
import CoinIcon from '../../assets/coinIcon'
import CancelIcon from '../../assets/photo/cancel'
import CircleIcon from '../../assets/circleIcon'

const pastaFilter = (props) => {
  //first call dispatch object
  const dispatch = useDispatch()

  //state for the active filter state
  const [activeFilter, setActiveFilter] = useState('annulla')

  //decide which action take based on the event
  const filterPasta = async (event) => {
    props.setIsVisible()

    switch (event) {
      case 'prezzo':
        setActiveFilter('prezzo')
        return dispatch(productsActions.fetchOneProducts(event, 'prezzo'))
      case 0:
        setActiveFilter(0)
        return dispatch(productsActions.fetchOneProducts(event, 'format'))
      case 1:
        setActiveFilter(1)
        return dispatch(productsActions.fetchOneProducts(event, 'format'))
      case 2:
        setActiveFilter(2)
        return dispatch(productsActions.fetchOneProducts(event, 'format'))
      case 'annulla':
        setActiveFilter('annulla')
        return dispatch(productsActions.fetchProducts())
    }
  }

  const pastaFilter = [
    {
      title: 'Ricerca per prezzo minore',
      event: 'prezzo',
    },
    {
      title: 'Pasta piccola',
      event: 0,
    },
    {
      title: 'Pasta corta',
      event: 1,
    },
    {
      title: 'Pasta lunga',
      event: 2,
    },
    {
      title: 'togli filtro',
      event: 'annulla',
    },
  ]

  return (
    <Overlay
      isVisible={props.visible}
      onBackdropPress={() => props.setIsVisible()}
      overlayStyle={styles.container}
    >
      <View>
        <Text h2 style={styles.h2}>
          Filtra
        </Text>
        <Divider />
        {pastaFilter.map((filter, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress={() => filterPasta(filter.event)}
            containerStyle={
              filter.event === activeFilter ? styles.bg : styles.bg1
            }
          >
            <ListItem.Content
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              {(() => {
                switch (i) {
                  case 0:
                    return <CoinIcon />
                  case 1:
                    return <CircleIcon />
                  case 2:
                    return <ShortPastaIcon />
                  case 3:
                    return <LongPastaIcon />
                  case 4:
                    return <CancelIcon />
                }
              })()}

              <ListItem.Title style={styles.text}>
                {filter.title}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '50%',
    width: '80%',
    position: 'absolute',
    top: 30,
    borderRadius: 25,
  },
  h2: {
    marginLeft: 10,
    color: '#094067',
    marginBottom: 5,
    fontFamily: 'Inter_400Regular',
  },
  text: {
    marginLeft: 10,
    color: '#5f6c7b',
    fontFamily: 'Inter_400Regular',
  },
  bg: {
    backgroundColor: '#d8eefe',
  },
  bg1: {
    backgroundColor: 'white',
  },
})

export default pastaFilter
