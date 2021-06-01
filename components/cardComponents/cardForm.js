import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import CardButton from './CardButton'

export default class CardForm extends PureComponent {
  state = {
    loading: false,
    token: null,
  }

  render() {
    return (
      <View style={styles.container}>
        <CardButton
          text="Card Details"
          loading={this.state.loading}
          onPress={this.handleCardDetails}
        />
        <View style={styles.token}>
          {token && (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
              }}
            >
              <Text style={styles.tokenLabel}>
                Token: {this.state.token?.tokenId}
              </Text>
              <CardButton text="Make Payment" onPress={this.handlePayment} />
            </View>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenLabel: {
    textAlign: 'center',
    color: '#111',
    marginBottom: 5,
    padding: 5,
  },
})
