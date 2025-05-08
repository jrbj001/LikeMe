import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

export default function TermosDeUso() {
  const [aceito, setAceito] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSubmit = () => {
    if (aceito) {
      navigation.replace('AbreAmaninese');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.logoText}>
        <Text style={styles.whiteText}>like</Text>
        <Text style={[styles.greenText, styles.bold]}>me</Text>
      </Text>

      {/* Título */}
      <Text style={styles.title}>Terms of use</Text>
      <Text style={styles.subtitle}>and <Text style={styles.greenItalic}>data security</Text></Text>

      {/* Conteúdo com scroll vertical */}
      <ScrollView style={styles.termsBox} showsVerticalScrollIndicator={true}>
        <Text style={styles.termsText}>
          Bem-vindo ao Like Me!{"\n\n"}
          Ao utilizar este aplicativo, você concorda com os seguintes Termos de Uso e nossa Política de Privacidade:{"\n\n"}
          1. Coleta e Uso de Dados: Suas informações pessoais e de saúde serão utilizadas apenas para personalizar sua experiência e sugerir estratégias para seu bem-estar. Não compartilhamos seus dados com terceiros sem seu consentimento.{"\n\n"}
          2. Segurança: Seus dados são armazenados de forma segura e protegidos por criptografia. Recomendamos que você mantenha seu dispositivo protegido e não compartilhe suas credenciais.{"\n\n"}
          3. Responsabilidade: O Like Me oferece sugestões de saúde e bem-estar, mas não substitui acompanhamento médico profissional. Sempre consulte um especialista para decisões relacionadas à sua saúde.{"\n\n"}
          4. Alterações: Podemos atualizar estes termos periodicamente. Notificaremos você sobre mudanças importantes através do próprio aplicativo.{"\n\n"}
          5. Contato: Em caso de dúvidas, entre em contato pelo e-mail suporte@likeme.com.{"\n\n"}
          Ao continuar, você declara estar de acordo com estes termos e com a nossa política de privacidade.
        </Text>
      </ScrollView>

      {/* Checkbox */}
      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={aceito}
          onPress={() => setAceito(!aceito)}
          checkedColor="#B4E48E"
          containerStyle={styles.checkbox}
        />
        <Text style={styles.checkboxLabel}>I agree to the terms of use of Like Me.</Text>
      </View>

      {/* Botão */}
      <TouchableOpacity
        style={[styles.button, !aceito && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!aceito}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1D23',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  logoText: {
    fontSize: 24,
    marginBottom: 32,
    textAlign: 'left',
    marginTop: 8,
  },
  whiteText: {
    color: '#FFFFFF',
    fontFamily: 'Replica-Regular',
  },
  greenText: {
    color: '#B4E48E',
    fontFamily: 'Replica-Bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 0,
  },
  subtitle: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 24,
  },
  greenItalic: {
    color: '#B4E48E',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  termsBox: {
    borderRightWidth: 2,
    borderColor: '#B4E48E',
    paddingRight: 16,
    marginBottom: 12,
    maxHeight: 420,
  },
  termsText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    width: '100%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  checkbox: {
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkboxLabel: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#B4E48E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: '#7fa36a',
  },
  buttonText: {
    color: '#0A1D23',
    fontSize: 20,
  },
}); 