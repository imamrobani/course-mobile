import React, { useMemo } from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from '@components';
import { Colors } from '@constants';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { toggleLike } from '@store/slice/comments/commentsSlice';
import styles from './styles';

type Props = {
  courseId: string;
};

const CommentsLikesSection = ({ courseId }: Props) => {
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.comments.byCourseId[courseId]);

  const comments = useMemo(() => list ?? [], [list]);

  return (
    <View style={styles.section} gap={12}>
      <View row alignItems="center" justifyContent="space-between" gap={8}>
        <Text type="body1SemiBold">Comments</Text>
        <Text type="body2Regular" color="NEUTRAL_70">
          {comments.length}
        </Text>
      </View>

      {comments.length === 0 ? (
        <View alignItems="center" padding={16}>
          <Text type="body2Regular" color="NEUTRAL_70" center>
            Belum ada komentar.
          </Text>
        </View>
      ) : (
        <View gap={12}>
          {comments.map((c) => (
            <View key={c.id} style={styles.commentItem} gap={8}>
              <View style={styles.commentHeader}>
                <View gap={2}>
                  <Text type="body2SemiBold">{c.user.name}</Text>
                  <Text type="captionSRegular" color="NEUTRAL_70">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </Text>
                </View>

                <Pressable
                  style={styles.likeButton}
                  onPress={() =>
                    dispatch(toggleLike({ courseId, commentId: c.id }))
                  }>
                  <Ionicons
                    name={c.likedByUser ? 'heart' : 'heart-outline'}
                    size={16}
                    color={
                      c.likedByUser ? Colors.ACCENT_MAIN : Colors.NEUTRAL_70
                    }
                  />
                  <Text type="captionSRegular" color="NEUTRAL_80">
                    {c.likesCount}
                  </Text>
                </Pressable>
              </View>

              <Text type="body2Regular" color="NEUTRAL_80">
                {c.message}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default CommentsLikesSection;
