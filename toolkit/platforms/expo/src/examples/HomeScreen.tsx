import React, { useEffect } from 'react'
import { UnistylesRegistry, UnistylesRuntime } from 'react-native-unistyles'
import type { UnistylesThemes } from 'react-native-unistyles'
import { useNavigation } from '@react-navigation/native'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DemoGroup, DemoLink } from '../components'
import { DemoNames, isWeb } from '../common'
import type { NavigationProps } from '../common'
import { breakpoints, darkTheme, lightTheme, premiumTheme } from '../styles'
import { autoGuidelinePlugin } from '../plugins'

export const HomeScreen = () => {
    const navigation = useNavigation<NavigationProps>()
    const { top } = useSafeAreaInsets()

    useEffect(() => {
        if (isWeb) {
            console.log('Warnings about deprecated syntax comes from StyleSheet.create. Unistyles 🦄 will handle it for you!')
        }
    }, [])

    return (
        <View
            style={{
                ...styles.container,
                paddingTop: top
            }}
        >
            <ScrollView contentContainerStyle={styles.list}>
                <View style={styles.titleContainer}>
                    <Text style={styles.unicorn}>
                        🦄
                    </Text>
                    <Text style={styles.header}>
                        Welcome to Unistyles 2.0!
                    </Text>
                    <Text style={styles.text}>
                        / Select demo /
                    </Text>
                </View>
                <DemoGroup title="Themes">
                    <DemoLink
                        description="No themes"
                        onPress={() => navigation.navigate(DemoNames.NoThemes)}
                    />
                    <DemoLink
                        description="Single theme"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme
                                    // we need to cast it to UnistylesThemes as we already registered 3 themes with TypeScript under styles/index.ts,
                                    // but we want to demonstrate how to register a single theme
                                } as UnistylesThemes)

                            navigation.navigate(DemoNames.SingleTheme)
                        }}
                    />
                    <DemoLink
                        description="Two themes"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    premium: premiumTheme
                                    // we need to cast it to UnistylesThemes as we already registered 3 themes with TypeScript under styles/index.ts,
                                    // but we want to demonstrate how to register two themes
                                } as UnistylesThemes)
                                .addConfig({
                                    initialTheme: 'light'
                                })

                            navigation.navigate(DemoNames.TwoThemes)
                        }}
                    />
                    <DemoLink
                        description="Light/Dark themes"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme
                                    // we need to cast it to UnistylesThemes as we already registered 3 themes with TypeScript under styles/index.ts,
                                    // but we want to demonstrate how to register two themes
                                } as UnistylesThemes)
                                .addConfig({
                                    adaptiveThemes: true
                                })

                            navigation.navigate(DemoNames.LightDarkThemes)
                        }}
                    />
                    <DemoLink
                        description="Multiple themes"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })

                            navigation.navigate(DemoNames.MultipleThemes)
                        }}
                    />
                    <DemoLink
                        description="Multiple themes and adaptive modes"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })
                                .addConfig({
                                    adaptiveThemes: true
                                })

                            navigation.navigate(DemoNames.MultipleThemesAdaptive)
                        }}
                    />
                    <DemoLink
                        description="Update theme at runtime"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })
                                .addConfig({
                                    adaptiveThemes: true
                                })

                            navigation.navigate(DemoNames.UpdateTheme)
                        }}
                    />
                </DemoGroup>
                <DemoGroup title="Breakpoints">
                    <DemoLink
                        description="No breakpoints"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })

                            navigation.navigate(DemoNames.NoBreakpoints)
                        }}
                    />
                    <DemoLink
                        description="With breakpoints"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })
                                .addBreakpoints(breakpoints)
                                .addConfig({
                                    adaptiveThemes: true
                                })

                            navigation.navigate(DemoNames.WithBreakpoints)
                        }}
                    />
                    <DemoLink
                        description="With orientation breakpoints"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })
                                .addConfig({
                                    adaptiveThemes: true
                                })

                            navigation.navigate(DemoNames.OrientationBreakpoints)
                        }}
                    />
                </DemoGroup>
                <DemoGroup title="Media queries">
                    <DemoLink
                        description="Width and Height"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })
                                .addBreakpoints(breakpoints)
                                .addConfig({
                                    adaptiveThemes: true
                                })

                            navigation.navigate(DemoNames.MediaQueriesWidthHeight)
                        }}
                    />
                    <DemoLink
                        description="Mixed with breakpoints"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })
                                .addBreakpoints(breakpoints)
                                .addConfig({
                                    adaptiveThemes: true
                                })

                            navigation.navigate(DemoNames.MixedMediaQueries)
                        }}
                    />
                    {isWeb && (
                        <DemoLink
                            description="CSS Media Queries"
                            onPress={() => {
                                UnistylesRegistry
                                    .addThemes({
                                        light: lightTheme,
                                        dark: darkTheme,
                                        premium: premiumTheme
                                    })
                                    .addBreakpoints(breakpoints)
                                    .addConfig({
                                        adaptiveThemes: true,
                                        experimentalCSSMediaQueries: true
                                    })

                                navigation.navigate(DemoNames.WebMediaQueriesScreen)
                            }}
                        />
                    )}
                </DemoGroup>
                <DemoGroup title="Variants">
                    <DemoLink
                        description="With selected variant"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })
                                .addBreakpoints(breakpoints)
                                .addConfig({
                                    adaptiveThemes: true
                                })

                            navigation.navigate(DemoNames.Variants)
                        }}
                    />
                    <DemoLink
                        description="Default variant"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })
                                .addBreakpoints(breakpoints)
                                .addConfig({
                                    adaptiveThemes: true
                                })

                            navigation.navigate(DemoNames.DefaultVariant)
                        }}
                    />
                    <DemoLink
                        description="Boolean variants"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })
                                .addBreakpoints(breakpoints)
                                .addConfig({
                                    adaptiveThemes: true
                                })

                            navigation.navigate(DemoNames.BooleanVariants)
                        }}
                    />
                </DemoGroup>
                <DemoGroup title="Plugins">
                    <DemoLink
                        description="Auto guideline"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })
                                .addBreakpoints(breakpoints)
                                .addConfig({
                                    adaptiveThemes: true,
                                    // plugin can be registry enabled
                                    plugins: UnistylesRuntime.enabledPlugins.includes(autoGuidelinePlugin.name)
                                        ? []
                                        : [autoGuidelinePlugin]
                                })

                            navigation.navigate(DemoNames.AutoGuidelinePlugin)
                        }}
                    />
                    <DemoLink
                        description="High contrast"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })
                                .addBreakpoints(breakpoints)
                                .addConfig({
                                    adaptiveThemes: true
                                })

                            navigation.navigate(DemoNames.HighContrastPlugin)
                        }}
                    />
                </DemoGroup>
                <DemoGroup title="Runtime">
                    <DemoLink
                        description="Runtime values"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })
                                .addBreakpoints(breakpoints)
                                .addConfig({
                                    initialTheme: 'light'
                                })

                            navigation.navigate(DemoNames.Runtime)
                        }}
                    />
                    <DemoLink
                        description="With StyleSheet"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })
                                .addBreakpoints(breakpoints)
                                .addConfig({
                                    initialTheme: 'light'
                                })

                            navigation.navigate(DemoNames.RuntimeWithStyleSheet)
                        }}
                    />
                </DemoGroup>
                <DemoGroup title="Other">
                    <DemoLink
                        description="Memoization"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })
                                .addBreakpoints(breakpoints)
                                .addConfig({
                                    initialTheme: 'light'
                                })

                            navigation.navigate(DemoNames.MemoizationScreen)
                        }}
                    />
                    <DemoLink
                        description="Content Size Category"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })
                                .addBreakpoints(breakpoints)
                                .addConfig({
                                    initialTheme: 'light'
                                })

                            navigation.navigate(DemoNames.ContentSizeCategoryScreen)
                        }}
                    />
                    {!isWeb && (
                        <DemoLink
                            description="PlatformColor"
                            onPress={() => {
                                UnistylesRegistry
                                    .addThemes({
                                        light: lightTheme,
                                        dark: darkTheme,
                                        premium: premiumTheme
                                    })
                                    .addBreakpoints(breakpoints)
                                    .addConfig({
                                        initialTheme: 'light'
                                    })

                                navigation.navigate(DemoNames.PlatformColors)
                            }}
                        />
                    )}
                    <DemoLink
                        description="Compatibility with StyleSheet"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })
                                .addBreakpoints(breakpoints)
                                .addConfig({
                                    initialTheme: 'light'
                                })

                            navigation.navigate(DemoNames.StyleSheet)
                        }}
                    />
                    <DemoLink
                        description="No StyleSheet"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })
                                .addBreakpoints(breakpoints)
                                .addConfig({
                                    initialTheme: 'light'
                                })

                            navigation.navigate(DemoNames.NoStyleSheetScreen)
                        }}
                    />
                    <DemoLink
                        description="Change status/navigation bar color"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })
                                .addBreakpoints(breakpoints)
                                .addConfig({
                                    initialTheme: 'light'
                                })

                            navigation.navigate(DemoNames.AndroidStatusBarNavigationBar)
                        }}
                    />
                </DemoGroup>
                <DemoGroup title="Benchmark">
                    <DemoLink
                        description="Startup time with single theme"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })
                                .addBreakpoints(breakpoints)
                                .addConfig({
                                    initialTheme: 'light'
                                })

                            navigation.navigate(DemoNames.Benchmark)
                        }}
                    />
                    <DemoLink
                        description="Unistyles with all features"
                        onPress={() => {
                            UnistylesRegistry
                                .addThemes({
                                    light: lightTheme,
                                    dark: darkTheme,
                                    premium: premiumTheme
                                })
                                .addBreakpoints(breakpoints)
                                .addConfig({
                                    initialTheme: 'light'
                                })

                            navigation.navigate(DemoNames.BenchmarkAllFeatures)
                        }}
                    />
                </DemoGroup>
                <View style={styles.fakeSpacer} />
            </ScrollView>
        </View>
    )
}

// oh, no! StyleSheet.create in unistyles demo!?
// yup, it's just a wrapper for all the demos, I want to demonstrate startup time
// and I don't want to use unistyles for this screen
// by the way, now you can appreciate what unistyles does for you!
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff9ff3'
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 20
    },
    unicorn: {
        fontSize: 80
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#B53471',
        marginTop: 10
    },
    text: {
        color: '#2f3542',
        fontWeight: 'bold'
    },
    list: {
        marginTop: 50,
        paddingHorizontal: 20
    },
    fakeSpacer: {
        height: 100
    }
})
