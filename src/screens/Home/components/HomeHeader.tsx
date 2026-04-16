import React from 'react';
import { Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, TextInput, View } from '@components';
import { Colors } from '@constants';
import styles from './styles';

type Props = {
  query: string;
  onChangeQuery: (text: string) => void;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  allKey?: string;
};

const HomeHeader = ({
  query,
  onChangeQuery,
  categories,
  selectedCategory,
  onSelectCategory,
  allKey = 'all',
}: Props) => {
  return (
    <View padding={16} gap={12}>
      <View gap={4}>
        <Text type="headingM">Explore Knowledge</Text>
        <Text type="body2Regular" color="NEUTRAL_70">
          Curating the best courses for your future.
        </Text>
      </View>

      <TextInput
        placeholder="Search courses..."
        value={query}
        onChangeText={onChangeQuery}
        autoCapitalize="none"
        iconLeft={
          <Ionicons name="search-outline" size={18} color={Colors.NEUTRAL_70} />
        }
        containerStyle={styles.headerSearch}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View row gap={10}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const label = cat === allKey ? 'All Courses' : cat;

            return (
              <Pressable
                key={cat}
                onPress={() => onSelectCategory(cat)}
                style={
                  isSelected
                    ? [styles.headerChip, styles.headerChipSelected]
                    : styles.headerChip
                }>
                <Text
                  type="body2Medium"
                  color={isSelected ? 'WHITE' : 'NEUTRAL_80'}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeHeader;
