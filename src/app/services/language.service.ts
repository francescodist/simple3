import { Injectable } from "@angular/core";

export type Language = 'IT' | 'EN';

export type LanguageTemplateKey = keyof typeof languageTemplates;

const languageTemplates = {
  text: {
    title: { IT: 'Testo', EN: 'Text' },
    examples: { IT: 'ESEMPI', EN: 'EXAMPLES' },
    placeholder: { IT: 'Inserisci qui il testo da semplificare...', EN: 'Insert here the text to simplify...' },
    simplify: { IT: 'Semplifica', EN: 'Simplify' },
    simplifying: { IT: 'Semplifico...', EN: 'Simplifying...' }
  },
  image: {
    title: { IT: 'Immagine', EN: 'Picture' },
    camera: { IT: 'Fotocamera', EN: 'Camera' },
    gallery: { IT: 'Galleria', EN: 'Gallery' },
    ocr: { IT: 'Estraggo testo da immagine...', EN: 'Extracting text from image...' }
  },
  voice: {
    title: { IT: 'Voce', EN: 'Voice' },
    startRecording: { IT: 'Avvia Registrazione', EN: 'Start Recording' },
    stopRecording: { IT: 'Interrompi Registrazione', EN: 'Stop Recording' }
  },
  examples: {
    title: { IT: 'Scegli Esempio', EN: 'Choose Example' },
    example: { IT: 'Esempio', EN: 'Example' },
    loading: { IT: 'Carico Esempio...', EN: 'Loading Example...' }
  },
  pdf: {
    title: { IT: "PDF", EN: "PDF" },
    loading: { IT: 'Estraggo testo da PDF...', EN: 'Extracting text from PDF...' }
  },
  simplifiedText: {
    title: { IT: 'Testo Semplificato', EN: 'Simplified Text' }
  }, errors: {
    header: { IT: 'Errore', EN: 'Error' },
    cameraFailedOcr: { IT: "Errore nell'analisi dell'immagine", EN: "An error occured while analyzing the image" },
    cameraNoPic: { IT: "Nessuna immagine selezionata", EN: "No image selected" },
    noResultSimplify: { IT: "Impossibile ottenere un risultato dal servizio SIMPLE", EN: "Couldn't get any result from the SIMPLE service" },
    errorSimplify: { IT: "Errore nel servizio SIMPLE", EN: "Error in the simple service" },
    errorPdf: { IT: "Impossibile analizzare il PDF selezionato", EN: "Couldn't process the selected PDF" }
  }
}


@Injectable({
  providedIn: "root"
})
export class LanguageService {
  languages: Language[] = ["IT", "EN"];
  selectedLanguage: Language;

  constructor() {
    this.selectLanguage(JSON.parse(localStorage.getItem('language')) || 'IT');
  }

  selectLanguage(language: Language) {
    this.selectedLanguage = language;
    localStorage.setItem('language', JSON.stringify(language));
  }

  getSelectedLanguage(): Language {
    return this.selectedLanguage;
  }

  selectNextLanguage() {
    this.selectLanguage(this.getNextLanguage())
  }

  getNextLanguage(): Language {
    return this.languages[(this.languages.indexOf(this.selectedLanguage) + 1) % this.languages.length];
  }

  getTemplate(page: keyof typeof languageTemplates, key: string): string {
    return languageTemplates[page] && languageTemplates[page][key] ?
      languageTemplates[page][key][this.selectedLanguage] ||
      languageTemplates[page][key]['EN'] || '' : '';
  }
}

