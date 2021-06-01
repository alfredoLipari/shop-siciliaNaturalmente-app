import React from 'react'
import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import { useDispatch } from 'react-redux'
import * as errorActions from '../../store/actions/error'
import CancelIcon from '../../assets/photo/cancel'
import error from '../../store/reducers/error'

const ErrorModal = ({ payload }) => {
  const dispatch = useDispatch()
  console.log(payload.id)
  return (
    <View style={styles.modalContainer}>
      <View style={{ flex: 4 }}></View>
      <View style={styles.childContainer}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>{payload.id}</Text>
          <Pressable onPress={() => dispatch(errorActions.clearErrors())}>
            <View>
              <CancelIcon />
            </View>
          </Pressable>
        </View>

        <View style={{ padding: 3 }}>
          <Text style={styles.actionText}>Azione fallita, motivo:</Text>
          {payload.status === 404 || payload.status === 403 ? (
            <Text style={styles.errorMsg}>{payload.msg.error}</Text>
          ) : (
            <Text style={styles.errorMsg}>{payload.msg}</Text>
          )}
        </View>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 20,
    paddingBottom: 30,
    height: '50%',
  },
  childContainer: {
    backgroundColor: '#fef6e4',
    borderRadius: 20,
    flex: 1,
    borderColor: '#f3d2c1',
    borderWidth: 2,
  },
  heading: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 3,
  },
  headingText: {
    fontFamily: 'Inter_600SemiBold',
    color: '#F91414',
  },
  actionText: {
    alignSelf: 'center',
    fontFamily: 'Inter_400Regular',
    color: '#001858',
    marginTop: 15,
  },
  errorMsg: {
    alignSelf: 'center',
    fontFamily: 'Inter_600SemiBold',
    color: '#001858',
    marginTop: 5,
  },
  line: {
    borderWidth: 1,
    borderColor: '#f3d2c1',
    marginVertical: 3,
  },
})

export default ErrorModal
