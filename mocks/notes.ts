import { Note } from '@/types';

export const mockNotes: Note[] = [
  {
    id: '1',
    notebookId: '1',
    userId: 'user1',
    title: 'Cell Structure and Function',
    content: `# Cell Structure and Function

## Introduction
The cell is the basic structural and functional unit of all living organisms. Cells are the smallest unit of life that can replicate independently, and they are often called the "building blocks of life."

## Types of Cells
There are two main types of cells:
1. **Prokaryotic cells** - simple cells without a nucleus or membrane-bound organelles (e.g., bacteria)
2. **Eukaryotic cells** - complex cells with a nucleus and membrane-bound organelles (e.g., plant and animal cells)

## Cell Organelles
Eukaryotic cells contain various organelles, each with specific functions:

### Nucleus
- Contains genetic material (DNA)
- Controls cell activities
- Surrounded by nuclear membrane

### Mitochondria
- Powerhouse of the cell
- Site of cellular respiration
- Produces ATP (energy)

### Endoplasmic Reticulum (ER)
- **Rough ER**: Contains ribosomes, involved in protein synthesis
- **Smooth ER**: Involved in lipid synthesis and detoxification

### Golgi Apparatus
- Modifies, sorts, and packages proteins for secretion
- Forms vesicles

### Lysosomes
- Contain digestive enzymes
- Break down waste materials and cellular debris

### Chloroplasts (in plant cells only)
- Site of photosynthesis
- Convert light energy to chemical energy`,
    summary: 'Cells are the fundamental units of life, existing as either simple prokaryotic cells (without a nucleus) or complex eukaryotic cells (with a nucleus and organelles). Each organelle in eukaryotic cells has specific functions: the nucleus houses DNA and controls cell activities, mitochondria produce energy through cellular respiration, the endoplasmic reticulum assists in protein and lipid synthesis, the Golgi apparatus processes and packages proteins, lysosomes digest waste, and chloroplasts (in plant cells) perform photosynthesis.',
    needToKnow: [
      'Cells are the basic structural and functional units of all living organisms',
      'Prokaryotic cells lack a nucleus while eukaryotic cells have a nucleus and membrane-bound organelles',
      'Each organelle in eukaryotic cells has specific functions essential for cell survival',
      'Mitochondria are the powerhouse of the cell, producing ATP through cellular respiration',
      'Plant cells contain chloroplasts for photosynthesis, which animal cells lack'
    ],
    extraInsights: [
      {
        text: 'Human bodies contain approximately 37.2 trillion cells, each specialized for different functions.',
        citation: 'Bianconi, E., et al. (2013). Annals of Human Biology'
      },
      {
        text: 'Mitochondria have their own DNA (mtDNA) and are believed to have originated from ancient bacteria through endosymbiosis.',
        citation: 'Gray, M.W. (2012). Cold Spring Harbor Perspectives in Biology'
      },
      {
        text: 'The average eukaryotic cell contains about 42 million protein molecules.',
        citation: 'Ho, B., et al. (2018). Cell Systems'
      }
    ],
    flashcards: [
      {
        id: 'f1',
        noteId: '1',
        front: 'What are the two main types of cells?',
        back: 'Prokaryotic cells and Eukaryotic cells',
        difficulty: 'easy',
        nextReview: Date.now() + 86400000,
        repetitions: 1,
        easeFactor: 2.5,
        interval: 1,
        createdAt: Date.now() - 604800000
      },
      {
        id: 'f2',
        noteId: '1',
        front: 'What is the function of mitochondria?',
        back: 'Mitochondria are the powerhouse of the cell. They produce ATP through cellular respiration.',
        difficulty: 'medium',
        nextReview: Date.now() + 172800000,
        repetitions: 2,
        easeFactor: 2.3,
        interval: 2,
        createdAt: Date.now() - 604800000
      },
      {
        id: 'f3',
        noteId: '1',
        front: 'What organelle is found in plant cells but not animal cells?',
        back: 'Chloroplasts',
        difficulty: 'easy',
        nextReview: Date.now() + 86400000,
        repetitions: 1,
        easeFactor: 2.5,
        interval: 1,
        createdAt: Date.now() - 604800000
      }
    ],
    aiImages: [
      {
        url: 'https://images.unsplash.com/photo-1594904351111-a072f80b1a71',
        prompt: 'Detailed diagram of animal cell structure showing organelles',
        section: 'Cell Organelles'
      }
    ],
    lastStudied: Date.now() - 86400000,
    createdAt: Date.now() - 604800000,
    updatedAt: Date.now() - 86400000
  },
  {
    id: '2',
    notebookId: '1',
    userId: 'user1',
    title: 'DNA Replication',
    content: `# DNA Replication

## Introduction
DNA replication is the biological process of producing two identical replicas of DNA from one original DNA molecule. This process occurs in all living organisms and is the basis for biological inheritance.

## Steps of DNA Replication

### 1. Initiation
- Helicase enzyme unwinds the DNA double helix at specific points called origins of replication
- This creates a replication fork with two single strands

### 2. Elongation
- DNA polymerase adds complementary nucleotides to each template strand
- Replication occurs in the 5' to 3' direction
- Leading strand: continuous synthesis
- Lagging strand: discontinuous synthesis (Okazaki fragments)

### 3. Termination
- Replication continues until the entire DNA molecule is copied
- DNA ligase seals any gaps between Okazaki fragments

## Key Enzymes in DNA Replication
- **Helicase**: Unwinds the DNA double helix
- **Primase**: Synthesizes RNA primers
- **DNA polymerase**: Adds nucleotides to the growing DNA strand
- **DNA ligase**: Joins Okazaki fragments together
- **Topoisomerase**: Relieves tension in the DNA strand during unwinding

## Significance
DNA replication ensures that genetic information is accurately passed from one generation of cells to the next, maintaining the integrity of the genome.`,
    summary: 'DNA replication is the essential process by which a cell creates an exact copy of its DNA before cell division. The process occurs in three main steps: initiation (where helicase unwinds the DNA at origins of replication), elongation (where DNA polymerase adds complementary nucleotides in the 5\' to 3\' direction on both strands), and termination (where the entire molecule is copied and any gaps are sealed). Several enzymes are crucial to this process, including helicase, primase, DNA polymerase, DNA ligase, and topoisomerase, each performing specific functions to ensure accurate replication.',
    needToKnow: [
      'DNA replication is semiconservative, meaning each new DNA molecule contains one original strand and one new strand',
      'Replication always proceeds in the 5\' to 3\' direction',
      'The leading strand is synthesized continuously while the lagging strand is synthesized in fragments (Okazaki fragments)',
      'DNA polymerase cannot initiate DNA synthesis and requires an RNA primer',
      'Multiple enzymes work together to ensure accurate DNA replication'
    ],
    extraInsights: [
      {
        text: 'DNA replication occurs at a rate of about 50 nucleotides per second in human cells.',
        citation: 'Alberts B, et al. (2014). Molecular Biology of the Cell'
      },
      {
        text: 'The error rate of DNA replication is approximately one mistake per billion nucleotides, thanks to the proofreading ability of DNA polymerase.',
        citation: 'Kunkel TA. (2004). Journal of Biological Chemistry'
      },
      {
        text: 'If stretched out, the DNA in a single human cell would be about 2 meters long but is packed into a nucleus just 6 micrometers in diameter.',
        citation: 'Annunziato A. (2008). Nature Education'
      }
    ],
    createdAt: Date.now() - 518400000,
    updatedAt: Date.now() - 172800000
  }
];