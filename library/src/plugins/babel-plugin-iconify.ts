import type * as b from '@babel/core';
import type * as t from '@babel/types';
import type * as i from '@iconify/react/dist/iconify.js';

import {getIconData, stringToIcon} from '@iconify/utils';
import {locate} from '@iconify/json';

const TIP = '\nBrowse all available icons at\nhttps://icones.js.org';

export default (babel: typeof b): b.PluginObj => {
  const {types: t} = babel;
  const isIcon = (n: t.JSXIdentifier | t.JSXMemberExpression | t.JSXNamespacedName):
    n is t.JSXIdentifier => t.isJSXIdentifier(n) && n.name === 'Icon';

  return {
    name: 'react-native-iconify',
    visitor: {
      JSXElement(path: b.NodePath<t.JSXElement>) {
        const {openingElement} = path.node;
        const tagName = openingElement.name;

        // Do nothing if the tag name is not 'Icon'
        if (!isIcon(tagName)) return;
    
        // Get the icon from the 'name' prop
        let iconName: string | undefined;
        const iconProp = openingElement.attributes.find((n):
          n is t.JSXAttribute => t.isJSXAttribute(n) && n.name.name === 'name');
        if (iconProp?.value?.type === 'StringLiteral') {
          iconName = iconProp.value.value;
        } else if (iconProp?.value?.type === 'JSXExpressionContainer'
        && iconProp.value.expression.type === 'StringLiteral') {
          iconName = iconProp.value.expression.value;
        }

        // Check if the 'name' prop is an explicit string
        if (!iconName) {
          throw new Error(`Iconify: Prop "name" must be a string literal`);
        }

        // Convert the icon name to an icon object
        const icon = stringToIcon(iconName);
        if (!icon) {
          throw new Error(`Iconify: Failed to find the icon "${iconName}"${TIP}`);
        }
        
        // Load the icon set
        const filename = locate(icon.prefix);
        let iconAsJson: i.IconifyJSON;
        try {
          iconAsJson = require(filename.toString());
        } catch (error) {
          throw new Error(`Iconify: Failed to find the icon set "${icon.prefix}"${TIP}`);
        }

        // Get the icon data
        const iconData = getIconData(iconAsJson, icon.name);
        if (!iconData) {
          throw new Error(`Iconify: Failed to find the icon data for "${iconName}"${TIP}`);
        }

        // Create the icon data object
        const iconDataExpression = [t.objectProperty(
          t.stringLiteral('body'),
          t.stringLiteral(iconData.body)
        )];

        // Add the width to the icon data object
        if (iconData.width) {
          iconDataExpression.push(t.objectProperty(
            t.stringLiteral('width'),
            t.numericLiteral(iconData.width)
          ));
        }

        // Add the height to the icon data object
        if (iconData.height) {
          iconDataExpression.push(t.objectProperty(
            t.stringLiteral('height'),
            t.numericLiteral(iconData.height)
          ));
        }

        // Add the iconData prop to the opening element
        openingElement.attributes.push(t.jSXAttribute(
          t.jSXIdentifier('iconData'),
          t.jSXExpressionContainer(t.objectExpression(iconDataExpression))
        ));

        // Add the hasPlugin prop to the opening element
        openingElement.attributes.push(t.jSXAttribute(
          t.jSXIdentifier('hasPlugin'),
          t.jSXExpressionContainer(t.booleanLiteral(true))
        ));
      },
    },
  };
}
