import type * as b from '@babel/core';
import type * as t from '@babel/types';

import {getIconFromJSX, getIconifyData} from './utils';

export default (babel: typeof b): b.PluginObj => {
  const {types: t} = babel;

  return {
    name: 'iconify-transform',
    visitor: {
      JSXElement(path: b.NodePath<t.JSXElement>) {
        // Get the icon object (if any)
        const icon = getIconFromJSX(path.node, t);
        if (!icon) return;

        // Load the icon data (if any)
        const data = getIconifyData(icon);
        if (!data) return;

        // Create the icon data object
        const dataExpression = [t.objectProperty(
          t.stringLiteral('body'),
          t.stringLiteral(data.body)
        )];

        // Add the width to the icon data object
        if (data.width) {
          dataExpression.push(t.objectProperty(
            t.stringLiteral('width'),
            t.numericLiteral(data.width)
          ));
        }

        // Add the height to the icon data object
        if (data.height) {
          dataExpression.push(t.objectProperty(
            t.stringLiteral('height'),
            t.numericLiteral(data.height)
          ));
        }

        // Add the iconData prop to the opening element
        path.node?.openingElement?.attributes.push(t.jSXAttribute(
          t.jSXIdentifier('iconData'),
          t.jSXExpressionContainer(t.objectExpression(dataExpression))
        ));
      },
    },
  };
}
