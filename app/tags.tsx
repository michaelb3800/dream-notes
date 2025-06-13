import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Note } from '../types';
import { useNotesStore } from '../store/notesStore';
import { useAuthStore } from '../store/authStore';

interface TagWithCount {
  name: string;
  count: number;
}

export default function TagsScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { getNotesByUserId } = useNotesStore();
  const [tags, setTags] = useState<TagWithCount[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTags, setFilteredTags] = useState<TagWithCount[]>([]);

  useEffect(() => {
    if (user) {
      const userNotes = getNotesByUserId(user.id);
      const tagCounts = new Map<string, number>();

      userNotes.forEach(note => {
        note.tags.forEach(tag => {
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        });
      });

      const tagList = Array.from(tagCounts.entries()).map(([name, count]) => ({
        name,
        count,
      }));

      setTags(tagList.sort((a, b) => b.count - a.count));
    }
  }, [user, getNotesByUserId]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = tags.filter(tag =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTags(filtered);
    } else {
      setFilteredTags(tags);
    }
  }, [searchQuery, tags]);

  const handleTagPress = (tag: TagWithCount) => {
    router.push({
      pathname: '/(tabs)' as const,
      params: { screen: 'search', query: tag.name },
    });
  };

  const renderTagItem = ({ item }: { item: TagWithCount }) => (
    <TouchableOpacity
      style={styles.tagItem}
      onPress={() => handleTagPress(item)}
    >
      <View style={styles.tagInfo}>
        <Text style={styles.tagName}>#{item.name}</Text>
        <Text style={styles.tagCount}>{item.count} notes</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Tags',
        }}
      />

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tags..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {filteredTags.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="pricetag-outline" size={48} color="#ccc" />
          <Text style={styles.emptyText}>
            {searchQuery ? 'No tags found' : 'No tags yet'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredTags}
          renderItem={renderTagItem}
          keyExtractor={item => item.name}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 8,
  },
  listContent: {
    padding: 16,
  },
  tagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 8,
  },
  tagInfo: {
    flex: 1,
  },
  tagName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tagCount: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
}); 