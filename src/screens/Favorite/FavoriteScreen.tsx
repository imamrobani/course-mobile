import React, { useMemo } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CourseCard, Text, View } from '@components';
import { Colors } from '@constants';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  persistFavorites,
  toggleFavoriteLocal,
} from '@store/slice/favorites/favoritesSlice';
import { Course } from '@type/models/course';
import { RootStackParamList } from '@type/navigation';
import styles from './styles';

const EmptyState = () => (
  <View style={styles.empty}>
    <Text type="body1SemiBold">No saved courses yet</Text>
    <Text type="body2Regular" color="NEUTRAL_70" center>
      Tap the heart icon on a course to save it.
    </Text>
  </View>
);

const FavoriteScreen = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'MainTab'>>();
  const { items } = useAppSelector((state) => state.courses);
  const favorites = useAppSelector((state) => state.favorites);
  const userId = useAppSelector((state) => state.auth.user?.id);

  const favoriteSet = useMemo(() => new Set(favorites.ids), [favorites.ids]);

  const data = useMemo(
    () => items.filter((c) => favoriteSet.has(c.id)),
    [items, favoriteSet],
  );

  const onOpenDetail = (id: string) => {
    navigation.navigate('CourseDetail', { id });
  };

  const onToggleFavorite = (courseId: string) => {
    if (!userId) {
      return;
    }

    const exists = favoriteSet.has(courseId);
    const nextIds = exists
      ? favorites.ids.filter((x) => x !== courseId)
      : [...favorites.ids, courseId];

    dispatch(toggleFavoriteLocal({ courseId }));
    dispatch(persistFavorites({ userId, ids: nextIds }));
  };

  const renderItem = ({ item }: { item: Course }) => (
    <CourseCard
      course={item}
      isFavorite
      onPress={() => onOpenDetail(item.id)}
      onPressFavorite={() => onToggleFavorite(item.id)}
    />
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.WHITE} />

      <View style={styles.header}>
        <Text type="headingM">Saved Courses</Text>
        <Text type="body2Regular" color="NEUTRAL_70">
          {data.length} items
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        renderItem={renderItem}
        ListEmptyComponent={EmptyState}
      />
    </SafeAreaView>
  );
};

export default FavoriteScreen;
