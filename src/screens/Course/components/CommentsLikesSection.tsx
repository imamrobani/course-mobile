import React, { useMemo, useRef, useState } from 'react';
import { Pressable, TextInput as RNTextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, TextInputArea, View } from '@components';
import { Colors } from '@constants';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { addComment, toggleLike } from '@store/slice/comments/commentsSlice';
import styles from './styles';

type Props = {
  courseId: string;
};

const CommentsLikesSection = ({ courseId }: Props) => {
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.comments.byCourseId[courseId]);
  const likedIds = useAppSelector((state) => state.comments.likedIds);
  const user = useAppSelector((state) => state.auth.user);
  const userId = useAppSelector((state) => state.auth.user?.id);

  const [draft, setDraft] = useState('');
  const inputRef = useRef<RNTextInput>(null);

  const comments = useMemo(() => list ?? [], [list]);
  const likedSet = useMemo(() => new Set(likedIds), [likedIds]);
  const canSend = !!user && draft.trim().length > 0;

  const onSend = () => {
    if (!user || !userId) {
      return;
    }

    const message = draft.trim();
    if (!message) {
      return;
    }

    dispatch(
      addComment({
        userId,
        courseId,
        message,
        user: { id: user.id, name: user.name, avatar: user.avatar },
      }),
    );
    setDraft('');
    inputRef.current?.blur();
  };

  return (
    <View style={styles.section} gap={12}>
      <View row alignItems="center" justifyContent="space-between" gap={8}>
        <Text type="body1SemiBold">Comments</Text>
        <Text type="body2Regular" color="NEUTRAL_70">
          {comments.length}
        </Text>
      </View>

      <View style={styles.composer}>
        <TextInputArea
          ref={inputRef}
          value={draft}
          onChangeText={setDraft}
          placeholder="Write a comment..."
          placeholderTextColor={Colors.NEUTRAL_70}
          height={88}
          containerStyle={{ backgroundColor: Colors.WHITE }}
        />
        <View style={styles.composerActions}>
          <Button
            label="Post"
            disabled={!canSend}
            height={36}
            width={80}
            onPress={onSend}
            style={styles.postButton}
            typeText="body2Medium"
          />
        </View>
      </View>

      {comments.length === 0 ? (
        <View alignItems="center" padding={16}>
          <Text type="body2Regular" color="NEUTRAL_70" center>
            No comments yet.
          </Text>
        </View>
      ) : (
        <View gap={12}>
          {comments.map((comment) => {
            const liked = likedSet.has(comment.id);

            return (
              <View key={comment.id} style={styles.commentItem} gap={8}>
                <View style={styles.commentHeader}>
                  <View gap={2}>
                    <Text type="body2SemiBold">{comment.user.name}</Text>
                    <Text type="captionSRegular" color="NEUTRAL_70">
                      {new Date(comment.createdAt).toLocaleString()}
                    </Text>
                  </View>

                  <Pressable
                    style={styles.likeButton}
                    onPress={() =>
                      userId
                        ? dispatch(
                            toggleLike({
                              userId,
                              courseId,
                              commentId: comment.id,
                            }),
                          )
                        : undefined
                    }>
                    <Ionicons
                      name={liked ? 'heart' : 'heart-outline'}
                      size={16}
                      color={liked ? Colors.ACCENT_MAIN : Colors.NEUTRAL_70}
                    />
                    <Text type="captionSRegular" color="NEUTRAL_80">
                      {comment.likesCount}
                    </Text>
                  </Pressable>
                </View>

                <Text type="body2Regular" color="NEUTRAL_80">
                  {comment.message}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default CommentsLikesSection;
