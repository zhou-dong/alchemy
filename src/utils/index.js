const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

const guid = () => `${s4()}${s4()}'-'${s4()}'-'${s4()}'-'${s4()}'-'${s4()}${s4()}${s4()}`;

const dynamicWidthHeight = (obj) => {
  const minWidth = 30;
  const minHeight = 30;
  const len = obj.toString().length;
  const width = minWidth + len * 2;
  const height = minHeight + len * 2;
  return { width, height };
};

export { s4, guid, dynamicWidthHeight };
