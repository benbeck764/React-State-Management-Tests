import { StyledEqualizerBar } from '@/components/common/Equalizer/Equalizer.styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { FC } from 'react';

type EqualizerProps = {
  size?: 'small' | 'large';
};

const Equalizer: FC<EqualizerProps> = (props: EqualizerProps) => {
  const { size = 'small' } = props;

  const sizes = {
    small: { dimension: '14px', barWidth: '2px' },
    large: { dimension: '28px', barWidth: '4px' }
  };

  const { dimension: dimensionSize, barWidth } = sizes[size];

  return (
    <Box sx={{ width: dimensionSize, height: dimensionSize, transform: 'rotate(180deg)' }}>
      <Stack direction="row" gap={barWidth}>
        <StyledEqualizerBar delay={0.1} dimensionSize={dimensionSize} barWidth={barWidth} />
        <StyledEqualizerBar delay={0.2} dimensionSize={dimensionSize} barWidth={barWidth} />
        <StyledEqualizerBar delay={0.4} dimensionSize={dimensionSize} barWidth={barWidth} />
        <StyledEqualizerBar delay={0.9} dimensionSize={dimensionSize} barWidth={barWidth} />
      </Stack>
    </Box>
  );
};

export default Equalizer;
