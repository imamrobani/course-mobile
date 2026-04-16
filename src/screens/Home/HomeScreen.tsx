import React, { useMemo } from 'react';
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

  const favoriteSet = useMemo(() => new Set(favorites.ids), [favorites.ids]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(items.map((c) => c.category))).sort(
      (a, b) => a.localeCompare(b),
    );
    return [ALL_COURSES_KEY, ...unique];
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((c) => {
      const matchesQuery = q ? c.title.toLowerCase().includes(q) : true;
      const matchesCategory =
        category === ALL_COURSES_KEY ? true : c.category === category;
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
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
