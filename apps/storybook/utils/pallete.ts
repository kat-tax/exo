type ColorsScaled = Record<string, Record<string, string>>;
type ColorsBasic = Record<string, string>;
type BasicProps = {title: string, subtitle: string, colors: ColorsBasic};

export function getBasicProps(colors: ColorsBasic): BasicProps {
  const count = Object.keys(colors).length;
  return {
    colors,
    title: 'Basic',
    subtitle: `${count} color${count === 1 ? '' : 's'}`,
  };
}

export function extractBasics(obj: Record<string, string>): ColorsBasic {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const matches = key.match(/^[a-zA-Z]+$/);
    if (matches)
      result[key] = value;
    return result;
  }, {} as ColorsBasic);
}

export function extractScales(obj: Record<string, string>): ColorsScaled {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const matches = key.match(/([a-zA-Z]+)(\d+)/);
    if (matches && matches.length === 3) {
      const [, prefix, number] = matches;
      if (!result[prefix])
        result[prefix] = {};
      result[prefix][number] = value;
    }
    return result;
  }, {} as ColorsScaled);
}
