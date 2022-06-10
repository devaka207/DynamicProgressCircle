//import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';

/**
 * Function that calculates rotation of the semicircle for firstProgressLayer
 * ( when percent is less than equal to 50 ) or for the secondProgressLayer
 * when percent is greater than 50.
 **/


const rotateByStyle = (number, base_degrees, clockwise) => {
  let rotateBy = base_degrees;
  if (clockwise) {
    rotateBy = base_degrees + number * 3.6;
  } else {
    //anti clockwise progress
    rotateBy = base_degrees - number * 3.6;
  }
  return {
    transform: [{ rotateZ: `${rotateBy}deg` }],
  };
};

const renderThirdLayer = (
  number,
  commonStyles,
  ringColorStyle,
  ringBgColorStyle,
  clockwise,
  bgRingWidth,
  progressRingWidth,
  innerRingStyle,
  startDegrees,
) => {
  let rotation = 45 + startDegrees;
  let offsetLayerRotation = -135 + startDegrees;
  if (!clockwise) {
    rotation += 180;
    offsetLayerRotation += 180;
  }
  if (number > 50) {
    /**
     * Third layer circles default rotation is kept 45 degrees for clockwise rotation, so by default it occupies the right half semicircle.
     * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
     * before passing to the rotateByStyle function
     **/

    return (
      
      <View
        style={[
          styles.secondProgressLayer,
          rotateByStyle(number - 50, rotation, clockwise),
          commonStyles,
          ringColorStyle,
        ]}
      />
    );
  } else {
    return (
      <View
        style={[
          styles.offsetLayer,
          innerRingStyle,
          ringBgColorStyle,
          { transform: [{ rotateZ: `${offsetLayerRotation}deg` }] },
        ]}
      />
    );
  }
};

const CircularProgress = ({
  number,
  radius,
  bgRingWidth,
  progressRingWidth,
  ringColor,
  ringBgColor,
  textFontSize,
  textFontWeight,
  textFontColor,
  clockwise,
  bgColor,
  startDegrees,
  cent,
}) => {
  const commonStyles = {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    borderTopWidth: progressRingWidth,
    borderLeftWidth: progressRingWidth,
    borderBottomWidth: progressRingWidth,
    borderRightWidth: progressRingWidth,
  };

  /**
   * Calculate radius for base layer and offset layer.
   * If progressRingWidth == bgRingWidth, innerRadius is equal to radius
   **/
  var [number, onChangeNumber] = React.useState(null);
  useEffect(() => {
    console.log("useeffect",number)
    Object.assign(CircularProgress.defaultProps, 
      {
      number: number,
    })
    // Update the document title using the browser API
  },[number]);

  const widthDiff = progressRingWidth - bgRingWidth;
  const innerRadius = radius - progressRingWidth + bgRingWidth + widthDiff / 2;
  const innerRingStyle = {
    width: innerRadius * 2,
    height: innerRadius * 2,
    borderRadius: innerRadius,
    borderTopWidth: bgRingWidth,
    borderLeftWidth: bgRingWidth,
    borderBottomWidth: bgRingWidth,
    borderRightWidth: bgRingWidth,
  };

  const ringColorStyle = {
    borderRightColor: ringColor,
    borderTopColor: ringColor,
  };

  const ringBgColorStyle = {
    borderRightColor: ringBgColor,
    borderTopColor: ringBgColor,
  };

  const thickOffsetRingStyle = {
    borderRightColor: bgColor,
    borderTopColor: bgColor,
  };
  let rotation = -135 + startDegrees;
  /**
   * If we want our ring progress to be displayed in anti-clockwise direction
   **/
  if (!clockwise) {
    rotation += 180;
  }
  let firstProgressLayerStyle;
  /* when ther ring's border widths are different and percent is less than 50, then we need an offsetLayer
   * before the original offser layer to avoid ring color of the thick portion to be visible in the background.
   */
  let displayThickOffsetLayer = false;
  if (number > 50) {
    firstProgressLayerStyle = rotateByStyle(50, rotation, clockwise);
  } else {
    firstProgressLayerStyle = rotateByStyle(number, rotation, clockwise);
    if (progressRingWidth > bgRingWidth) {
      displayThickOffsetLayer = true;
    }
  }

  let offsetLayerRotation = -135 + startDegrees;
  if (!clockwise) {
    offsetLayerRotation += 180;
  }

  return (
    <View style={styles.centered}>
    <View>
    <TextInput
        style={styles.input}
        onChangeText= {(text)=>{onChangeNumber(text)
          /* cent(number) */
        }}
        value={number}
        keyboardType="numeric"
      />
    </View>
    {console.log('>>> ',number)}
    <View style={[styles.container, { width: radius * 2, height: radius * 2 }]}>
      <View
        style={[
          styles.baselayer,
          innerRingStyle,
          { borderColor: ringBgColor, borderWidth: bgRingWidth },
        ]}
      />
      <View
        style={[
          styles.firstProgressLayer,
          firstProgressLayerStyle,
          commonStyles,
          ringColorStyle,
          {
            borderTopWidth: progressRingWidth,
            borderRightWidth: progressRingWidth,
          },
        ]}
      />
      {displayThickOffsetLayer && (
        <View
          style={[
            styles.offsetLayer,
            commonStyles,
            thickOffsetRingStyle,
            {
              transform: [{ rotateZ: `${offsetLayerRotation}deg` }],
              borderWidth: progressRingWidth,
            },
          ]}
        />
      )}
      {renderThirdLayer(
        number,
        commonStyles,
        ringColorStyle,
        ringBgColorStyle,
        clockwise,
        bgRingWidth,
        progressRingWidth,
        innerRingStyle,
        startDegrees,
      )}
      <Text
        style={[
          styles.display,
          {
            fontSize: textFontSize,
            fontWeight: textFontWeight,
            color: textFontColor,
          },
        ]}>
        {number}%
      </Text>
    </View>
    </View>
    
  );
};

// default values for props
CircularProgress.defaultProps = {
  number: 1,
  radius: 100,
  bgRingWidth: 12,
  progressRingWidth: 12,
  ringColor: '#e7e7e7',
  ringBgColor: 'purple',
  textFontSize: 40,
  textFontColor: 'purple',
  textFontWeight: 'bold',
  clockwise: true,
  bgColor: 'white',
  startDegrees: 0,
  
};

/**
 * offsetLayer has transform:[{rotateZ: '-135deg'}] since
 * the offsetLayer rotation is fixed by us.
 **/
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#ffc2c2",
  },
  input: {
    height: 60,
    margin: 42,
    borderWidth: 1,
    padding: 10,
  },
  baselayer: {
    position: 'absolute',
  },
  firstProgressLayer: {
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  secondProgressLayer: {
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  offsetLayer: {
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  display: {
    position: 'absolute',
  },
});

export default CircularProgress;