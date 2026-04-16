import React from 'react';
import { Text, View } from '@components';
import styles from '../styles';

const EmptyState = () => (
  <View style={styles.empty}>
    <Text type="body1SemiBold">No saved courses yet</Text>
    <Text type="body2Regular" color="NEUTRAL_70" center>
      Tap the heart icon on a course to save it.
    </Text>
  </View>
);

export default EmptyState;
