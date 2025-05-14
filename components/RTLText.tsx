import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

const RTLText = (props: TextProps) => {
  const { style, ...remainingProps } = props;
  const combinedStyle: StyleProp<TextStyle> = [{ textAlign: 'right' }, style];

  return <Text style={combinedStyle} {...remainingProps} />;
};

export default RTLText;