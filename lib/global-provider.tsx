import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session } from '@supabase/supabase-js';
import { Profile } from "./data-types";
import { supabase } from '@/lib/supabase';
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Alert } from "react-native";

interface GlobalContextType {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {

  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    async function fetchProfile(session: Session) {
      try {
        setLoading(true)
        if (!session.user) throw new Error('No user on the session!')

        const { data, error, status } = await supabase
          .from('profiles')
          .select(`id, name, email, avatar`)
          .eq('id', session.user.id)
          .single()
          
        if (error && status !== 406) {
          throw error
        }
        if (data) {
          setProfile(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message)
          console.log(error.message)
        }
      } finally {
        setLoading(false)
      }
    };

    async function setSessionAndProfile(session: Session | null) {
      setLoading(true)
      setSession(session);
      session ? await fetchProfile(session) : setProfile(null);
      setTimeout(() => {
        setLoading(false);
      }, 1000)
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSessionAndProfile(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`--- AUTH EVENT --- ${event}`);
      setSessionAndProfile(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    console.log(`--- LOADING --- ${loading.toString().toUpperCase()}`);
  }, [loading])

  useEffect(() => {
    console.log(`--- PROFILE --- `, profile);
  }, [profile])

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className="text-primary-300" size='large' />
      </ SafeAreaView>
    )
  };

  return (
    <GlobalContext.Provider value={{ session, profile, loading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within a GlobalProvider");

  return context;
};

export default GlobalProvider;