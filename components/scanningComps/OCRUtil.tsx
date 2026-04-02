import {isSupported , extractTextFromImage, TextRecognitionScript } from '@zhanziyang/expo-text-extractor';
import image from 'app/(tabs)/test'

const scriptText = await extractTextFromImage(image)