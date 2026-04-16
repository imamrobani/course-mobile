import React, { useMemo } from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from '@components';
import { Colors } from '@constants';
import { Comment } from '@type/models/course';
import styles from './styles';

type Props = {
  comment: Comment;
  liked: boolean;
  onPressLike?: () => void;
};

const CommentItem = ({ comment, liked, onPressLike }: Props) => {
  const createdAtLabel = useMemo(
    () => new Date(comment.createdAt).toLocaleString(),
    [comment.createdAt],
  );

  return (
    <View style={styles.commentItem} gap={8}>
      <View style={styles.commentHeader}>
        <View gap={2}>
          <Text type="body2SemiBold">{comment.user.name}</Text>
          <Text type="captionSRegular" color="NEUTRAL_70">
            {createdAtLabel}
          </Text>
        </View>

        <Pressable
          disabled={!onPressLike}
          style={styles.likeButton}
          onPress={onPressLike}>
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
};

export default React.memo(CommentItem);
