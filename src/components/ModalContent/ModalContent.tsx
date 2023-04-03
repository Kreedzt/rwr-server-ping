import { Box, useTheme } from "@suid/material";
import { Component, JSX, JSXElement } from 'solid-js';

interface ModalContentProps {
  children: JSX.Element;
}

function ModalContent(props: ModalContentProps) {
  const { children } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: '24px',
        p: 4,
      }}
    >
      {children}
    </Box>
  );
}

export default ModalContent;
