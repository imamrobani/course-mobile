import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Image } from 'expo-image';
import { Header, Text, View } from '@components';
import { useAppSelector } from '@store/hooks';
import { RootStackParamList } from '@type/navigation';
import styles from './styles';
import type { RouteProp } from '@react-navigation/native';

const CourseDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'CourseDetail'>>();
  const { items } = useAppSelector((state) => state.courses);

  const course = React.useMemo(
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

  return (
    <View style={styles.container}>
      <Header label="Course Detail" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
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

        <View style={styles.card}>
          <Text type="body1SemiBold">Overview</Text>
          <Text type="body2Regular" color="NEUTRAL_80">
            {course.content}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default CourseDetailScreen;
