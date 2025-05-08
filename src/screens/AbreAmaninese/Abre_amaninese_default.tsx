import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import questions from './questions.json';

const { width } = Dimensions.get('window');

// Tipos
type QuestionType = 'open' | 'single' | 'multiple';

interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
}

interface Answers {
  [key: number]: string | string[];
}

export const Abre_amaninese_default = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const question = questions[current];

  // Handlers para respostas
  const handleOpenChange = (text: string) => {
    setAnswers({ ...answers, [question.id]: text });
  };

  const handleSingleChange = (option: string) => {
    setAnswers({ ...answers, [question.id]: option });
  };

  const handleMultipleChange = (option: string) => {
    const prev = (answers[question.id] as string[]) || [];
    if (prev.includes(option)) {
      setAnswers({ ...answers, [question.id]: prev.filter((o: string) => o !== option) });
    } else {
      setAnswers({ ...answers, [question.id]: [...prev, option] });
    }
  };

  // Navegação
  const next = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };
  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };
  const finish = async () => {
    try {
      await AsyncStorage.setItem('@likeme_answers', JSON.stringify(answers));
    } catch (e) {
      console.error('Erro ao salvar respostas:', e);
    }
    navigation.replace('Abre_documents');
  };

  // Renderização dos tipos de pergunta
  const renderOptions = () => {
    if (question.type === 'single' && question.options) {
      return question.options.map((opt: string, idx: number) => (
        <TouchableOpacity
          key={idx}
          style={styles.optionRow}
          onPress={() => handleSingleChange(opt)}
        >
          <View style={[styles.radio, answers[question.id] === opt && styles.radioSelected]} />
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ));
    }
    if (question.type === 'multiple' && question.options) {
      return question.options.map((opt: string, idx: number) => (
        <TouchableOpacity
          key={idx}
          style={styles.optionRow}
          onPress={() => handleMultipleChange(opt)}
        >
          <View style={[styles.checkbox, (answers[question.id] as string[])?.includes(opt) && styles.checkboxSelected]} />
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ));
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topBar}>
        <Text style={styles.logoText}>
          <Text style={styles.whiteText}>like</Text>
          <Text style={styles.greenText}>me</Text>
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('MarketplaceScreen')}>
          <Text style={styles.skipText}>Skip step</Text>
        </TouchableOpacity>
      </View>

      {/* Slogan */}
      <View style={styles.sloganContainer}>
        <Text style={styles.sloganText}>
          <Text style={styles.sloganBold}>We want to get to know you{"\n"}</Text>
          <Text style={styles.sloganGreenItalic}>better to suggest the best{"\n"}</Text>
          <Text style={styles.sloganBold}>strategy for your goals.</Text>
        </Text>
      </View>

      {/* Pergunta */}
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.questionText}>{question.question}</Text>
        {question.type === 'open' && (
          <TextInput
            style={styles.input}
            placeholder="Digite sua resposta..."
            placeholderTextColor="#AAA"
            value={answers[question.id] as string || ''}
            onChangeText={handleOpenChange}
          />
        )}
        {renderOptions()}
      </ScrollView>

      {/* Paginação e botões */}
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {questions.map((_, idx) => (
            <View
              key={idx}
              style={[styles.dot, idx === current && styles.dotActive]}
            />
          ))}
        </View>
        <View style={styles.footerButtons}>
          {current > 0 && (
            <TouchableOpacity style={styles.prevButton} onPress={prev}>
              <Text style={styles.prevButtonText}>Anterior</Text>
            </TouchableOpacity>
          )}
          {current < questions.length - 1 ? (
            <TouchableOpacity style={styles.nextButton} onPress={next}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.nextButton} onPress={finish}>
              <Text style={styles.nextButtonText}>Finalizar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1D23',
    paddingTop: 40,
    paddingHorizontal: 20,
    position: 'relative',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 19,
    marginBottom: 24,
  },
  logoText: {
    fontSize: 20,
  },
  whiteText: {
    color: '#FFFFFF',
    fontFamily: 'Replica-Regular',
  },
  greenText: {
    color: '#B4E48E',
    fontFamily: 'Replica-Bold',
    fontWeight: 'bold',
  },
  skipText: {
    fontFamily: 'Roboto',
    fontSize: 13,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    letterSpacing: 0.1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 40,
  },
  questionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
    textAlign: 'left',
    marginTop: 38,
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#1A2A2F',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 24,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#B4E48E',
    backgroundColor: 'transparent',
  },
  radioSelected: {
    backgroundColor: '#B4E48E',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#B4E48E',
    backgroundColor: 'transparent',
  },
  checkboxSelected: {
    backgroundColor: '#B4E48E',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 76,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2C3A3F',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#B4E48E',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#B4E48E',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 28,
    marginLeft: 8,
  },
  nextButtonText: {
    color: '#0A1D23',
    fontWeight: 'bold',
    fontSize: 16,
  },
  prevButton: {
    backgroundColor: '#2C3A3F',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 8,
  },
  prevButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  sloganContainer: {
    marginBottom: 32,
    marginTop: 8,
  },
  sloganText: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 26,
  },
  sloganBold: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sloganGreenItalic: {
    color: '#B4E48E',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
}); 