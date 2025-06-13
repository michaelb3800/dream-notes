import * as Sentry from '@sentry/react-native';
import { Platform } from 'react-native';
import ENV from '../config/env';

class AnalyticsService {
  private static instance: AnalyticsService;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  initialize() {
    if (this.isInitialized) return;

    Sentry.init({
      dsn: ENV.SENTRY_DSN,
      environment: ENV.ENVIRONMENT,
      enableAutoSessionTracking: true,
      sessionTrackingIntervalMillis: 30000,
      tracesSampleRate: 1.0,
      integrations: [
        new Sentry.ReactNativeTracing({
          tracingOrigins: ['localhost', /^\//, /^https:\/\//],
        }),
      ],
    });

    this.isInitialized = true;
  }

  trackEvent(eventName: string, properties?: Record<string, any>) {
    Sentry.addBreadcrumb({
      category: 'event',
      message: eventName,
      level: 'info',
      data: properties,
    });
  }

  trackError(error: Error, context?: Record<string, any>) {
    Sentry.captureException(error, {
      extra: context,
    });
  }

  trackUser(userId: string, traits?: Record<string, any>) {
    Sentry.setUser({
      id: userId,
      ...traits,
    });
  }

  trackScreen(screenName: string, properties?: Record<string, any>) {
    Sentry.addBreadcrumb({
      category: 'navigation',
      message: `Screen: ${screenName}`,
      level: 'info',
      data: properties,
    });
  }

  trackPerformance(operation: string, duration: number) {
    Sentry.addBreadcrumb({
      category: 'performance',
      message: `Operation: ${operation}`,
      level: 'info',
      data: { duration },
    });
  }
}

export const analytics = AnalyticsService.getInstance(); 