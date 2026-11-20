import React, { createContext, useContext, useEffect, useState } from "react";
import type { SkyPhase } from "../components/TwilightSky";

const PHASES: SkyPhase[] = [
  "dawn",
  "morning",
  "day",
  "dusk",
  "golden",
  "twilight",
  "night",
  "midnight",
];

export const getSkyPhaseFromDate = (date: Date = new Date()): SkyPhase => {
  const hour = date.getHours();
  if (hour < 2) return "midnight";
  if (hour < 4) return "night";
  if (hour < 7) return "dawn";
  if (hour < 10) return "morning";
  if (hour < 12) return "day";
  if (hour < 17) return "dusk";
  if (hour < 18) return "golden";
  if (hour < 20) return "twilight";
  return "night";
};

export interface AkaneThemeContextValue {
  phase: SkyPhase;
  setPhase: (phase: SkyPhase) => void;
  nextPhase: () => void;
  isSystemSynced: boolean;
  resetToSystemTime: () => void;
}

const AkaneThemeContext = createContext<AkaneThemeContextValue | null>(null);

export interface AkaneThemeProviderProps {
  children: React.ReactNode;
  phase?: SkyPhase;
  defaultPhase?: SkyPhase;
  onPhaseChange?: (phase: SkyPhase) => void;
  autoCycle?: boolean;
  intervalMs?: number;
  syncWithSystemTime?: boolean;
  className?: string;
}

export const AkaneThemeProvider: React.FC<AkaneThemeProviderProps> = ({
  children,
  phase: controlledPhase,
  defaultPhase = "twilight",
  onPhaseChange,
  autoCycle = false,
  intervalMs = 8000,
  syncWithSystemTime = false,
  className = "",
}) => {
  const [uncontrolledPhase, setUncontrolledPhase] = useState<SkyPhase>(() =>
    syncWithSystemTime ? getSkyPhaseFromDate() : defaultPhase,
  );
  const [manualOverride, setManualOverride] = useState(false);

  const currentPhase = controlledPhase ?? uncontrolledPhase;

  const applyPhase = (next: SkyPhase, isManual: boolean) => {
    if (isManual) {
      setManualOverride(true);
    }
    if (controlledPhase === undefined) {
      setUncontrolledPhase(next);
    }
    onPhaseChange?.(next);
  };

  const setPhase = (next: SkyPhase) => {
    applyPhase(next, true);
  };

  const nextPhase = () => {
    const nextIdx = (PHASES.indexOf(currentPhase) + 1) % PHASES.length;
    applyPhase(PHASES[nextIdx], true);
  };

  const resetToSystemTime = () => {
    setManualOverride(false);
    applyPhase(getSkyPhaseFromDate(), false);
  };

  // syncWithSystemTime が有効な場合、現在時刻に同期＆1分ごとに時間経過をチェック
  useEffect(() => {
    if (!syncWithSystemTime) {
      setManualOverride(false);
      return;
    }

    if (!manualOverride) {
      applyPhase(getSkyPhaseFromDate(), false);
    }

    const timer = window.setInterval(() => {
      if (!manualOverride) {
        applyPhase(getSkyPhaseFromDate(), false);
      }
    }, 60_000);

    return () => window.clearInterval(timer);
  }, [syncWithSystemTime, manualOverride]);

  // autoCycle（デモ用の自動時間経過ループ）
  useEffect(() => {
    if (!autoCycle || syncWithSystemTime) return;
    const timer = window.setInterval(() => {
      const nextIdx = (PHASES.indexOf(currentPhase) + 1) % PHASES.length;
      applyPhase(PHASES[nextIdx], false);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [autoCycle, syncWithSystemTime, intervalMs, currentPhase]);

  return (
    <AkaneThemeContext.Provider
      value={{
        phase: currentPhase,
        setPhase,
        nextPhase,
        isSystemSynced: syncWithSystemTime && !manualOverride,
        resetToSystemTime,
      }}
    >
      <div data-akane-phase={currentPhase} className={className}>
        {children}
      </div>
    </AkaneThemeContext.Provider>
  );
};

export const useAkaneTheme = (): AkaneThemeContextValue | null => {
  return useContext(AkaneThemeContext);
};
