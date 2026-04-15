/**
 * Personalization Engine
 * 
 * Maps questionnaire answers to content configuration.
 * Determines topic ordering, presentation style, and learning path structure.
 */

const STORAGE_KEY = 'lml_user_profile';

/**
 * @typedef {'under16' | 'student' | 'professional' | 'lifelong'} AgeGroup
 * @typedef {'cs' | 'science' | 'creative' | 'business' | 'explorer'} FieldOfInterest
 * @typedef {'math' | 'visual' | 'both'} LearningEmphasis
 * @typedef {'fast' | 'standard' | 'builder'} LearningPathType
 * 
 * @typedef {Object} UserProfile
 * @property {AgeGroup} ageGroup
 * @property {FieldOfInterest} field
 * @property {LearningEmphasis} emphasis
 * @property {LearningPathType | null} learningPath
 * @property {string[]} completedTopics
 * @property {number} createdAt
 */

/** Default profile for users who skip the questionnaire */
export const DEFAULT_PROFILE = {
 ageGroup: 'student',
 field: 'explorer',
 emphasis: 'both',
 learningPath: null,
 completedTopics: [],
 createdAt: Date.now(),
};

/**
 * Topic categories with metadata for ordering and filtering.
 */
const TOPIC_CATEGORIES = {
 foundations: {
 label: 'Foundations',
 icon: '',
 description: 'Core building blocks of neural networks',
 topics: ['FoundationsIntro', 'Loss', 'Activation', 'ActivationAdvanced', 'Hidden Layer', 'Nodes', 'Layer', 'Gradient', 'Backpropagation', 'Epoch', 'Learning Rate'],
 },
 math: {
 label: 'Math Foundations',
 icon: '',
 description: 'The mathematical backbone',
 topics: ['MathIntro', 'Vectors & Matrices', 'Dot Product', 'Matrix Multiplication', 'Tensors', 'Jacobian', 'Hessian', 'BayesTheorem', 'KLDivergence', 'Signal Processing'],
 },
 classical: {
 label: 'Classical ML',
 icon: '️',
 description: 'Statistical models before deep learning',
 topics: ['ClassicalMLIntro', 'LinearRegression', 'LogisticRegression', 'SVM', 'DecisionTree', 'RandomForest', 'KNN', 'NaiveBayes', 'KMeans', 'DBSCAN', 'PCA', 'TSNE', 'UMAP'],
 },
 coreML: {
 label: 'Deep Learning Core',
 icon: '️',
 description: 'Essential neural network techniques',
 topics: ['CoreDLIntro', 'Optimizer', 'Softmax', 'Regularization', 'L1L2', 'BatchNorm', 'LayerNorm', 'Dropout', 'EarlyStopping', 'CrossValidation', 'DataAugmentation', 'Classification Metrics'],
 },
 vision: {
 label: 'Computer Vision',
 icon: '️',
 description: 'How machines understand images',
 topics: ['VisionIntro', 'Convolution', 'Pooling', 'Padding', 'SkipConnection', 'VisionArchitecture', 'Inception', 'ObjectDetection', 'AnchorBoxes', 'IoU', 'Segmentation'],
 },
 rl: {
 label: 'Reinforcement Learning',
 icon: '',
 description: 'Learning through trial and error',
 topics: ['MDP', 'QLearning', 'DeepQN', 'PolicyGradient', 'PPO'],
 },
 paradigms: {
 label: 'Learning Paradigms',
 icon: '',
 description: 'How machines learn from data',
 topics: ['Supervised', 'Unsupervised', 'SemiSupervised', 'SelfSupervised'],
 },
 modernAI: {
 label: 'Modern AI',
 icon: '',
 description: 'Cutting-edge architectures & models',
 topics: ['ModernAIIntro', 'RNN', 'LSTM', 'Transformer', 'VisionTransformer', 'LoRA', 'Diffusion', 'CLIP', 'StableDiffusion', 'LLM', 'RAG', 'Multimodal'],
 },
 advanced: {
 label: 'Advanced Frontier',
 icon: '',
 description: 'Frontier research & deployment',
 topics: ['SAM', 'GAN', 'DCGAN', 'WGAN', 'NeRF', 'Sora', 'Agent', 'Quantization', 'Distillation', 'MoE', 'Interpretability', 'RecentAdvances'],
 },
};

/**
 * Returns the ordered list of category keys based on user profile.
 */
function getCategoryOrder(profile) {
 const { field, emphasis } = profile;

 // Base order
 let order = ['foundations', 'math', 'classical', 'coreML', 'paradigms', 'vision', 'rl', 'modernAI', 'advanced'];

 // Reorder based on emphasis
 if (emphasis === 'math') {
 order = ['math', 'foundations', 'classical', 'coreML', 'paradigms', 'vision', 'rl', 'modernAI', 'advanced'];
 } else if (emphasis === 'visual') {
 order = ['foundations', 'vision', 'classical', 'paradigms', 'coreML', 'math', 'rl', 'modernAI', 'advanced'];
 }

 // Field-specific reordering
 if (field === 'creative') {
 // Creatives want visual/vision/modern AI early
 const modernIdx = order.indexOf('modernAI');
 if (modernIdx > 3) {
 order.splice(modernIdx, 1);
 order.splice(3, 0, 'modernAI');
 }
 const visionIdx = order.indexOf('vision');
 if (visionIdx > 2) {
 order.splice(visionIdx, 1);
 order.splice(2, 0, 'vision');
 }
 } else if (field === 'business') {
 // Business users care about classical ML and paradigms first
 const classicalIdx = order.indexOf('classical');
 if (classicalIdx > 1) {
 order.splice(classicalIdx, 1);
 order.splice(1, 0, 'classical');
 }
 } else if (field === 'science' || field === 'cs') {
 // Scientists and Engineers want foundations and math first
 // (Already prioritized in base/math order)
 }

 return order;
}

/**
 * Returns recommended topics in order based on user profile.
 */
export function getRecommendedTopics(profile) {
 const order = getCategoryOrder(profile);
 const result = [];

 for (const catKey of order) {
 const cat = TOPIC_CATEGORIES[catKey];
 if (cat) {
 result.push({
 category: catKey,
 label: cat.label,
 icon: cat.icon,
 description: cat.description,
 topics: cat.topics,
 });
 }
 }

 return result;
}

/**
 * Returns presentation config for a specific topic.
 */
export function getTopicPresentation(profile) {
 const { emphasis, ageGroup } = profile;

 // Determine complexity level
 let complexity = 'standard';
 if (ageGroup === 'under16') complexity = 'simple';
 else if (ageGroup === 'professional' || ageGroup === 'lifelong') complexity = 'advanced';

 return {
 showMath: emphasis === 'math' || emphasis === 'both',
 showVisual: emphasis === 'visual' || emphasis === 'both',
 complexity,
 showInteractiveFormulas: emphasis !== 'visual' || ageGroup !== 'under16',
 highlightInsights: true,
 };
}

/**
 * Returns learning path configuration.
 */
export function getLearningPathConfig(profile) {
 const pathType = profile.learningPath || 'standard';
 const allCategories = getRecommendedTopics(profile);

 switch (pathType) {
 case 'fast':
 return {
 name: 'Fast Track',
 icon: '',
 duration: '8 weeks',
 description: 'Core concepts to get you productive quickly',
 phases: [
 { week: '1-2', name: 'Neural Network Basics', categories: ['foundations'] },
 { week: '3-4', name: 'Training & Optimization', categories: ['coreML'] },
 { week: '5-6', name: 'Vision & Paradigms', categories: ['vision', 'paradigms'] },
 { week: '7-8', name: 'Modern AI Overview', categories: ['modernAI'] },
 ],
 allCategories,
 };

 case 'builder':
 return {
 name: "Builder's Path",
 icon: '️',
 duration: '12 weeks',
 description: 'Hands-on projects with each concept',
 phases: [
 { week: '1-3', name: 'Build a Neuron', categories: ['foundations', 'math'] },
 { week: '4-6', name: 'Train a Classifier', categories: ['coreML', 'paradigms'] },
 { week: '7-9', name: 'Image Recognition', categories: ['vision'] },
 { week: '10-12', name: 'Modern Applications', categories: ['modernAI', 'advanced'] },
 ],
 allCategories,
 };

 case 'standard':
 default:
 return {
 name: 'Standard Path',
 icon: '',
 duration: '16 weeks',
 description: 'Comprehensive curriculum covering everything',
 phases: [
 { week: '1-4', name: 'Foundations', categories: ['foundations', 'math'] },
 { week: '5-8', name: 'Core ML', categories: ['coreML', 'paradigms'] },
 { week: '9-12', name: 'Computer Vision', categories: ['vision'] },
 { week: '13-16', name: 'Modern AI & Beyond', categories: ['modernAI', 'advanced'] },
 ],
 allCategories,
 };
 }
}

/**
 * Get a friendly greeting based on the profile.
 */
export function getGreeting(profile) {
 const greetings = {
 under16: 'Young Explorer',
 student: 'Fellow Learner',
 professional: 'Professional',
 lifelong: 'Lifelong Learner',
 };

 return greetings[profile.ageGroup] || 'Learner';
}

/**
 * Get field-specific description for the dashboard.
 */
export function getFieldDescription(profile) {
 const descriptions = {
 cs: "We've tailored your path with engineering analogies and code-first examples.",
 science: "We've organized topics with scientific rigor and mathematical depth.",
 creative: "We've prioritized visual understanding and creative applications.",
 business: "We've focused on practical applications and real-world impact.",
 explorer: "We've prepared a balanced journey across all aspects of ML.",
 };

 return descriptions[profile.field] || descriptions.explorer;
}

/**
 * Save user profile to localStorage.
 */
export function saveProfile(profile) {
 try {
 localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
 return true;
 } catch {
 return false;
 }
}

/**
 * Load user profile from localStorage.
 */
export function loadProfile() {
 try {
 const stored = localStorage.getItem(STORAGE_KEY);
 if (!stored) return null;
 const profile = JSON.parse(stored);
 // Validate essential fields
 if (!profile.ageGroup || !profile.field || !profile.emphasis) return null;
 return profile;
 } catch {
 return null;
 }
}

/**
 * Mark a topic as completed.
 */
export function markTopicComplete(topicKey) {
  // eslint-disable-next-line no-unused-vars
 const profile = loadProfile();
 if (!profile) return;
 if (!profile.completedTopics) profile.completedTopics = [];
 if (!profile.completedTopics.includes(topicKey)) {
 profile.completedTopics.push(topicKey);
 saveProfile(profile);
 }
}

/**
 * Clear user profile.
 */
export function clearProfile() {
 try {
 localStorage.removeItem(STORAGE_KEY);
 return true;
 } catch {
 return false;
 }
}

/**
 * Get all topic categories (used by dashboard).
 */
export function getAllCategories() {
 return TOPIC_CATEGORIES;
}
