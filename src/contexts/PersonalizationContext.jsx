import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { loadProfile, saveProfile, DEFAULT_PROFILE } from '../engine/personalizationEngine';

export const PersonalizationContext = createContext({
  profile: null,
  setProfile: () => {},
  hasCompletedOnboarding: false,
  resetProfile: () => {},
});

export function PersonalizationProvider({ children }) {
  const [profile, setProfileState] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Load profile from localStorage on mount
  useEffect(() => {
    const stored = loadProfile();
    if (stored) {
      setProfileState(stored);
    }
    setLoaded(true);
  }, []);

  const setProfile = useCallback((newProfile) => {
    const merged = { ...DEFAULT_PROFILE, ...newProfile, createdAt: newProfile.createdAt || Date.now() };
    setProfileState(merged);
    saveProfile(merged);
  }, []);

  const resetProfile = useCallback(() => {
    setProfileState(null);
    try { localStorage.removeItem('lml_user_profile'); } catch { /* noop */ }
  }, []);

  const hasCompletedOnboarding = Boolean(profile && profile.ageGroup && profile.field && profile.emphasis);

  const value = useMemo(() => ({
    profile,
    setProfile,
    hasCompletedOnboarding,
    resetProfile,
    loaded,
  }), [profile, setProfile, hasCompletedOnboarding, resetProfile, loaded]);

  return (
    <PersonalizationContext.Provider value={value}>
      {children}
    </PersonalizationContext.Provider>
  );
}
