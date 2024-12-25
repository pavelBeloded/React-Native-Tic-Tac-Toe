import React from "react";
import type { PropsWithChildren } from "react";
import { Icon } from "react-native-paper";
import { View, StyleSheet } from "react-native";

type IconProps = PropsWithChildren<{
    name: string
}>

export default function Icons({ name }: IconProps) {
    return (
      <View style={styles.iconContainer}>
        {(() => {
          switch (name) {
            case "circle":
              return (
                <Icon
                  source="circle-outline"
                  size={50}
                  color="#FFD700" // Золотой цвет для круга
                />
              );
            case "cross":
              return (
                <Icon
                  source="close-thick"
                  size={50}
                  color="#FF6347" // Томато-красный для креста
                />
              );
            default:
              return (
                <Icon
                  source="dots-horizontal-circle-outline"
                  size={40}
                  color="#B0B0B0" // Серый для пустой ячейки
                />
              );
          }
        })()}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    iconContainer: {
      width: 60, 
      height: 60, 
      justifyContent: "center", 
      alignItems: "center", 
      backgroundColor: "#1C1C1E",
      borderRadius: 12, 
      shadowColor: "#000", 
      shadowOffset: { width: 0, height: 4 }, 
      shadowOpacity: 0.3, 
      shadowRadius: 5, 
      elevation: 6, 
    },
  });