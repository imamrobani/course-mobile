import React, { useMemo } from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Image } from 'expo-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Header, Text, View } from '@components';
import { Colors } from '@constants';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  persistFavorites,
  toggleFavoriteLocal,
} from '@store/slice/favorites/favoritesSlice';
import { RootStackParamList } from '@type/navigation';
import CommentsLikesSection from './components/CommentsLikesSection';
import styles from './styles';
import type { RouteProp } from '@react-navigation/native';

const CourseDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'CourseDetail'>>();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.courses);
  const favorites = useAppSelector((state) => state.favorites);
  const userId = useAppSelector((state) => state.auth.user?.id);

  const course = useMemo(
    () => items.find((c) => c.id === route.params.id),
    [items, route.params.id],
  );

  if (!course) {
    return (
      <View flex={1} backgroundColor="WHITE">
        <Header label="Course" onBack={() => navigation.goBack()} />
        <View
          flex={1}
          padding={24}
          justifyContent="center"
          alignItems="center"
          gap={8}>
          <Text type="body1SemiBold">Course not found</Text>
          <Text type="body2Regular" color="NEUTRAL_70" center>
            Course id: {route.params.id}
          </Text>
        </View>
      </View>
    );
  }

  const isFavorite = favorites.ids.includes(course.id);

  const onToggleFavorite = () => {
    if (!userId) {
      return;
    }

    const exists = favorites.ids.includes(course.id);
    const nextIds = exists
      ? favorites.ids.filter((x) => x !== course.id)
      : [...favorites.ids, course.id];

    dispatch(toggleFavoriteLocal({ courseId: course.id }));
    dispatch(persistFavorites({ userId, ids: nextIds }));
  };

  return (
    <View style={styles.container}>
      <Header label="Course Detail" onBack={() => navigation.goBack()} />

      <KeyboardAwareScrollView
        bottomOffset={24}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}>
        <Image
          source={{ uri: course.image }}
          style={styles.heroImage}
          contentFit="cover"
        />

        <View gap={6}>
          <Text type="headingL">{course.title}</Text>
          <Text type="body2Regular" color="NEUTRAL_70">
            {course.author}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.badge}>
            <Text type="captionSRegular">{course.category}</Text>
          </View>
          <View style={styles.badge}>
            <Text type="captionSRegular">{course.level}</Text>
          </View>
          <View style={styles.badge}>
            <Text type="captionSRegular">{course.duration}</Text>
          </View>
          <View style={styles.badge}>
            <Text type="captionSRegular">
              Rating {course.rating.toFixed(1)}
            </Text>
          </View>
        </View>

        <View row justifyContent="flex-end">
          <Pressable
            onPress={onToggleFavorite}
            style={[styles.badge, styles.favoriteChip]}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={16}
              color={isFavorite ? Colors.ACCENT_MAIN : Colors.NEUTRAL_70}
            />
            <Text type="captionSRegular">{isFavorite ? 'Saved' : 'Save'}</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text type="body1SemiBold">Overview</Text>
          <Text type="body2Regular" color="NEUTRAL_80">
            {course.content}
          </Text>
        </View>

        <CommentsLikesSection courseId={course.id} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CourseDetailScreen;
