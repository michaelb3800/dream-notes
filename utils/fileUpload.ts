import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { Platform } from 'react-native';

export type FileType = 'pdf' | 'doc' | 'docx' | 'txt' | 'image';

interface FileUploadResult {
  success: boolean;
  fileUri?: string;
  fileName?: string;
  fileType?: FileType;
  error?: string;
}

export async function pickDocument(): Promise<FileUploadResult> {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'image/*',
      ],
      copyToCacheDirectory: true,
    });

    if (result.canceled) {
      return { success: false, error: 'Document picker was canceled' };
    }

    const file = result.assets[0];
    const fileType = getFileType(file.mimeType);

    return {
      success: true,
      fileUri: file.uri,
      fileName: file.name,
      fileType,
    };
  } catch (error) {
    console.error('Error picking document:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to pick document',
    };
  }
}

export async function saveFile(fileUri: string, fileName: string): Promise<FileUploadResult> {
  try {
    const fileType = getFileTypeFromUri(fileUri);
    const destinationUri = `${FileSystem.documentDirectory}uploads/${fileName}`;

    // Create uploads directory if it doesn't exist
    const uploadsDir = `${FileSystem.documentDirectory}uploads`;
    const dirInfo = await FileSystem.getInfoAsync(uploadsDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(uploadsDir, { intermediates: true });
    }

    // Copy file to app's document directory
    await FileSystem.copyAsync({
      from: fileUri,
      to: destinationUri,
    });

    return {
      success: true,
      fileUri: destinationUri,
      fileName,
      fileType,
    };
  } catch (error) {
    console.error('Error saving file:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save file',
    };
  }
}

function getFileType(mimeType: string): FileType {
  if (mimeType.includes('pdf')) return 'pdf';
  if (mimeType.includes('word')) return 'doc';
  if (mimeType.includes('text')) return 'txt';
  if (mimeType.includes('image')) return 'image';
  return 'txt';
}

function getFileTypeFromUri(uri: string): FileType {
  const extension = uri.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf':
      return 'pdf';
    case 'doc':
      return 'doc';
    case 'docx':
      return 'docx';
    case 'txt':
      return 'txt';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return 'image';
    default:
      return 'txt';
  }
} 