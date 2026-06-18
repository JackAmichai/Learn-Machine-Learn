export const MATH_TOPICS = {
 "FoundationsIntro": {
    visualizer: "NeuralNetwork",
 title: "Foundations: The Building Blocks",
 content: `
 <p>Welcome to the core of Neural Networks! In this section, we'll explore the fundamental components that make "learning" possible. Understanding these is crucial before diving into more complex architectures.</p>
 
 <h4>The Roadmap</h4>
 <ul>
  <li><strong>Nodes & Layers</strong>: How we structure the network to mimic biological neurons.</li>
  <li><strong>Activation Functions</strong>: The "switches" that determine if a signal is important.</li>
  <li><strong>Loss Functions</strong>: How we measure exactly how "wrong" our model is.</li>
  <li><strong>Gradients & Backpropagation</strong>: The mathematical engine that tells every weight how to change to improve.</li>
 </ul>

 <h4>How They Connect</h4>
  <p>Imagine a waterfall of information. Data flows into <strong>Nodes</strong>, gets shaped by <strong>Activations</strong>, and produces a guess. We compare that guess to the truth using a <strong>Loss Function</strong>. Then, we use <strong>Gradients</strong> to work backwards (<strong>Backpropagation</strong>) and tune the <strong>Weights</strong> so the loss is smaller next time. This cycle repeats for many <strong>Epochs</strong> until the model is smart.</p>
  `,
  solved: `
  <ul>
  <li><strong>Universal function approximation</strong>: Neural networks can learn to approximate any continuous function</li>
  <li><strong>Automatic feature learning</strong>: Instead of hand-engineering features, networks learn them from data</li>
  <li><strong>Scalability</strong>: Networks improve with more data and compute — unlike traditional ML which plateaus</li>
  <li><strong>End-to-end learning</strong>: Single differentiable pipeline from input to output</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Black box nature</strong>: Hard to interpret why the network made a specific decision</li>
  <li><strong>Data hunger</strong>: Need massive labeled datasets to train well</li>
  <li><strong>Computationally expensive</strong>: Requires GPUs, lots of memory and energy</li>
  <li><strong>Vanishing gradients</strong>: Deep networks struggle to train as gradients can become tiny</li>
  </ul>
  `,

  },
  "MathIntro": {
    visualizer: "LinearRegression",
 title: "Math Foundations: The Language of AI",
 content: `
 <p>Don't let the equations intimidate you! Machine Learning is built on a few key mathematical pillars: Linear Algebra, Calculus, and Probability. In this section, we'll make them intuitive.</p>

 <h4>The Roadmap</h4>
 <ul>
  <li><strong>Vectors & Matrices</strong>: The grids of numbers that represent everything from images to weights.</li>
  <li><strong>Dot Product</strong>: A "similarity meter" that calculates how much two signals align.</li>
  <li><strong>Tensors</strong>: Generalizing numbers to 3D, 4D, and beyond (essential for video and batches).</li>
  <li><strong>Jacobians & Hessians</strong>: Tools from Calculus that help us navigate the complex landscape of "Loss".</li>
 </ul>

 <h4>Why It Matters</h4>
  <p>Calculus tells us <em>which way</em> to move (Direction), while Linear Algebra handles the <em>huge scale</em> of modern data. Together, they allow us to process millions of pixels or words simultaneously.</p>
  `,
  solved: `
  <ul>
  <li><strong>Foundation for all ML</strong>: Every algorithm — from regression to transformers — is built on linear algebra and calculus</li>
  <li><strong>Efficient computation</strong>: Matrix operations enable processing millions of parameters in parallel</li>
  <li><strong>Gradient-based optimization</strong>: Calculus provides the tools to minimize loss functions</li>
  <li><strong>Probability theory</strong>: Enables uncertainty quantification and Bayesian methods</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Intimidating notation</strong>: Mathematical notation can be barriers to entry</li>
  <li><strong>Abstract concepts</strong>: Jacobian, Hessian, and tensor operations are hard to visualize</li>
  <li><strong>Scale challenges</strong>: Naive implementations don't scale; need optimized libraries</li>
  <li><strong>Can be overkill</strong>: Deep learning often works without explicit math knowledge</li>
  </ul>
  `,
  },
  "ClassicalMLIntro": {
    visualizer: "Tree",
 title: "Classical ML: Statistical Wisdom",
 content: `
 <p>Before deep learning took over, "Classical" Machine Learning provided robust tools for data analysis. These methods are still widely used because they are fast, interpretable, and work great on smaller datasets.</p>

 <h4>The Roadmap</h4>
 <ul>
  <li><strong>Linear & Logistic Regression</strong>: The foundation of prediction and classification.</li>
  <li><strong>SVM (Support Vector Machines)</strong>: Finding the perfect "boundary" between classes.</li>
  <li><strong>Decision Trees & Random Forests</strong>: Making decisions using a flowchart-like logic.</li>
  <li><strong>PCA</strong>: Simplifying complex data by finding the most important patterns.</li>
 </ul>

 <h4>How They Connect</h4>
  <p>While Neural Networks are like a brain, Classical ML models are like specialized tools. <strong>SVM</strong> is a master at finding boundaries, <strong>Random Forests</strong> are great at handling messy data, and <strong>KNN</strong> uses simple "neighbor" logic. Understanding these gives you a toolbox for any data problem.</p>
  `,
  solved: `
  <ul>
  <li><strong>Interpretability</strong>: Most classical methods produce explainable models</li>
  <li><strong>Small data friendly</strong>: Work well with thousands, not millions, of samples</li>
  <li><strong>Fast training and inference</strong>: No GPUs needed; runs in seconds</li>
  <li><strong>Strong baselines</strong>: Often hard to beat on structured/tabular data</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Feature engineering required</strong>: Don't learn features automatically; need good features</li>
  <li><strong>Limited expressiveness</strong>: Can't capture complex patterns without explicit engineering</li>
  <li><strong>Plateau with more data</strong>: Performance saturates; deep learning continues improving</li>
  <li><strong>Bottleneck for complex tasks</strong>: Image, text, speech need specialized deep learning</li>
  </ul>
  `,
  },
  "CoreDLIntro": {
    visualizer: "NeuralNetwork",
  title: "Deep Learning Core: Training Techniques",
  content: `
  <p>Moving beyond basic neurons, we need sophisticated techniques to train huge networks efficiently. This section covers the "engineering" of deep learning.</p>

  <h4>The Roadmap</h4>
  <ul>
   <li><strong>Optimizers (like Adam)</strong>: Smarter ways to update weights than simple descent.</li>
   <li><strong>Regularization (L1/L2, Dropout)</strong>: Techniques to stop the model from "memorizing" (overfitting).</li>
   <li><strong>Normalization (BatchNorm)</strong>: Keeping signals stable as they flow through deep layers.</li>
   <li><strong>Classification Metrics</strong>: Better ways to measure success than just "Accuracy".</li>
  </ul>

  <h4>The Synergy</h4>
  <p>A deep network is like a race car. The <strong>Optimizer</strong> is the engine, <strong>Regularization</strong> is the safety gear, and <strong>Normalization</strong> is the suspension that keeps the ride smooth. Without these, deep networks often fail to learn anything useful.</p>
  `,
  solved: `
  <ul>
  <li><strong>Stable training</strong>: Enables training networks with 100+ layers</li>
  <li><strong>Faster convergence</strong>: Adaptive optimizers don't require manual learning rate tuning</li>
  <li><strong>Generalization</strong>: Regularization prevents memorization and improves test performance</li>
  <li><strong>Better metrics</strong>: Precision, recall, F1 provide nuanced performance understanding</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Hyperparameter complexity</strong>: Adding techniques adds more hyperparameters to tune</li>
  <li><strong>Training instability</strong>: Without these, deep networks often fail to converge</li>
  <li><strong>Computational overhead</strong>: BatchNorm adds inference cost; dropout halves effective capacity during training</li>
  <li><strong>Not always necessary</strong>: Modern transformers and ResNets may not need all techniques</li>
  </ul>
  `,
  },
  "VisionIntro": {
    visualizer: "CNN",
 title: "Computer Vision: Teaching Machines to See",
 content: `
 <p>How does a computer see a cat in a grid of numbers? <strong>Convolutional Neural Networks (CNNs)</strong> are the answer. They use spatial patterns to recognize shapes, edges, and objects.</p>

 <h4>The Roadmap</h4>
 <ul>
  <li><strong>Convolution</strong>: Sliding "filters" to detect features like vertical lines or corners.</li>
  <li><strong>Pooling & Padding</strong>: Managing image size and keeping important details.</li>
  <li><strong>Skip Connections</strong>: The trick that allowed us to build 100+ layer networks (ResNets).</li>
  <li><strong>GANs</strong>: Competition between networks that results in "creating" new images.</li>
 </ul>

 <h4>The Hierarchy</h4>
  <p>Vision networks are hierarchical. The first layers see <em>lines</em>, the middle layers see <em>shapes</em> (eyes, ears), and the final layers see <em>objects</em> (cats, cars). It's very similar to how the human visual cortex works!</p>
  `,
  solved: `
  <ul>
  <li><strong>Hierarchical feature learning</strong>: Automatically learns edges → shapes → objects without manual feature engineering</li>
  <li><strong>Translation invariance</strong>: Can recognize objects regardless of position in image</li>
  <li><strong>Efficient parameter sharing</strong>: Same filters applied across entire image — far fewer parameters than fully connected layers</li>
  <li><strong>State-of-the-art accuracy</strong>: Achieves superhuman accuracy on image classification</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Limited receptive field</strong>: CNNs struggle with global context; need many layers to "see" far</li>
  <li><strong>Not rotation invariant</strong>: Must use data augmentation to learn rotated versions</li>
  <li><strong>Memory intensive</strong>: Large images require significant GPU memory</li>
  <li><strong>Replaced by ViT</strong>: Vision Transformers now often outperform CNNs on large datasets</li>
  </ul>
  `,

  },
  "ModernAIIntro": {
    visualizer: "Transformer",
  title: "Modern AI: Transformers & Beyond",
  content: `
  <p>We are currently in the era of <strong>Generative AI</strong>. This section covers the architectures powering ChatGPT, Midjourney, and more.</p>

 <h4>The Roadmap</h4>
 <ul>
  <li><strong>Transformers</strong>: The "Attention" mechanism that revolutionized how machines process sequences.</li>
  <li><strong>Diffusion Models</strong>: The math behind generating hyper-realistic images from noise.</li>
  <li><strong>LLMs & LoRA</strong>: How we scale these models and fine-tune them for specific tasks.</li>
 </ul>

 <h4>The Big Shift</h4>
  <p>Modern AI moved from <em>predicting</em> to <em>creating</em>. By using "Self-Attention", models can understand context over huge distances (like a whole book), allowing for the deep reasoning we see in today's AI agents.</p>
  `,
  solved: `
  <ul>
  <li><strong>Generative capability</strong>: Can create text, images, audio that weren't in training data</li>
  <li><strong>Long-range dependencies</strong>: Attention captures relationships across entire sequences</li>
  <li><strong>Few-shot learning</strong>: Can follow instructions without fine-tuning</li>
  <li><strong>Multimodal integration</strong>: Can combine text, image, and audio understanding</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Hallucinations</strong>: Generate plausible but factually incorrect content</li>
  <li><strong>Enormous compute</strong>: GPT-4 and similar models require massive GPU clusters</li>
  <li><strong>Token limits</strong>: Context windows are limited; can't process infinite text</li>
  <li><strong>Environmental impact</strong>: Training consumes enormous energy</li>
  </ul>
  `,

  },
  "SVM": {
 title: "SVM: Support Vector Machines",
 visualizer: "SVM",
 summary: "Support Vector Machines (SVMs) are supervised learning models that find the optimal boundary (hyperplane) to separate different classes of data. The 'Support Vectors' are the critical data points closest to this boundary; they define the margin that the algorithm tries to maximize to ensure robust classification.",
 takeaways: [
   "SVM aims to maximize the margin between classes for better generalization.",
   "The Kernel Trick allows SVMs to solve non-linear problems by projecting data into higher dimensions.",
   "It is highly effective for high-dimensional data (like text classification)."
 ],
 questions: [
   "How does the C parameter affect the SVM margin?",
   "What is the difference between hard and soft margin SVM?",
   "When should I use an RBF kernel instead of a linear one?"
 ],
 interactiveFormulas: [
 {
 name: "SVM Margin Width",
 components: [
 { symbol: "Margin", key: "margin", name: "Width", description: "Distance between hyperplanes" },
 { symbol: " = 2 / ||w||", key: "formula", name: "Formula", description: "Inverse of weight norm" }
 ],
 variables: [
 { key: "wnorm", symbol: "||w||", name: "Weight Norm", min: 0.5, max: 10, step: 0.1, default: 2.0, decimals: 1 }
 ],
 calculate: (vals, get) => 2 / get("wnorm", 2),
 insights: [
 "Smaller ||w|| results in a larger margin (more robust).",
 "Larger ||w|| creates a narrower margin, fitting the data more tightly.",
 "SVM training is essentially an optimization problem: maximize 2/||w||."
 ]
 }
 ],
 content: `
 <p><strong>SVM</strong> finds the hyperplane that best separates two classes with the <strong>maximum margin</strong>. It's robust to outliers and works well in high dimensions.</p>

 <h4>Intuition</h4>
 <p>Imagine drawing a line between two groups of points. Many lines separate them — SVM picks the one that has the widest empty "street" on either side. The points touching the curb are the <em>support vectors</em>; move any other point and the line doesn't budge.</p>

 <h4>The Kernel Trick</h4>
 <p>SVMs can use kernels (like RBF, polynomial, or sigmoid) to implicitly project data into higher dimensions where it becomes linearly separable — without ever computing the projection explicitly. This is why SVMs handled nonlinear problems elegantly long before deep learning.</p>

<h4>The History of SVMs</h4>
  <p><strong>1963</strong>: Vladimir Vapnik and Alexey Chervonenkis introduce the <em>Generalization Bound</em> — statistical learning theory foundation.<br/>
  <strong>1964</strong>: They develop the <em>Maximal Margin Classifier</em> — the geometric foundation of SVMs.<br/>
  <strong>1992</strong>: Vapnik implements the first working SVM at Bell Labs with the kernel trick.<br/>
  <strong>1995</strong>: Corinna Cortes and Vapnik publish <em>Soft Margin SVMs</em> — allows overlap between classes.<br/>
  <strong>1998</strong>: John Platt releases <em>SMO</em> (Sequential Minimal Optimization) — makes SVMs scalable.<br/>
  <strong>2000s</strong>: SVMs win every major ML benchmark — Until 2012 when deep learning surpassed them on ImageNet.<br/>
  <strong>Legacy</strong>: SVMs introduced the kernel trick, structural risk minimization, and the margin concept — all foundational to modern ML.</p>

 <h4>When to Use</h4>
 <p>• Small-to-medium datasets (a few thousand rows) with clear margins<br/>
 • High-dimensional data where features &gt; samples (genomics, text)<br/>
 • Binary classification where interpretability of the decision boundary matters</p>

 <h4>When Not to Use</h4>
 <p>• Very large datasets (training scales poorly, O(n²) to O(n³))<br/>
 • When you need calibrated probability estimates (use logistic regression)<br/>
 • Noisy / overlapping classes — soft-margin helps but is not magic</p>

 <h4>Common Pitfalls</h4>
 <p>• <strong>Feature scaling is mandatory</strong> — SVM is sensitive to feature magnitude; always standardize inputs.<br/>
 • Wrong kernel choice: RBF is a safe default, but linear is faster on high-dim text.<br/>
 • The <em>C</em> hyperparameter trades margin width against misclassification — tune it with cross-validation.</p>

 <h4>Real-World Uses</h4>
  <p>Spam filtering, handwritten digit recognition, protein classification, face detection (pre-deep-learning), and many Kaggle wins on tabular data.</p>
  `,
  solved: `
  <ul>
  <li><strong>Linear separability</strong>: SVMs can find perfect boundaries when data is linearly separable in some dimension</li>
  <li><strong>High-dimensional data</strong>: Works well when features > samples (genomics, text classification)</li>
  <li><strong>Interpretability</strong>: Support vectors clearly show which points matter most for the decision boundary</li>
  <li><strong>Kernel trick</strong>: Solves non-linear problems without explicit feature engineering</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Scaling issues</strong>: Training is O(n²) to O(n³) — cannot handle millions of samples</li>
  <li><strong>Kernel selection</strong>: Choosing wrong kernel (RBF vs linear) hurts performance significantly</li>
  <li><strong>No probability output</strong>: Only gives class labels, not probabilities (without Platt scaling)</li>
  <li><strong>Sensitive to scaling</strong>: Features must be normalized, or SVM fails</li>
  </ul>
  `,



















 },
 "DecisionTree": {

 title: "Decision Trees: If-Then Reasoning",
 content: `
 <p><strong>Decision Trees</strong> split data based on feature values to maximize 'purity' (homogeneity) in the resulting subsets — producing a flowchart of yes/no questions that ends in a prediction.</p>

 <h4>Intuition</h4>
 <p>Think of how a doctor diagnoses: "Fever? Yes. Cough? Yes. Shortness of breath? Yes → possible pneumonia." A tree learns that sequence of questions automatically, choosing at each step the question that most cleanly separates the remaining cases.</p>

 <h4>Splitting Criteria</h4>
 <p>Common metrics are <strong>Gini Impurity</strong> and <strong>Information Gain</strong> (based on <em>Entropy</em>). Both measure disorder — a perfect split sends all one class left and all the other class right.</p>

<h4>History of Decision Trees</h4>
  <p><strong>1963</strong>: Morgan and Sonquist introduce <em>AID</em> (Automatic Interaction Detector) — first decision tree for survey analysis.<br/>
  <strong>1980</strong>: J. Ross Quinlan begins work on <em>ID3</em> (Iterative Dichotomiser 3).<br/>
  <strong>1986</strong>: Quinlan publishes <em>ID3</em> — uses entropy and information gain.<br/>
  <strong>1993</strong>: Quinlan releases <em>C4.5</em> — improves ID3 with numeric attributes, pruning, and missing values.<br/>
  <strong>1984</strong>: Leo Breiman et al. publish <em>CART</em> (Classification and Regression Trees) — uses Gini impurity, full Bayesian interpretation.<br/>
  <strong>2014</strong>: Tianqi Chen introduces <em>XGBoost</em> — gradient boosted trees, dominates Kaggle.<br/>
  <strong>2017</strong>: Microsoft releases <em>LightGBM</em> — faster gradient boosted trees with histogram binning.<br/>
  <strong>Why Survived</strong>: Trees are interpretable, handle mixed data types, and ensemble methods (boosting) achieve state-of-the-art accuracy.</p>

 <h4>Strengths</h4>
 <p>• Zero feature scaling required — splits are based on order, not magnitude.<br/>
 • Native handling of mixed numeric and categorical features.<br/>
 • Fully interpretable — you can print the tree and read the rules.</p>

 <h4>Common Pitfalls</h4>
 <p>• Trees overfit hard: a deep unpruned tree can memorize noise. Always set <code>max_depth</code> or use pruning.<br/>
 • Instability: small data changes can produce very different trees → use ensembles like Random Forests.<br/>
 • Biased toward features with many unique values (use permutation importance to check).</p>

 <h4>Real-World Uses</h4>
  <p>Credit scoring, medical triage, customer-churn rules engines, and as the weak learners inside Random Forests and Gradient Boosting (XGBoost, LightGBM) — which still win the majority of tabular-data Kaggle competitions.</p>
  `,
  solved: `
  <ul>
  <li><strong>Interpretability</strong>: Can print and read the tree — no black box</li>
  <li><strong>Mixed data types</strong>: Handles both numeric and categorical without one-hot encoding</li>
  <li><strong>No feature scaling needed</strong>: Splits depend on order, not magnitude</li>
  <li><strong>Non-linear relationships</strong>: Can capture complex patterns without explicit feature engineering</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Overfitting</strong>: Deep trees memorize noise; need max_depth or pruning</li>
  <li><strong>Instability</strong>: Small data changes produce very different trees</li>
  <li><strong>Biased to features with many unique values</strong>: Can miss important features with few values</li>
  <li><strong>Greedy algorithm</strong>: Makes locally optimal splits that may not be globally optimal</li>
  </ul>
  `,























 },
 "RandomForest": {

 title: "Random Forests: Ensemble Learning",
 content: `
 <p><strong>Random Forests</strong> combine multiple Decision Trees to reduce overfitting and improve accuracy. This is a technique called <strong>Bagging</strong> (Bootstrap Aggregating).</p>
 `,




















  solved: `
  <ul>
  <li><strong>Reduced variance</strong>: Averaging many trees reduces overfitting compared to single tree</li>
  <li><strong>Feature importance</strong>: Built-in importance scores show which features matter most</li>
  <li><strong>Handles missing values</strong>: Can handle missing data without imputation</li>
  <li><strong>Robust to outliers</strong>: Individual tree errors are averaged out</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Memory intensive</strong>: Must store all trees; can be large on disk</li>
  <li><strong>Slower inference</strong>: Must run all trees for each prediction</li>
  <li><strong>Less interpretable</strong>: Can't print the whole forest like a single tree</li>
  <li><strong>Not always best</strong>: Gradient boosting often outperforms on structured data</li>
  </ul>
  `,
  },
   "KNN": {

   title: "KNN: K-Nearest Neighbors",
   content: `
   <p><strong>KNN</strong> classifies a point based on the majority class of its 'k' closest neighbors. It's a 'lazy learner' (no training phase).</p>
   `,
   solved: `
   <ul>
   <li><strong>No training phase</strong>: KNN is simple — just stores data, makes predictions on-the-fly</li>
   <li><strong>Intuitive</strong>: "Tell me who your friends are, I'll tell you who you are"</li>
   <li><strong>No model assumptions</strong>: Works for any data distribution</li>
   <li><strong>Adaptable</strong>: Can easily add new training data without retraining</li>
   </ul>
   `,
   shortcomings: `
   <ul>
   <li><strong>Slow prediction</strong>: Must compute distances to ALL training points for each prediction</li>
   <li><strong>Curse of dimensionality</strong>: Distances become meaningless in high dimensions</li>
   <li><strong>Feature scaling required</strong>: Without normalization, features with larger ranges dominate</li>
   <li><strong>Sensitive to k</strong>: Small k = noise sensitive, large k = smooth but may miss patterns</li>
   </ul>
   `,




















 },
  "PCA": {
    visualizer: "PCA",
   title: "PCA: Principal Component Analysis",
   summary: "Principal Component Analysis (PCA) is a dimensionality reduction technique that transforms a large set of variables into a smaller one that still contains most of the original information. It finds the axes (Principal Components) along which the data varies the most, allowing for visualization and noise reduction.",
   takeaways: [
     "PCA projects high-dimensional data onto a lower-dimensional subspace.",
     "The first Principal Component captures the maximum variance in the dataset.",
     "It's widely used for data compression and to speed up other ML algorithms."
   ],
   questions: [
     "What is the difference between variance and explained variance?",
     "Should I normalize my data before running PCA?",
     "How many principal components should I keep?"
   ],
   content: `
   <p><strong>PCA</strong> reduces data dimensions while preserving as much variance as possible. It finds new axes (Principal Components) that are orthogonal.</p>
   `,
   solved: `
   <ul>
   <li><strong>Dimensionality reduction</strong>: Reduces hundreds of features to just a few principal components</li>
   <li><strong>Noise reduction</strong>: Minor components often contain noise; dropping them denoises data</li>
   <li><strong>Visualization</strong>: Makes high-dimensional data viewable in 2D/3D</li>
   <li><strong>Decorrelation</strong>: Principal components are uncorrelated — solves multicollinearity</li>
   </ul>
   `,
   shortcomings: `
   <ul>
   <li><strong>Linear only</strong>: Only finds linear relationships; misses non-linear patterns</li>
   <li><strong>Interpretability loss</strong>: Principal components are abstract combinations, not original features</li>
   <li><strong>Assumes Gaussian</strong>: Optimal for normally distributed data</li>
   <li><strong>Information loss</strong>: Reducing dimensions always loses some information</li>
   </ul>
   `,

  interactiveFormulas: [
 {
 name: "Explained Variance",
 components: [
 { symbol: "Var_exp", key: "var", name: "Variance Ratio", description: "Information captured" },
 { symbol: " = λ₁ / Σλ", key: "formula", name: "Formula", description: "Eigenvalue ratio" }
 ],
 variables: [
 { key: "lambda1", symbol: "λ₁", name: "Eigenvalue 1", min: 1, max: 100, step: 1, default: 70, decimals: 0 },
 { key: "lambda2", symbol: "λ₂", name: "Eigenvalue 2", min: 1, max: 100, step: 1, default: 20, decimals: 0 },
 { key: "lambda3", symbol: "λ₃", name: "Eigenvalue 3", min: 1, max: 100, step: 1, default: 10, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const l1 = get("lambda1", 70);
 const l2 = get("lambda2", 20);
 const l3 = get("lambda3", 10);
 return (l1 / (l1 + l2 + l3) * 100).toFixed(1) + "%";
 },
 insights: [
 "PCs are ordered by how much variance they capture.",
 "Often the first 2-3 PCs capture 90%+ of the info.",
 "Great for visualizing high-dimensional data in 2D."
 ]
 }
 ]
 },
"Loss": {

  title: "Loss Functions: Measuring Error",
  content: `
  <p>The <strong>Loss Function</strong> converts model mistakes into a single number we can minimize. Lower loss means better predictions.</p>
 
  <h4>Mean Squared Error (MSE)</h4>
  <p>Classic regression loss. Squaring the difference punishes large mistakes strongly.</p>
  <div class="equation">
   MSE = (1 / n) * sum (y - y_hat)^2
   </div>
   `,
   solved: `
   <ul>
   <li><strong>Optimization target</strong>: Provides a differentiable signal for gradient descent</li>
   <li><strong>Single metric</strong>: Reduces complex prediction errors to one number</li>
   <li><strong>Differentiable</strong>: MSE has a clean gradient, making optimization straightforward</li>
   <li><strong>Quantifies error magnitude</strong>: Squares penalize large errors more than small ones</li>
   </ul>
   `,
   shortcomings: `
   <ul>
   <li><strong>Outlier sensitivity</strong>: MSE squares large errors heavily — outliers dominate the loss</li>
   <li><strong>No probability interpretation</strong>: Doesn't give calibrated probabilities like cross-entropy</li>
   <li><strong>Scale-dependent</strong>: MSE value depends on target scale — hard to compare across tasks</li>
   <li><strong>Non-robust</strong>: A few bad predictions can make the whole loss huge</li>
   </ul>
   `,























































































































 },
  "Epoch": {
    visualizer: "NeuralNetwork",
  title: "Epoch, Batch, and Iterations",
  content: `
  <p>An <strong>Epoch</strong> is one full sweep through the training data. Inside each epoch, we chop data into batches so gradients fit in memory.</p>
  <div class="equation">
  Updates = Epochs * (Data Size / Batch Size)
  </div>
  <p>Think of it like re-reading your notes. Each epoch reinforces the pattern but too many can lead to memorization (overfitting).</p>
  `,
  solved: `
  <ul>
  <li><strong>Memory efficiency</strong>: Batches fit in GPU memory vs entire dataset</li>
  <li><strong>Noisy gradients</strong>: Small batches provide regularization effect</li>
  <li><strong>Faster convergence</strong>: More weight updates per epoch with small batches</li>
  <li><strong>Training control</strong>: Epochs let us track progress and apply early stopping</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Batch size trade-off</strong>: Small = noisy gradients, large = slower convergence</li>
  <li><strong>Overfitting risk</strong>: Too many epochs = memorized training data</li>
  <li><li><strong>Inconsistent epoch times</strong>: Variable batch counts slow training</strong></li>
  <li><strong>Hard to determine optimal epochs</strong>: Requires validation or early stopping</li>
  </ul>
  `,
 interactiveFormulas: [
 {
 name: "Training Update Counter",
 parts: [
 { symbol: "Updates", key: "updates", name: "Gradient Updates", description: "How many times weights change" },
 { symbol: " = ", key: null },
 { symbol: "Epochs", key: "epochs", name: "Epoch Count", description: "Number of full passes" },
 { symbol: " * ", key: null },
 { symbol: "(N / B)", key: "ratio", name: "Mini-batches", description: "How many batches per epoch" }
 ],
 variables: [
 { key: "epochs", symbol: "E", name: "Epochs", min: 1, max: 200, step: 1, default: 20, decimals: 0 },
 { key: "data_size", symbol: "N", name: "Data Size", min: 100, max: 50000, step: 100, default: 2000, decimals: 0 },
 { key: "batch_size", symbol: "B", name: "Batch Size", min: 4, max: 512, step: 4, default: 64, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const epochs = get("epochs", 20);
 const dataSize = get("data_size", 2000);
 const batch = Math.max(1, get("batch_size", 64));
 return Math.floor(epochs * (dataSize / batch));
 },
 insights: [
 "More epochs or smaller batches = more updates.",
 "Embedded firmware training often uses tiny batches due to RAM limits.",
 "Track this number to estimate training time on GPU vs CPU."
 ]
 },
 {
 name: "Epoch Time Estimator",
 parts: [
 { symbol: "Time", key: "time", name: "Epoch Duration", description: "How long one epoch takes" },
 { symbol: " = ", key: null },
 { symbol: "(N / B)", key: "batches", name: "Batches per Epoch", description: "Mini-batches we must process" },
 { symbol: " * ", key: null },
 { symbol: "t_batch", key: "batch_time", name: "Batch Time", description: "Seconds per batch" }
 ],
 variables: [
 { key: "data_size", symbol: "N", name: "Data Size", min: 100, max: 20000, step: 100, default: 5000, decimals: 0 },
 { key: "batch_size", symbol: "B", name: "Batch Size", min: 16, max: 512, step: 16, default: 128, decimals: 0 },
 { key: "batch_time", symbol: "t_batch", name: "Batch Seconds", min: 0.001, max: 1, step: 0.001, default: 0.02, decimals: 3 }
 ],
 calculate: (vals, get) => {
 const N = get("data_size", 5000);
 const B = Math.max(1, get("batch_size", 128));
 const t = get("batch_time", 0.02);
 return (N / B) * t;
 },
 insights: [
 "Helps size training jobs (e.g., on embedded GPUs).",
 "Batch time drops on parallel hardware but rises if model is huge.",
 "Total training time = Epoch Time * number of epochs."
 ]
 }
 ]
 },
  "Learning Rate": {

  title: "Learning Rate and Schedules",
  content: `
  <p>The <strong>Learning Rate</strong> controls the size of weight updates. Too high and the system oscillates, too low and training crawls.</p>
  <p>Engineers often apply schedules so the network takes big steps early and fine-steps later.</p>
  <div class="equation">
  w_new = w_old - lr * gradient
  </div>
  `,
  solved: `
  <ul>
  <li><strong>Controls convergence speed</strong>: Proper LR enables fast training</li>
  <li><strong>Learning rate schedules</strong>: Decay helps find better optima</li>
  <li><strong>Adaptive methods</strong>: Adam, RMSprop auto-tune LR per parameter</li>
  <li><strong>Prevents divergence</strong>: Keeps weight updates from exploding</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Sensitive hyperparameter</strong>: Wrong LR breaks training entirely</li>
  <li><strong>Needs schedule</strong>: Static LR rarely works for full training</li>
  <li><strong>May get stuck</strong>: Can converge to poor local minima</li>
  <li><strong>Differs per architecture</strong>: What works for CNNs may fail for RNNs</li>
  </ul>
  `,
























































  },
  "Activation": {
    visualizer: "Activation",
   title: "Activation Functions = Signal Shapers",
    content: `
    <p>Activations transform summed inputs before passing them onward. They introduce non-linearity so the network can learn complex patterns and logic gates.</p>
   `,
   solved: `
   <ul>
   <li><strong>Non-linearity</strong>: Without activations, network is just linear regression</li>
   <li><strong>Gradient flow</strong>: Activations like ReLU help gradients propagate</li>
   <li><strong>Representational power</strong>: Enable networks to approximate any function</li>
   <li><strong>Sparse activation</strong>: ReLU's zero outputs create efficient representations</li>
   </ul>
   `,
   shortcomings: `
   <ul>
   <li><strong>Vanishing gradients</strong>: Sigmoid/tanh squash gradients to near-zero</li>
   <li><strong>Dead neurons</strong>: ReLU neurons can permanently output zero</li>
   <li><strong>Not zero-centered</strong>: Sigmoid outputs all positive, causing optimization issues</li>
   <li><strong>Exploding outputs</strong>: Unbounded activations can cause numerical instability</li>
   </ul>
   `,

   interactiveFormulas: [
 {
 name: "Sigmoid",
 parts: [
 { symbol: "σ(x)", key: "sig", name: "Sigmoid Output", description: "Probability-like value between 0 and 1" },
 { symbol: " = ", key: null },
 { symbol: "1 / (1 + exp(-x))", key: "formula", name: "Formula", description: "Smooth S-curve" }
 ],
 variables: [
 { key: "x", symbol: "x", name: "Input", min: -12, max: 12, step: 0.1, default: -2, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const x = get("x", -2);
 return 1 / (1 + Math.exp(-x));
 },
 insights: [
 "Near x=0 the curve is steep and gradients are strong.",
 "Large |x| saturates (gradients vanish).", 
 "Used in logistic regression and gate activations."
 ]
 },
 {
 name: "ReLU",
 parts: [
 { symbol: "ReLU(x)", key: "relu", name: "Output", description: "Zero for negative inputs, linear for positive" },
 { symbol: " = ", key: null },
 { symbol: "max(0, x)", key: "max", name: "Filter", description: "Keeps positive signal, clips negatives" }
 ],
 variables: [
 { key: "x", symbol: "x", name: "Input", min: -5, max: 5, step: 0.1, default: 1.5, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const x = get("x", 1.5);
 return Math.max(0, x);
 },
 insights: [
 "Acts like an ideal diode (EE analogy).",
 "Prevents vanishing gradients for positive inputs.",
 "Negative inputs disable the neuron (sparse activations)."
 ]
 },
 {
 name: "Tanh",
 parts: [
 { symbol: "tanh(x)", key: "tanh", name: "Output", description: "Scaled between -1 and 1" },
 { symbol: " = ", key: null },
 { symbol: "(exp(x) - exp(-x)) / (exp(x) + exp(-x))", key: "formula", name: "Formula", description: "Hyperbolic tangent" }
 ],
 variables: [
 { key: "x", symbol: "x", name: "Input", min: -5, max: 5, step: 0.1, default: 0.5, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const x = get("x", 0.5);
 const ex = Math.exp(x);
 const enx = Math.exp(-x);
 return (ex - enx) / (ex + enx);
 },
 insights: [
 "Zero-centered output simplifies optimization.",
 "Good for modeling analog signals (EE).",
 "Still suffers from saturation at extremes." 
 ]
 }
 ]
 },
 "Hidden Layer": {

 title: "Hidden Layers = Feature Extractors",
 content: `
 <p>A hidden layer applies weights and biases to inputs, then an activation. Stacking layers lets the network learn hierarchical features (edges -> shapes -> concepts).</p>
 <div class="equation">
 z = W * x + b, a = activation(z)
 </div>
 `,

































































 },
  "Optimizer": {
    visualizer: "Optimizer",
    title: "Optimizers: Strategies for Weight Updates",
    content: `
    <p>Optimizers decide how gradients adjust weights. Different strategies balance speed, stability, and memory.</p>
    `,
    solved: `
    <ul>
    <li><strong>Faster convergence</strong>: Adam adapts learning rate per parameter</li>
    <li><strong>Navigation of landscapes</strong>: Momentum helps escape local minima</li>
    <li><strong>Numerical stability</strong>: Adaptive methods prevent exploding gradients</li>
    <li><strong>Less tuning</strong>: Adam works well out-of-box across many problems</li>
    </ul>
    `,
    shortcomings: `
    <ul>
    <li><strong>Extra memory</strong>: Adam stores two momentum terms per parameter</li>
    <li><strong>Generalization gap</strong>: Sometimes SGD generalizes better than Adam</li>
    <li><strong>Can fail</strong>: Adaptive methods may not converge on some loss landscapes</li>
    <li><strong>Hyperparameters</strong>: Beta values still need tuning</li>
    </ul>
    `,

   interactiveFormulas: [
 {
 name: "SGD with Momentum",
 parts: [
 { symbol: "v", key: "velocity", name: "Velocity", description: "Momentum term" },
 { symbol: " = ", key: null },
 { symbol: "beta * v_prev + grad", key: "update", name: "Update", description: "Blend past movement with current gradient" }
 ],
 variables: [
 { key: "beta", symbol: "beta", name: "Momentum", min: 0, max: 0.99, step: 0.01, default: 0.9, decimals: 2 },
 { key: "v_prev", symbol: "v_prev", name: "Prev Velocity", min: -3, max: 3, step: 0.1, default: 0.4, decimals: 2 },
 { key: "grad", symbol: "grad", name: "Gradient", min: -3, max: 3, step: 0.1, default: -0.8, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const beta = get("beta", 0.9);
 const vPrev = get("v_prev", 0.4);
 const grad = get("grad", -0.8);
 return beta * vPrev + grad;
 },
 insights: [
 "High beta smooths updates like a low-pass filter.",
 "Helps jump small valleys in the loss landscape.",
 "Analogous to momentum in physical systems." 
 ]
 },
 {
 name: "AdamW Update",
 components: [
 { symbol: "w_new", key: "wnew", name: "New Weight", description: "Updated parameter" },
 { symbol: " = w_old - η * (m_hat / (√v_hat + ε) + λ * w_old)", key: "formula", name: "Formula", description: "Adam update + decoupled weight decay" }
 ],
 variables: [
 { key: "w", symbol: "w", name: "Weight", min: -5, max: 5, step: 0.1, default: 2.0, decimals: 1 },
 { key: "eta", symbol: "η", name: "Learning Rate", min: 0.001, max: 0.5, step: 0.001, default: 0.01, decimals: 3 },
 { key: "lambda", symbol: "λ", name: "Decay", min: 0, max: 0.1, step: 0.001, default: 0.01, decimals: 3 },
 { key: "update", symbol: "grad", name: "Adam Term", min: -2, max: 2, step: 0.1, default: 0.5, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const w = get("w", 2.0);
 const eta = get("eta", 0.01);
 const lam = get("lambda", 0.01);
 const upd = get("update", 0.5);
 return w - eta * (upd + lam * w);
 },
 insights: [
 "AdamW decouples weight decay from the gradient update.",
 "Crucial for transformer training (prevents weight scale explosion).",
 "Decay (λ) keeps weights small, acting as L2 regularization."
 ]
 },
 {
 name: "Newton/L-BFGS Step",
 components: [
 { symbol: "Δw", key: "delta", name: "Step", description: "Weight change" },
 { symbol: " = - H⁻¹ * g", key: "formula", name: "Formula", description: "Inverse Hessian * Gradient" }
 ],
 variables: [
 { key: "grad", symbol: "g", name: "Gradient", min: -5, max: 5, step: 0.1, default: 2.0, decimals: 1 },
 { key: "curv", symbol: "H", name: "Curvature", min: 0.1, max: 10, step: 0.1, default: 4.0, decimals: 1 }
 ],
 calculate: (vals, get) => -get("grad", 2.0) / get("curv", 4.0),
 insights: [
 "L-BFGS is a quasi-Newton method that approximates the Hessian (H).",
 "Takes much larger, smarter steps than first-order methods (SGD).",
 "Great for small datasets or batch optimization (like training logistic regression)."
 ]
 },
 {
 name: "Adam Step",
 parts: [
 { symbol: "m_hat", key: "mhat", name: "Gradient Mean", description: "Bias-corrected first moment" },
 { symbol: " / ", key: null },
 { symbol: "sqrt(v_hat) + eps", key: "vhat", name: "Gradient Variance", description: "Bias-corrected second moment" }
 ],
 variables: [
 { key: "m", symbol: "m", name: "First Moment", min: -2, max: 2, step: 0.1, default: 0.6, decimals: 2 },
 { key: "v", symbol: "v", name: "Second Moment", min: 0.0001, max: 4, step: 0.0001, default: 0.5, decimals: 4 },
 { key: "eps", symbol: "eps", name: "Epsilon", min: 0.000001, max: 0.01, step: 0.000001, default: 0.000001, decimals: 6 },
 { key: "lr", symbol: "lr", name: "Learning Rate", min: 0.0001, max: 0.1, step: 0.0001, default: 0.001, decimals: 4 }
 ],
 calculate: (vals, get) => {
 const m = get("m", 0.6);
 const v = get("v", 0.5);
 const eps = get("eps", 0.000001);
 const lr = get("lr", 0.001);
 return lr * (m / (Math.sqrt(v) + eps));
 },
 insights: [
 "Adam adapts step size per weight automatically.",
 "Great when gradients vary wildly across layers.",
 "Popular default for deep learning frameworks." 
 ]
 }
 ]
 },
 "Nodes": {

 title: "Neurons: Tiny Signal Processors",
 content: `
 <p>Each neuron gathers weighted inputs, adds a bias, and applies an activation. It is analogous to a weighted operational amplifier with a non-linear output stage.</p>
 <div class="equation">
  output = activation( sum(weight_i * input_i) + bias )
  </div>
  `,
  solved: `
  <ul>
  <li><strong>Universal computation</strong>: Single neuron can implement AND, OR, NOT gates</li>
  <li><strong>Weighted sum</strong>: Learns to weight inputs by importance</li>
  <li><strong>Bias term</strong>: Allows shifting the activation threshold</li>
  <li><strong>Non-linear activation</strong>: Enables complex pattern learning</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Limited representation</strong>: Single neuron can only solve linearly separable problems</li>
  <li><strong>Dead neurons</strong>: Can output zero forever if initial weights are wrong</li>
  <li><strong>Gradient vanishing</strong>: Strong activations saturate and stop learning</li>
  <li><strong>No memory</strong>: Each forward pass is independent</li>
  </ul>
  `,




















































 },
 "Layer": {

 title: "Layers = Parameter Budgets",
 content: `
 <p>Each layer has weights (connections) and biases. The parameter count tells you the memory cost and overfitting risk.</p>
 <div class="equation">
  params = inputs * outputs + outputs
  </div>
  `,
  solved: `
  <ul>
  <li><strong>Hierarchical representation</strong>: Each layer transforms input to more abstract features</li>
  <li><strong>Parameter efficiency</strong>: Shared weights across inputs reduce total parameters</li>
  <li><strong>Expressiveness</strong>: More layers = more complex functions can be approximated</li>
  <li><strong>Memory estimation</strong>: Parameter count helps plan GPU memory needs</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Quadratic growth</strong>: Dense layers grow quadratically with width</li>
  <li><strong>Overfitting risk</strong>: Too many parameters relative to data causes overfitting</li>
  <li><strong>Computational cost</strong>: More parameters = more compute for forward/backward pass</li>
  <li><strong>Gradient degradation</strong>: Very deep networks suffer from vanishing gradients</li>
  </ul>
  `,

























 },
"Gradient": {

   title: "Gradients: Directions for Learning",
   content: `
   <p>A <strong>Gradient</strong> is a vector of partial derivatives telling us which way the loss increases. The negative gradient points downhill.</p>
   <p>In calculus terms, it is like measuring slope along each axis. In engineering, think of it as sensitivity analysis.</p>
   `,
   solved: `
   <ul>
   <li><strong>Direction for improvement</strong>: Tells us which direction reduces loss</li>
   <li><strong>Learning signal</strong>: Magnitude tells us how important each weight is</li>
   <li><strong>Backpropagation</strong>: Chain rule allows gradients to flow from output to input</li>
   <li><strong>Optimization foundation</strong>: All gradient-based learning relies on this</li>
   </ul>
   `,
   shortcomings: `
   <ul>
   <li><strong>Vanishing gradients</strong>: Can become tiny in deep networks, stopping learning</li>
   <li><strong>Exploding gradients</strong>: Can become huge, causing numerical instability</li>
   <li><strong>Local minima</strong>: Can get stuck in suboptimal solutions</li>
   <li><strong>Saddle points</strong>: Flat regions can fool optimizers into thinking they've converged</li>
   </ul>
   `,

























 },
 "Backpropagation": {

 title: "Backpropagation: Chain Rule in Action",
 content: `
 <p>Backpropagation applies the chain rule to send error information backward through the network. Each layer receives an error signal (delta) scaled by the derivative of its activation.</p>
 <div class="equation">
 delta_l = (W_{l+1}^T * delta_{l+1}) * activation'(z_l)
 </div>
<p>This lets every weight know how it should change to decrease the loss.</p>
  `,
  solved: `
  <ul>
  <li><strong>Efficient gradient computation</strong>: Chain rule avoids redundant calculations</li>
  <li><li><strong>Credits every weight</strong>: Each parameter knows its contribution to error</li></li>
  <li><strong>Scalable to deep networks</strong>: Works for any depth network</li>
  <li><strong>Foundation of deep learning</strong>: Enables training networks with millions of parameters</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Requires differentiable operations</strong>: Can't use non-differentiable functions</li>
  <li><strong>Gradient storage</strong>: Must store activations for backward pass</li>
  <li><strong>Vanishing signal</strong>: Error signal weakens as it propagates back</li>
  <li><strong>Not interpretable</strong>: Hard to understand what learned features mean</li>
  </ul>
  `,


























 },
 "Softmax": {

 title: "Softmax: Probabilities from Logits",
 content: `
 <p>The <strong>Softmax</strong> function converts raw scores (logits) into probabilities that sum to 1. Perfect for multi-class classification.</p>
 <div class="equation">
 softmax(z_i) = exp(z_i) / sum_j exp(z_j)
 </div>
<p>Subtracting the max logit improves numerical stability (avoid overflow).</p>
  `,
  solved: `
  <ul>
  <li><strong>Probability output</strong>: Converts logits to probabilities that sum to 1</li>
  <li><strong>Multi-class handling</strong>: Naturally handles any number of classes</li>
  <li><strong>Gradient from probabilities</strong>: Works with cross-entropy loss for easy training</li>
  <li><strong>Winner-takes-all behavior</strong>: Higher logits get much higher probabilities</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Expands differences</strong>: Small logit differences become large probability differences</li>
  <li><strong>Not suitable for multi-label</strong>: Requires mutually exclusive classes</li>
  <li><strong>Numerical instability</strong>: Exp can overflow without logit subtraction trick</li>
  <li><strong>Requires cross-entropy</strong>: Best results come from pairing with log loss</li>
  </ul>
  `,






























 },
"Regularization": {
  title: "Regularization: Guard Against Overfitting",

  content: `
 <p>Regularization adds a penalty to large weights so the model generalizes better.</p>

 <h4>L1 (Lasso)</h4>
 <p>Encourages sparse weights (many zeros). Useful for feature selection.</p>

 <h4>L2 (Ridge)</h4>
  <p>Penalizes large weights smoothly. Keeps signals small, similar to resistor networks limiting current.</p>
  `,
  solved: `
  <ul>
  <li><strong>Prevents overfitting</strong>: Penalizes large weights, limiting model complexity</li>
  <li><strong>Better generalization</strong>: Models with smaller weights generalize to unseen data</li>
  <li><strong>Condition number improvement</strong>: L2 makes optimization landscape better behaved</li>
  <li><strong>Feature selection</strong>: L1 can identify important features by zeroing others</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Hyperparameter tuning</strong>: Lambda requires cross-validation to find optimal value</li>
  <li><strong>Not a silver bullet</strong>: Can underfit if regularization is too strong</li>
  <li><strong>Doesn't help with bad data</strong>: No amount of regularization fixes noisy labels</li>
  <li><strong>L1 non-differentiable</strong>: Requires special handling at zero</li>
  </ul>
  `,




















































 },
 "Convolution": {

 title: "Convolution: Sliding Dot Products",
 content: `
 <p>Convolution layers slide a small filter (kernel) across the input. Each position multiplies overlapping values and sums them.</p>
  <p>In vision mode, think of kernels detecting edges or corners. In EE, it is similar to FIR filters.</p>
  `,
  solved: `
  <ul>
  <li><strong>Parameter sharing</strong>: Same filter weights applied across entire image</li>
  <li><strong>Translation invariance</strong>: Detects features regardless of position</li>
  <li><strong>Hierarchical features</strong>: Learns edges → shapes → objects automatically</li>
  <li><strong>Memory efficiency</strong>: Fewer parameters than fully connected layers</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Limited receptive field</strong>: Small kernels only see local patterns</li>
  <li><strong>Requires many layers</strong>: Need depth to capture global context</li>
  <li><li><strong>Not rotation invariant</strong>: Must augment data to learn rotated features</strong></li>
  <li><strong>Loses location info</strong>: Pooling discards precise position</li>
  </ul>
  `,






























 },
 "Signal Processing": {

 title: "Signals and Frequency",
 content: `
 <p>Neural networks can process signals too. Concepts like signal energy and frequency response connect EE fundamentals with machine learning.</p>
 <div class="equation">
 Energy = sum x(t)^2, SNR = 10 * log10(signal / noise)
 </div>
 `,























 },
 "Vectors & Matrices": {

 title: "Vectors & Matrices: Lego Bricks of Vision Models",
 content: `
 <p><strong>Vectors</strong> line up numbers in a single column. In vision mode the 10×10 canvas becomes a 100×1 vector before entering the dense layers.</p>
 <p><strong>Matrices</strong> arrange those vectors into 2D grids so filters can slide over rows and columns. Understanding their norms and determinants explains why scaling or rotating images affects activations.</p>
 `,




















































 },
 "Dot Product": {

 title: "Dot Product: Similarity Meter",
 content: `
 <p>The dot product measures how aligned two vectors are. In the vision model it compares your drawn strokes with learned weight vectors.</p>
 <p>Geometry version: a · b = |a||b|cosθ. Component version: sum of element-wise products. Both explain why brighter pixels boost certain neurons.</p>
 `,























































 },
 "Matrix Multiplication": {

 title: "Matrix Multiplication: Layer Engine",
 content: `
 <p>Dense layers are nothing but matrix multiplications. A weight matrix multiplies the input vector to produce activations for the next layer.</p>
 <p>Vision models flatten 2D patches into vectors, multiply by weights, then reshape again. Tracking dimensions keeps tensor shapes valid.</p>
 `,

























































 },
 "Tensors": {

 title: "Tensors: Multi-Dimensional Arrays",
 content: `
 <p>Tensors generalize scalars (rank 0), vectors (rank 1), and matrices (rank 2). Vision models juggle rank-3 (H×W×C) and rank-4 (Batch×Channel×H×W) tensors constantly.</p>
 <p>Keeping track of tensor volume prevents shape mismatches when reshaping, flattening, or feeding data between convolutional and dense layers.</p>
 `,












































 },
 "Jacobian": {

 title: "Jacobian: Matrix of First Derivatives",
 content: `
 <p>The <strong>Jacobian matrix</strong> contains all partial first-order derivatives of a vector-valued function. It's the multi-variable generalization of the derivative.</p>
 <div class="equation">J = [ ∂fᵢ / ∂xⱼ ]</div>
 <p>In deep learning, the Jacobian is used during backpropagation to compute how each output of a layer changes with respect to each input.</p>
 `,





















 },
 "Hessian": {

 title: "Hessian: Matrix of Second Derivatives",
 content: `
 <p>The <strong>Hessian matrix</strong> contains second-order partial derivatives. It describes the <strong>local curvature</strong> of a function.</p>
 <div class="equation">H = [ ∂²f / ∂xᵢ∂xⱼ ]</div>
 <p>Optimizers use the Hessian (or approximations like L-BFGS) to take smarter steps by understanding the 'shape' of the loss landscape.</p>
 `,


























 },
"Classification Metrics": {

  title: "Classification Metrics: Measuring Success",
 content: `
 <p><strong>Accuracy</strong> is just the start. To truly understand a classifier's performance, especially on imbalanced data, we need <strong>Precision</strong>, <strong>Recall</strong>, and the <strong>F1 Score</strong>.</p>
 <div class="equation">
 Accuracy = (TP + TN) / Total
 </div>
 <div class="equation">
 Precision = TP / (TP + FP)
 </div>
<div class="equation">
Recall = TP / (TP + FN)
  </div>
  `,
  solved: `
  <ul>
  <li><strong>Beyond accuracy</strong>: Reveals true performance on imbalanced data</li>
  <li><strong>Precision vs Recall trade-off</strong>: Can tune for specific needs</li>
  <li><strong>Single metric</strong>: F1 combines precision and recall</li>
  <li><strong>Confusion matrix insight</strong>: Shows exactly where model fails</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Conflicting metrics</strong>: Can't optimize both simultaneously</li>
  <li><strong>Choice depends on domain</strong>: Medical needs recall, spam needs precision</li>
  <li><strong>Binary only</strong>: Multi-class requires averaging strategies</li>
  <li><strong>Can be gamed</strong>: May not reflect real-world performance</li>
  </ul>
  `,


























































 },
 "Pip2Pip": {

 title: "Pixel-to-Pixel (Autoencoder)",
 content: `
 <p><strong>Pip2Pip</strong> refers to pixel-to-pixel networks, commonly implemented as autoencoders. They learn to compress data into a latent space and reconstruct it.</p>
 
 <h4>Encoder</h4>
 <p>Compresses input (e.g., 784 pixels) into a smaller bottleneck vector. Learns essential features.</p>
 
 <h4>Decoder</h4>
 <p>Reconstructs the original input from the compressed representation. Mirrors the encoder.</p>
 
 <h4>Latent Space</h4>
<p>The compressed representation where interesting things happen - interpolation, denoising.</p>
  `,
  solved: `
  <ul>
  <li><strong>Unsupervised learning</strong>: Learns representations without labels</li>
  <li><strong>Dimensionality reduction</strong>: Compresses data while preserving structure</li>
  <li><strong>Feature learning</strong>: Encoder learns meaningful features automatically</li>
  <li><strong>Generation capability</strong>: Decoder can generate new samples from latent space</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Information loss</strong>: Reconstruction is never perfect</li>
  <li><strong>Linear bottlenecks</strong>: Standard autoencoders can't capture complex distributions</li>
  <li><strong>Blurry reconstructions</strong>: MSE loss leads to averaged, blurry outputs</li>
  <li><strong>No guarantee of useful latent space</strong>: Needs VAE or other variants for structured generation</li>
  </ul>
  `,


















































 },
"GAN": {

   title: "Generative Adversarial Networks",
   content: `
<p>A <strong>GAN</strong> has two networks competing: a <strong>Generator</strong> that creates fake images, and a <strong>Discriminator</strong> that tries to distinguish real from fake.</p>
  `,
  solved: `
  <ul>
  <li><strong>High-quality generation</strong>: Produces sharp, realistic images</li>
  <li><strong>No explicit density estimation</strong>: Learns to sample from distribution implicitly</li>
  <li><strong>Adversarial training</strong>: Discriminator provides learned loss signal</li>
  <li><strong>Versatile applications</strong>: Style transfer, image-to-image, super resolution</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Mode collapse</strong>: Generator may produce limited variety</li>
  <li><strong>Training instability</strong>: GANs are notoriously hard to train</li>
  <li><li><strong>No diversity guarantee</strong>: Can fail to capture full distribution</strong></li>
  <li><strong>No inference model</strong>: Can't easily estimate probability of given sample</li>
  </ul>
  `,













































 },
 "L1L2": {
 title: "L1 vs L2 Loss: When to Use Which",
 content: `
 <p><strong>L1 (MAE)</strong> and <strong>L2 (MSE)</strong> loss measure pixel-wise differences in vision models. They behave very differently!</p>

 <h4>L1 Loss (Mean Absolute Error)</h4>
 <p>Sum of absolute differences. Robust to outliers. Creates sharper edges.</p>
 <div class="equation">
 L1 = (1/n) * sum |y - y_hat|
 </div>

 <h4>L2 Loss (Mean Squared Error)</h4>
 <p>Sum of squared differences. Penalizes large errors heavily. Smooth gradients.</p>
 <div class="equation">
 L2 = (1/n) * sum (y - y_hat)^2
 </div>
 `,
















































 },
"Pooling": {

   title: "Pooling: Spatial Downsampling",
   content: `
<p><strong>Pooling</strong> reduces spatial dimensions while retaining important information. Essential for vision networks.</p>
  `,
  solved: `
  <ul>
  <li><strong>Downsampling</strong>: Reduces spatial size, enabling deeper networks</li>
  <li><strong>Translation invariance</strong>: Small shifts don't change pooled output</li>
  <li><strong>Computational efficiency</strong>: Fewer parameters and computations downstream</li>
  <li><strong>Prevents overfitting</strong>: Aggregate statistics are more robust than single values</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Information loss</strong>: Precise location information is discarded</li>
  <li><strong>Fixed window</strong>: May miss important features that span pooled regions</li>
  <li><strong>No learnable parameters</strong>: Doesn't adapt to the data</li>
  <li><strong>Replaced by strided convolutions</strong>: Modern architectures often use strided conv instead</li>
  </ul>
  `,


















































 },
 "Padding": {
 title: "Padding: Managing Edge Pixels",
 content: `
 <p><strong>Padding</strong> adds border pixels around input to control output size and capture edge information.</p>
 
 <h4>Valid (No Padding)</h4>
 <p>Output shrinks. Edges may get less processing - corner pixels visited once.</p>
 
 <h4>Same (Zero Padding)</h4>
 <p>Output size matches input. Corners get more weight (multiple filters pass through).</p>
 
 <h4>Common Values</h4>
<p>Padding 1 for 3x3 kernels, padding 2 for 5x5 kernels - keeps spatial dims stable.</p>
  `,
  solved: `
  <ul>
  <li><strong>Preserves spatial size</strong>: Keeps input/output dimensions same with "same" padding</li>
  <li><strong>Processes edges equally</strong>: All pixels get equal number of filter applications</li>
  <li><strong>Enables deeper networks</strong>: Without padding, spatial dims shrink to zero quickly</li>
  <li><strong>Extracts edge features</strong>: Edge information is processed, not discarded</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Added computation</strong>: Padding adds pixels to process</li>
  <li><strong>Artificial data</strong>: Zero-padding creates potentially meaningless values</li>
  <li><strong>Hyperparameter choice</strong>: Must choose valid vs same padding</li>
  <li><strong>Can dilute signal</strong>: Too much padding may dilute important central features</li>
  </ul>
  `,















































 },
 "BatchNorm": {

 title: "Batch Normalization: Stabilizing Training",
 content: `
 <p><strong>BatchNorm</strong> normalizes layer inputs to have zero mean and unit variance. Makes training faster and more stable.</p>
 
 <h4>How It Works</h4>
 <p>For each channel: subtract batch mean, divide by batch std. Then scale by gamma, shift by beta.</p>
 
 <h4>During Inference</h4>
 <p>Use running statistics learned during training (not batch statistics).</p>
 
 <h4>Why It Helps</h4>
<p>Reduces internal covariate shift. Allows higher learning rates. Acts as regularizer.</p>
  `,
  solved: `
  <ul>
  <li><strong>Stable training</strong>: Normalizes inputs to each layer, reducing internal covariate shift</li>
  <li><strong>Higher learning rates</strong>: Enables faster convergence without divergence</li>
  <li><strong>Regularization effect</strong>: Batch statistics add noise, reducing overfitting</li>
  <li><strong>Reduces dependency on initialization</strong>: Less sensitive to weight initialization</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Batch size constraints</strong>: Requires reasonably large batch sizes</li>
  <li><li><strong>Not for RNNs</strong>: Doesn't work well with variable-length sequences</strong></li>
  <li><strong>Training vs inference difference</strong>: Uses running stats at inference, which can differ</li>
  <li><strong>Can hurt performance</strong>: Sometimes hurts generalization in some architectures</li>
  </ul>
  `,




















































 },
 "Dropout": {

 title: "Dropout: Regularization by Random Silencing",
 content: `
 <p><strong>Dropout</strong> randomly sets a fraction of neuron outputs to zero during training. Prevents overfitting.</p>
 
 <h4>How It Works</h4>
 <p>Each training step, randomly select p% of neurons to drop. Different subnetworks train each batch.</p>
 
 <h4>During Inference</h4>
 <p>All neurons active, but outputs scaled by (1-p) to match expected training activation.</p>
 
 <h4>Why It Works</h4>
<p>Creates ensemble of many networks. Prevents co-adaptation of neurons.</p>
  `,
  solved: `
  <ul>
  <li><strong>Effective regularization</strong>: Randomly dropping neurons prevents overfitting</li>
  <li><strong>Ensemble effect</strong>: Creates implicit ensemble of many sub-networks</li>
  <li><strong>Prevents co-adaptation</strong>: Neurons learn more robust features</li>
  <li><strong>Simple to implement</strong>: Just a few lines of code</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Can slow convergence</strong>: Needs more epochs to train effectively</li>
  <li><strong>Not ideal for small networks</strong>: Can leave insufficient neurons to learn</li>
  <li><strong>Hyperparameter tuning</strong>: Dropout rate must be chosen carefully</li>
  <li><strong>Less used now</strong>: Modern architectures often use other regularization</li>
  </ul>
  `,
















































 },
"SkipConnection": {
  title: "Skip Connections: Gradient Highways",

  content: `
 <p><strong>Skip connections</strong> (residual connections) add the input of a layer to its output. Enables training very deep networks.</p>
 
 <h4>Residual Block</h4>
 <p>Output = F(x) + x, where F is the learned transformation. If F learns zero, identity mapping remains.</p>
 
 <h4>Gradient Flow</h4>
 <p>Gradient can flow directly through the addition operation - no vanishing gradient!</p>
 
 <h4>Common Types</h4>
<p>1x1 convolutions for channel matching. Projection when dimensions change.</p>
  `,
  solved: `
  <ul>
  <li><strong>Enables very deep networks</strong>: Allows training 100+ layer networks (ResNet)</li>
  <li><strong>Gradient highway</strong>: Direct path for gradients to flow backward</li>
  <li><strong>Easier optimization</strong>: Network can learn identity mapping if needed</li>
  <li><strong>Better convergence</strong>: Deeper networks train faster with skips</li>
  </ul>
  `,
  shortcomings: `
  <li><strong>Added parameters</strong>: Skip connection may need 1x1 conv for dimension matching</li>
  <li><strong>Memory cost</strong>: Must store skip tensor until addition</li>
  <li><strong>Not always beneficial</strong>: May not help for shallow networks</li>
  <li><strong>Can hurt representation</strong>: Adding identity may limit learned capacity</li>
  </ul>
  `,

















































 },
 "VisionArchitecture": {
 title: "Vision Network Architectures",
 content: `
 <p>Classic CNN architectures solved image classification. Understanding them helps design modern networks.</p>
 
 <h4>LeNet-5 (1998)</h4>
 <p>First practical CNN. 2 conv + 3 FC. 60K parameters. MNIST digit recognition.</p>
 
 <h4>AlexNet (2012)</h4>
 <p>8 layers, 60M params. ImageNet breakthrough. ReLU, dropout, data augmentation.</p>
 
 <h4>VGG-16 (2014)</h4>
 <p>16 layers, 138M params. Simple 3x3 convs stacked deep. Very influential.</p>
 
 <h4>ResNet (2015)</h4>
 <p>Skip connections enable 152 layers! Removed vanishing gradient problem.</p>

 <h4>Inception / GoogLeNet (2014)</h4>
 <p>Uses 'Inception modules' that apply different filter sizes (1x1, 3x3, 5x5) in parallel at the same layer. Efficient and powerful.</p>
 `,














































































 },
 "Supervised": {

 title: "Supervised Learning: Learning with Labels",
 content: `
 <p><strong>Supervised Learning</strong> is the most common ML paradigm. The model learns from input-output pairs (labeled data).</p>
 
 <h4>How It Works</h4>
 <p>Given (input, correct_output) pairs, learn a function that maps inputs to outputs.</p>
 
 <h4>Two Main Tasks</h4>
 <p><strong>Classification</strong>: Predict discrete labels (cat/dog, spam/ham).<br/>
 <strong>Regression</strong>: Predict continuous values (price, temperature).</p>
 
 <h4>Training Process</h4>
 <p>Forward pass → Calculate loss → Backward pass → Update weights. Repeat until convergence!</p>
 `,















































 },
 "Unsupervised": {

 title: "Unsupervised Learning: Finding Patterns Without Labels",
 content: `
 <p><strong>Unsupervised Learning</strong> finds structure in data without any labels. The model discovers patterns on its own.</p>
 
 <h4>Clustering</h4>
 <p>Group similar data points together. K-means, hierarchical clustering.</p>
 
 <h4>Dimensionality Reduction</h4>
 <p>Compress data to fewer dimensions while keeping structure. PCA, t-SNE, UMAP.</p>
 
 <h4>Generative Models</strong>
 <p>Learn to generate new samples similar to training data. Autoencoders, GANs.</p>
 
 <h4>Why Use It?</h4>
 <p>Labels are expensive! Unsupervised can find hidden patterns humans might miss.</p>
 `,





















































 },
 "SemiSupervised": {

 title: "Semi-Supervised Learning: Best of Both Worlds",
 content: `
 <p><strong>Semi-supervised learning</strong> uses both labeled and unlabeled data. Powerful when labels are scarce!</p>
 
 <h4>Why It Works</h4>
 <p>Unlabeled data helps learn the underlying structure. Clusters often correspond to classes.</p>
 
 <h4>Common Techniques</h4>
 <p><strong>Self-training</strong>: Train on labeled, predict on unlabeled, add high-confidence predictions.<br/>
 <strong>Label propagation</strong>: Propagate labels through similar data points.<br/>
 <strong>Consistency regularization</strong>: Ensure similar inputs give similar outputs.</p>
 
 <h4>Real World</h4>
 <p>Medical imaging, language translation - labeling is expensive!</p>
 `,































 },
"MDP": {

   title: "MDP: Markov Decision Processes",
   content: `
<p><strong>MDPs</strong> provide a mathematical framework for modeling decision making in situations where outcomes are partly random and partly under the control of a decision maker.</p>
  `,
  solved: `
  <ul>
  <li><strong>Formal framework</strong>: Provides mathematical foundation for RL</li>
  <li><strong>Solves sequential decisions</strong>: Models delayed rewards and actions</li>
  <li><strong>Optimal policy learning</strong>: Enables finding best actions for long-term goals</li>
  <li><strong>Real-world applicability</strong>: Models robotics, games, economics</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Assumes full observability</strong>: In practice, states may be partially observable</li>
  <li><strong>Curse of dimensionality</strong>: State space explosion makes solving hard</li>
  <li><strong>May not match reality</strong>: Assumes stationary dynamics, which rarely holds</li>
  <li><strong>No function approximation</strong>: Basic MDP needs explicit state tables</li>
  </ul>
  `,
























 },
 "QLearning": {

 title: "Q-Learning: Learning from Trial and Error",
 content: `
<p><strong>Q-Learning</strong> is a model-free RL algorithm. It learns the quality (Q-value) of an action in a given state.</p>
  <div class="equation">Q(s,a) = Q(s,a) + α[R + γ max Q(s',a') - Q(s,a)]</div>
  `,
  solved: `
  <ul>
  <li><strong>Model-free</strong>: Doesn't need environment model</li>
  <li><strong>Off-policy</strong>: Can learn from other policies' experiences</li>
  <li><strong>Converges to optimal</strong>: With enough exploration, finds optimal policy</li>
  <li><strong>Simple implementation</strong>: Table-based is straightforward</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>State space explosion</strong>: Can't handle large state spaces</li>
  <li><li><strong>Tabular limitation</strong>: Can't generalize to unseen states</strong></li>
  <li><strong>Slow convergence</strong>: Requires extensive exploration</li>
  <li><strong>Overestimation</strong>: Max can cause overestimation of Q-values</li>
  </ul>
  `,






























 },
"DeepQN": {

   title: "Deep Q-Networks (DQN): Scaling RL",
   content: `
<p><strong>DQN</strong> uses a deep neural network to approximate the Q-value function. This allows RL to scale to complex environments like Atari games.</p>
  `,
  solved: `
  <ul>
  <li><strong>Scalable to high dimensions</strong>: Handles pixel inputs from games</li>
  <li><strong>Experience replay</strong>: Breaks correlation in training data</li>
  <li><strong>Target network</strong>: Stabilizes training</li>
  <li><strong>Breakthrough results</strong>: Human-level performance on Atari</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Overestimation bias</strong>: Tends to overestimate Q-values</li>
  <li><strong>Only discrete actions</strong>: Doesn't handle continuous control</li>
  <li><strong>Large sample needs</li>: Requires millions of frames</li>
  <li><strong>Not stable</strong>: Training can be volatile</li>
  </ul>
  `,




















 },
 "PolicyGradient": {

 title: "Policy Gradients: Direct Action Learning",
 content: `
 <p><strong>Policy Gradients</strong> directly optimize the agent's policy (π) rather than the value function. This works better for continuous action spaces.</p>
 <div class="equation">∇J(θ) = E[ ∇ log π(a|s;θ) * G_t ]</div>
 `,




















 },
"PPO": {

  title: "PPO: Proximal Policy Optimization",
  content: `
  <p><strong>PPO</strong> is a state-of-the-art RL algorithm that stabilizes training by clipping policy updates.</p>
  `,
  solved: `
  <ul>
  <li><strong>Stable training</strong>: Clipping prevents destructive large updates</li>
  <li><strong>Sample efficient</strong>: Reuses experience multiple times</li>
  <li><strong>Simple implementation</strong>: Much simpler than trust region methods</li>
  <li><strong>State-of-the-art</strong>: Dominates continuous control tasks</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Hyperparameter sensitive</strong>: Clip threshold affects performance</li>
  <li><strong>Shared entropy bonus</strong>: Needs auxiliary entropy term for exploration</li>
  <li><li><strong>May not explore enough</strong>: Can get stuck in local optima</strong></li>
  <li><strong>Performance ceiling</strong>: Sometimes outperformed by more specialized algorithms</li>
  </ul>
  `,



























 },
 "SelfSupervised": {

 title: "Self-Supervised Learning: Proxy Tasks for Rich Representations",
 content: `
 <p><strong>Self-supervised learning</strong> creates labels from the data itself. Design a task where the 'answer' is in the input!</p>
 
 <h4>Contrastive Learning</h4>
 <p>Learn to distinguish similar from different. SimCLR, MoCo: pull positive pairs together, push negatives apart.</p>
 
 <h4>Masked Prediction</h4>
 <p>BERT: mask some tokens, predict them from context. ImageGPT: mask pixels, predict from neighbors.</p>
 
 <h4>Why It Matters</h4>
<p>Pretrain on unlabeled data (millions of images!), then fine-tune on small labeled set. Transfer learning!</p>
  `,
  solved: `
  <ul>
  <li><strong>Unlabeled data utilization</strong>: Uses vast amounts of unannotated data</li>
  <li><strong>Transfer learning</strong>: Pretrained representations transfer across tasks</li>
  <li><strong>Foundation of modern NLP</strong>: BERT, GPT pre-trained this way</li>
  <li><strong>No manual labeling</strong>: Reduces biggest ML bottleneck</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Proxy task design</strong>: Needs clever task that transfers to target</li>
  <li><li><strong>Compute intensive</strong>: Requires large batch sizes and training time</strong></li>
  <li><strong>Not always transferable</strong>: May not transfer across domains</li>
  <li><strong>Negative sampling</strong>: Contrastive learning needs careful negatives</li>
  </ul>
  `,





























 },
 "Transformer": {

 title: "Transformers: Attention Is All You Need",
 content: `
 <p><strong>Transformers</strong> use self-attention to process sequences. No recurrence, no convolution - just attention!</p>
 
<h4>Self-Attention</h4>
  <p>Each position attends to all positions. Compute query, key, value matrices. Attention = softmax(QK^T / sqrt(d))V.</p>
  
  <h4>Multi-Head Attention</h4>
  <p>Multiple attention heads in parallel. Each learns different relationships (syntax, semantics, positions).</p>
  
  <h4>The History of Attention and Transformers</h4>
  <p><strong>2014</strong>: Dzmitry Bahdanau et al. introduce <em>Additive Attention</em> for neural machine translation — enables aligning source and target.<br/>
  <strong>2015</strong>: Minh-Thang Luong et al. propose <em>Multiplicative (Dot-Product) Attention</em> — more efficient than additive.<br/>
  <strong>2016</strong>: Oxford's <em>Attention is All You Need</em> builds on these but: self-attention (no recurrence!) + multi-head + positional encoding.<br/>
  <strong>2016</strong>: Google Brain, University of Toronto, and Element AI submit the paper — rejected from ICLR, then accepted!<br/>
<strong>Key Innovation</strong>: Replaces RNN's sequential processing with parallel self-attention — each position attends to ALL positions directly.<br/>
  <strong>Original Authors</strong>: Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan Gomez, Lukasz Kaiser, Illia Polosukhin — 8 co-authors, all from Google.</p>
  `,
  solved: `
  <ul>
  <li><strong>Parallel processing</strong>: No sequential computation - GPU/TPU friendly</li>
  <li><strong>Long-range dependencies</strong>: Attention captures relationships across entire sequence</li>
  <li><strong>State-of-the-art</strong>: Dominates NLP, now vision, audio, and multimodal tasks</li>
  <li><strong>Interpretable attention</strong>: Can visualize what model focuses on</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Quadratic complexity</strong>: O(n²) attention on sequence length</li>
  <li><strong>Memory intensive</strong>: Stores all attention matrices</li>
  <li><strong>No inherent position understanding</strong>: Needs positional encoding</li>
  <li><strong>Expensive for long sequences</strong>: GPT-4 has token limits due to this</li>
  </ul>
  `,






















































 },
 "VisionTransformer": {

 title: "Vision Transformer (ViT): Transformers for Images",
 content: `
 <p><strong>ViT</strong> treats images as sequences of patches. Split image into fixed-size patches, linearly embed, feed to transformer.</p>
 
 <h4>Patch Embedding</h4>
 <p>Split 224x224 image into 16x16 patches = 196 patches. Each patch becomes a token.</p>
 
 <h4>Position Embedding</h4>
 <p>Add positional information so transformer knows patch order.</p>
 
 <h4>CLS Token</h4>
<p>Extra [CLS] token at start learns image-level representation for classification.</p>
  `,
  solved: `
  <ul>
  <li><strong>Simpler than CNNs</strong>: No convolutions, just linear projections</li>
  <li><strong>Scales well</strong>: Benefits from large datasets more than CNNs</li>
  <li><strong>Global attention</strong>: Sees entire image at once, not local receptive field</li>
  <li><strong>SOTA results</strong>: Outperforms CNNs on large datasets</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Needs more data</strong>: ViT needs millions of images, CNNs work with thousands</li>
  <li><strong>Computationally heavy</strong>: O(n²) attention on many patches</li>
  <li><strong>No inductive bias</strong>: CNNs have built-in translation invariance</li>
  <li><strong>Fine-tuning sensitivity</strong>: Harder to fine-tune than CNNs</li>
  </ul>
  `,

























 },
 "LoRA": {

 title: "LoRA: Low-Rank Adaptation",
 content: `
 <p><strong>LoRA</strong> fine-tunes large models by only training small, low-rank matrices. This allows fine-tuning an LLM on consumer hardware.</p>
 <div class="equation">W = W₀ + ΔW = W₀ + B * A</div>
<p>A (d×r) and B (r×d) are much smaller than W₀ (d×d) when the rank <strong>r</strong> is small (e.g., 8 vs 4096).</p>
  `,
  solved: `
  <ul>
  <li><strong>Parameter efficient</strong>: Fine-tune with 1-2% of original parameters</li>
  <li><strong>Fast adaptation</strong>: Switch between tasks by changing LoRA weights</li>
  <li><strong>No latency overhead</strong>: Can merge weights for inference</li>
  <li><strong>Consumer hardware</strong>: Train large models on single GPU</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Added complexity</strong>: Must manage adapter weights separately</li>
  <li><strong>May underperform full fine-tuning</strong>: In some cases, full fine-tuning is better</li>
  <li><strong>Inference overhead</strong>: Without merging, adds compute per layer</li>
  <li><strong>Not universal</strong>: Doesn't work equally well for all model architectures</li>
  </ul>
  `,


























 },
"Diffusion": {
   title: "Diffusion Models: Iterative Denoising",
   content: `
   <p><strong>Diffusion models</strong> generate images by iteratively denoising. Start with noise, gradually clean up!</p>
   `,




























 },
"CLIP": {

  title: "CLIP: Connecting Images and Text",
 content: `
 <p><strong>CLIP</strong> learns to match images with text descriptions. Zero-shot classifier from natural language!</p>
 
 <h4>Contrastive Pretraining</h4>
 <p>Train on 400M image-text pairs. Image encoder + Text encoder. Pull matching pairs together.</p>
 
 <h4>Zero-Shot Classification</h4>
 <p>Encode class names ("a photo of a cat"). Compare with image. No fine-tuning needed!</p>
 
 <h4>Why It Works</strong>
 <p>Language provides rich supervision. Transfer across tasks. Robust to distribution shift.</p>
 `,





























 },
"ObjectDetection": {
  title: "Object Detection: Finding and Locating Objects",

  content: `
 <p><strong>Object detection</strong> finds all objects in an image and draws bounding boxes around them.</p>
 
 <h4>Two-Stage Detectors</h4>
 <p>R-CNN series: First find regions (RPN), then classify. High accuracy but slow.</p>
 
 <h4>One-Stage Detectors</h4>
 <p>YOLO, SSD: Direct prediction from features. Fast, good for real-time.</p>
 
 <h4>Key Metrics</h4>
 <p>mAP: mean Average Precision. IoU: Intersection over Union. PASCAL VOC vs COCO.</p>
 `,























 },
 "AnchorBoxes": {
 title: "Anchor Boxes: Predefined Shapes",
 content: `
 <p><strong>Anchor boxes</strong> are predefined bounding boxes with different aspect ratios and scales. Instead of predicting boxes from scratch, the network predicts offsets from these anchors.</p>
 <div class="equation">x = x_anchor + offset_x * w_anchor</div>
<p>This provides a useful prior for the model, helping it handle objects of varying sizes and shapes (e.g., tall pedestrians vs. wide cars).</p>
  `,
  solved: `
  <ul>
  <li><strong>Provides priors</strong>: Reduces search space for object detection</li>
  <li><strong>Handles variation</strong>: Multiple aspect ratios cover different object shapes</li>
  <li><strong>Enables one-stage detectors</strong>: YOLO, SSD use anchors for speed</li>
  <li><strong>Reduces learning difficulty</strong>: Predicting offsets easier than absolute boxes</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Manual design</strong>: Anchors must be chosen, may not match data</li>
  <li><strong>Many negative anchors</strong>: Most anchors have no object → class imbalance</li>
  <li><strong>Hyperparameter sensitive</strong>: Anchor sizes affect performance significantly</li>
  <li><strong>Not end-to-end</strong>: Fixed priors limit flexibility</li>
  </ul>
  `,



















 },
 "Segmentation": {
 title: "Image Segmentation: Pixel-Level Understanding",
 content: `
 <p><strong>Segmentation</strong> classifies every pixel. Three types: semantic, instance, panoptic.</p>
 
 <h4>Semantic Segmentation</h4>
 <p>Classify each pixel (road, car, sky). No distinction between instances. U-Net, DeepLab.</p>
 
 <h4>Instance Segmentation</h4>
 <p>Distinguish separate objects of same class. Mask R-CNN.</p>
 
 <h4>Panoptic Segmentation</h4>
<p>Both semantic + instance. Thing (countable) vs Stuff (background).</p>
  `,
  solved: `
  <ul>
  <li><strong>Pixel-level understanding</strong>: Knows exactly where each object is</li>
  <li><strong>Autonomous driving</strong>: Essential for path planning</li>
  <li><strong>Medical imaging</strong>: Segment tumors, organs precisely</li>
  <li><strong>Multiple levels</strong>: Semantic, instance, panoptic cover different needs</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Computationally expensive</strong>: Per-pixel classification is slow</li>
  <li><strong>Boundary accuracy</strong>: Often struggles with thin structures</li>
  <li><strong>Class imbalance</strong>: Background pixels dominate</li>
  <li><strong>Limited by resolution</strong>: Small objects get missed</li>
  </ul>
  `,



























 },
"LearningPath": {
  title: "How Concepts Build On Each Other: The ML Concept Map",
  content: `
  <p>Machine learning concepts form a dependency tree. Here's how each builds on previous ones:</p>
  
  <h4>🚀 Phase 1: Mathematical Foundations</h4>
  <p><strong>Linear Regression</strong> → <strong>Logistic Regression</strong> → <strong>Softmax</strong><br/>
  <em>Builds basic prediction from lines to probabilities.</em></p>
  
  <p><strong>Vectors & Matrices</strong> → <strong>Dot Product</strong> → <strong>Matrix Multiplication</strong><br/>
  <em>Enables computing with batches of data.</em></p>
  
  <p><strong>Gradient</strong> → <strong>Backpropagation</strong> → <strong>Optimizer</strong><br/>
  <em>How networks learn: gradient tells direction, backprop distributes it, optimizer chooses step size.</em></p>
  
  <p><strong>Loss</strong> → <strong>Epoch</strong> → <strong>Learning Rate</strong><br/>
  <em>The training loop: measure error, update repeatedly, adjust step size.</em></p>
  
  <h4>🔗 Phase 2: Core Architectures (Connections)</h4>
  <p><strong>Hidden Layer</strong> → <strong>Activation</strong> → <strong>Layer</strong><br/>
  <em>Stacking neurons with non-linearities creates networks.</em></p>
  
  <p><strong>Convolution</strong> → <strong>Pooling</strong> → <strong>Padding</strong> → <strong>VisionArchitecture</strong><br/>
  <em>Local patterns → spatial reduction → handling edges → complete vision networks.</em></p>
  
  <p><strong>RNN</strong> → <strong>LSTM</strong> → <strong>Transformer</strong><br/>
  <em>Sequences → long-term memory → self-attention (parallel processing!).</em></p>
  
  <p><strong>Tensors</strong> → <strong>Jacobian</strong> → <strong>Hessian</strong><br/>
  <em>Multi-dimensional data → first derivatives → second derivatives (curvature).</em></p>
  
  <h4>🎯 Phase 3: Training Techniques (Who Built On What)</h4>
  <p><strong>Regularization</strong> → <strong>Dropout</strong> → <strong>BatchNorm</strong><br/>
  <em>Original: L1/L2 (1996). Dropout (2014). BatchNorm (2015). — all prevent overfitting.</em></p>
  
  <p><strong>SkipConnection</strong> → <strong>ResNet</strong> → <strong>VisionTransformer</strong><br/>
  <em>Highway connections (1998). ResNet (2015). ViT adapts attention to images (2020).</em></p>
  
  <p><strong>Optimizer</strong> → <strong>Adam</strong> → <strong>AdamW</strong><br/>
  <em>SGD (1952). Adam (2014). AdamW decouples weight decay (2019).</em></p>
  
  <h4>🧠 Phase 4: Advanced Techniques (Built By Whom)</h4>
  <p><strong>Decision Tree</strong> → <strong>Random Forest</strong> → <strong>Gradient Boosting</strong><br/>
  <em>Quinlan (1986). Breiman (2001). Chen (2014, XGBoost).</em></p>
  
  <p><strong>GAN</strong> → <strong>WGAN</strong> → <strong>Diffusion</strong><br/>
  <em>Goodfellow (2014). Arjovsky (2017). Sohl-Dickman (2020).</em></p>
  
  <p><strong>Autoencoder</strong> → <strong>VAE</strong> → <strong>Stable Diffusion</strong><br/>
  <em>Baldi (1987). Kingma & Welling (2014). Rombach (2022).</em></p>
  
  <p><strong>Self-Supervised</strong> → <strong>Contrastive Learning</strong> → <strong>CLIP</strong><br/>
  <em>SimCLR (2020). MoCo (2019). Radford (2021).</em></p>
  
  <p><strong>RNN</strong> → <strong>Attention</strong> → <strong>Transformer</strong> → <strong>LLM</strong><br/>
  <em>Elman (1990). Bahdanau (2014). Vaswani (2017). Radford (2018, GPT).</em></p>
  
  <p><strong>Transformer</strong> → <strong>BERT</strong> → <strong>GPT</strong> → <strong>RLHF</strong><br/>
  <em>Devlin (2018). Radford (2018). Christiano (2022, from RL).</em></p>
  
  <h4>📅 Timeline: When Each Was Invented</h4>
  <p><strong>1957</strong>: Perceptron — Rosenblatt<br/>
  <strong>1962</strong>: Perceptron convergence — Rosenblatt<br/>
  <strong>1974</strong>: Backpropagation — Werbos (ignored until 1986)<br/>
  <strong>1986</strong>: Backprop revived — Rumelhart, Hinton, Williams<br/>
  <strong>1989</strong>: LeNet — LeCun<br/>
  <strong>1995</strong>: SVM soft margins — Cortes & Vapnik<br/>
  <strong>1997</strong>: LSTM — Hochreiter & Schmidhuber<br/>
  <strong>2001</strong>: Random Forest — Breiman<br/>
  <strong>2012</strong>: AlexNet — Krizhevsky, Sutskever, Hinton<br/>
  <strong>2014</strong>: Adam — Kingma & Ba; GAN — Goodfellow<br/>
  <strong>2015</strong>: ResNet — He; BatchNorm — Ioffe & Szegedy<br/>
  <strong>2017</strong>: Transformer — Vaswani et al.<br/>
  <strong>2020</strong>: GPT-3 — Radford et al.; ViT — Dosovitskiy et al.<br/>
  <strong>2022</strong>: Stable Diffusion — Rombach et al.</p>
  
  <h4>🔥 Who Influenced Who</h4>
  <p><strong>Rosenblatt (1957)</strong> → <strong>Widrow (1960)</strong> → <strong>Werbos (1974)</strong> → <strong>Rumelhart (1986)</strong> → <strong>Hinton (2012)</strong><br/>
  <em>The backpropagation lineage.</em></p>
  
  <p><strong>Fukushima (1980)</strong> → <strong>LeCun (1989)</strong> → <strong>Krizhevsky (2012)</strong> → <strong>He (2015)</strong><br/>
  <em>The CNN lineage.</em></p>
  
  <p><strong>Elman (1990)</strong> → <strong>Hochreiter (1997)</strong> → <strong>Vaswani (2017)</strong><br/>
  <em>The sequence processing lineage.</em></p>
  
  <h4>✅ How to Use This Path</h4>
  <p>1. <strong>Start with Linear Regression</strong> — understand prediction from data<br/>
  2. <strong>Add a layer (Hidden Layer)</strong> — understand non-linearity<br/>
  3. <strong>Add backprop</strong> — understand learning<br/>
  4. <strong>Add convolution</strong> — understand local patterns<br/>
  5. <strong>Add skip connections</strong> — enable depth<br/>
  6. <strong>Add attention</strong> — enable parallel processing<br/>
  7. <strong>Add transformer</strong> — combine everything!</p>
  
  <h4>Recommended Learning Path</h4>
  <p>A structured path from beginner to advanced:</p>
  
  <h4>Phase 1: Foundations (Weeks 1-4)</h4>
  <p>• Linear Regression → Logistic Regression → Softmax<br/>
  • Vectors & Matrices → Dot Product → Matrix Multiplication<br/>
  • Gradient → Backpropagation → Optimizer (Adam)<br/>
  • Python & NumPy basics<br/>
  �� Build your first neural network from scratch</p>
  
  <h4>Phase 2: Core ML (Weeks 5-8)</h4>
  <p>• Supervised vs Unsupervised vs SemiSupervised<br/>
  • CNNs: Convolution → Pooling → Padding → VisionArchitecture<br/>
  • Train CNNs on MNIST, CIFAR-10<br/>
  • Regularization → Dropout → BatchNorm</p>
  
  <h4>Phase 3: Deep Architectures (Weeks 9-12)</h4>
  <p>• RNN → LSTM → Transformer<br/>
  • SkipConnection → ResNet → VisionTransformer<br/>
  • GAN → Diffusion → Stable Diffusion<br/>
  • Transfer learning & fine-tuning</p>
  
  <h4>Phase 4: LLMs & Advanced (Weeks 13-16)</h4>
  <p>• Transformer → BERT → GPT<br/>
  • Self-Supervised → CLIP → RAG<br/>
  • LoRA → Quantization → Distillation<br/>
  • Agent → Tool Use → ReAct</p>
  
  <h4>Free Resources</h4>
  <p>• Fast.ai - Practical deep learning<br/>
  • CS231n (Stanford) - Deep learning for CV<br/>
  • CS224n (Stanford) - NLP with deep learning<br/>
  • 3Blue1Brown - Linear algebra visualizations<br/>
  • Learn Machine Learn - Interactive playground!</p>
 `,

























 },
 "StableDiffusion": {

 title: "Stable Diffusion: Open Image Generation",
 content: `
 <p><strong>Stable Diffusion</strong> is a latent diffusion model. Runs on consumer GPUs! Open weights = massive community.</p>
 
 <h4>How It Works</h4>
 <p>Diffusion in latent space (compressed). VAE encoder -> Diffusion -> VAE decoder. Much faster!</p>
 
 <h4>Text-to-Image</h4>
 <p>CLIP text encoder guides diffusion. Condition on text embeddings. Classifier-free guidance increases quality.</p>
 
 <h4>Key Components</h4>
 <p>• VAE: 8x compression for speed<br/>
 • UNet: Denoising backbone<br/>
 • CLIP: Text understanding<br/>
 • Scheduler: Sampling strategy</p>
 `,

























 },
"TSNE": {
  title: "t-SNE: Visualizing High-Dim Data",

  content: `
 <p><strong>t-SNE</strong> (t-distributed Stochastic Neighbor Embedding) is a nonlinear dimensionality reduction technique well-suited for embedding high-dimensional data for visualization in a low-dimensional space of two or three dimensions.</p>
 `,


















 },
 "UMAP": {
 title: "UMAP: Faster Nonlinear Embedding",
 content: `
 <p><strong>UMAP</strong> (Uniform Manifold Approximation and Projection) is a faster alternative to t-SNE that often preserves more of the global structure of the data.</p>
 `,


















 },
 "WGAN": {

 title: "WGAN: Wasserstein GAN",
 content: `
 <p><strong>WGAN</strong> uses the Earth Mover's (Wasserstein) distance to improve GAN stability and provide a meaningful loss metric that correlates with image quality.</p>
 `,



















 },
 "DCGAN": {

 title: "DCGAN: Deep Convolutional GAN",
 content: `
 <p><strong>DCGAN</strong> introduced architectural constraints that made GANs stable to train using deep convolutional layers.</p>
 <h4>Key Constraints</h4>
 <p>• No max-pooling (use strided convs instead).<br/>
 • Use Batch Norm in both Generator and Discriminator.<br/>
 • Use ReLU in G and Leaky ReLU in D.</p>
 `,























 },
 "SAM": {

 title: "Segment Anything Model (SAM): Foundation for Segmentation",
 content: `
 <p><strong>SAM</strong> is a promptable segmentation model. Segment anything with just clicks, boxes, or text!</p>
 
 <h4>Key Innovation</h4>
 <p>Founder: 1B masks on 11M images. Generalizes to any object without training!</p>
 
 <h4>Prompt-Based</h4>
 <p>• Point prompts: Foreground/background clicks<br/>
 • Box prompt: Draw bounding box<br/>
 • Text prompt: Natural language (with CLIP)</p>
 
 <h4>Architecture</h4>
 <p>Image encoder (ViT) -> Prompt encoder -> Mask decoder. 3 mask outputs (whole, part, subpart).</p>
 `,



























 },
 "LLM": {

 title: "Large Language Models: Transformers for Text",
 content: `
 <p><strong>LLMs</strong> are transformer models trained on massive text. GPT, Claude, Llama - they all use the same architecture!</p>
 
 <h4>Architecture</h4>
 <p>Decoder-only transformer. Predict next token given previous. 1T+ parameters in largest models.</p>
 
 <h4>Training</h4>
 <p>• Pretraining: Next token prediction on internet text<br/>
 • Fine-tuning: RLHF, instruction tuning<br/>
 • Context length: How many tokens remembered</p>
 
 <h4>Emergent Abilities</h4>
<p>Big enough models show reasoning, coding, translation without explicit training!</p>
  `,
  solved: `
  <ul>
  <li><strong>Massive knowledge</strong>: Contains world knowledge from training data</li>
  <li><strong>Few-shot learning</strong>: Can follow instructions without fine-tuning</li>
  <li><strong>Versatile capabilities</strong>: Writing, coding, reasoning all in one model</li>
  <li><strong>Emergent abilities</strong>: Large enough models spontaneously develop new skills</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Hallucinations</strong>: Generate confident but incorrect information</li>
  <li><strong>Limited context</strong>: Can't remember infinitely long conversations</li>
  <li><strong>Enormous compute</li>: Training costs millions of dollars</li>
  <li><strong>Not deterministic</strong>: Same prompt can produce different outputs</li>
  </ul>
  `,



























 },
 "RAG": {

 title: "Retrieval-Augmented Generation",
 content: `
 <p><strong>RAG</strong> combines LLMs with external knowledge. Don't rely on training data - retrieve relevant info!</p>
 
 <h4>How It Works</h4>
 <p>User query -> Embed -> Retrieve from vector DB -> Add context to LLM prompt -> Generate answer.</p>
 
 <h4>Components</h4>
 <p>• Embedding model: Convert text to vectors<br/>
 • Vector database: Store and search embeddings<br/>
 • Retriever: Find relevant passages<br/>
 • Generator: LLM that uses retrieved context</p>
 
 <h4>Why RAG?</h4>
 <p>• Up-to-date knowledge (no retraining needed)<br/>
 • Hallucination reduction<br/>
 • Source attribution<br/>
 • Domain-specific knowledge</p>
 `,




























 },
 "Multimodal": {

 title: "Multimodal Learning: Beyond Single Modality",
 content: `
 <p><strong>Multimodal</strong> models process multiple types of data: text, images, audio, video together.</p>
 
 <h4>Flamingo (DeepMind)</h4>
 <p>Perceiver Resampler connects image encoder to frozen language model. Few-shot learning on images!</p>
 
 <h4>BLIP-2</h4>
 <p>Q-Former bridges vision and language. Uses pre-trained CLIP + LLMs. State-of-the-art on many tasks.</p>
 
 <h4>GPT-4V</h4>
 <p>Vision + language in one model. Describe images, analyze charts, read handwritten text.</p>
 
 <h4>Why Multimodal?</h4>
 <p>Humans use multiple senses. Richer understanding. Grounding in real world.</p>
 `,

























 },
 "NeRF": {

 title: "Neural Radiance Fields: 3D from Images",
 content: `
 <p><strong>NeRF</strong> represents a scene as a neural network. Input: 5D (x,y,z,θ,φ). Output: color + density.</p>
 
 <h4>How It Works</h4>
 <p>Render novel views by ray marching through the scene. Volume rendering equation accumulates color/density.</p>
 
 <h4>Training</h4>
 <p>Given posed images, optimize network to predict correct color for each ray. Mip-NeRF reduces aliasing.</p>
 
 <h4>Applications</h4>
 <p>• 3D reconstruction from photos<br/>
 • Virtual reality, flythroughs<br/>
 • Object modeling, architecture<br/>
 • Video game environments</p>
 `,




























 },
 "Sora": {

 title: "Sora: Video Generation from Text",
 content: `
 <p><strong>Sora</strong> is OpenAI's video generation model. Text prompt -> minute-long videos!</p>
 
 <h4>Architecture</h4>
 <p>Diffusion transformer. Spacetime patches (like ViT for video). Patches from video compressed to latent space.</p>
 
 <h4>Capabilities</h4>
 <p>• Text-to-video generation<br/>
 • Image-to-video<br/>
 • Video-to-video editing<br/>
 • Loop, extend, connect videos<br/>
 • Physics simulation (to some extent)</p>
 
 <h4>Why It Matters</h4>
 <p>First model showing emergent world simulation. Understanding 3D, occlusion, motion!</p>
 `,




























 },
 "Agent": {

 title: "AI Agents: Language Models That Use Tools",
 content: `
 <p><strong>AI Agents</strong> use LLMs to plan, use tools, and take actions. Not just text generation - real tasks!</p>
 
 <h4>Agent Loop</h4>
 <p>Observe -> Think -> Plan -> Act -> Observe... Until goal achieved.</p>
 
 <h4>Tool Use</h4>
 <p>• Web search: Get up-to-date info<br/>
 • Code execution: Run Python, analyze data<br/>
 • API calls: Interact with external services<br/>
 • File system: Read/write documents</p>
 
 <h4>Frameworks</h4>
 <p>LangChain, AutoGPT, Claude Agent, ReAct prompting. ReAct: Reasoning + Acting interleaved.</p>
 `,




























 },
 "Quantization": {

 title: "Model Quantization: Smaller, Faster Models",
 content: `
 <p><strong>Quantization</strong> reduces model precision (32-bit float -> 8-bit int). Huge savings with minimal accuracy loss!</p>
 
 <h4>Types</h4>
 <p>• Post-Training Quantization (PTQ): Calibrate after training<br/>
 • Quantization-Aware Training (QAT): Train with quantization<br/>
 • Dynamic: Weights static, activations dynamic<br/>
 • Static: Both frozen after calibration</p>
 
 <h4>Formats</h4>
 <p>• FP32: Full precision (4 bytes)<br/>
 • FP16: Half precision (2 bytes)<br/>
 • INT8: 8-bit (1 byte, 4x smaller!)<br/>
 • INT4: 4-bit (8x smaller!)</p>
 
 <h4>Why It Matters</h4>
<p>Run LLMs on phones, embedded devices. 4-bit can fit 70B model in 35GB!</p>
  `,
  solved: `
  <ul>
  <li><strong>Memory reduction</strong>: 4x smaller models fit in limited RAM</li>
  <li><strong>Faster inference</strong>: Integer ops are faster than float</li>
  <li><strong>Edge deployment</strong>: Enables LLMs on phones, IoT devices</li>
  <li><strong>Minimal accuracy loss</strong>: Often < 1% accuracy drop</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Accuracy loss</strong>: Aggressive quantization hurts performance</li>
  <li><strong>Hardware support</strong>: Not all devices support int8/4 efficiently</li>
  <li><strong>Complicated calibration</strong>: PTQ needs representative dataset</li>
  <li><strong>Irreversible</strong>: Can't recover original precision</li>
  </ul>
  `,
























 },
 "Distillation": {

 title: "Knowledge Distillation: Small Model from Big",
 content: `
 <p><strong>Distillation</strong> trains a small 'student' model to mimic a large 'teacher'. The student learns from teacher logits!</p>
 
 <h4>How It Works</h4>
 <p>Student sees teacher predictions (soft labels), not just hard labels. Temperature scaling in softmax helps.</p>
 
 <h4>Loss Function</h4>
 <p>L = α * CE(student, hard labels) + (1-α) * KL(student_soft || teacher_soft)</p>
 
 <h4>Why It Works</h4>
 <p>Teacher provides 'dark knowledge' - relationships between classes, not just answers. Student learns richer representation!</p>
 `,



























 },
 "MoE": {

 title: "Mixture of Experts: Scaling Efficiently",
 content: `
 <p><strong>MoE</strong> uses many 'expert' networks, only activates a few per input. Efficient scaling!</p>
 
 <h4>How It Works</h4>
 <p>Router decides which experts to use. Top-k experts process input. Output = weighted combination.</p>
 
 <h4>Why It Matters</h4>
 <p>1T params in model, but only 100B active per token. Compute efficiency + model capacity!</p>
 
 <h4>Examples</h4>
 <p>• Switch Transformers: 1.6T params, 2048 experts<br/>
 • Mixtral 8x7B: 8 experts, 2 active = ~12B active params<br/>
 • GShard: Google's MoE transformer</p>
 `,


























 },
 "RecentAdvances": {

 title: "Recent Advances 2024-2025",
 content: `
 <p>The ML field is evolving rapidly. Here are the latest breakthroughs shaping the future!</p>
 
 <h4>Multimodal Foundation Models</h4>
 <p>GPT-4V, Gemini, Claude 3 - unified models handling text, images, audio. Any-to-any generation emerging.</p>
 
 <h4>Open Weights Models</h4>
 <p>Llama 3, Mistral, Qwen, Phi-3. Open alternatives to closed APIs. Fine-tuning accessible to everyone.</p>
 
 <h4>Long Context</h4>
 <p>1M+ token context windows. Reading entire docs, codebases. Memory of previous interactions.</p>
 
 <h4>Code Generation</h4>
 <p>Claude Code, Cursor, Copilot Workspace. AI that writes, tests, debugs code. Software engineering transformation.</p>
 
 <h4>Reasoning Models</h4>
 <p>OpenAI o1, DeepSeek R1. Chain-of-thought, self-verification. Test-time compute scaling!</p>
 
 <h4>Personalization</h4>
 <p>Personalized AI assistants. Memory of you. Adaptive to your preferences and style.</p>
 
 <h4>What's Next?</h4>
 <p>• Agent workflows<br/>
 • Tool use proliferation<br/>
 • Benchmark saturation<br/>
 • Efficient architectures<br/>
 • Real-world deployment</p>
 `,


























 },
"LinearRegression": {

  title: "Linear Regression: The First ML Algorithm",
  summary: "Linear Regression is the bedrock of statistical prediction. It models the relationship between a dependent variable and one or more independent variables by fitting a linear equation to observed data. The goal is to minimize the sum of squared errors between the predicted and actual values.",
  takeaways: [
    "It assumes a linear relationship between input (X) and output (y).",
    "Ordinary Least Squares (OLS) is the most common method for estimating coefficients.",
    "R-squared is the standard metric used to evaluate how well the model fits the data."
  ],
  questions: [
    "What is the difference between Simple and Multiple Linear Regression?",
    "How do outliers affect a Linear Regression model?",
    "What does a high p-value for a coefficient signify?"
  ],
  content: `

<p><strong>Linear Regression</strong> fits a straight line through data to predict continuous values. It's the simplest ML model and the foundation of everything else.</p>
  `,
  solved: `
  <ul>
  <li><strong>Interpretable</strong>: Clear slope and intercept coefficients</li>
  <li><strong>Foundation of ML</strong>: All other models build on these concepts</li>
  <li><strong>Fast and efficient</strong>: Analytical solution (closed-form)</li>
  <li><strong>Benchmark</strong>: Often compare other models against linear baseline</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Linear only</strong>: Can't capture non-linear relationships</li>
  <li><strong>Outlier sensitive</strong>: MSE loss is heavily affected by outliers</li>
  <li><strong>Feature engineering</strong>: Need manual interaction terms for polynomials</li>
  <li><strong>Underfits complex data</strong>: Too simple for most real-world problems</li>
  </ul>
  `,

















































 },
"LogisticRegression": {

   title: "Logistic Regression: From Lines to Probabilities",
   content: `
<p><strong>Logistic Regression</strong> takes a linear model and squeezes the output through a sigmoid, converting it to a probability between 0 and 1.</p>
  `,
  solved: `
  <ul>
  <li><strong>Probability output</strong>: Gives probabilities, not just class predictions</li>
  <li><strong>Interpretable coefficients</strong>: Odds ratios have clear meaning</li>
  <li><strong>Decision boundary</strong>: Linear but effective for many problems</li>
  <li><strong>Foundation for neural networks</strong>: Same as single-neuron network</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Linear boundary</strong>: Can't separate non-linearly separable data</li>
  <li><strong>Binary only (natively)</strong>: Needs one-vs-rest for multi-class</li>
  <li><strong>Assumes feature independence</strong>: Doesn't capture feature interactions</li>
  <li><strong>Outperforms often by trees</strong>: For complex data, ensemble methods beat it</li>
  </ul>
  `,


















































 },
 "BayesTheorem": {

 title: "Bayes' Theorem: Updating Beliefs with Evidence",
 content: `
 <p><strong>Bayes' Theorem</strong> is the foundation of probabilistic reasoning. It tells us how to update our beliefs when new evidence arrives.</p>
 
 <h4>The Formula</h4>
 <div class="equation">
 P(A|B) = P(B|A) × P(A) / P(B)
 </div>
 
 <h4>Components</h4>
 <p><strong>Prior</strong> P(A): What we believed before seeing evidence.<br/>
 <strong>Likelihood</strong> P(B|A): How likely the evidence is if A is true.<br/>
 <strong>Posterior</strong> P(A|B): Updated belief after seeing evidence.<br/>
 <strong>Evidence</strong> P(B): How likely the evidence is overall.</p>
 
 <h4>Medical Example</h4>
 <p>If a test is 95% accurate (sensitivity), but the disease only affects 1% of people (prior), a positive test result doesn't mean you're 95% likely to be sick! Bayes tells you the true probability.</p>
 `,




















































 },
"RNN": {

   title: "Recurrent Neural Networks: Memory in Sequences",
   content: `
<p><strong>RNNs</strong> process sequences by maintaining a hidden state that acts as memory, updated at each time step.</p>
  `,
  solved: `
  <ul>
  <li><strong>Variable-length input</strong>: Handles sequences of any length</li>
  <li><strong>Shared weights</strong>: Same function applied at every timestep</li>
  <li><strong>Theoretical memory</strong>: Can in theory remember arbitrary long dependencies</li>
  <li><strong>Sequence modeling foundation</strong>: Basis for more advanced RNNs</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Vanishing gradients</strong>: Can't learn long-term dependencies</li>
  <li><strong>Sequential computation</strong>: Can't parallelize across time steps</li>
  <li><strong>Exploding gradients</strong>: Unstable training on long sequences</li>
  <li><strong>Slow training</strong>: Sequential nature limits hardware utilization</li>
  </ul>
  `,






















































 },
"LSTM": {

   title: "LSTM: Long Short-Term Memory",
   content: `
<p><strong>LSTM</strong> solves the vanishing gradient problem with three gates that control information flow through a cell state.</p>
  `,
  solved: `
  <ul>
  <li><strong>Long-term dependencies</strong>: Can remember info for thousands of steps</li>
  <li><strong>Vanishing gradient solved</strong>: Cell state provides gradient highway</li>
  <li><strong>Selective memory</strong>: Gates decide what to keep, forget, output</li>
  <li><strong>Proven effectiveness</strong>: Powers many NLP breakthroughs</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Complex architecture</strong>: More gates = harder to interpret</li>
  <li><strong>Computationally heavy</strong>: 4x more operations than simple RNN</li>
  <li><strong>Still sequential</strong>: Can't parallelize like transformers</li>
  <li><strong>Outperformed by transformers</strong>: For most NLP, attention is better</li>
  </ul>
  `,






















































 },
 "KLDivergence": {

 title: "KL Divergence: Measuring Distribution Mismatch",
 content: `
 <p><strong>KL Divergence</strong> measures how one probability distribution differs from another. It's central to VAEs, diffusion models, and RLHF.</p>
 
 <h4>The Formula</h4>
 <div class="equation">
 D_KL(P || Q) = Σ P(x) × log(P(x) / Q(x))
 </div>
 
 <h4>Key Properties</h4>
 <p><strong>Non-negative:</strong> D_KL ≥ 0 always. Zero only when P = Q.<br/>
 <strong>Asymmetric:</strong> D_KL(P||Q) ≠ D_KL(Q||P). Direction matters!<br/>
 <strong>Not a true distance:</strong> It doesn't satisfy the triangle inequality.</p>
 
 <h4>Where It's Used</h4>
 <p>• <strong>VAEs:</strong> KL term forces latent space toward a standard normal.<br/>
 • <strong>RLHF:</strong> KL penalty prevents the fine-tuned model from drifting too far from the base model.<br/>
• <strong>Distillation:</strong> Measures how well the student matches the teacher's soft predictions.</p>
  `,
  solved: `
  <ul>
  <li><strong>Unified loss function</strong>: Combines multiple objectives into one</li>
  <li><strong>Latent space regularization</strong>: VAEs use KL to get structured representations</li>
  <li><strong>Guided generation</strong>: RLHF uses KL to prevent model drift</li>
  <li><strong>Information theory foundation</strong>: Provides principled way to compare distributions</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Asymmetric</strong>: D_KL(P||Q) ≠ D_KL(Q||P) — must choose direction carefully</li>
  <li><li><strong>Can be infinite</strong>: If Q(x) = 0 where P(x) > 0, KL explodes</strong></li>
  <li><strong>Hard to optimize</strong>: Can be unstable when distributions don't overlap</li>
  <li><strong>Scale sensitivity</strong>: Value depends on how probabilities are represented</li>
  </ul>
  `,















































 },
 "Interpretability": {

 title: "Model Interpretability: Why Did the Model Decide That?",
 content: `
 <p><strong>Interpretability</strong> methods explain WHY a model makes a prediction. Critical for medical, legal, and safety-critical applications.</p>
 
 <h4>SHAP (SHapley Additive exPlanations)</h4>
 <p>Based on game theory. Assigns each feature a contribution score based on its marginal impact when added to coalitions of other features.</p>
 <div class="equation">
 φᵢ = Σ |S|!(n-|S|-1)!/n! × [f(S ∪ {i}) - f(S)]
 </div>
 
 <h4>LIME (Local Interpretable Model-agnostic Explanations)</h4>
 <p>Perturbs the input around the prediction point, observes changes, and fits a simple linear model to explain the local decision boundary.</p>
 
 <h4>Saliency Maps</h4>
 <p>Compute ∂output/∂input to find which input features (pixels) most affect the prediction. Bright regions = important inputs.</p>
 
 <h4>Why It Matters</h4>
<p>A doctor needs to know WHY the model flagged a scan. A bank must explain WHY a loan was denied. Trust requires transparency.</p>
  `,
  solved: `
  <ul>
  <li><strong>Builds trust</strong>: Users accept predictions when they understand why</li>
  <li><strong>Debugging tool</strong>: Finds models relying on spurious features</li>
  <li><strong>Regulatory compliance</strong>: GDPR, medical devices require explanations</li>
  <li><strong>Feature discovery</strong>: Reveals which inputs matter most</li>
  </ul>
  `,
  shortcomings: `
  <ul>
  <li><strong>Computationally expensive</strong>: SHAP requires many model evaluations</li>
  <li><strong>May be misleading</strong>: Local explanations may not reflect global behavior</li>
  <li><strong>Hard to verify</strong>: Can't always confirm explanations are correct</li>
  <li><strong>Trade-off with accuracy</strong>: Interpretable models often less accurate</li>
  </ul>
  `,














































 },
"MLHistory": {
  title: "A Brief History of Machine Learning",
  content: `
  <p>Machine learning has evolved through decades of research. Understanding this history clarifies why certain techniques exist and who developed them.</p>
  
  <h4>The Foundations (1950s-1980s)</h4>
  <p><strong>1950</strong>: Alan Turing proposes the "Turing Test" in "Computing Machinery and Intelligence" — can machines think?<br/>
  <strong>1957</strong>: Frank Rosenblatt creates the <em>Perceptron</em> at Cornell. The first artificial neuron! It learns from data using a simple rule.<br/>
  <strong>1960s</strong>: Widrow and Hoff develop <em>ADALINE</em> (Adaptive Linear Element) — uses the delta rule (precursor to backpropagation).<br/>
  <strong>1967</strong>: Cover and Hart prove the Nearest Neighbor algorithm's theoretical foundations.<br/>
  <strong>1974</strong>: Paul Werbos proves backpropagation can train multi-layer networks in his PhD thesis — initially overlooked!</p>
  
  <h4>The AI Winter (1980s)</h4>
  <p><strong>1980</strong>: Kunihiko Fukushima introduces <em>Neocognitron</em> — the first convolutional network for handwritten digit recognition.<br/>
  <strong>1986</strong>: David Rumelhart, Geoffrey Hinton, and Ronald Williams revive backpropagation in Nature — "Learning Representations by Back-propagating Errors".<br/>
  <strong>1986</strong>: J. Ross Quinlan publishes <em>C4.5</em> — decision trees become mainstream.<br/>
  <strong>1989</strong>: Yann LeCun applies backprop to LeNet for handwritten ZIP code recognition.</p>
  
  <h4>The Statistical Learning Era (1990s-2000s)</h4>
  <p><strong>1990</strong>: Lawrence Rabiner publishes the classic tutorial on <em>Hidden Markov Models</em> for speech recognition.<br/>
  <strong>1992</strong>: Vladimir Vapnik introduces the <em>Support Vector Machine</em> — the kernel trick enables nonlinear classification.<br/>
  <strong>1995</strong>: Cortes and Vapnik publish <em>Soft Margin SVMs</em> — practical SVMs with slack variables.<br/>
  <strong>1997</strong>: Sepp Hochreiter and Jürgen Schmidhuber introduce <em>LSTM</em> — solves vanishing gradient in RNNs.<br/>
  <strong>2001</strong>: Leo Breiman publishes <em>Random Forests</em> — ensemble of decision trees, robust to overfitting.<br/>
  <strong>2001</strong>: Yoav Freund and Robert Schapire win the Gödel Prize for <em>AdaBoost</em> — adaptive boosting algorithm.<br/>
  <strong>2006</strong>: Geoffrey Hinton introduces <em>Deep Belief Networks</em> — pretraining enables effective deep learning.</p>
  
  <h4>The Deep Learning Revolution (2010s)</h4>
  <p><strong>2012</strong>: Alex Krizhevský, Ilya Sutskever, and Geoffrey Hinton win ImageNet with <em>AlexNet</em> — 60M params, deep CNNs are back!<br/>
  <strong>Key Insight</strong>: GPUs (NVIDIA CUDA) made training deep networks 10-20x faster. Hinton's group had been waiting for this.<br/>
  <strong>2013</strong>: Diederik Kingma and Jimmy Ba introduce <em>Adam</em> — adaptive moment estimation, the most popular optimizer.<br/>
  <strong>2014</strong>: Ian Goodfellow introduces <em>GANs</em> — generator/discriminator game, state-of-the-art generation.<br/>
  <strong>2015</strong>: Kaiming He et al. publish <em>ResNet</em> — skip connections enable training 152-layer networks.<br/>
  <strong>2015</strong>: Sergey Ioffe and Christian Szegedy introduce <em>BatchNorm</em> — normalizes layer inputs, faster training.<br/>
  <strong>2016</strong>: AlphaGo beats Lee Sedol (18 world titles) — DeepMind combines deep reinforcement learning + Monte Carlo tree search.<br/>
  <strong>2017</strong>: Ashish Vaswani et al. publish <em>Attention Is All You Need</em> — Transformers change everything.<br/>
  <strong>2018</strong>: Jacob Devlin et al. introduce <em>BERT</em> — bidirectional Transformers, new NLP baseline.</p>
  
  <h4>The Foundation Model Era (2020s)</h4>
  <p><strong>2020</strong>: Alec Radford et al. publish <em>GPT-3</em> — 175B parameters, emergent abilities from scale.<br/>
  <strong>2020</strong>: Tero et al. introduce <em>Neural Radiance Fields (NeRF)</em> — novel view synthesis from images.<br/>
  <strong>2021</strong>: Alex Dosovitskiy et al. introduce <em>ViT</em> — Transformers for images, needs more data than CNNs.<br/>
  <strong>2022</strong>: Stability AI releases <em>Stable Diffusion</em> — open weights, community explodes.<br/>
  <strong>2023</strong>: Llama and Mistral show small models can be powerful with good fine-tuning.<br/>
  <strong>2024</strong>: OpenAI o1 and DeepSeek R1 show reasoning emerges with test-time compute.<br/>
  <strong>2025</strong>: Claude 3, Gemini Ultra, GPT-4o — any-to-any multimodal models.</p>
  
  <h4>Key Lessons from History</h4>
  <p>• <strong>Hardware matters:</strong> GPUs enabled deep nets; TPUs further accelerated Transformers.<br/>
  • <strong>Scale helps:</strong> More data + compute = emergent capabilities (GPT-3, ViT).<br/>
  • <strong>Architecture evolution:</strong> CNN→RNN→Transformer is driven by parallelization needs.<br/>
  • <strong>Theory meets practice:</strong> SVM theory existed in 1960s but became practical in 1990s.<br/>
  • <strong>Open weights accelerate progress:</strong> ImageNet, Llama, Stable Diffusion democratized AI.</p>
  `,



























  },
  "ActivationAdvanced": {
    visualizer: "Activation",
  title: "Advanced Activations: Beyond ReLU",
  content: `
  <p>Modern networks use activation functions that address ReLU's shortcomings — dead neurons, non-smooth gradients, and unbounded outputs.</p>
 
 <h4>Leaky ReLU</h4>
 <p>Instead of zeroing negatives, allows a small slope α (typically 0.01). Prevents dead neurons.</p>
 <div class="equation">
 f(x) = x if x > 0, else α × x
 </div>
 
 <h4>GELU (Gaussian Error Linear Unit)</h4>
 <p>The default in Transformers (GPT, BERT). Smooth approximation that probabilistically gates the input.</p>
 <div class="equation">
 GELU(x) ≈ 0.5x(1 + tanh(√(2/π)(x + 0.044715x³)))
 </div>
 
 <h4>Swish (SiLU)</h4>
 <p>x × sigmoid(βx). Smooth, non-monotonic. Used in EfficientNet and MobileNet.</p>
 <div class="equation">
 Swish(x) = x × σ(βx)
 </div>
 `,
 interactiveFormulas: [
 {
 name: "Leaky ReLU",
 parts: [
 { symbol: "f(x)", key: "out", name: "Output", description: "Leaky activation" },
 { symbol: " = ", key: null },
 { symbol: "max(αx, x)", key: "formula", name: "Piecewise", description: "Leak for negatives" }
 ],
 variables: [
 { key: "x", symbol: "x", name: "Input", min: -5, max: 5, step: 0.1, default: -1.5, decimals: 1 },
 { key: "alpha", symbol: "α", name: "Leak Slope", min: 0.001, max: 0.3, step: 0.01, default: 0.01, decimals: 3 }
 ],
 calculate: (vals, get) => {
 const x = get("x", -1.5);
 const alpha = get("alpha", 0.01);
 return x > 0 ? x : alpha * x;
 },
 insights: [
 "α=0 → standard ReLU. α=0.01 → Leaky ReLU. α=0.2 → very leaky.",
 "Leaky ReLU prevents dead neurons by always allowing gradient flow.",
 "Parametric ReLU (PReLU) learns α during training."
 ]
 },
 {
 name: "GELU (Transformer Default)",
 parts: [
 { symbol: "GELU(x)", key: "out", name: "Output", description: "Smooth gated activation" },
 { symbol: " ≈ ", key: null },
 { symbol: "0.5x(1 + tanh(...))", key: "formula", name: "Approximation", description: "Gaussian CDF weighting" }
 ],
 variables: [
 { key: "x", symbol: "x", name: "Input", min: -4, max: 4, step: 0.1, default: 1.0, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const x = get("x", 1.0);
 const inner = Math.sqrt(2 / Math.PI) * (x + 0.044715 * x * x * x);
 return 0.5 * x * (1 + Math.tanh(inner));
 },
 insights: [
 "Near-zero for very negative inputs (like ReLU).",
 "Smooth curve — no kink at x=0 unlike ReLU.",
 "Used in GPT-2, GPT-3, BERT, and most modern transformers."
 ]
 },
 {
 name: "Swish (SiLU)",
 parts: [
 { symbol: "Swish(x)", key: "out", name: "Output", description: "Self-gated activation" },
 { symbol: " = x × σ(", key: null },
 { symbol: "β × x", key: "formula", name: "Gating", description: "Sigmoid gate scaled by β" },
 { symbol: ")", key: null }
 ],
 variables: [
 { key: "x", symbol: "x", name: "Input", min: -5, max: 5, step: 0.1, default: 1.2, decimals: 1 },
 { key: "beta", symbol: "β", name: "Beta", min: 0.1, max: 3, step: 0.1, default: 1.0, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const x = get("x", 1.2);
 const beta = get("beta", 1.0);
 return x * (1 / (1 + Math.exp(-beta * x)));
 },
 insights: [
 "β→∞: Swish becomes ReLU. β=0: Swish becomes x/2 (linear).",
 "Non-monotonic: slightly dips below zero for small negative inputs.",
 "Often outperforms ReLU on deeper networks (EfficientNet family)."
 ]
 }
 ]
 }
};
