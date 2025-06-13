import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut, Settings, CreditCard, HelpCircle, Bell, Shield } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { plans } from '@/mocks/plans';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  if (!user) {
    return null;
  }

  const currentPlan = plans.find(plan => plan.id === user.planId);

  const handleLogout = () => {
    logout();
    router.replace('/auth/login');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            {user.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
            )}
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          </View>
        </View>

        <Card variant="elevated" style={styles.planCard}>
          <View style={styles.planHeader}>
            <Text style={styles.planTitle}>Current Plan</Text>
            <View style={styles.planBadge}>
              <Text style={styles.planBadgeText}>{currentPlan?.name || 'Free'}</Text>
            </View>
          </View>
          
          <Text style={styles.planPrice}>
            {currentPlan?.price ? `$${currentPlan.price}/month` : 'Free'}
          </Text>
          
          <View style={styles.planFeatures}>
            {currentPlan?.features.map((feature, index) => (
              <Text key={index} style={styles.planFeature}>• {feature}</Text>
            ))}
          </View>
          
          {user.planId !== 'premium' && (
            <Button
              title="Upgrade Plan"
              onPress={() => router.push('/subscription')}
              variant="primary"
              style={styles.upgradeButton}
            />
          )}
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/settings/account')}
            activeOpacity={0.7}
          >
            <Settings size={20} color={colors.text} />
            <Text style={styles.menuItemText}>Account Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/settings/notifications')}
            activeOpacity={0.7}
          >
            <Bell size={20} color={colors.text} />
            <Text style={styles.menuItemText}>Notifications</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/settings/payment')}
            activeOpacity={0.7}
          >
            <CreditCard size={20} color={colors.text} />
            <Text style={styles.menuItemText}>Payment Methods</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/settings/privacy')}
            activeOpacity={0.7}
          >
            <Shield size={20} color={colors.text} />
            <Text style={styles.menuItemText}>Privacy & Security</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/help')}
            activeOpacity={0.7}
          >
            <HelpCircle size={20} color={colors.text} />
            <Text style={styles.menuItemText}>Help & Support</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.menuItem, styles.logoutItem]}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <LogOut size={20} color={colors.error} />
            <Text style={[styles.menuItemText, styles.logoutText]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    padding: theme.spacing.md,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: theme.spacing.md,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  avatarText: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: "700",
    color: 'white',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: theme.spacing.xs,
  },
  userEmail: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.textSecondary,
  },
  planCard: {
    marginBottom: theme.spacing.xl,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  planTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
  },
  planBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  planBadgeText: {
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: "500",
    color: 'white',
  },
  planPrice: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: theme.spacing.md,
  },
  planFeatures: {
    marginBottom: theme.spacing.md,
  },
  planFeature: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.text,
    marginBottom: theme.spacing.xs,
  },
  upgradeButton: {
    marginTop: theme.spacing.sm,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: "600",
    color: colors.text,
    marginBottom: theme.spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemText: {
    fontSize: theme.typography.fontSizes.md,
    color: colors.text,
    marginLeft: theme.spacing.md,
  },
  logoutItem: {
    borderBottomWidth: 0,
    marginTop: theme.spacing.sm,
  },
  logoutText: {
    color: colors.error,
  },
});