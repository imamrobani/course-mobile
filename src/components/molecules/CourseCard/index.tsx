import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Text, View } from '@components/atoms';
import { Colors, shadowTypes } from '@constants';
import { Course } from '@type/models/course';
import styles from './styles';

interface CourseCardProps extends PressableProps {
  course: Course;
  isFavorite?: boolean;
  onPressFavorite?: () => void;
}

const CourseCard = ({
  course,
  isFavorite,
  onPressFavorite,
  ...props
}: CourseCardProps) => {
  return (
    <View style={[styles.container, shadowTypes.shadow_2]}>
      <Pressable {...props}>
        <View>
          <Image
            source={{ uri: course.image }}
            style={styles.image}
            contentFit="cover"
          />
          <View style={styles.overlayRow}>
            <View style={styles.categoryBadge}>
              <Text type="captionSRegular" color="PRIMARY_MAIN">
                {course.category.toUpperCase()}
              </Text>
            </View>
            <Pressable style={styles.favoriteButton} onPress={onPressFavorite}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={18}
                color={isFavorite ? Colors.ACCENT_MAIN : Colors.NEUTRAL_80}
              />
            </Pressable>
          </View>
        </View>

        <View padding={16} gap={12}>
          <View
            row
            alignItems="flex-start"
            justifyContent="space-between"
            gap={12}>
            <Text type="body1SemiBold" style={styles.title} numberOfLines={2}>
              {course.title}
            </Text>
            <View style={styles.rating}>
              <Ionicons name="star" size={14} color={Colors.SUCCESS_HOVER} />
              <Text type="captionSRegular" style={styles.ratingText}>
                {course.rating.toFixed(1)}
              </Text>
            </View>
          </View>

          <Text type="body2Regular" color="NEUTRAL_70" numberOfLines={2}>
            {course.description}
          </Text>

          <View row alignItems="center" justifyContent="space-between" gap={12}>
            <Text numberOfLines={1} style={styles.author}>
              {course.author}
            </Text>
            <View row alignItems="center" gap={8}>
              <View style={styles.metaChip}>
                <Text type="captionSRegular" color="NEUTRAL_70">
                  {course.duration}
                </Text>
              </View>
              <View style={styles.metaChip}>
                <Text type="captionSRegular" color="NEUTRAL_70">
                  {course.level.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default CourseCard;
