import React, { useMemo, useState } from 'react';
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
import EmptyState from './components/EmptyState';
import styles from './styles';

const FavoriteScreen = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'MainTab'>>();
  const { items } = useAppSelector((state) => state.courses);
  const favorites = useAppSelector((state) => state.favorites);
  const userId = useAppSelector((state) => state.auth.user?.id);
  const [refreshing, setRefreshing] = useState(false);

  const favoriteSet = useMemo(() => new Set(favorites.ids), [favorites.ids]);

  const data = useMemo(
    () => items.filter((course) => favoriteSet.has(course.id)),
    [items, favoriteSet],
  );

  const onOpenDetail = (id: string) => {
    navigation.navigate('CourseDetail', { id });
  };

  const onToggleFavorite = (courseId: string) => {
    if (!userId) {
      return;
    }

    const isAlreadyFavorited = favoriteSet.has(courseId);
    const nextFavoriteIds = isAlreadyFavorited
      ? favorites.ids.filter((favoriteId) => favoriteId !== courseId)
      : [...favorites.ids, courseId];

    dispatch(toggleFavoriteLocal({ courseId }));
    dispatch(persistFavorites({ userId, ids: nextFavoriteIds }));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setRefreshing(false);
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
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </SafeAreaView>
  );
};

export default FavoriteScreen;
