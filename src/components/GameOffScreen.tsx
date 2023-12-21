import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, Button, Alert , ImageBackground} from 'react-native';
import { VStack, HStack, Flex } from "react-native-flex-layout";
import checkWinner from './GameLocal/checkWinner';

function Box({ value, onPress, highlighted, disabled }) {

  return (
    <TouchableOpacity disabled={disabled? true : false} onPress={onPress}>
      <Flex w={80}
        h={80}
        center
        style={{ backgroundColor: highlighted ? 'lightblue' : "#E1E6E6" , borderRadius: 10}}>

        <Text style={{ fontSize: 51, color: '#00BFFF' }}>{value}</Text>
      </Flex>
    </TouchableOpacity>
  );
}

function GameOffScreen() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [highlighted, setHighlighted] = useState([]);
  const [winner, setWinner] = useState(null);
  const [player1, setPlayer1] = useState(0)
  const [player2, setPlayer2] = useState(0)

  const handlePress = (index) => {
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    const winnerLine = checkWinner(newBoard);
    if (winnerLine) {
      setHighlighted(winnerLine);
      setWinner(currentPlayer);
      if(currentPlayer == 'X'){
        setPlayer1(player1+20)
      }else{
        setPlayer2(player2+20)
      }
      Alert.alert(currentPlayer + " won");
    }
    else {
      setCurrentPlayer(prev => prev == "X" ? "O" : "X");
    }
  };

  const getBox = (index) => (
    <Box value={board[index]}
      onPress={() => handlePress(index)}
      highlighted={highlighted.includes(index)}
      disabled={winner || board[index]}
    />
  )
  const handleReset = () => {
    setCurrentPlayer("X");
    setBoard(Array(9).fill(null));
    setHighlighted([]);
    setWinner(null);
  }
  return (
    <ImageBackground style={{flex: 1}} source={require('../assets/bg.png')}>
      <View style={{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 20
      }}>
          <Text style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 18
          }}>Player 1 : <Text style={{color: 'green'}}>{player1}</Text></Text>
          <Text style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 18
          }}><Text style={{color: 'green'}}>{player2}</Text> : Player2</Text>
      </View>
      <VStack fill spacing={5} center>
        <View style={{paddingBottom: 40}}>
          <Text style={{ 
            fontSize: 36, 
            alignSelf: 'center', 
            color: '#00FFFF', 
            fontWeight: 'bold', 
            backgroundColor: '#B8B8B8',
            padding: 10,
            borderRadius: 10
          }}>{currentPlayer} to play</Text>
        </View>
        <HStack spacing={5} shouldWrapChildren>
          {getBox(0)}
          {getBox(1)}
          {getBox(2)}
        </HStack>
        <HStack spacing={5} shouldWrapChildren>
          {getBox(3)}
          {getBox(4)}
          {getBox(5)}
        </HStack>
        <HStack spacing={5} shouldWrapChildren>
          {getBox(6)}
          {getBox(7)}
          {getBox(8)}
        </HStack>
        <Button title="Reset" onPress={handleReset} style={{ width: 260 }} />
      </VStack>
    </ImageBackground>
  );
}



export default GameOffScreen;