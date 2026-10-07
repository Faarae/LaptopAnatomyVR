/**
 * QUESTION BANK (20 Questions)
 * Laptop Hardware Architecture & Diagnostics
 * 
 * Each question has:
 * - id: unique integer
 * - question: string
 * - options: array of { id: 'A'|'B'|'C'|'D', text: string }
 * - correctAnswer: string ('A'|'B'|'C'|'D')
 * - explanation: string
 */
export const QUESTION_BANK = [
  {
    id: 1,
    question: 'Which component is commonly known as the "brain" of a laptop because it processes system instructions and calculations?',
    options: [
      { id: 'A', text: 'RAM' },
      { id: 'B', text: 'CPU' },
      { id: 'C', text: 'GPU' },
      { id: 'D', text: 'SSD' },
    ],
    correctAnswer: 'B',
    explanation: 'The CPU (Central Processing Unit) executes calculations and system logic so that all applications can run properly.',
  },
  {
    id: 2,
    question: 'What is the primary role of RAM while you are actively using your laptop?',
    options: [
      { id: 'A', text: 'Storing photos and documents permanently' },
      { id: 'B', text: 'Holding active application data temporarily for fast access' },
      { id: 'C', text: 'Pushing hot exhaust air out of the chassis' },
      { id: 'D', text: 'Converting electrical current from the wall outlet' },
    ],
    correctAnswer: 'B',
    explanation: 'RAM acts like a temporary workspace. More RAM capacity allows you to open more browser tabs and programs simultaneously without lag.',
  },
  {
    id: 3,
    question: 'Why do modern laptops use NVMe SSDs instead of traditional hard disk drives (HDDs)?',
    options: [
      { id: 'A', text: 'They deliver significantly faster read/write speeds and resist physical shocks' },
      { id: 'B', text: 'They rely on spinning magnetic platters that last longer' },
      { id: 'C', text: 'They are filled with cooling liquid' },
      { id: 'D', text: 'They are strictly limited to audio and music storage' },
    ],
    correctAnswer: 'A',
    explanation: 'SSDs use flash memory chips with zero moving parts, making them durable against impacts and capable of booting up the system in seconds.',
  },
  {
    id: 4,
    question: 'Which component specializes in rendering 3D graphics, gaming visuals, and video animations?',
    options: [
      { id: 'A', text: 'GPU (Graphics Card)' },
      { id: 'B', text: 'Sound Card' },
      { id: 'C', text: 'Power Supply' },
      { id: 'D', text: 'BIOS Chip' },
    ],
    correctAnswer: 'A',
    explanation: 'The GPU (Graphics Processing Unit) has thousands of parallel cores designed specifically for demanding visual calculations.',
  },
  {
    id: 5,
    question: 'What is the purpose of applying thermal paste between the processor and the heatsink?',
    options: [
      { id: 'A', text: 'Permanently bonding the chip into its socket' },
      { id: 'B', text: 'Filling microscopic air gaps to transfer heat efficiently away from the processor' },
      { id: 'C', text: 'Shielding internal circuits from room dust' },
      { id: 'D', text: 'Boosting wireless internet speeds' },
    ],
    correctAnswer: 'B',
    explanation: 'Microscopic pores exist on metal surfaces. Thermal paste closes these gaps so heat can conduct smoothly into the cooling system.',
  },
  {
    id: 6,
    question: 'What is the main function of the motherboard inside a laptop?',
    options: [
      { id: 'A', text: 'Housing auxiliary backup batteries' },
      { id: 'B', text: 'Serving as the primary circuit board connecting all components for communication' },
      { id: 'C', text: 'Protecting the laptop exterior from scratches' },
      { id: 'D', text: 'Manually controlling screen brightness levels' },
    ],
    correctAnswer: 'B',
    explanation: 'The motherboard is the backbone of the laptop, routing power and data paths between the processor, memory, storage drives, and external ports.',
  },
  {
    id: 7,
    question: 'What usually happens if a laptop cooling fan and vents become clogged with dust?',
    options: [
      { id: 'A', text: 'Available storage capacity shrinks automatically' },
      { id: 'B', text: 'Temperatures spike and the laptop may throttle its performance' },
      { id: 'C', text: 'Built-in speakers output louder sound' },
      { id: 'D', text: 'The display becomes blurry' },
    ],
    correctAnswer: 'B',
    explanation: 'Trapped heat forces the hardware to throttle its operating frequency to avoid permanent thermal damage.',
  },
  {
    id: 8,
    question: 'Why does a laptop sometimes stutter during prolonged gaming in a warm environment?',
    options: [
      { id: 'A', text: 'Thermal throttling engages to protect components from overheating' },
      { id: 'B', text: 'The battery runs out of temporary memory space' },
      { id: 'C', text: 'System files on the SSD are deleted automatically' },
      { id: 'D', text: 'Bluetooth signals suddenly disconnect' },
    ],
    correctAnswer: 'A',
    explanation: 'Thermal throttling is an automated protection feature where the CPU or GPU lowers clock speeds when approaching critical temperatures.',
  },
  {
    id: 9,
    question: 'What is the job of the copper heatpipes running from the processor to the cooling fan?',
    options: [
      { id: 'A', text: 'Delivering high-voltage electric current' },
      { id: 'B', text: 'Absorbing heat from chips and transferring it to the fan exhaust fins' },
      { id: 'C', text: 'Catching wireless radio signals' },
      { id: 'D', text: 'Filtering dust particles entering from outside' },
    ],
    correctAnswer: 'B',
    explanation: 'Heatpipes contain a sealed internal fluid that vaporizes when heated, transferring heat to the cooling fins where it condenses again.',
  },
  {
    id: 10,
    question: 'Which measurement unit is standard for rating laptop battery energy capacity?',
    options: [
      { id: 'A', text: 'Gigabytes (GB)' },
      { id: 'B', text: 'Watt-hours (Wh)' },
      { id: 'C', text: 'Megahertz (MHz)' },
      { id: 'D', text: 'Pixels (px)' },
    ],
    correctAnswer: 'B',
    explanation: 'Watt-hours (Wh) indicate the amount of electrical power in watts a battery can continuously supply over the course of one hour.',
  },
  {
    id: 11,
    question: 'What does the small wireless card with thin antenna cables on the motherboard do?',
    options: [
      { id: 'A', text: 'Manages Wi-Fi and Bluetooth data transmissions' },
      { id: 'B', text: 'Controls audio volume on internal speakers' },
      { id: 'C', text: 'Illuminates keyboard backlights' },
      { id: 'D', text: 'Registers physical clicks on the trackpad' },
    ],
    correctAnswer: 'A',
    explanation: 'The wireless card handles all wireless network traffic, from local Wi-Fi connections to paired Bluetooth peripherals like wireless mice and headphones.',
  },
  {
    id: 12,
    question: 'What is the difference between data in RAM and data in an SSD when the laptop powers off?',
    options: [
      { id: 'A', text: 'RAM retains files, while SSD files are wiped' },
      { id: 'B', text: 'RAM clears completely, while SSD files remain safely stored' },
      { id: 'C', text: 'Both drives erase their entire content' },
      { id: 'D', text: 'Both drives behave identically' },
    ],
    correctAnswer: 'B',
    explanation: 'RAM is volatile memory that requires continuous electricity to hold data, whereas SSD storage is non-volatile and preserves files without power.',
  },
  {
    id: 13,
    question: 'Which firmware chip initializes hardware components and runs checks when you turn on the laptop?',
    options: [
      { id: 'A', text: 'BIOS / UEFI' },
      { id: 'B', text: 'Sound Card' },
      { id: 'C', text: 'Webcam Sensor' },
      { id: 'D', text: 'Display Controller' },
    ],
    correctAnswer: 'A',
    explanation: 'The BIOS/UEFI firmware runs a Power-On Self-Test (POST) to ensure essential components are operational before loading the operating system from storage.',
  },
  {
    id: 14,
    question: 'What is a key advantage of a USB-C port equipped with Thunderbolt technology?',
    options: [
      { id: 'A', text: 'Handling high-speed data, external display outputs, and power charging through one cable' },
      { id: 'B', text: 'Lowering internal laptop temperatures automatically' },
      { id: 'C', text: 'Removing malware from connected USB flash drives' },
      { id: 'D', text: 'Instantly doubling the available RAM capacity' },
    ],
    correctAnswer: 'A',
    explanation: 'Thunderbolt provides high bandwidth, allowing a single physical port to transmit fast data transfers, high-resolution monitor signals, and charging current.',
  },
  {
    id: 15,
    question: 'What is the M.2 slot on a modern laptop motherboard primarily designed for?',
    options: [
      { id: 'A', text: 'Spare cooling fans' },
      { id: 'B', text: 'Slim NVMe SSDs or wireless cards' },
      { id: 'C', text: 'Power adapter charging cords' },
      { id: 'D', text: 'Physical power switches' },
    ],
    correctAnswer: 'B',
    explanation: 'The compact M.2 form factor allows high-speed solid-state drives and wireless networking modules to fit directly on the motherboard without bulky cables.',
  },
  {
    id: 16,
    question: 'What is the main benefit of a physical privacy shutter on a laptop webcam?',
    options: [
      { id: 'A', text: 'Mechanically blocking the lens for guaranteed privacy' },
      { id: 'B', text: 'Upscaling camera video resolution to 4K' },
      { id: 'C', text: 'Disabling laptop speakers' },
      { id: 'D', text: 'Cutting total battery consumption in half' },
    ],
    correctAnswer: 'A',
    explanation: 'A physical sliding cover ensures complete visual privacy by physically blocking the camera lens, preventing unauthorized viewing even if the system is compromised.',
  },
  {
    id: 17,
    question: 'What is the main advantage of a display with a high refresh rate like 120Hz or 144Hz?',
    options: [
      { id: 'A', text: 'Text becomes automatically larger' },
      { id: 'B', text: 'Animations and movements look noticeably smoother during scrolling and gaming' },
      { id: 'C', text: 'The laptop exterior stays cold at all times' },
      { id: 'D', text: 'Battery runtime doubles' },
    ],
    correctAnswer: 'B',
    explanation: 'A higher refresh rate redraws the screen image more frequently each second, delivering fluid motion for interface animations, mouse movements, and gaming.',
  },
  {
    id: 18,
    question: 'Which surface component below the keyboard detects finger touches to control the cursor?',
    options: [
      { id: 'A', text: 'Trackpad (Touchpad)' },
      { id: 'B', text: 'Digitizer Screen' },
      { id: 'C', text: 'Touch Bar' },
      { id: 'D', text: 'Heatsink Plate' },
    ],
    correctAnswer: 'A',
    explanation: 'The trackpad relies on capacitive sensors to track finger motion and multi-finger gestures, replacing the need for an external mouse.',
  },
  {
    id: 19,
    question: 'What is the performance benefit of a Dual-Channel RAM setup over a single stick of the same total capacity?',
    options: [
      { id: 'A', text: 'It doubles the data bus width to the processor, boosting overall system bandwidth' },
      { id: 'B', text: 'It completely eliminates fan noise' },
      { id: 'C', text: 'It reduces the total physical weight of the laptop' },
      { id: 'D', text: 'It protects the screen glass from cracking' },
    ],
    correctAnswer: 'A',
    explanation: 'Dual-channel mode provides two parallel communication channels between the CPU and memory, effectively doubling available memory bandwidth.',
  },
  {
    id: 20,
    question: 'What is the primary role of the external charger brick plugged into the wall outlet?',
    options: [
      { id: 'A', text: 'Cooling the laptop during heavy workloads' },
      { id: 'B', text: 'Converting household Alternating Current (AC) into stable Direct Current (DC) safe for the hardware' },
      { id: 'C', text: 'Transmitting wired network data straight into the battery' },
      { id: 'D', text: 'Regulating display backlight tint' },
    ],
    correctAnswer: 'B',
    explanation: 'Sensitive computing components only run on low-voltage Direct Current (DC), so the power adapter steps down and converts household Alternating Current (AC).',
  },
];

/**
 * Prepares a fresh 10-question match:
 * 1. Shuffles all 20 questions using Fisher-Yates and selects exactly 10.
 * 2. Shuffles the options (A, B, C, D) for each question.
 * 3. Dynamically recalculates the correct answer key so the answer always matches.
 * 
 * @param {number} count Number of questions to pick (default 10)
 * @returns {Array} Array of 10 fully randomized questions
 */
export function getRandomQuizMatch(count = 10) {
  // 1. Shuffle questions without duplicates
  const pool = [...QUESTION_BANK];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const selected = pool.slice(0, count);

  // 2. Shuffle options per question & preserve answer key
  return selected.map((q, idx) => {
    // Find text of original correct answer
    const originalCorrectOption = q.options.find(opt => opt.id === q.correctAnswer);
    const correctText = originalCorrectOption ? originalCorrectOption.text : '';

    // Shuffle options
    const shuffledOptions = [...q.options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }

    const labels = ['A', 'B', 'C', 'D'];
    let newCorrectAnswer = 'A';

    const finalOptions = shuffledOptions.map((opt, optIdx) => {
      const assignedLabel = labels[optIdx];
      if (opt.text === correctText) {
        newCorrectAnswer = assignedLabel;
      }
      return {
        id: assignedLabel,
        text: opt.text,
      };
    });

    return {
      matchIndex: idx + 1,
      id: q.id,
      question: q.question,
      options: finalOptions,
      correctAnswer: newCorrectAnswer,
      explanation: q.explanation,
    };
  });
}
