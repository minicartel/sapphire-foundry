export enum EP {
  Name = 'sapphire',
  Path = `systems/sapphire`,
  LocalizationNamespace = 'EP2E',
  Socket = `system.sapphire`,
}

export interface SystemSchema {
  name: EP.Name;
  title: string;
  description: string;
  version: number;
  author: string;
  scripts?: string[];
  esmodules?: string[];
  styles?: string[];
  languages: Record<'lang' | EP.Name | 'path', string>[];
  initiative?: string;
  gridDistance: number;
  gridUnits: string;
  minimumCoreVersion: string;
  socket?: boolean;
  packs?: (Record<'name' | 'label' | EP.Name | 'path', string> & {
    entity: 'Actor' | 'Item' | 'JournalEntry' | 'RollTable';
  })[];
  primaryTokenAttribute?: string;
  secondaryTokenAttribute?: string | null;
  url?: string;
  manifest?: string;
  download?: string;
  compatibleCoreVersion?: string;
}
