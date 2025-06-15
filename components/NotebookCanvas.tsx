import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

let PencilKit: any;
let SkiaView: any;
try {
  PencilKit = require('react-native-pencilkit').PencilKitView;
} catch {}
try {
  SkiaView = require('@shopify/react-native-skia').Canvas;
} catch {}

interface Props {
  onExport?: (png: string, strokes: string) => void;
}

export default function NotebookCanvas({ onExport }: Props) {
  if (Platform.OS === 'ios' && PencilKit) {
    return <PencilKit style={styles.canvas} onExport={onExport} />;
  }
  if (SkiaView) {
    return <SkiaView style={styles.canvas} />;
  }
  return <View style={styles.canvas} />;
}

const styles = StyleSheet.create({
  canvas: { flex: 1 },
});
