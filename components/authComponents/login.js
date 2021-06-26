import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Modal,
  ActivityIndicator,
  Platform,
} from 'react-native'
import { Formik } from 'formik'
import { Input, Button } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as userActions from '../../store/actions/user'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomModal from '../../components/CustomModal'
import ErrorModal from './ErrorModal'

const Login = () => {
  const error = useSelector((state) => state.error)
  const isLoading = useSelector((state) => state.user.isLoading)
  const isSignupSuccessful = useSelector(
    (state) => state.user.isSignupSuccessful,
  )
  const [isSignIn, setIsSignIn] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const dispatch = useDispatch()

  /* se la registrazione ha successo fai apparire il Modal */
  useEffect(() => {
    if (isSignupSuccessful) {
      setIsSignIn(true)
      setShowModal(true)
      setTimeout(() => setShowModal(false), 3000)
    }
  }, [isSignupSuccessful])

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
      .required('Password is required'),
  })

  return (
    <KeyboardAwareScrollView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      onPress={() => {
        Keyboard.dismiss()
      }}
      style={styles.screen}
    >
      {isSignIn ? (
        <Text style={styles.heading} testID="login">
          Log In
        </Text>
      ) : (
        <Text style={styles.heading} testID="register">
          Registrati
        </Text>
      )}

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(values) => dispatch(userActions.register(values, isSignIn))}
        validationSchema={loginValidationSchema}
        onPress={Keyboard.dismiss}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          touched,
        }) => (
          <View>
            {/* Se l'utente ha scelto di registrarsi spunta il nome    */}
            {!isSignIn ? (
              <Input
                labelStyle={styles.label}
                style={styles.input}
                placeholder="Nome"
                onChangeText={handleChange('name')}
                leftIcon={
                  <Ionicons
                    name="person-outline"
                    size={22}
                    color={'#001858'}
                  ></Ionicons>
                }
                onBlur={handleBlur('name')}
                value={values.name}
                label="Il tuo nome"
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ color: '#172c66', marginLeft: 5 }}
                placeholderTextColor="#172c66"
              />
            ) : null}
            {/* INPUT EMAIL */}
            <Input
              testId="email"
              labelStyle={styles.label}
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              leftIcon={
                <Ionicons
                  name="mail-outline"
                  size={22}
                  color={'#001858'}
                ></Ionicons>
              }
              onBlur={handleBlur('email')}
              value={values.email}
              label={
                errors.email && !isSignIn && touched.password ? (
                  <Text
                    style={{ fontSize: 14, color: 'red', alignSelf: 'center' }}
                  >
                    {errors.email}
                  </Text>
                ) : (
                  'La tua Email'
                )
              }
              inputContainerStyle={styles.inputContainer}
              inputStyle={{ color: '#172c66', marginLeft: 5 }}
              placeholderTextColor="#172c66"
            />

            {/* END INPUT EMAIL */}

            {/* INPUT PASSWORD */}

            <Input
              labelStyle={styles.label}
              label={
                errors.password && !isSignIn && touched.password ? (
                  <Text
                    style={{ fontSize: 14, color: 'red', alignSelf: 'center' }}
                  >
                    {errors.password}
                  </Text>
                ) : (
                  'La tua Password'
                )
              }
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              leftIcon={
                <Ionicons
                  name="key-outline"
                  size={22}
                  color={'#001858'}
                ></Ionicons>
              }
              inputContainerStyle={styles.inputContainer}
              inputStyle={{ color: '#172c66', marginLeft: 5 }}
              placeholderTextColor="#172c66"
              secureTextEntry
              keyboardType="visible-password"
            />

            {/* END INPUT PASSWORD */}

            {/* Se l'utente ha scelto di registrarsi spunta il confirm password */}
            {!isSignIn ? (
              <Input
                labelStyle={styles.label}
                label="Conferma Password"
                style={styles.input}
                placeholder="Conferma Password"
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                leftIcon={
                  <Ionicons
                    name="key-outline"
                    size={22}
                    color={'#001858'}
                  ></Ionicons>
                }
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ color: '#172c66', marginLeft: 5 }}
                placeholderTextColor="#172c66"
                secureTextEntry
              />
            ) : null}

            {isSignIn ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View>
                  <Text style={styles.subText}>Non hai un account?</Text>
                  <Text
                    onPress={() => setIsSignIn(false)}
                    style={[
                      styles.subText,
                      {
                        textDecorationLine: 'underline',
                        marginBottom: 40,
                        fontFamily: 'Inter_600SemiBold',
                      },
                    ]}
                  >
                    Registrati
                  </Text>
                </View>
                {isLoading ? (
                  <ActivityIndicator
                    size="large"
                    color="#999999"
                    style={{ marginRight: 10 }}
                  />
                ) : (
                  <Button
                    onPress={handleSubmit}
                    title="LOG IN"
                    containerStyle={{
                      width: '40%',
                      marginRight: 10,
                    }}
                    buttonStyle={{ backgroundColor: '#f582ae' }}
                    iconRight={true}
                    icon={
                      <Ionicons
                        name="arrow-forward-outline"
                        size={20}
                        color={'white'}
                      />
                    }
                    titleStyle={{ marginRight: 10 }}
                  />
                )}
              </View>
            ) : (
              /*  REGISTER COMPONENT   */
              <View style={styles.confirmView}>
                <View>
                  <Text style={styles.subText}>Hai già un account?</Text>
                  <Text
                    onPress={() => setIsSignIn(true)}
                    style={[
                      styles.subText,
                      {
                        textDecorationLine: 'underline',
                        marginBottom: 40,
                        fontFamily: 'Inter_600SemiBold',
                      },
                    ]}
                  >
                    Log in
                  </Text>
                </View>
                {isLoading ? (
                  <ActivityIndicator
                    size="large"
                    color="#999999"
                    style={{ marginRight: 10 }}
                  />
                ) : (
                  <Button
                    onPress={handleSubmit}
                    disabled={!isValid}
                    title="SIGN IN"
                    containerStyle={{
                      width: '40%',

                      marginRight: 10,
                    }}
                    buttonStyle={{ backgroundColor: '#f582ae' }}
                    iconRight={true}
                    icon={
                      <Ionicons
                        name="arrow-forward-outline"
                        size={20}
                        color={'white'}
                      />
                    }
                    titleStyle={{ marginRight: 10 }}
                  />
                )}
              </View>
            )}
          </View>
        )}
      </Formik>
      <Modal
        animationType="slide"
        transparent={true}
        visible={error.status === 404 || error.status === 403}
      >
        {(error.status === 404 || error.status === 403) && (
          <ErrorModal payload={error} />
        )}
      </Modal>
      <CustomModal
        showModal={showModal}
        text="Registrazione effettuata"
        theme="rgba(44, 182, 125, 1)"
      />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    width: '80%',
    marginTop: 40,
  },
  heading: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 30,
    color: '#094067',
    marginBottom: 20,
    marginLeft: 8,
  },
  subText: {
    color: '#001858',
    marginLeft: 8,
    marginBottom: 5,
    width: '95%',
  },
  input: {
    width: 100,
  },
  inputContainer: {
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 2,
    borderColor: '#f3d2c1',
    backgroundColor: '#fff8ea',
  },
  label: {
    fontFamily: 'Inter_400Regular',
    fontWeight: '300',
    color: '#001858',
  },
  confirmView: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default Login
