import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { IPost } from '../Store/Slices/PostSlice';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export const PostCart: React.FC<IPost> = ({ id, title, body }) => {
  console.log('Render PostCart');

  const [editable, setEditable] = useState<boolean>(false);

  {
    /* TODO: тайтл инпут выталкивает иконки */
  }

  return (
    <View style={styles.postWraper}>
      <View style={styles.titleLine}>
        <View style={{ maxWidth: '70%' }}>
          <TextInput
            style={!editable ? styles.title : styles.activeTitle}
            multiline
            numberOfLines={2}
            value={title}
            editable={editable}
          />
        </View>
        <View>
          <View style={styles.btnBlock}>
            <TouchableHighlight onPress={() => setEditable(!editable)}>
              {!editable ? (
                <AntDesign name="delete" size={24} color="black" />
              ) : (
                <MaterialIcons name="cancel" size={24} color="black" />
              )}
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setEditable(!editable)}>
              {!editable ? (
                <AntDesign name="edit" size={24} color="black" />
              ) : (
                <AntDesign name="save" size={24} color="black" />
              )}
            </TouchableHighlight>
          </View>
        </View>
      </View>

      <TextInput
        editable={editable}
        style={editable ? styles.activeBody : styles.body}
        multiline
        value={body}
        scrollEnabled={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  postWraper: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    flexWrap: 'nowrap',
  },
  btnBlock: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
  },
  titleLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  activeTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  body: {
    fontSize: 14,
    lineHeight: 18,
  },
  activeBody: {
    fontSize: 14,
    lineHeight: 18,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
});
