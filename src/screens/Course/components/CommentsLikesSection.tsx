import React, { useMemo, useRef, useState } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { Button, Text, TextInputArea, View } from '@components';
import { Colors } from '@constants';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { addComment, toggleLike } from '@store/slice/comments/commentsSlice';
import CommentItem from './CommentItem';
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

  const createOnPressLike = (commentId: string) => {
    if (!userId) {
      return undefined;
    }

    dispatch(toggleLike({ userId, courseId, commentId }));
  };

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
              <CommentItem
                key={comment.id}
                comment={comment}
                liked={liked}
                onPressLike={() => createOnPressLike(comment.id)}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

export default CommentsLikesSection;
