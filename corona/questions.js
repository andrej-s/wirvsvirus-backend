const QUESTIONS = [
    {
      question: 'Für eine erste Einschätzung Ihres Risikos benötige ich einige Angaben. Diese Einschätzung kann auf keinen Fall eine Beratung durch einen fachkundigen Arzt ersetzen und stellt keine Diagnose dar. Haben Sie Fieber über 38 Grad Celsius?',
      loquestion: 'Fieber',
      category: 'symptoms',
      jumptodiagnosisifyes: false
    },
    {
      question: 'Haben Sie Husten, Schnupfen oder eine verstopfte Nase?',
      loquestion: 'Husten/Schnupfen/verstopfte Nase',
      category: 'symptoms',
      jumptodiagnosisifyes: false
    },
    {
      question: 'Haben Sie Kopf- oder Halsschmerzen?',
      loquestion: 'Kopf- oder Halsschmerzen',
      category: 'symptoms',
      jumptodiagnosisifyes: false
    },
    {
      question: 'Sind Sie kurzatmig?',
      loquestion: 'Kurzatmig',
      category: 'symptoms',
      jumptodiagnosisifyes: false
    },
    {
      question: 'Haben Sie Schüttelfrost oder Muskel- und Gelenkschmerzen?',
      loquestion: 'Schüttelfrost/ Muskel- und Gelenkschmerzen',
      category: 'symptoms',
      jumptodiagnosisifyes: false
    },
    {
      question: 'Leiden Sie unter Übelkeit, Erbrechen oder Durchfall?',
      loquestion: 'Übelkeit/Erbrechen/Durchfall',
      category: 'symptoms',
      jumptodiagnosisifyes: false
    },
    {
      question: 'Hatten Sie in den letzten 14 Tagen vor einem aktuellen Erkrankungsbeginn direkten Kontakt zu einer Person, die positiv auf das Coronavirus getestet wurde?',
      loquestion: 'Kontakt mit Infizizertem',
      category: 'contact_diagnosis_severe',
      jumptodiagnosisifyes: true
    },
    {
      question: 'Haben Sie sich in den letzten 14 Tagen in einem der vom Robert-Koch-Institut ausgewiesenen Risikogebiete oder besonders betroffenen Gebiete in Deutschland aufgehalten?',
      loquestion: 'Risikogebiet',
      category: 'contact_diagnosis_mild',
      jumptodiagnosisifyes: true
    }
  ];
  
  const HEALTH_QUESTIONS = [ 
    {
      question: 'Sind Sie Raucher?',
      loquestion: 'Raucher',
      category: 'contactdiagnosis'
    },
    {
      question: 'Besteht bei Ihnen eine Herzerkrankung?',
      loquestion: 'Herzerkrankung',
      category: 'contactdiagnosis'
    },
    {
      question: 'Besteht bei Ihnen eine Lungenerkrankung?',
      loquestion: 'Lungenerkrankung',
      category: 'contactdiagnosis'
    },
    {
      question: 'Besteht bei Ihnen eine chronische Lebererkrankung?',
      loquestion: 'Lebererkrankung',
      category: 'contactdiagnosis'
    },
    {
      question: 'Besteht bei Ihnen eine Zuckererkrankung?',
      loquestion: 'Diabetes',
      category: 'contactdiagnosis'
    },
    {
      question: 'Besteht bei Ihnen eine Krebserkrankung?',
      loquestion: 'Krebs',
      category: 'contactdiagnosis'
    },
    {
      question: 'Haben Sie ein geschwächtes Immunsystem (z.B. aufgrund einer Erkrankung, die mit einer Immunschwäche einhergeht oder durch Einnahme von Medikamenten, die die Immunabwehr schwächen, wie z.B. Cortison)?',
      loquestion: 'Immunschwäche',
      category: 'contactdiagnosis'
    }
  ];

  module.exports = {QUESTIONS, HEALTH_QUESTIONS}