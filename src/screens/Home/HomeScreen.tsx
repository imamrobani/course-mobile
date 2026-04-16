import React, { useMemo, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CourseCard, View } from '@components';
import { Colors } from '@constants';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setCategory, setQuery } from '@store/slice/courses/coursesSlice';
import {
  persistFavorites,
  toggleFavoriteLocal,
} from '@store/slice/favorites/favoritesSlice';
import { Course } from '@type/models/course';
import { RootStackParamList } from '@type/navigation';
import EmptyState from './components/EmptyState';
import HomeHeader from './components/HomeHeader';
import styles from './styles';

const Separator = () => <View style={styles.separator} />;

const ALL_COURSES_KEY = 'all';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'MainTab'>>();
  const { items, query, category } = useAppSelector((state) => state.courses);
  const favorites = useAppSelector((state) => state.favorites);
  const userId = useAppSelector((state) => state.auth.user?.id);
  const [refreshing, setRefreshing] = useState(false);

  const favoriteSet = useMemo(() => new Set(favorites.ids), [favorites.ids]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(items.map((course) => course.category)),
    ).sort((a, b) => a.localeCompare(b));
    return [ALL_COURSES_KEY, ...uniqueCategories];
  }, [items]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((course) => {
      const matchesQuery = normalizedQuery
        ? course.title.toLowerCase().includes(normalizedQuery)
        : true;
      const matchesCategory =
        category === ALL_COURSES_KEY ? true : course.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [items, query, category]);

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
      isFavorite={favoriteSet.has(item.id)}
      onPress={() => onOpenDetail(item.id)}
      onPressFavorite={() => onToggleFavorite(item.id)}
    />
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.WHITE} />
      <HomeHeader
        query={query}
        onChangeQuery={(text) => dispatch(setQuery(text))}
        categories={categories}
        selectedCategory={category}
        onSelectCategory={(cat) => dispatch(setCategory(cat))}
        allKey={ALL_COURSES_KEY}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        ItemSeparatorComponent={Separator}
        renderItem={renderItem}
        ListEmptyComponent={EmptyState}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
