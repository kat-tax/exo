import React from 'react'
import { Text, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { DemoScreen } from '../components'

export const WithBreakpointsScreen: React.FunctionComponent = () => {
    const { styles, breakpoint } = useStyles(stylesheet)

    return (
        <DemoScreen>
            <View style={styles.container}>
                <Text style={styles.text}>
                    This demo has registered breakpoints. Try to change the orientation of your device or resize the window.
                </Text>
                <Text style={styles.text}>
                    The current breakpoint is: {breakpoint}
                </Text>
                <View style={styles.box} />
            </View>
        </DemoScreen>
    )
}

const stylesheet = createStyleSheet(theme => ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: theme.colors.backgroundColor,
        rowGap: 20
    },
    text: {
        textAlign: 'center',
        color: theme.colors.typography
    },
    box: {
        width: 100,
        height: 100,
        borderRadius: {
            sm: 50,
            lg: 0
        },
        backgroundColor: theme.colors.accent
    }
}))
