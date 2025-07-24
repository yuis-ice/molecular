export interface Molecule {
  cid: number;
  name: string;
  formula?: string;
}

export interface ScreensaverSettings {
  speed: number; // in seconds
}