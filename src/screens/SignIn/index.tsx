import React, { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignInAnonymously() {
    const { user } = await auth().signInAnonymously();

    console.log(user);
  }

  function handleCreatedUserAccount() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => { Alert.alert('Usuário criado com sucesso!') })
      .catch(error => {
        console.log(error.code);
        if (error.code === 'auth/email-already-in-use') {
          return Alert.alert('Este e-mail já está em uso. Escolhe outro e-mail para cadastrar!')
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('E-mail inválido!');
        }

        if (error.code === 'auth/weak-password') {
          Alert.alert('A senha deve ter no mínimo 6 dígitos.');
        }
      })
  }

  function handleSignInWithEmailAndPassword() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        console.log(user);
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          Alert.alert('Usuário não encontrado. Em-mail e/ou senha inválida!')
        }
      })
  }

  function handleForgotPassword() {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Enviamos um link o seu email, para você redefinir sua senha.')
      })
  }

  return (
    <Container>
      <Title>MyList</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText title="Criar minha conta" onPress={handleCreatedUserAccount} />
      </Account>
    </Container>
  );
}