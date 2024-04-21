import React from 'react'
import { Platform, Text, View } from 'react-native'
import { createStyleSheet, useStyles, UnistylesRuntime, IOSContentSizeCategory, AndroidContentSizeCategory } from 'react-native-unistyles'
import { DemoScreen } from '../components'

enum AppContentSizeCategory {
    xSmall = 'xSmall',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
    xLarge = 'xLarge',
    xxLarge = 'xxLarge',
    xxxLarge = 'xxxLarge'
}

const getUnifiedContentSizeCategory = (contentSizeCategory: IOSContentSizeCategory | AndroidContentSizeCategory) => {
    if (Platform.OS === 'ios') {
        switch (contentSizeCategory as IOSContentSizeCategory) {
            case IOSContentSizeCategory.ExtraSmall:
                return AppContentSizeCategory.xSmall
            case IOSContentSizeCategory.Small:
                return AppContentSizeCategory.Small
            case IOSContentSizeCategory.Medium:
            case IOSContentSizeCategory.AccessibilityMedium:
                return AppContentSizeCategory.Medium
            case IOSContentSizeCategory.Large:
            case IOSContentSizeCategory.AccessibilityLarge:
                return AppContentSizeCategory.Large
            case IOSContentSizeCategory.ExtraLarge:
            case IOSContentSizeCategory.AccessibilityExtraLarge:
                return AppContentSizeCategory.xLarge
            case IOSContentSizeCategory.ExtraExtraLarge:
            case IOSContentSizeCategory.AccessibilityExtraExtraLarge:
                return AppContentSizeCategory.xxLarge
            default:
                return AppContentSizeCategory.xxxLarge
        }
    }

    switch (contentSizeCategory as AndroidContentSizeCategory) {
        case AndroidContentSizeCategory.Small:
            return AppContentSizeCategory.Small
        case AndroidContentSizeCategory.Default:
            return AppContentSizeCategory.Medium
        case AndroidContentSizeCategory.Large:
            return AppContentSizeCategory.Large
        case AndroidContentSizeCategory.ExtraLarge:
            return AppContentSizeCategory.xLarge
        case AndroidContentSizeCategory.Huge:
            return AppContentSizeCategory.xxLarge
        default:
            return AppContentSizeCategory.xxxLarge
    }
}

export const ContentSizeCategoryScreen: React.FunctionComponent = () => {
    const { styles  } = useStyles(stylesheet, {
        contentSizeCategory: getUnifiedContentSizeCategory(UnistylesRuntime.contentSizeCategory)
    })

    return (
        <DemoScreen>
            <View style={styles.container}>
                <Text style={styles.text}>
                    My device is using the {UnistylesRuntime.contentSizeCategory} size.
                </Text>
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
        rowGap: 20,
        variants: {
            contentSizeCategory: {
                xSmall: {
                    padding: 2,
                    backgroundColor: '#FDA7DF'
                },
                Small: {
                    padding: 4,
                    backgroundColor: '#D980FA'
                },
                Medium: {
                    padding: 8,
                    backgroundColor: '#ED4C67'
                },
                Large: {
                    padding: 16,
                    backgroundColor: '#B53471'
                },
                xLarge: {
                    padding: 32,
                    backgroundColor: '#833471'
                },
                xxLarge: {
                    padding: 64,
                    backgroundColor: '#6F1E51'
                },
                xxxLarge: {
                    padding: 128,
                    backgroundColor: '#5B2C6F'
                }
            }
        }
    },
    text: {
        textAlign: 'center',
        color: theme.colors.typography
    }
}))
