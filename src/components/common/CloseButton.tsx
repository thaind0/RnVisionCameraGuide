import React from 'react';
import {Button, ButtonProps} from 'react-native';

interface CloseButtonProps extends Omit<ButtonProps, 'title'> {}

const CloseButton = (props: CloseButtonProps) => {
  return <Button {...props} title="Close" />;
};

export default CloseButton;
