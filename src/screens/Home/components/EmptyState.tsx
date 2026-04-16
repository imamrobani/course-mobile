import React from 'react';
import { Text, View } from '@components';
import styles from './styles';

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Text type="body1SemiBold">No courses found</Text>
    <Text type="body2Regular" color="NEUTRAL_70" center>
      Coba ubah keyword pencarian atau kategori.
    </Text>
  </View>
);

export default EmptyState;
