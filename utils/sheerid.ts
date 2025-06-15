import { Platform } from 'react-native';

interface SheerIDVerificationResponse {
  success: boolean;
  isStudent: boolean;
  error?: string;
}

const SHEERID_API_KEY = process.env.EXPO_PUBLIC_SHEERID_API_KEY;
const SHEERID_API_URL = 'https://services.sheerid.com/rest/0.5/verification';

export async function verifyEduEmail(email: string): Promise<SheerIDVerificationResponse> {
  try {
    const response = await fetch(SHEERID_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SHEERID_API_KEY}`,
      },
      body: JSON.stringify({
        type: 'EMAIL',
        email,
        organizationType: 'UNIVERSITY',
        platform: Platform.OS,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to verify email');
    }

    return {
      success: true,
      isStudent: data.organizationType === 'UNIVERSITY',
    };
  } catch (error) {
    console.error('SheerID verification error:', error);
    return {
      success: false,
      isStudent: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function verifyISIC(cardNumber: string): Promise<SheerIDVerificationResponse> {
  try {
    const response = await fetch(SHEERID_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SHEERID_API_KEY}`,
      },
      body: JSON.stringify({
        type: 'ISIC',
        cardNumber,
        platform: Platform.OS,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to verify ISIC card');
    }

    return {
      success: true,
      isStudent: data.verified,
    };
  } catch (error) {
    console.error('ISIC verification error:', error);
    return {
      success: false,
      isStudent: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function verifyStudentID(fileUri: string): Promise<{ verified: boolean }> {
  // Mocked SheerID SDK - simply check that the file ends with .jpg or .jpeg
  const isJpeg = fileUri.toLowerCase().endsWith('.jpg') || fileUri.toLowerCase().endsWith('.jpeg');
  await new Promise(resolve => setTimeout(resolve, 300));
  return { verified: isJpeg };
}
