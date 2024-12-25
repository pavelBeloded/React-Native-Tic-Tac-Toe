import { useState } from "react";
import { SafeAreaView, StatusBar, Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import { Icon, Snackbar } from 'react-native-paper';
import Icons from "@/components/icons";
export default function Index() {

  const [isCross, setIsCross] = useState<boolean>(true)
  const [gameWinner, setGameWinner] = useState<string>('')
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9))

  const [visible, setVisible] = useState(false);

  function reloadGame() {
    setIsCross(true)
    setGameWinner('')
    setGameState(new Array(9).fill('empty', 0, 9))
  }

  function checkWinner() {
    if (gameState[0] != 'empty' &&
      gameState[0] == gameState[1] &&
      gameState[0] == gameState[2]
    ) {
      setGameWinner(`${gameState[0]} won the game!`)
    } else if (gameState[3] != 'empty' &&
      gameState[3] == gameState[4] &&
      gameState[3] == gameState[5]
    ) {
      setGameWinner(`${gameState[3]} won the game!`)
      
    } else if (gameState[6] != 'empty' &&
      gameState[6] == gameState[7] &&
      gameState[6] == gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game!`)

    } else if (gameState[0] != 'empty' &&
      gameState[0] == gameState[3] &&
      gameState[0] == gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game!`)
    } else if (gameState[1] != 'empty' &&
      gameState[1] == gameState[4] &&
      gameState[1] == gameState[7]
    ) {
      setGameWinner(`${gameState[1]} won the game!`)
    } else if (gameState[2] != 'empty' &&
      gameState[2] == gameState[5] &&
      gameState[2] == gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game!`)
    } else if (gameState[0] != 'empty' &&
      gameState[0] == gameState[4] &&
      gameState[0] == gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game!`)
    } else if (gameState[2] != 'empty' &&
      gameState[2] == gameState[4] &&
      gameState[2] == gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game!`)
    } else if (!gameState.includes('empty')) {
      setGameWinner('Draw game...')
    }
  }

  const onDismissSnackBar = () => setVisible(false);

  function onChangeItem(itemNumber: number) {
    if(gameWinner) {
      return <Snackbar
      style={styles.snackbar}
      visible={visible}
      onDismiss={onDismissSnackBar}
      duration={5000}
      action={{
        label: 'Close',
      }}>
      ${gameWinner}
    </Snackbar>
    }

    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross' : 'circle'
      setIsCross(!isCross)
    } else {
      return <Snackbar
      style={styles.snackbar}
      visible={visible}
      onDismiss={onDismissSnackBar}
      duration={5000}
      action={{
        label: 'Close',
      }}>
      Field is not empty!!
    </Snackbar>
    }

    checkWinner()

  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#1e1e1e"}/>
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerText}>{gameWinner}</Text>
        </View>
      ) : (
        <View style={[styles.playerInfo, isCross ? styles.playerX : styles.playerO]}>
          <Text style={styles.gameTurnText}>
            Player {isCross ? 'X' : 'O'} 's Turn
          </Text>
        </View>
      )}

      <FlatList
      numColumns={3}
      data={gameState}
      style={styles.grid}
      contentContainerStyle={styles.gridContent}
      renderItem={({item, index})=> (
          <Pressable
          key={index}
          style={styles.card}
          onPress={()=> onChangeItem(index)}
          >
           <Icons name={item}/>
          </Pressable>
  )}
      />
      <Pressable
      style={styles.gameBtn}
      onPress={reloadGame}
      >
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start new game' : 'Reload the game'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    padding: 16,
    justifyContent: "center",
  },
  playerInfo: {
    marginVertical: 20,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#444444",
  },
  winnerInfo: {
    backgroundColor: "#28a745",
  },
  winnerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  playerX: {
    backgroundColor: "#007bff",
  },
  playerO: {
    backgroundColor: "#dc3545",
  },
  gameTurnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  grid: {
    marginVertical: 20, // Только внешний отступ
  },
  gridContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems:'center' // Центровка элементов внутри сетки
  },
  card: {
    width: 100,
    height: 100,
    margin: 5,
    backgroundColor: "#3a3a3a",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    elevation: 5, // Тень для Android
    shadowColor: "#000", // Тень для iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  gameBtn: {
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#007bff",
  },
  gameBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  snackbar: {
    backgroundColor: "#323232",
    color: "#fff",
  },
});


