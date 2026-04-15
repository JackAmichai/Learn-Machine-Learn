export const MATH_TOPICS = {
 "SVM": {
 title: "SVM: Support Vector Machines",
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
 visualizer: "SVM",
 interactiveFormulas: [
 {
 name: "Margin Size",
 components: [
 { symbol: "Margin", key: "margin", name: "Margin Width", description: "Distance between support vectors" },
 { symbol: " = 2 / ||w||", key: "formula", name: "Formula", description: "Inversely proportional to weight norm" }
 ],
 variables: [
 { key: "wnorm", symbol: "||w||", name: "Weight Norm", min: 0.1, max: 10, step: 0.1, default: 2, decimals: 1 }
 ],
 calculate: (vals, get) => 2 / get("wnorm", 2),
 insights: [
 "Smaller weights = larger margins = better generalization.",
 "Support vectors are the points 'supporting' the margin.",
 "Hinge loss penalizes points inside the margin."
 ]
 }
 ]
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
 visualizer: "Tree",
 interactiveFormulas: [
 {
 name: "Gini Impurity",
 components: [
 { symbol: "Gini", key: "gini", name: "Impurity", description: "How mixed a node is" },
 { symbol: " = 1 - (p₁² + p₂²)", key: "formula", name: "Formula", description: "Sum of squared probabilities" }
 ],
 variables: [
 { key: "p1", symbol: "p₁", name: "Prob Class 1", min: 0, max: 1, step: 0.05, default: 0.5, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const p1 = get("p1", 0.5);
 const p2 = 1 - p1;
 return 1 - (p1 * p1 + p2 * p2);
 },
 insights: [
 "Gini = 0 means a node is perfectly pure (all one class).",
 "Gini = 0.5 (for 2 classes) is maximum impurity.",
 "Trees are prone to overfitting without 'pruning'."
 ]
 }
 ]
 },
 "RandomForest": {
 title: "Random Forests: Ensemble Learning",
 content: `
 <p><strong>Random Forests</strong> combine multiple Decision Trees to reduce overfitting and improve accuracy. This is a technique called <strong>Bagging</strong> (Bootstrap Aggregating).</p>
 `,
 visualizer: "RandomForest",
 interactiveFormulas: [
 {
 name: "Ensemble Prediction",
 components: [
 { symbol: "Vote", key: "vote", name: "Tree Votes", description: "Average or majority" },
 { symbol: " = Σ(t_i) / n", key: "formula", name: "Formula", description: "Aggregate predictions" }
 ],
 variables: [
 { key: "numTrees", symbol: "N", name: "Number of Trees", min: 1, max: 100, step: 1, default: 10, decimals: 0 },
 { key: "featureSubset", symbol: "m", name: "Feature Subset %", min: 10, max: 100, step: 10, default: 50, decimals: 0 }
 ],
 calculate: (vals, get) => get("numTrees", 10),
 insights: [
 "More trees reduce variance (overfitting) without increasing bias.",
 "Random subsets of features force trees to be diverse.",
 "The final prediction is typically a majority vote (classification) or average (regression)."
 ]
 }
 ]
 },
 "KNN": {
 title: "KNN: K-Nearest Neighbors",
 content: `
 <p><strong>KNN</strong> classifies a point based on the majority class of its 'k' closest neighbors. It's a 'lazy learner' (no training phase).</p>
 `,
 interactiveFormulas: [
 {
 name: "Euclidean Distance",
 components: [
 { symbol: "d", key: "dist", name: "Distance", description: "Straight-line distance" },
 { symbol: " = √((x₂-x₁)² + (y₂-y₁)²)", key: "formula", name: "Formula", description: "Pythagorean theorem" }
 ],
 variables: [
 { key: "dx", symbol: "Δx", name: "X Diff", min: 0, max: 10, step: 0.1, default: 3, decimals: 1 },
 { key: "dy", symbol: "Δy", name: "Y Diff", min: 0, max: 10, step: 0.1, default: 4, decimals: 1 }
 ],
 calculate: (vals, get) => Math.sqrt(Math.pow(get("dx", 3), 2) + Math.pow(get("dy", 4), 2)),
 insights: [
 "Choosing 'k' is critical: small k = sensitive to noise, large k = smooth boundaries.",
 "Requires feature scaling (normalization) to work correctly.",
 "Computational cost increases with dataset size."
 ]
 }
 ]
 },
 "PCA": {
 title: "PCA: Principal Component Analysis",
 content: `
 <p><strong>PCA</strong> reduces data dimensions while preserving as much variance as possible. It finds new axes (Principal Components) that are orthogonal.</p>
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

 <h4>Binary Cross-Entropy</h4>
 <p>Common for two-class classification (like vision mode). Uses logarithms to punish confident wrong answers.</p>
 <div class="equation">
 Loss = - [ y * log(p) + (1 - y) * log(1 - p) ]
 </div>

 <h4>Weighted Cross-Entropy</h4>
 <p>Useful when classes are imbalanced (e.g., rare faults in hardware). You can up-weight important classes.</p>
 <div class="equation">
 Loss = - [ w_pos * y * log(p) + w_neg * (1 - y) * log(1 - p) ]
 </div>

 <h4>Huber Loss</h4>
 <p>A robust loss function for regression. It's quadratic for small errors and linear for large ones, making it less sensitive to outliers than MSE.</p>

 <h4>Hinge Loss</h4>
 <p>Used primarily for SVMs. It provides a margin for classification, only penalizing points that are on the wrong side of the margin or too close to it.</p>
 <div class="equation">
 Loss = max(0, 1 - y * ŷ)
 </div>
 `,
 interactiveFormulas: [
 {
 name: "Huber Loss",
 components: [
 { symbol: "L_δ", key: "loss", name: "Loss", description: "Huber value" },
 { symbol: " = ", key: null },
 { symbol: "if |err| < δ: 0.5*err² else δ*(|err|-0.5*δ)", key: "formula", name: "Formula", description: "Piecewise quadratic/linear" }
 ],
 variables: [
 { key: "err", symbol: "err", name: "Error (y-ŷ)", min: -10, max: 10, step: 0.1, default: 4, decimals: 1 },
 { key: "delta", symbol: "δ", name: "Delta", min: 0.1, max: 5, step: 0.1, default: 1.0, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const err = Math.abs(get("err", 4));
 const d = get("delta", 1);
 return err <= d ? 0.5 * err * err : d * (err - 0.5 * d);
 },
 insights: [
 "Combines best of MSE (smooth at zero) and MAE (robust to outliers).",
 "Delta (δ) controls the transition point from quadratic to linear.",
 "Commonly used in Robust Regression and Deep RL."
 ]
 },
 {
 name: "Hinge Loss",
 components: [
 { symbol: "Loss", key: "loss", name: "Loss", description: "Hinge value" },
 { symbol: " = max(0, 1 - y * ŷ)", key: "formula", name: "Formula", description: "Zero loss if on correct side of margin" }
 ],
 variables: [
 { key: "y", symbol: "y", name: "Target (±1)", min: -1, max: 1, step: 2, default: 1, decimals: 0 },
 { key: "yhat", symbol: "ŷ", name: "Prediction", min: -2, max: 2, step: 0.1, default: 0.5, decimals: 1 }
 ],
 calculate: (vals, get) => Math.max(0, 1 - get("y", 1) * get("yhat", 0.5)),
 insights: [
 "Encourages a margin: loss is zero only if ŷ has same sign as y AND |ŷ| >= 1.",
 "If ŷ is between 0 and 1 (for y=1), it still pays a 'margin penalty'.",
 "The backbone of the Support Vector Machine (SVM)."
 ]
 },
 {
 name: "Mean Squared Error",
 parts: [
 { symbol: "(", key: null },
 { symbol: "y", key: "y_true", name: "True Value", description: "Ground-truth target from the dataset" },
 { symbol: " - ", key: null },
 { symbol: "ŷ", key: "y_pred", name: "Predicted Value", description: "Model output after forward pass" },
 { symbol: ")^2", key: "squared", name: "Square", description: "Amplifies large errors and removes negative signs" }
 ],
 variables: [
 { key: "y_true", symbol: "y", name: "True Value", min: 0, max: 1, step: 0.01, default: 1, decimals: 2 },
 { key: "y_pred", symbol: "ŷ", name: "Prediction", min: 0, max: 1, step: 0.01, default: 0.35, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const y = get("y_true", 1);
 const yhat = get("y_pred", 0.35);
 return Math.pow(y - yhat, 2);
 },
 insights: [
 "Loss is zero when prediction matches truth.",
 "Errors twice as large become four times more costly.",
 "Sensitive to outliers, so great for smooth regression tasks."
 ]
 },
 {
 name: "Binary Cross-Entropy",
 parts: [
 { symbol: "- [", key: null },
 { symbol: "y", key: "y_true", name: "True Label", description: "1 for positive class, 0 for negative class" },
 { symbol: " * log(", key: null },
 { symbol: "ŷ", key: "y_pred", name: "Predicted Prob", description: "Model confidence for class = 1" },
 { symbol: ") + (1 - y) * log(1 - ŷ)]", key: "complement", name: "Second Term", description: "Handles the opposite class" }
 ],
 variables: [
 { key: "y_true", symbol: "y", name: "True Label", min: 0, max: 1, step: 1, default: 1, decimals: 0 },
 { key: "y_pred", symbol: "ŷ", name: "Predicted Prob", min: 0.01, max: 0.99, step: 0.01, default: 0.8, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const y = get("y_true", 1);
 const yhat = Math.max(0.001, Math.min(0.999, get("y_pred", 0.8)));
 return -(y * Math.log(yhat) + (1 - y) * Math.log(1 - yhat));
 },
 insights: [
 "Confident wrong answers explode the loss (log of a tiny number).",
 "Used heavily in digital communications (bit error modeling).",
 "Probabilities stay inside (0,1) to avoid math issues."
 ]
 },
 {
 name: "Weighted Cross-Entropy",
 parts: [
 { symbol: "- [", key: null },
 { symbol: "w_pos", key: "w_pos", name: "Positive Weight", description: "Reward/penalize positive class more" },
 { symbol: " * y * log(ŷ)", key: "pos_term", name: "Positive Term", description: "Loss if true label is 1" },
 { symbol: " + ", key: null },
 { symbol: "w_neg", key: "w_neg", name: "Negative Weight", description: "Reward/penalize negative class" },
 { symbol: " * (1 - y) * log(1 - ŷ)]", key: "neg_term", name: "Negative Term", description: "Loss if true label is 0" }
 ],
 variables: [
 { key: "y_true", symbol: "y", name: "True Label", min: 0, max: 1, step: 1, default: 0, decimals: 0 },
 { key: "y_pred", symbol: "ŷ", name: "Predicted Prob", min: 0.01, max: 0.99, step: 0.01, default: 0.2, decimals: 2 },
 { key: "w_pos", symbol: "w_pos", name: "Positive Weight", min: 0.1, max: 5, step: 0.1, default: 2, decimals: 2 },
 { key: "w_neg", symbol: "w_neg", name: "Negative Weight", min: 0.1, max: 5, step: 0.1, default: 1, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const y = get("y_true", 0);
 const p = Math.max(0.001, Math.min(0.999, get("y_pred", 0.2)));
 const wp = get("w_pos", 2);
 const wn = get("w_neg", 1);
 return -(wp * y * Math.log(p) + wn * (1 - y) * Math.log(1 - p));
 },
 insights: [
 "Heavily used in anomaly detection (faults vs normal signals).",
 "Set w_pos high when missing positive cases is very expensive.",
 "Balanced choices keep both classes equally important."
 ]
 }
 ]
 },
 "Epoch": {
 title: "Epoch, Batch, and Iterations",
 content: `
 <p>An <strong>Epoch</strong> is one full sweep through the training data. Inside each epoch, we chop data into batches so gradients fit in memory.</p>
 <div class="equation">
 Updates = Epochs * (Data Size / Batch Size)
 </div>
 <p>Think of it like re-reading your notes. Each epoch reinforces the pattern but too many can lead to memorization (overfitting).</p>
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
 interactiveFormulas: [
 {
 name: "Instant Weight Update",
 parts: [
 { symbol: "w_new", key: "w_new", name: "New Weight", description: "Weight after this update" },
 { symbol: " = ", key: null },
 { symbol: "w_old", key: "w_old", name: "Current Weight", description: "Weight before update" },
 { symbol: " - ", key: null },
 { symbol: "lr", key: "lr", name: "Learning Rate", description: "Step size" },
 { symbol: " * ", key: null },
 { symbol: "grad", key: "grad", name: "Gradient", description: "Slope telling which way to move" }
 ],
 variables: [
 { key: "w_old", symbol: "w", name: "Current Weight", min: -3, max: 3, step: 0.1, default: 1.2, decimals: 2 },
 { key: "lr", symbol: "lr", name: "Learning Rate", min: 0.0001, max: 1, step: 0.0001, default: 0.05, decimals: 4 },
 { key: "grad", symbol: "grad", name: "Gradient", min: -5, max: 5, step: 0.1, default: -1.4, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const w = get("w_old", 1.2);
 const lr = get("lr", 0.05);
 const g = get("grad", -1.4);
 return w - lr * g;
 },
 insights: [
 "Sign of gradient decides direction of movement.",
 "Doubling lr doubles update magnitude.",
 "In control systems, lr acts like a proportional gain." 
 ]
 },
 {
 name: "Exponential Decay Schedule",
 parts: [
 { symbol: "lr_k", key: "lr_k", name: "Current LR", description: "Learning rate at step k" },
 { symbol: " = ", key: null },
 { symbol: "lr_0", key: "lr0", name: "Initial LR", description: "Learning rate at start of training" },
 { symbol: " * ", key: null },
 { symbol: "decay^k", key: "decay", name: "Decay Factor", description: "Fraction applied per step" }
 ],
 variables: [
 { key: "lr0", symbol: "lr_0", name: "Initial LR", min: 0.0001, max: 1, step: 0.0001, default: 0.1, decimals: 4 },
 { key: "decay", symbol: "decay", name: "Decay", min: 0.5, max: 0.999, step: 0.001, default: 0.95, decimals: 3 },
 { key: "step", symbol: "k", name: "Step", min: 0, max: 200, step: 1, default: 20, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const lr0 = get("lr0", 0.1);
 const decay = get("decay", 0.95);
 const step = get("step", 20);
 return lr0 * Math.pow(decay, step);
 },
 insights: [
 "Popular in deep learning: fast learning early, stable later.",
 "Analogous to annealing temperature in metallurgy.",
 "Helps networks converge without oscillation." 
 ]
 }
 ]
 },
 "Activation": {
 title: "Activation Functions = Signal Shapers",
 content: `
 <p>Activations transform summed inputs before passing them onward. They introduce non-linearity so the network can learn complex patterns and logic gates.</p>

 <h4>Sigmoid</h4>
 <p>Maps any input to 0-1. Mimics a smooth switch. Used for probabilities and in logistic regression.</p>

 <h4>ReLU</h4>
 <p>Outputs max(0, x). Fast, simple, and works well in practice. Similar to diode behavior familiar in circuits.</p>

 <h4>Tanh</h4>
 <p>Outputs -1 to 1. Great for zero-centered data. Common in recurrent networks modeling signals.</p>
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
 interactiveFormulas: [
 {
 name: "Neuron (2 inputs)",
 parts: [
 { symbol: "z", key: "z", name: "Pre-Activation", description: "Weighted sum before activation" },
 { symbol: " = ", key: null },
 { symbol: "w1*x1", key: "term1", name: "Contribution 1", description: "Input 1 scaled by weight 1" },
 { symbol: " + ", key: null },
 { symbol: "w2*x2", key: "term2", name: "Contribution 2", description: "Input 2 scaled by weight 2" },
 { symbol: " + b", key: "bias", name: "Bias", description: "Baseline signal" }
 ],
 variables: [
 { key: "x1", symbol: "x1", name: "Input 1", min: -2, max: 2, step: 0.1, default: 0.8, decimals: 2 },
 { key: "x2", symbol: "x2", name: "Input 2", min: -2, max: 2, step: 0.1, default: -0.4, decimals: 2 },
 { key: "w1", symbol: "w1", name: "Weight 1", min: -2, max: 2, step: 0.1, default: 1.1, decimals: 2 },
 { key: "w2", symbol: "w2", name: "Weight 2", min: -2, max: 2, step: 0.1, default: 0.7, decimals: 2 },
 { key: "b", symbol: "b", name: "Bias", min: -2, max: 2, step: 0.1, default: 0.2, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const x1 = get("x1", 0.8);
 const x2 = get("x2", -0.4);
 const w1 = get("w1", 1.1);
 const w2 = get("w2", 0.7);
 const b = get("b", 0.2);
 return w1 * x1 + w2 * x2 + b;
 },
 insights: [
 "Positive weights amplify inputs, negative weights invert them.",
 "Bias shifts the activation threshold (like DC offset).",
 "Hidden layers learn features automatically from data." 
 ]
 },
 {
 name: "Neuron (3 inputs)",
 parts: [
 { symbol: "z", key: "z3", name: "Pre-Activation", description: "Sum of three weighted inputs" },
 { symbol: " = ", key: null },
 { symbol: "w1*x1 + w2*x2 + w3*x3 + b", key: "sum", name: "Weighted Sum", description: "Classic affine transform" }
 ],
 variables: [
 { key: "x1", symbol: "x1", name: "Input 1", min: -2, max: 2, step: 0.1, default: 0.2, decimals: 2 },
 { key: "x2", symbol: "x2", name: "Input 2", min: -2, max: 2, step: 0.1, default: 1.2, decimals: 2 },
 { key: "x3", symbol: "x3", name: "Input 3", min: -2, max: 2, step: 0.1, default: -0.6, decimals: 2 },
 { key: "w1", symbol: "w1", name: "Weight 1", min: -2, max: 2, step: 0.1, default: 0.5, decimals: 2 },
 { key: "w2", symbol: "w2", name: "Weight 2", min: -2, max: 2, step: 0.1, default: -1.4, decimals: 2 },
 { key: "w3", symbol: "w3", name: "Weight 3", min: -2, max: 2, step: 0.1, default: 0.9, decimals: 2 },
 { key: "b", symbol: "b", name: "Bias", min: -2, max: 2, step: 0.1, default: 0.05, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const x1 = get("x1", 0.2);
 const x2 = get("x2", 1.2);
 const x3 = get("x3", -0.6);
 const w1 = get("w1", 0.5);
 const w2 = get("w2", -1.4);
 const w3 = get("w3", 0.9);
 const b = get("b", 0.05);
 return w1 * x1 + w2 * x2 + w3 * x3 + b;
 },
 insights: [
 "Adds expressive power for multi-sensor fusion.",
 "Common in robotics: combine accelerometer, gyro, magnetometer.",
 "Hidden layers learn to weight each channel appropriately." 
 ]
 }
 ]
 },
 "Optimizer": {
 title: "Optimizers: Strategies for Weight Updates",
 content: `
 <p>Optimizers decide how gradients adjust weights. Different strategies balance speed, stability, and memory.</p>

 <h4>SGD</h4>
 <p>Stochastic Gradient Descent applies raw gradients with optional momentum.</p>

 <h4>Adam</h4>
 <p>Adaptive Moment Estimation keeps running averages of gradients (m) and squared gradients (v). Very popular in deep learning.</p>
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
 interactiveFormulas: [
 {
 name: "Neuron with ReLU",
 parts: [
 { symbol: "a", key: "activation", name: "Activation", description: "Neuron output after ReLU" },
 { symbol: " = ", key: null },
 { symbol: "ReLU( w1*x1 + w2*x2 + b )", key: "formula", name: "Forward Pass", description: "Weighted sum plus bias" }
 ],
 variables: [
 { key: "w1", symbol: "w1", name: "Weight 1", min: -3, max: 3, step: 0.1, default: 1.4, decimals: 2 },
 { key: "w2", symbol: "w2", name: "Weight 2", min: -3, max: 3, step: 0.1, default: -1.1, decimals: 2 },
 { key: "x1", symbol: "x1", name: "Input 1", min: 0, max: 1, step: 0.05, default: 0.6, decimals: 2 },
 { key: "x2", symbol: "x2", name: "Input 2", min: 0, max: 1, step: 0.05, default: 0.3, decimals: 2 },
 { key: "b", symbol: "b", name: "Bias", min: -1, max: 1, step: 0.05, default: 0.05, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const w1 = get("w1", 1.4);
 const w2 = get("w2", -1.1);
 const x1 = get("x1", 0.6);
 const x2 = get("x2", 0.3);
 const b = get("b", 0.05);
 const z = w1 * x1 + w2 * x2 + b;
 return Math.max(0, z);
 },
 insights: [
 "Positive outputs mean the neuron fired (feature detected).",
 "Negative weighted sum gets clipped to zero by ReLU.",
 "In EE terms, this is a weighted summing amplifier with diode." 
 ]
 },
 {
 name: "Neuron Energy",
 parts: [
 { symbol: "energy", key: "energy", name: "Signal Energy", description: "Sum of squared activation over time" }
 ],
 variables: [
 { key: "a1", symbol: "a1", name: "Activation t1", min: -1, max: 1, step: 0.1, default: 0.2, decimals: 2 },
 { key: "a2", symbol: "a2", name: "Activation t2", min: -1, max: 1, step: 0.1, default: 0.4, decimals: 2 },
 { key: "a3", symbol: "a3", name: "Activation t3", min: -1, max: 1, step: 0.1, default: -0.3, decimals: 2 }],
 calculate: (vals, get) => {
 const a1 = get("a1", 0.2);
 const a2 = get("a2", 0.4);
 const a3 = get("a3", -0.3);
 return a1 * a1 + a2 * a2 + a3 * a3;
 },
 insights: [
 "Useful when comparing power consumption of activations.",
 "Connects neural nets with signal energy concepts in EE.",
 "Higher energy neurons can dominate downstream layers." 
 ]
 }
 ]
 },
 "Layer": {
 title: "Layers = Parameter Budgets",
 content: `
 <p>Each layer has weights (connections) and biases. The parameter count tells you the memory cost and overfitting risk.</p>
 <div class="equation">
 params = inputs * outputs + outputs
 </div>
 `,
 interactiveFormulas: [
 {
 name: "Dense Layer Parameters",
 parts: [
 { symbol: "params", key: "params", name: "Parameters", description: "Total trainable numbers" },
 { symbol: " = ", key: null },
 { symbol: "inputs * outputs", key: "weights", name: "Weights", description: "Each input connects to all outputs" },
 { symbol: " + outputs", key: "biases", name: "Biases", description: "One bias per neuron" }
 ],
 variables: [
 { key: "inputs", symbol: "inputs", name: "Inputs", min: 1, max: 2048, step: 1, default: 100, decimals: 0 },
 { key: "outputs", symbol: "outputs", name: "Outputs", min: 1, max: 512, step: 1, default: 32, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const inputs = get("inputs", 100);
 const outputs = get("outputs", 32);
 return inputs * outputs + outputs;
 },
 insights: [
 "Helps gauge memory footprint on embedded devices.",
 "Doubling outputs doubles weights (plus extra biases).",
 "Keep params in check to avoid overfitting small datasets." 
 ]
 }
 ]
 },
 "Gradient": {
 title: "Gradients: Directions for Learning",
 content: `
 <p>A <strong>Gradient</strong> is a vector of partial derivatives telling us which way the loss increases. The negative gradient points downhill.</p>
 <p>In calculus terms, it is like measuring slope along each axis. In engineering, think of it as sensitivity analysis.</p>
 `,
 interactiveFormulas: [
 {
 name: "Gradient Magnitude",
 parts: [
 { symbol: "|grad|", key: "mag", name: "Magnitude", description: "Overall steepness" },
 { symbol: " = ", key: null },
 { symbol: "sqrt( (dL/dx)^2 + (dL/dy)^2 )", key: "formula", name: "Euclidean Norm", description: "Combines axis slopes" }
 ],
 variables: [
 { key: "dx", symbol: "dL/dx", name: "Partial wrt x", min: -5, max: 5, step: 0.1, default: 2.1, decimals: 2 },
 { key: "dy", symbol: "dL/dy", name: "Partial wrt y", min: -5, max: 5, step: 0.1, default: -1.4, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const dx = get("dx", 2.1);
 const dy = get("dy", -1.4);
 return Math.sqrt(dx * dx + dy * dy);
 },
 insights: [
 "Large magnitude means steep slope (fast learning).",
 "Near-zero gradient indicates a plateau or optimum.",
 "Direction = atan2(dy, dx) shows where to move weights." 
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Layer Delta",
 parts: [
 { symbol: "delta_l", key: "delta", name: "Layer Error", description: "Error signal for this layer" },
 { symbol: " = ", key: null },
 { symbol: "upstream", key: "up", name: "Upstream Error", description: "Error coming from next layer" },
 { symbol: " * ", key: null },
 { symbol: "activation'", key: "act", name: "Activation Derivative", description: "Slope of activation" }
 ],
 variables: [
 { key: "up", symbol: "upstream", name: "Upstream Error", min: -3, max: 3, step: 0.1, default: 0.8, decimals: 2 },
 { key: "deriv", symbol: "activation'", name: "Derivative", min: 0, max: 1, step: 0.05, default: 0.25, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const up = get("up", 0.8);
 const d = get("deriv", 0.25);
 return up * d;
 },
 insights: [
 "ReLU derivative is 1 when neuron is active, 0 otherwise.",
 "Sigmoid derivative shrinks when neuron saturates.",
 "If derivative is zero, learning stalls (dead neuron)." 
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Softmax Probabilities",
 parts: [
 { symbol: "softmax(z)", key: "soft", name: "Probabilities", description: "Distribution over classes" }
 ],
 variables: [
 { key: "z1", symbol: "z1", name: "Logit 1", min: -5, max: 5, step: 0.1, default: 1.0, decimals: 2 },
 { key: "z2", symbol: "z2", name: "Logit 2", min: -5, max: 5, step: 0.1, default: -0.5, decimals: 2 },
 { key: "z3", symbol: "z3", name: "Logit 3", min: -5, max: 5, step: 0.1, default: 0.2, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const z1 = get("z1", 1.0);
 const z2 = get("z2", -0.5);
 const z3 = get("z3", 0.2);
 const max = Math.max(z1, z2, z3);
 const exp1 = Math.exp(z1 - max);
 const exp2 = Math.exp(z2 - max);
 const exp3 = Math.exp(z3 - max);
 const sum = exp1 + exp2 + exp3;
 const probs = [exp1 / sum, exp2 / sum, exp3 / sum];
 return probs.map(p => p.toFixed(3)).join(', ');
 },
 insights: [
 "Subtracting max logit prevents overflow (numerical trick).",
 "Temperature scaling can make distribution sharper or softer.",
 "Softmax shows confidence: dominant class has highest probability." 
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "L1 Penalty",
 parts: [
 { symbol: "lambda", key: "lambda", name: "Strength", description: "How much regularization to apply" },
 { symbol: " * sum |w|", key: "sum", name: "Absolute Sum", description: "Magnitude of weights" }
 ],
 variables: [
 { key: "lambda", symbol: "lambda", name: "Lambda", min: 0, max: 1, step: 0.01, default: 0.1, decimals: 2 },
 { key: "w1", symbol: "w1", name: "w1", min: -2, max: 2, step: 0.1, default: 0.8, decimals: 2 },
 { key: "w2", symbol: "w2", name: "w2", min: -2, max: 2, step: 0.1, default: -0.6, decimals: 2 },
 { key: "w3", symbol: "w3", name: "w3", min: -2, max: 2, step: 0.1, default: 0.3, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const lambda = get("lambda", 0.1);
 const w1 = Math.abs(get("w1", 0.8));
 const w2 = Math.abs(get("w2", -0.6));
 const w3 = Math.abs(get("w3", 0.3));
 return lambda * (w1 + w2 + w3);
 },
 insights: [
 "Pushes small weights to zero (feature selection).",
 "Sparse models run faster on hardware (good for edge devices).",
 "Too much L1 causes underfitting." 
 ]
 },
 {
 name: "L2 Penalty",
 parts: [
 { symbol: "lambda", key: "lambda2", name: "Strength", description: "Regularization coefficient" },
 { symbol: " * sum w^2", key: "sum2", name: "Squared Sum", description: "Energy of weights" }
 ],
 variables: [
 { key: "lambda", symbol: "lambda", name: "Lambda", min: 0, max: 1, step: 0.01, default: 0.01, decimals: 2 },
 { key: "w1", symbol: "w1", name: "w1", min: -2, max: 2, step: 0.1, default: 0.5, decimals: 2 },
 { key: "w2", symbol: "w2", name: "w2", min: -2, max: 2, step: 0.1, default: -1.0, decimals: 2 },
 { key: "w3", symbol: "w3", name: "w3", min: -2, max: 2, step: 0.1, default: 0.1, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const lambda = get("lambda", 0.01);
 const w1 = get("w1", 0.5);
 const w2 = get("w2", -1.0);
 const w3 = get("w3", 0.1);
 return lambda * (w1 * w1 + w2 * w2 + w3 * w3);
 },
 insights: [
 "Keeps weights small to avoid exploding outputs.",
 "Equivalent to adding resistors limiting current in analog circuits.",
 "Standard in ridge regression and weight decay." 
 ]
 }
 ]
 },
 "Convolution": {
 title: "Convolution: Sliding Dot Products",
 content: `
 <p>Convolution layers slide a small filter (kernel) across the input. Each position multiplies overlapping values and sums them.</p>
 <p>In vision mode, think of kernels detecting edges or corners. In EE, it is similar to FIR filters.</p>
 `,
 interactiveFormulas: [
 {
 name: "3x3 Filter Dot Product",
 parts: [
 { symbol: "sum kernel(i,j) * patch(i,j)", key: "sum", name: "Dot Product", description: "Weighted sum of overlapping region" }
 ],
 variables: [
 { key: "k1", symbol: "k1", name: "Kernel 1", min: -2, max: 2, step: 0.1, default: -1, decimals: 1 },
 { key: "k2", symbol: "k2", name: "Kernel 2", min: -2, max: 2, step: 0.1, default: 0, decimals: 1 },
 { key: "k3", symbol: "k3", name: "Kernel 3", min: -2, max: 2, step: 0.1, default: 1, decimals: 1 },
 { key: "p1", symbol: "p1", name: "Pixel 1", min: 0, max: 1, step: 0.05, default: 0.2, decimals: 2 },
 { key: "p2", symbol: "p2", name: "Pixel 2", min: 0, max: 1, step: 0.05, default: 0.6, decimals: 2 },
 { key: "p3", symbol: "p3", name: "Pixel 3", min: 0, max: 1, step: 0.05, default: 0.8, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const k1 = get("k1", -1);
 const k2 = get("k2", 0);
 const k3 = get("k3", 1);
 const p1 = get("p1", 0.2);
 const p2 = get("p2", 0.6);
 const p3 = get("p3", 0.8);
 return k1 * p1 + k2 * p2 + k3 * p3;
 },
 insights: [
 "Edge detector kernels look like [-1, 0, 1].",
 "Same concept as sliding window multiply-and-accumulate (MAC).",
 "Hardware accelerators implement this efficiently." 
 ]
 }
 ]
 },
 "Signal Processing": {
 title: "Signals and Frequency",
 content: `
 <p>Neural networks can process signals too. Concepts like signal energy and frequency response connect EE fundamentals with machine learning.</p>
 <div class="equation">
 Energy = sum x(t)^2, SNR = 10 * log10(signal / noise)
 </div>
 `,
 interactiveFormulas: [
 {
 name: "Signal-to-Noise Ratio",
 parts: [
 { symbol: "SNR", key: "snr", name: "Signal to Noise", description: "Ratio in decibels" },
 { symbol: " = 10 * log10(signal / noise)", key: "formula", name: "Formula", description: "Power ratio in dB" }
 ],
 variables: [
 { key: "signal", symbol: "signal", name: "Signal Power", min: 0.01, max: 10, step: 0.01, default: 1, decimals: 2 },
 { key: "noise", symbol: "noise", name: "Noise Power", min: 0.001, max: 5, step: 0.001, default: 0.1, decimals: 3 }
 ],
 calculate: (vals, get) => {
 const signal = get("signal", 1);
 const noise = Math.max(0.0001, get("noise", 0.1));
 return 10 * Math.log10(signal / noise);
 },
 insights: [
 "Higher SNR means clearer signal (less noise).",
 "In ML, data augmentation often improves effective SNR.",
 "Helps compare sensor quality for embedded systems." 
 ]
 }
 ]
 },
 "Vectors & Matrices": {
 title: "Vectors & Matrices: Lego Bricks of Vision Models",
 content: `
 <p><strong>Vectors</strong> line up numbers in a single column. In vision mode the 10×10 canvas becomes a 100×1 vector before entering the dense layers.</p>
 <p><strong>Matrices</strong> arrange those vectors into 2D grids so filters can slide over rows and columns. Understanding their norms and determinants explains why scaling or rotating images affects activations.</p>
 `,
 interactiveFormulas: [
 {
 name: "Vector Magnitude (3D)",
 parts: [
 { symbol: "|v|", key: "mag", name: "Magnitude", description: "Length of the vector" },
 { symbol: " = ", key: null },
 { symbol: "sqrt(x^2 + y^2 + z^2)", key: "formula", name: "Euclidean Norm", description: "Distance from origin" }
 ],
 variables: [
 { key: "vx", symbol: "x", name: "x", min: -5, max: 5, step: 0.1, default: 1.2, decimals: 1 },
 { key: "vy", symbol: "y", name: "y", min: -5, max: 5, step: 0.1, default: -0.4, decimals: 1 },
 { key: "vz", symbol: "z", name: "z", min: -5, max: 5, step: 0.1, default: 2.3, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const x = get("vx", 1.2);
 const y = get("vy", -0.4);
 const z = get("vz", 2.3);
 return Math.sqrt(x * x + y * y + z * z);
 },
 insights: [
 "Magnitude shows how strong a pixel gradient or feature vector is.",
 "Normalizing vectors (dividing by |v|) stabilizes training.",
 "Longer vectors mean brighter strokes on the vision canvas." 
 ]
 },
 {
 name: "2x2 Determinant",
 parts: [
 { symbol: "det(A)", key: "det", name: "Determinant", description: "Area scale factor" },
 { symbol: " = ", key: null },
 { symbol: "a11*a22 - a12*a21", key: "formula", name: "Formula", description: "Signed area" }
 ],
 variables: [
 { key: "a11", symbol: "a11", name: "a11", min: -3, max: 3, step: 0.1, default: 1, decimals: 1 },
 { key: "a12", symbol: "a12", name: "a12", min: -3, max: 3, step: 0.1, default: 0.5, decimals: 1 },
 { key: "a21", symbol: "a21", name: "a21", min: -3, max: 3, step: 0.1, default: -0.3, decimals: 1 },
 { key: "a22", symbol: "a22", name: "a22", min: -3, max: 3, step: 0.1, default: 2, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const a11 = get("a11", 1);
 const a12 = get("a12", 0.5);
 const a21 = get("a21", -0.3);
 const a22 = get("a22", 2);
 return a11 * a22 - a12 * a21;
 },
 insights: [
 "det(A)=0 means the matrix squashes space—information is lost.",
 "Positive determinant preserves orientation; negative flips it.",
 "Useful for reasoning about data augmentation transforms." 
 ]
 }
 ]
 },
 "Dot Product": {
 title: "Dot Product: Similarity Meter",
 content: `
 <p>The dot product measures how aligned two vectors are. In the vision model it compares your drawn strokes with learned weight vectors.</p>
 <p>Geometry version: a · b = |a||b|cosθ. Component version: sum of element-wise products. Both explain why brighter pixels boost certain neurons.</p>
 `,
 interactiveFormulas: [
 {
 name: "Component Form",
 parts: [
 { symbol: "a · b", key: "dot", name: "Dot Product", description: "Similarity score" },
 { symbol: " = ", key: null },
 { symbol: "ax*bx + ay*by + az*bz", key: "formula", name: "Sum of products", description: "Multiply, then add" }
 ],
 variables: [
 { key: "ax", symbol: "ax", name: "a_x", min: -3, max: 3, step: 0.1, default: 0.8, decimals: 1 },
 { key: "ay", symbol: "ay", name: "a_y", min: -3, max: 3, step: 0.1, default: 0.4, decimals: 1 },
 { key: "az", symbol: "az", name: "a_z", min: -3, max: 3, step: 0.1, default: 0, decimals: 1 },
 { key: "bx", symbol: "bx", name: "b_x", min: -3, max: 3, step: 0.1, default: 1.1, decimals: 1 },
 { key: "by", symbol: "by", name: "b_y", min: -3, max: 3, step: 0.1, default: -0.6, decimals: 1 },
 { key: "bz", symbol: "bz", name: "b_z", min: -3, max: 3, step: 0.1, default: 0.2, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const ax = get("ax", 0.8);
 const ay = get("ay", 0.4);
 const az = get("az", 0);
 const bx = get("bx", 1.1);
 const by = get("by", -0.6);
 const bz = get("bz", 0.2);
 return ax * bx + ay * by + az * bz;
 },
 insights: [
 "Positive values mean vectors look in the same direction.",
 "Zero indicates orthogonal features (independent information).",
 "Used everywhere: attention layers, cosine similarity, projections." 
 ]
 },
 {
 name: "Angle Form",
 parts: [
 { symbol: "a · b", key: "dot", name: "Dot Product", description: "Projection of a onto b" },
 { symbol: " = |a||b|cos(θ)", key: "angle", name: "Angle", description: "Controls sign and magnitude" }
 ],
 variables: [
 { key: "magA", symbol: "|a|", name: "|a|", min: 0, max: 5, step: 0.1, default: 2, decimals: 1 },
 { key: "magB", symbol: "|b|", name: "|b|", min: 0, max: 5, step: 0.1, default: 1.5, decimals: 1 },
 { key: "theta", symbol: "θ", name: "Angle (deg)", min: 0, max: 180, step: 1, default: 35, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const a = get("magA", 2);
 const b = get("magB", 1.5);
 const theta = get("theta", 35) * Math.PI / 180;
 return a * b * Math.cos(theta);
 },
 insights: [
 "θ=0° ⇒ cosθ=1 ⇒ maximum reinforcement between vectors.",
 "θ=90° ⇒ dot product = 0 ⇒ no influence.",
 "θ>90° ⇒ negative dot ⇒ inhibitory effect (important for filters)." 
 ]
 }
 ]
 },
 "Matrix Multiplication": {
 title: "Matrix Multiplication: Layer Engine",
 content: `
 <p>Dense layers are nothing but matrix multiplications. A weight matrix multiplies the input vector to produce activations for the next layer.</p>
 <p>Vision models flatten 2D patches into vectors, multiply by weights, then reshape again. Tracking dimensions keeps tensor shapes valid.</p>
 `,
 interactiveFormulas: [
 {
 name: "2x2 × 2x2",
 parts: [
 { symbol: "C = A·B", key: "product", name: "Product", description: "Resulting matrix" }
 ],
 variables: [
 { key: "a11", symbol: "a11", name: "A11", min: -3, max: 3, step: 0.1, default: 1, decimals: 1 },
 { key: "a12", symbol: "a12", name: "A12", min: -3, max: 3, step: 0.1, default: 0.5, decimals: 1 },
 { key: "a21", symbol: "a21", name: "A21", min: -3, max: 3, step: 0.1, default: -0.8, decimals: 1 },
 { key: "a22", symbol: "a22", name: "A22", min: -3, max: 3, step: 0.1, default: 2.2, decimals: 1 },
 { key: "b11", symbol: "b11", name: "B11", min: -3, max: 3, step: 0.1, default: 0.7, decimals: 1 },
 { key: "b12", symbol: "b12", name: "B12", min: -3, max: 3, step: 0.1, default: -1, decimals: 1 },
 { key: "b21", symbol: "b21", name: "B21", min: -3, max: 3, step: 0.1, default: 0.3, decimals: 1 },
 { key: "b22", symbol: "b22", name: "B22", min: -3, max: 3, step: 0.1, default: 1.4, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const a11 = get("a11", 1); const a12 = get("a12", 0.5);
 const a21 = get("a21", -0.8); const a22 = get("a22", 2.2);
 const b11 = get("b11", 0.7); const b12 = get("b12", -1);
 const b21 = get("b21", 0.3); const b22 = get("b22", 1.4);
 const c11 = a11 * b11 + a12 * b21;
 const c12 = a11 * b12 + a12 * b22;
 const c21 = a21 * b11 + a22 * b21;
 const c22 = a21 * b12 + a22 * b22;
 return `[[${c11.toFixed(2)}, ${c12.toFixed(2)}], [${c21.toFixed(2)}, ${c22.toFixed(2)}]]`;
 },
 insights: [
 "Row of A interacts with column of B—match inner dimensions.",
 "Each output element is a dot product (MAC operation).",
 "Visualize dense layer weights as filters applied to full vectors." 
 ]
 },
 {
 name: "MAC Counter",
 parts: [
 { symbol: "MACs", key: "macs", name: "Multiply-Accumulates", description: "Work required" },
 { symbol: " = rows * cols * shared", key: "formula", name: "Cost", description: "Operation count" }
 ],
 variables: [
 { key: "rows", symbol: "rows", name: "Rows", min: 1, max: 512, step: 1, default: 64, decimals: 0 },
 { key: "cols", symbol: "cols", name: "Cols", min: 1, max: 512, step: 1, default: 32, decimals: 0 },
 { key: "shared", symbol: "shared", name: "Shared Dim", min: 1, max: 1024, step: 1, default: 100, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const rows = get("rows", 64);
 const cols = get("cols", 32);
 const shared = get("shared", 100);
 return rows * cols * shared;
 },
 insights: [
 "MACs correlate with latency and power on embedded hardware.",
 "Reducing shared dimension (inputs) cuts cost dramatically.",
 "Depthwise separable convolutions lower MACs by splitting dims." 
 ]
 }
 ]
 },
 "Tensors": {
 title: "Tensors: Multi-Dimensional Arrays",
 content: `
 <p>Tensors generalize scalars (rank 0), vectors (rank 1), and matrices (rank 2). Vision models juggle rank-3 (H×W×C) and rank-4 (Batch×Channel×H×W) tensors constantly.</p>
 <p>Keeping track of tensor volume prevents shape mismatches when reshaping, flattening, or feeding data between convolutional and dense layers.</p>
 `,
 interactiveFormulas: [
 {
 name: "Tensor Volume",
 parts: [
 { symbol: "elements", key: "elements", name: "Element Count", description: "Total scalars" },
 { symbol: " = d1 * d2 * d3", key: "product", name: "Dimensions", description: "Multiply each axis" }
 ],
 variables: [
 { key: "d1", symbol: "d1", name: "Dim 1", min: 1, max: 64, step: 1, default: 10, decimals: 0 },
 { key: "d2", symbol: "d2", name: "Dim 2", min: 1, max: 64, step: 1, default: 10, decimals: 0 },
 { key: "d3", symbol: "d3", name: "Dim 3", min: 1, max: 32, step: 1, default: 1, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const d1 = get("d1", 10);
 const d2 = get("d2", 10);
 const d3 = get("d3", 1);
 return d1 * d2 * d3;
 },
 insights: [
 "A 10×10×1 tensor matches the vision canvas grid.",
 "Batching multiplies the count further (Batch×H×W×C).",
 "Reshape only works when new dims keep the same volume." 
 ]
 },
 {
 name: "Jacobian Determinant (2x2)",
 components: [
 { symbol: "|J|", key: "det", name: "Determinant", description: "Volume change factor" },
 { symbol: " = (∂f₁/∂x₁)*(∂f₂/∂x₂) - (∂f₁/∂x₂)*(∂f₂/∂x₁)", key: "formula", name: "Formula", description: "AD - BC" }
 ],
 variables: [
 { key: "a", symbol: "∂f₁/∂x₁", name: "df1/dx1", min: -2, max: 2, step: 0.1, default: 1.0, decimals: 1 },
 { key: "b", symbol: "∂f₁/∂x₂", name: "df1/dx2", min: -2, max: 2, step: 0.1, default: 0.2, decimals: 1 },
 { key: "c", symbol: "∂f₂/∂x₁", name: "df2/dx1", min: -2, max: 2, step: 0.1, default: 0.3, decimals: 1 },
 { key: "d", symbol: "∂f₂/∂x₂", name: "df2/dx2", min: -2, max: 2, step: 0.1, default: 1.0, decimals: 1 }
 ],
 calculate: (vals, get) => get("a", 1) * get("d", 1) - get("b", 0.2) * get("c", 0.3),
 insights: [
 "Det(J) measures how the function scales space/volume locally.",
 "If Det(J) = 0, the function is locally 'flat' (loses a dimension).",
 "Used in Normalizing Flows to ensure probability integrates to 1."
 ]
 }
 ]
 },
 "Jacobian": {
 title: "Jacobian: Matrix of First Derivatives",
 content: `
 <p>The <strong>Jacobian matrix</strong> contains all partial first-order derivatives of a vector-valued function. It's the multi-variable generalization of the derivative.</p>
 <div class="equation">J = [ ∂fᵢ / ∂xⱼ ]</div>
 <p>In deep learning, the Jacobian is used during backpropagation to compute how each output of a layer changes with respect to each input.</p>
 `,
 interactiveFormulas: [
 {
 name: "Jacobian Determinant (2x2)",
 components: [
 { symbol: "|J|", key: "det", name: "Determinant", description: "Volume change factor" },
 { symbol: " = (∂f₁/∂x₁)*(∂f₂/∂x₂) - (∂f₁/∂x₂)*(∂f₂/∂x₁)", key: "formula", name: "Formula", description: "AD - BC" }
 ],
 variables: [
 { key: "a", symbol: "∂f₁/∂x₁", name: "df1/dx1", min: -2, max: 2, step: 0.1, default: 1.0, decimals: 1 },
 { key: "b", symbol: "∂f₁/∂x₂", name: "df1/dx2", min: -2, max: 2, step: 0.1, default: 0.2, decimals: 1 },
 { key: "c", symbol: "∂f₂/∂x₁", name: "df2/dx1", min: -2, max: 2, step: 0.1, default: 0.3, decimals: 1 },
 { key: "d", symbol: "∂f₂/∂x₂", name: "df2/dx2", min: -2, max: 2, step: 0.1, default: 1.0, decimals: 1 }
 ],
 calculate: (vals, get) => get("a", 1) * get("d", 1) - get("b", 0.2) * get("c", 0.3),
 insights: [
 "Det(J) measures how the function scales space/volume locally.",
 "If Det(J) = 0, the function is locally 'flat' (loses a dimension).",
 "Used in Normalizing Flows to ensure probability integrates to 1."
 ]
 }
 ]
 },
 "Hessian": {
 title: "Hessian: Matrix of Second Derivatives",
 content: `
 <p>The <strong>Hessian matrix</strong> contains second-order partial derivatives. It describes the <strong>local curvature</strong> of a function.</p>
 <div class="equation">H = [ ∂²f / ∂xᵢ∂xⱼ ]</div>
 <p>Optimizers use the Hessian (or approximations like L-BFGS) to take smarter steps by understanding the 'shape' of the loss landscape.</p>
 `,
 interactiveFormulas: [
 {
 name: "Hessian Eigenvalues",
 components: [
 { symbol: "Curvature", key: "curv", name: "Local Shape", description: "Based on eigenvalues" },
 { symbol: " = λ₁ > 0, λ₂ > 0 ?", key: "formula", name: "Formula", description: "Positive definite test" }
 ],
 variables: [
 { key: "l1", symbol: "λ₁", name: "Eigenvalue 1", min: -5, max: 5, step: 0.1, default: 2.0, decimals: 1 },
 { key: "l2", symbol: "λ₂", name: "Eigenvalue 2", min: -5, max: 5, step: 0.1, default: 1.5, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const l1 = get("l1", 2.0);
 const l2 = get("l2", 1.5);
 if (l1 > 0 && l2 > 0) return "Minimum (Bowl)";
 if (l1 < 0 && l2 < 0) return "Maximum (Peak)";
 if (l1 * l2 < 0) return "Saddle Point";
 return "Flat/Unknown";
 },
 insights: [
 "Positive eigenvalues (λ > 0) mean the surface curves upward.",
 "Deep learning loss landscapes are full of saddle points.",
 "Second-order optimizers adjust step size based on 1/λ."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Accuracy Calculator",
 parts: [
 { symbol: "Acc", key: "acc", name: "Accuracy", description: "Overall correct predictions" },
 { symbol: " = ", key: null },
 { symbol: "(TP + TN) / Total", key: "formula", name: "Formula", description: "Ratio of correct guesses" }
 ],
 variables: [
 { key: "TP", symbol: "TP", name: "True Positives", min: 0, max: 100, step: 1, default: 45, decimals: 0 },
 { key: "TN", symbol: "TN", name: "True Negatives", min: 0, max: 100, step: 1, default: 40, decimals: 0 },
 { key: "FP", symbol: "FP", name: "False Positives", min: 0, max: 100, step: 1, default: 10, decimals: 0 },
 { key: "FN", symbol: "FN", name: "False Negatives", min: 0, max: 100, step: 1, default: 5, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const TP = get("TP", 45);
 const TN = get("TN", 40);
 const FP = get("FP", 10);
 const FN = get("FN", 5);
 const total = TP + TN + FP + FN;
 return total > 0 ? (TP + TN) / total : 0;
 },
 insights: [
 "High accuracy can be misleading if classes are imbalanced.",
 "Example: 99% accuracy is easy if 99% of samples are negative.",
 "Always look at confusion matrix for the full picture."
 ]
 },
 {
 name: "F1 Score",
 parts: [
 { symbol: "F1", key: "f1", name: "F1 Score", description: "Harmonic mean of Precision and Recall" },
 { symbol: " = ", key: null },
 { symbol: "2 * (P * R) / (P + R)", key: "formula", name: "Formula", description: "Balances false positives and false negatives" }
 ],
 variables: [
 { key: "TP", symbol: "TP", name: "True Positives", min: 0, max: 100, step: 1, default: 30, decimals: 0 },
 { key: "FP", symbol: "FP", name: "False Positives", min: 0, max: 100, step: 1, default: 10, decimals: 0 },
 { key: "FN", symbol: "FN", name: "False Negatives", min: 0, max: 100, step: 1, default: 20, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const TP = get("TP", 30);
 const FP = get("FP", 10);
 const FN = get("FN", 20);

 const precision = TP + FP > 0 ? TP / (TP + FP) : 0;
 const recall = TP + FN > 0 ? TP / (TP + FN) : 0;

 if (precision + recall === 0) return 0;
 return 2 * (precision * recall) / (precision + recall);
 },
 insights: [
 "F1 is lower than accuracy if P or R is low.",
 "Perfect F1 (1.0) requires perfect Precision AND Recall.",
 "Crucial metric for medical diagnosis or fraud detection."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Compression Ratio",
 parts: [
 { symbol: "ratio", key: "ratio", name: "Compression", description: "How much we compress" },
 { symbol: " = ", key: null },
 { symbol: "input / bottleneck", key: "formula", name: "Formula", description: "Input dim divided by latent dim" }
 ],
 variables: [
 { key: "input", symbol: "input", name: "Input Size", min: 16, max: 1024, step: 16, default: 784, decimals: 0 },
 { key: "bottleneck", symbol: "latent", name: "Latent Size", min: 2, max: 128, step: 1, default: 32, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const input = get("input", 784);
 const latent = Math.max(1, get("bottleneck", 32));
 return input / latent;
 },
 insights: [
 "Higher ratio = more compression = harder to reconstruct.",
 "Latent size of 2-32 is common for visualization.",
 "Too small latent = information loss (blurry outputs)."
 ]
 },
 {
 name: "Reconstruction Loss",
 parts: [
 { symbol: "loss", key: "loss", name: "Error", description: "Pixel-wise difference" },
 { symbol: " = ", key: null },
 { symbol: "mean(|x - x_hat|)", key: "formula", name: "MAE", description: "Mean absolute error per pixel" }
 ],
 variables: [
 { key: "x1", symbol: "x1", name: "Original 1", min: 0, max: 1, step: 0.01, default: 0.8, decimals: 2 },
 { key: "x2", symbol: "x2", name: "Original 2", min: 0, max: 1, step: 0.01, default: 0.3, decimals: 2 },
 { key: "x3", symbol: "x3", name: "Original 3", min: 0, max: 1, step: 0.01, default: 0.9, decimals: 2 },
 { key: "xh1", symbol: "xh1", name: "Recon 1", min: 0, max: 1, step: 0.01, default: 0.75, decimals: 2 },
 { key: "xh2", symbol: "xh2", name: "Recon 2", min: 0, max: 1, step: 0.01, default: 0.35, decimals: 2 },
 { key: "xh3", symbol: "xh3", name: "Recon 3", min: 0, max: 1, step: 0.01, default: 0.85, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const x1 = get("x1", 0.8), x2 = get("x2", 0.3), x3 = get("x3", 0.9);
 const xh1 = get("xh1", 0.75), xh2 = get("xh2", 0.35), xh3 = get("xh3", 0.85);
 return (Math.abs(x1-xh1) + Math.abs(x2-xh2) + Math.abs(x3-xh3)) / 3;
 },
 insights: [
 "Lower loss = better reconstruction quality.",
 "Denoising autoencoders add noise to input, learn to clean it.",
 "Variational autoencoders (VAE) add probabilistic latent space."
 ]
 }
 ]
 },
 "GAN": {
 title: "Generative Adversarial Networks",
 content: `
 <p>A <strong>GAN</strong> has two networks competing: a <strong>Generator</strong> that creates fake images, and a <strong>Discriminator</strong> that tries to distinguish real from fake.</p>
 
 <h4>Generator</h4>
 <p>Takes random noise and produces images. Learns to fool the discriminator.</p>
 
 <h4>Discriminator</h4>
 <p>Binary classifier - real vs fake. Gets fooled when generator improves.</p>
 
 <h4>Minimax Game</h4>
 <p>Generator wants to minimize discriminator accuracy. Discriminator wants to maximize it.</p>
 `,
 interactiveFormulas: [
 {
 name: "Generator Loss",
 parts: [
 { symbol: "L_G", key: "lg", name: "Gen Loss", description: "How well it fooled the discriminator" },
 { symbol: " = ", key: null },
 { symbol: "-log(D(G(z)))", key: "formula", name: "Formula", description: "Wanted discriminator to say 1 (real)" }
 ],
 variables: [
 { key: "d_fake", symbol: "D(G(z))", name: "Disc Output", min: 0, max: 1, step: 0.01, default: 0.3, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const d = Math.max(0.001, Math.min(0.999, get("d_fake", 0.3)));
 return -Math.log(d);
 },
 insights: [
 "Generator wants D(G(z)) close to 1 (discriminator thinks fake is real).",
 "If loss is high, generator is not fooling discriminator enough.",
 "Training balance is key - if discriminator too strong, generator stops learning."
 ]
 },
 {
 name: "Discriminator Loss",
 parts: [
 { symbol: "L_D", key: "ld", name: "Disc Loss", description: "How well it distinguishes real from fake" },
 { symbol: " = ", key: null },
 { symbol: "-log(D(x)) - log(1-D(G(z)))", key: "formula", name: "Formula", description: "Real correct, fake wrong" }
 ],
 variables: [
 { key: "d_real", symbol: "D(x)", name: "Real Output", min: 0, max: 1, step: 0.01, default: 0.9, decimals: 2 },
 { key: "d_fake", symbol: "D(G(z))", name: "Fake Output", min: 0, max: 1, step: 0.01, default: 0.4, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const dr = Math.max(0.001, Math.min(0.999, get("d_real", 0.9)));
 const df = Math.max(0.001, Math.min(0.999, get("d_fake", 0.4)));
 return -Math.log(dr) - Math.log(1 - df);
 },
 insights: [
 "Good discriminator: high D(real) near 1, low D(fake) near 0.",
 "Perfect equilibrium: D outputs 0.5 for everything (can't distinguish).",
 "Mode collapse: generator learns to make only one type of image."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "L1 vs L2 Comparison",
 parts: [
 { symbol: "ratio", key: "ratio", name: "L2/L1", description: "How much more L2 penalizes large errors" },
 { symbol: " = ", key: null },
 { symbol: "(error^2) / |error|", key: "formula", name: "Formula", description: "Simplifies to |error|" }
 ],
 variables: [
 { key: "error", symbol: "e", name: "Error", min: 0.1, max: 5, step: 0.1, default: 1.5, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const e = get("error", 1.5);
 return e;
 },
 insights: [
 "L2 penalizes error=2 four times more than error=1.",
 "L2 gives smoother gradients (no kinks in loss landscape).",
 "L1 is more robust - outliers don't dominate the loss."
 ]
 },
 {
 name: "Perceptual Loss Components",
 parts: [
 { symbol: "L_total", key: "total", name: "Perceptual Loss", description: "Combined loss for image generation" },
 { symbol: " = ", key: null },
 { symbol: "alpha * L_content + beta * L_style", key: "formula", name: "Formula", description: "Weighted combination" }
 ],
 variables: [
 { key: "alpha", symbol: "alpha", name: "Content Weight", min: 0, max: 1, step: 0.1, default: 0.5, decimals: 2 },
 { key: "l_content", symbol: "L_c", name: "Content Loss", min: 0, max: 10, step: 0.1, default: 2.1, decimals: 2 },
 { key: "beta", symbol: "beta", name: "Style Weight", min: 0, max: 1, step: 0.1, default: 0.5, decimals: 2 },
 { key: "l_style", symbol: "L_s", name: "Style Loss", min: 0, max: 10, step: 0.1, default: 1.5, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const a = get("alpha", 0.5);
 const lc = get("l_content", 2.1);
 const b = get("beta", 0.5);
 const ls = get("l_style", 1.5);
 return a * lc + b * ls;
 },
 insights: [
 "Content loss preserves structure (usually VGG features).",
 "Style loss captures texture using Gram matrices.",
 "Balance alpha/beta to get structure vs style tradeoff."
 ]
 }
 ]
 },
 "Pooling": {
 title: "Pooling: Spatial Downsampling",
 content: `
 <p><strong>Pooling</strong> reduces spatial dimensions while retaining important information. Essential for vision networks.</p>
 
 <h4>Max Pooling</h4>
 <p>Takes the maximum value in each window. Preserves the strongest features. Most common.</p>
 
 <h4>Average Pooling</h4>
 <p>Takes the average of each window. Smoother, preserves background information.</p>
 
 <h4>Global Pooling</h4>
 <p>Pools over entire feature map to get a single value per channel. Often replaces FC layers.</p>
 `,
 interactiveFormulas: [
 {
 name: "Output Size Calculator",
 parts: [
 { symbol: "out", key: "out", name: "Output Size", description: "Spatial dimension after pooling" },
 { symbol: " = floor((in - k) / s) + 1", key: "formula", name: "Formula", description: "Standard pooling formula" }
 ],
 variables: [
 { key: "input", symbol: "W_in", name: "Input Size", min: 4, max: 64, step: 1, default: 28, decimals: 0 },
 { key: "kernel", symbol: "k", name: "Kernel", min: 2, max: 5, step: 1, default: 2, decimals: 0 },
 { key: "stride", symbol: "s", name: "Stride", min: 1, max: 4, step: 1, default: 2, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const w = get("input", 28);
 const k = get("kernel", 2);
 const s = get("stride", 2);
 return Math.floor((w - k) / s) + 1;
 },
 insights: [
 "Stride 2 halves dimensions (common for downsampling).",
 "Kernel 2 with stride 2 = non-overlapping (no redundancy).",
 "Global pooling converts HxWxC to 1x1xC (parameter free!)."
 ]
 },
 {
 name: "Receptive Field Growth",
 parts: [
 { symbol: "rf", key: "rf", name: "Receptive Field", description: "Input pixels affecting one output" },
 { symbol: " = ", key: null },
 { symbol: "1 + (layers - 1) * stride_prod", key: "formula", name: "Formula", description: "Cumulative stride effect" }
 ],
 variables: [
 { key: "layers", symbol: "n", name: "Pool Layers", min: 1, max: 5, step: 1, default: 3, decimals: 0 },
 { key: "stride", symbol: "s", name: "Stride", min: 1, max: 3, step: 1, default: 2, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const n = get("layers", 3);
 const s = get("stride", 2);
 let product = 1;
 for (let i = 0; i < n; i++) product *= s;
 return 1 + (n - 1) * product;
 },
 insights: [
 "Each pooling layer increases receptive field exponentially.",
 "After 3 maxpools (stride 2), one output sees 8x8 input region.",
 "Deeper networks = larger receptive field = more global context."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Same Padding Calculator",
 parts: [
 { symbol: "p", key: "pad", name: "Padding", description: "Pixels to add around input" },
 { symbol: " = ", key: null },
 { symbol: "(k - 1) / 2", key: "formula", name: "Formula", description: "To keep output same size" }
 ],
 variables: [
 { key: "kernel", symbol: "k", name: "Kernel Size", min: 1, max: 7, step: 2, default: 3, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const k = get("kernel", 3);
 return (k - 1) / 2;
 },
 insights: [
 "3x3 kernel needs padding 1 to preserve size.",
 "5x5 kernel needs padding 2.",
 "Same padding ensures corner pixels contribute to center outputs."
 ]
 },
 {
 name: "Output Dimension",
 parts: [
 { symbol: "W_out", key: "out", name: "Output Width", description: "After convolution" },
 { symbol: " = floor((W_in - k + 2p) / s) + 1", key: "formula", name: "Formula", description: "Full convolution formula" }
 ],
 variables: [
 { key: "input", symbol: "W_in", name: "Input Size", min: 4, max: 64, step: 1, default: 32, decimals: 0 },
 { key: "kernel", symbol: "k", name: "Kernel", min: 1, max: 7, step: 2, default: 3, decimals: 0 },
 { key: "pad", symbol: "p", name: "Padding", min: 0, max: 4, step: 1, default: 1, decimals: 0 },
 { key: "stride", symbol: "s", name: "Stride", min: 1, max: 3, step: 1, default: 1, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const w = get("input", 32);
 const k = get("kernel", 3);
 const p = get("pad", 1);
 const s = get("stride", 1);
 return Math.floor((w - k + 2 * p) / s) + 1;
 },
 insights: [
 "Stride affects how far kernel moves each step.",
 "Padding 2 with kernel 5 = output slightly larger than input.",
 "Use floor - pixels at edge may not have full kernel coverage."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "BatchNorm Forward",
 parts: [
 { symbol: "y", key: "out", name: "Normalized", description: "Output after normalization" },
 { symbol: " = gamma * (x - mu) / sigma + beta", key: "formula", name: "Formula", description: "Scale and shift learned params" }
 ],
 variables: [
 { key: "x", symbol: "x", name: "Input", min: -3, max: 3, step: 0.1, default: 1.5, decimals: 2 },
 { key: "mu", symbol: "mu", name: "Mean", min: -2, max: 2, step: 0.1, default: 0.2, decimals: 2 },
 { key: "sigma", symbol: "sigma", name: "Std Dev", min: 0.1, max: 2, step: 0.1, default: 0.8, decimals: 2 },
 { key: "gamma", symbol: "gamma", name: "Scale", min: 0.1, max: 2, step: 0.1, default: 1.0, decimals: 2 },
 { key: "beta", symbol: "beta", name: "Shift", min: -2, max: 2, step: 0.1, default: 0.0, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const x = get("x", 1.5);
 const mu = get("mu", 0.2);
 const sigma = get("sigma", 0.8);
 const g = get("gamma", 1.0);
 const b = get("beta", 0.0);
 return g * (x - mu) / sigma + b;
 },
 insights: [
 "Gamma and beta are learnable - network can undo normalization if needed.",
 "During training, normalize by batch stats. During inference, use moving avg.",
 "Can be disabled during evaluation (frozen) for deployment."
 ]
 },
 {
 name: "Momentum for Running Stats",
 parts: [
 { symbol: "stat_new", key: "new", name: "Updated Stat", description: "Running mean or variance" },
 { symbol: " = (1 - m) * stat_old + m * batch_stat", key: "formula", name: "Formula", description: "Exponential moving average" }
 ],
 variables: [
 { key: "old", symbol: "old", name: "Old Stat", min: 0, max: 2, step: 0.01, default: 0.5, decimals: 2 },
 { key: "batch", symbol: "batch", name: "Batch Stat", min: 0, max: 2, step: 0.01, default: 0.7, decimals: 2 },
 { key: "momentum", symbol: "m", name: "Momentum", min: 0.9, max: 0.999, step: 0.001, default: 0.99, decimals: 3 }
 ],
 calculate: (vals, get) => {
 const old = get("old", 0.5);
 const batch = get("batch", 0.7);
 const m = get("momentum", 0.99);
 return (1 - m) * old + m * batch;
 },
 insights: [
 "High momentum = slow adaptation to new data distributions.",
 "Low momentum = fast adaptation but noisy estimates.",
 "0.99 is common default (99% old, 1% new batch)."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Dropout Scaling",
 parts: [
 { symbol: "output", key: "out", name: "Scaled Output", description: "Neuron output after scaling" },
 { symbol: " = ", key: null },
 { symbol: "input / (1 - p)", key: "formula", name: "Formula", description: "Inverted dropout for inference" }
 ],
 variables: [
 { key: "input", symbol: "x", name: "Raw Output", min: 0, max: 5, step: 0.1, default: 2.3, decimals: 2 },
 { key: "rate", symbol: "p", name: "Dropout Rate", min: 0, max: 0.9, step: 0.1, default: 0.5, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const x = get("input", 2.3);
 const p = get("rate", 0.5);
 return p >= 1 ? 0 : x / (1 - p);
 },
 insights: [
 "Inverted dropout (scale at train time) is modern default.",
 "p=0.5 is common for hidden layers.",
 "p=0.1-0.3 for input layers (inputs less redundant)."
 ]
 },
 {
 name: "Effective Network Size",
 parts: [
 { symbol: "active", key: "active", name: "Active Neurons", description: "Not dropped per layer" },
 { symbol: " = ", key: null },
 { symbol: "total * (1 - p)^layers", key: "formula", name: "Formula", description: "Cumulative dropout effect" }
 ],
 variables: [
 { key: "total", symbol: "N", name: "Layer Size", min: 10, max: 512, step: 1, default: 128, decimals: 0 },
 { key: "rate", symbol: "p", name: "Dropout Rate", min: 0, max: 0.9, step: 0.1, default: 0.5, decimals: 2 },
 { key: "layers", symbol: "L", name: "Layers", min: 1, max: 5, step: 1, default: 3, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const N = get("total", 128);
 const p = get("rate", 0.5);
 const L = get("layers", 3);
 return Math.round(N * Math.pow(1 - p, L));
 },
 insights: [
 "Deep networks with dropout effectively sample from huge model space.",
 "More layers = more dropout combinations = more regularization.",
 "Without dropout, larger networks don't necessarily generalize better."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Residual Output",
 parts: [
 { symbol: "y", key: "out", name: "Block Output", description: "After residual addition" },
 { symbol: " = ", key: null },
 { symbol: "F(x) + x", key: "formula", name: "Formula", description: "Identity skip connection" }
 ],
 variables: [
 { key: "fx", symbol: "F(x)", name: "Residual", min: -3, max: 3, step: 0.1, default: 0.8, decimals: 2 },
 { key: "x", symbol: "x", name: "Skip Input", min: -3, max: 3, step: 0.1, default: 1.2, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const fx = get("fx", 0.8);
 const x = get("x", 1.2);
 return fx + x;
 },
 insights: [
 "If residual branch learns nothing, output = input (identity).",
 "Deep ResNets (100+ layers) train successfully because gradients flow through skips.",
 "Works even when dimensions change - use projection shortcut."
 ]
 },
 {
 name: "Gradient Magnitude (Skip vs Deep)",
 parts: [
 { symbol: "grad_skip", key: "gskip", name: "Skip Path", description: "Gradient through identity" },
 { symbol: " = ", key: null },
 { symbol: "grad_deep * product(weights)", key: "formula", name: "Deep Path", description: "Through many layers" }
 ],
 variables: [
 { key: "g_deep", symbol: "g", name: "Base Gradient", min: 0.1, max: 2, step: 0.1, default: 0.5, decimals: 2 },
 { key: "layers", symbol: "L", name: "Layers", min: 5, max: 50, step: 5, default: 20, decimals: 0 },
 { key: "avg_w", symbol: "w", name: "Avg Weight", min: 0.5, max: 1.5, step: 0.1, default: 0.9, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const g = get("g_deep", 0.5);
 const L = get("layers", 20);
 const w = get("avg_w", 0.9);
 const deepGrad = g * Math.pow(w, L);
 return deepGrad.toFixed(4);
 },
 insights: [
 "With skip connections, gradient ~base grad (close to 1).",
 "Without skips, small weights^layers = vanishing gradient.",
 "ResNet allows training 1000+ layer networks successfully."
 ]
 }
 ]
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
 visualizer: "CNN",
 interactiveFormulas: [
 {
 name: "Parameter Count Comparison",
 components: [
 { symbol: "Params", key: "params", name: "Total Parameters", description: "Learnable weights + biases" },
 { symbol: " = conv_params + fc_params", key: "formula", name: "Formula", description: "Sum across all layers" }
 ],
 variables: [
 { key: "arch", symbol: "Model", name: "Architecture", min: 0, max: 3, step: 1, default: 0, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const archs = ["LeNet (60K)", "AlexNet (60M)", "VGG-16 (138M)", "ResNet-50 (25M)"];
 return archs[get("arch", 0)];
 },
 insights: [
 "VGG is very 'heavy' due to large fully connected layers.",
 "ResNet is deep but efficient thanks to global average pooling.",
 "Inception (GoogLeNet) has only ~7M params, yet beats AlexNet."
 ]
 },
 {
 name: "Parameter Counter",
 parts: [
 { symbol: "params", key: "params", name: "Total Parameters", description: "In millions" },
 { symbol: " = ", key: null },
 { symbol: "conv_params + fc_params", key: "formula", name: "Formula", description: "Sum of all weights" }
 ],
 variables: [
 { key: "conv_layers", symbol: "C", name: "Conv Layers", min: 1, max: 20, step: 1, default: 8, decimals: 0 },
 { key: "avg_filters", symbol: "F", name: "Avg Filters/Layer", min: 8, max: 512, step: 8, default: 64, decimals: 0 },
 { key: "kernel", symbol: "k", name: "Kernel Size", min: 3, max: 11, step: 2, default: 3, decimals: 0 },
 { key: "fc_size", symbol: "FC", name: "FC Layers", min: 1, max: 5, step: 1, default: 3, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const C = get("conv_layers", 8);
 const F = get("avg_filters", 64);
 const k = get("kernel", 3);
 const FC = get("fc_size", 3);
 const convParams = C * F * F * k * k / 1000000;
 const fcParams = FC * F * 10 / 1000000;
 return (convParams + fcParams).toFixed(2);
 },
 insights: [
 "FC layers often have most parameters in older architectures.",
 "3x3 conv stacked is more parameter-efficient than one large kernel.",
 "Modern architectures reduce FC params with global pooling."
 ]
 },
 {
 name: "FLOPs Calculator",
 parts: [
 { symbol: "FLOPs", key: "flops", name: "Floating Point Ops", description: "In millions" },
 { symbol: " = ", key: null },
 { symbol: "2 * (C_out * H_out * W_out * C_in * k^2)", key: "formula", name: "Formula", description: "Forward pass cost" }
 ],
 variables: [
 { key: "c_out", symbol: "C_out", name: "Output Channels", min: 8, max: 256, step: 8, default: 64, decimals: 0 },
 { key: "h_out", symbol: "H_out", name: "Output Height", min: 1, max: 56, step: 1, default: 28, decimals: 0 },
 { key: "w_out", symbol: "W_out", name: "Output Width", min: 1, max: 56, step: 1, default: 28, decimals: 0 },
 { key: "c_in", symbol: "C_in", name: "Input Channels", min: 1, max: 128, step: 1, default: 64, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const cout = get("c_out", 64);
 const hout = get("h_out", 28);
 const wout = get("w_out", 28);
 const cin = get("c_in", 64);
 const k = 3;
 const flops = 2 * cout * hout * wout * cin * k * k;
 return (flops / 1000000).toFixed(2);
 },
 insights: [
 "FLOPs determine inference speed on hardware.",
 "Depthwise separable conv reduces FLOPs by ~8-9x.",
 "MobileNet uses ~3.4M FLOPs vs 11.5M for standard conv."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Training Accuracy",
 parts: [
 { symbol: "acc", key: "acc", name: "Accuracy", description: "Correct predictions / total" },
 { symbol: " = ", key: null },
 { symbol: "correct / total", key: "formula", name: "Formula", description: "Percentage of right answers" }
 ],
 variables: [
 { key: "correct", symbol: "correct", name: "Correct", min: 0, max: 100, step: 1, default: 85, decimals: 0 },
 { key: "total", symbol: "total", name: "Total", min: 1, max: 200, step: 1, default: 100, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const c = get("correct", 85);
 const t = get("total", 100);
 return t > 0 ? (c / t * 100).toFixed(1) + '%' : '0%';
 },
 insights: [
 "100% training accuracy might mean overfitting!",
 "Test accuracy is what truly matters (generalization).",
 "Gap between train/test accuracy = overfitting amount."
 ]
 },
 {
 name: "Loss vs Epochs",
 parts: [
 { symbol: "L(t)", key: "loss", name: "Loss", description: "Error at epoch t" },
 { symbol: " = L_0 * exp(-k*t)", key: "formula", name: "Decay", description: "Exponential decay model" }
 ],
 variables: [
 { key: "l0", symbol: "L_0", name: "Initial Loss", min: 0.1, max: 5, step: 0.1, default: 2.5, decimals: 2 },
 { key: "k", symbol: "k", name: "Decay Rate", min: 0.01, max: 0.2, step: 0.01, default: 0.05, decimals: 2 },
 { key: "epoch", symbol: "t", name: "Epoch", min: 0, max: 100, step: 1, default: 20, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const l0 = get("l0", 2.5);
 const k = get("k", 0.05);
 const t = get("epoch", 20);
 return (l0 * Math.exp(-k * t)).toFixed(4);
 },
 insights: [
 "Loss should decrease over epochs (model learns).",
 "Plateau region = model stopped learning much.",
 "Loss increasing = something wrong (learning rate too high?)."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "K-Means Centroid Update",
 points: [
 { symbol: "c_i", key: "cnew", name: "New Centroid", description: "Mean of cluster points" },
 { symbol: " = (1/k) * sum(x_j)", key: "formula", name: "Formula", description: "Average of assigned points" }
 ],
 variables: [
 { key: "x1", symbol: "x1", name: "Point 1", min: 0, max: 10, step: 0.1, default: 2.3, decimals: 1 },
 { key: "x2", symbol: "x2", name: "Point 2", min: 0, max: 10, step: 0.1, default: 4.7, decimals: 1 },
 { key: "x3", symbol: "x3", name: "Point 3", min: 0, max: 10, step: 0.1, default: 5.1, decimals: 1 },
 { key: "k", symbol: "k", name: "Cluster Size", min: 1, max: 10, step: 1, default: 3, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const x1 = get("x1", 2.3);
 const x2 = get("x2", 4.7);
 const x3 = get("x3", 5.1);
 const k = get("k", 3);
 return ((x1 + x2 + x3) / k).toFixed(2);
 },
 insights: [
 "K-means alternates between assign and update steps.",
 "Result depends on initialization - run multiple times!",
 "Elbow method helps choose optimal K."
 ]
 },
 {
 name: "PCA Variance Explained",
 components: [
 { symbol: "var_explained", key: "var", name: "Variance %", description: "How much info retained" },
 { symbol: " = sum(eigenvalues[:k]) / sum(all)", key: "formula", name: "Formula", description: "Ratio of captured variance" }
 ],
 variables: [
 { key: "e1", symbol: "λ1", name: "PC1", min: 1, max: 100, step: 1, default: 45, decimals: 0 },
 { key: "e2", symbol: "λ2", name: "PC2", min: 1, max: 100, step: 1, default: 30, decimals: 0 },
 { key: "e3", symbol: "λ3", name: "PC3", min: 1, max: 100, step: 1, default: 15, decimals: 0 },
 { key: "e4", symbol: "λ4", name: "PC4+", min: 1, max: 100, step: 1, default: 10, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const e1 = get("e1", 45);
 const e2 = get("e2", 30);
 const e3 = get("e3", 15);
 const e4 = get("e4", 10);
 const total = e1 + e2 + e3 + e4;
 return ((e1 + e2) / total * 100).toFixed(1) + '%';
 },
 insights: [
 "First 2 PCs often capture 80%+ variance in images.",
 "More PCs = more detail but more dimensions.",
 "PCA is linear - may miss non-linear patterns."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Confidence Thresholding",
 components: [
 { symbol: "pseudo_labels", key: "pl", name: "Added Labels", description: "High confidence predictions" },
 { symbol: " = count(predictions > threshold)", key: "formula", name: "Formula", description: "Filter by confidence" }
 ],
 variables: [
 { key: "threshold", symbol: "τ", name: "Threshold", min: 0.5, max: 0.99, step: 0.01, default: 0.9, decimals: 2 },
 { key: "conf1", symbol: "c1", name: "Conf 1", min: 0, max: 1, step: 0.01, default: 0.95, decimals: 2 },
 { key: "conf2", symbol: "c2", name: "Conf 2", min: 0, max: 1, step: 0.01, default: 0.72, decimals: 2 },
 { key: "conf3", symbol: "c3", name: "Conf 3", min: 0, max: 1, step: 0.01, default: 0.88, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const t = get("threshold", 0.9);
 const c1 = get("conf1", 0.95);
 const c2 = get("conf2", 0.72);
 const c3 = get("conf3", 0.88);
 let count = 0;
 if (c1 >= t) count++;
 if (c2 >= t) count++;
 if (c3 >= t) count++;
 return count;
 },
 insights: [
 "Higher threshold = cleaner labels but fewer of them.",
 "Lower threshold = more labels but more noise.",
 "Iterative self-training often improves over rounds."
 ]
 }
 ]
 },
 "MDP": {
 title: "MDP: Markov Decision Processes",
 content: `
 <p><strong>MDPs</strong> provide a mathematical framework for modeling decision making in situations where outcomes are partly random and partly under the control of a decision maker.</p>
 <h4>The Tuple (S, A, P, R, γ)</h4>
 <p>• <strong>S</strong>: State space (where you are)<br/>
 • <strong>A</strong>: Action space (what you can do)<br/>
 • <strong>P</strong>: Transition probability (where you go)<br/>
 • <strong>R</strong>: Reward function (what you get)<br/>
 • <strong>γ</strong>: Discount factor (how much you value future rewards)</p>
 `,
 interactiveFormulas: [
 {
 name: "Discounted Return",
 components: [
 { symbol: "G_t", key: "return", name: "Return", description: "Total future reward" },
 { symbol: " = R_t+1 + γ*R_t+2 + γ²*R_t+3 + ...", key: "formula", name: "Formula", description: "Geometric sum of rewards" }
 ],
 variables: [
 { key: "r1", symbol: "R₁", name: "Reward 1", min: 0, max: 10, step: 1, default: 10, decimals: 0 },
 { key: "r2", symbol: "R₂", name: "Reward 2", min: 0, max: 10, step: 1, default: 5, decimals: 0 },
 { key: "gamma", symbol: "γ", name: "Discount", min: 0, max: 0.99, step: 0.01, default: 0.9, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const g = get("gamma", 0.9);
 return get("r1", 10) + g * get("r2", 5);
 },
 insights: [
 "Low γ = 'shortsighted' agent (prefers immediate rewards).",
 "High γ = 'farsighted' agent (values future rewards).",
 "The Markov property: 'the future is independent of the past given the present'."
 ]
 }
 ]
 },
 "QLearning": {
 title: "Q-Learning: Learning from Trial and Error",
 content: `
 <p><strong>Q-Learning</strong> is a model-free RL algorithm. It learns the quality (Q-value) of an action in a given state.</p>
 <div class="equation">Q(s,a) = Q(s,a) + α[R + γ max Q(s',a') - Q(s,a)]</div>
 `,
 visualizer: "GridWorld",
 interactiveFormulas: [
 {
 name: "Temporal Difference (TD) Update",
 components: [
 { symbol: "ΔQ", key: "delta", name: "Update", description: "Change in Q-value" },
 { symbol: " = α * [Reward + γ*maxQ' - Q_old]", key: "formula", name: "Formula", description: "The Bellman Equation update" }
 ],
 variables: [
 { key: "lr", symbol: "α", name: "Learning Rate", min: 0.01, max: 1.0, step: 0.01, default: 0.1, decimals: 2 },
 { key: "reward", symbol: "R", name: "Reward", min: -10, max: 10, step: 1, default: 10, decimals: 0 },
 { key: "gamma", symbol: "γ", name: "Discount", min: 0, max: 0.99, step: 0.01, default: 0.9, decimals: 2 },
 { key: "qold", symbol: "Q", name: "Old Q-Value", min: 0, max: 100, step: 1, default: 50, decimals: 0 },
 { key: "qnext", symbol: "Q'", name: "Max Future Q", min: 0, max: 100, step: 1, default: 60, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const a = get("lr", 0.1);
 const r = get("reward", 10);
 const g = get("gamma", 0.9);
 const qold = get("qold", 50);
 const qnext = get("qnext", 60);
 return a * (r + g * qnext - qold);
 },
 insights: [
 "Q-learning is 'off-policy': it learns the optimal policy regardless of agent's current actions.",
 "The term in brackets is the 'TD Error'.",
 "Exploration (ε-greedy) is needed to find the best actions."
 ]
 }
 ]
 },
 "DeepQN": {
 title: "Deep Q-Networks (DQN): Scaling RL",
 content: `
 <p><strong>DQN</strong> uses a deep neural network to approximate the Q-value function. This allows RL to scale to complex environments like Atari games.</p>
 <h4>Innovations</h4>
 <p>• <strong>Experience Replay</strong>: Store and sample transitions to break correlation.<br/>
 • <strong>Target Network</strong>: Use a separate, slowly-updating network to stabilize training.</p>
 `,
 interactiveFormulas: [
 {
 name: "DQN Loss",
 components: [
 { symbol: "Loss", key: "loss", name: "Loss", description: "L2 distance to target" },
 { symbol: " = (Target - Q(s,a;θ))²", key: "formula", name: "Formula", description: "MSE on Bellman target" }
 ],
 variables: [
 { key: "target", symbol: "T", name: "Target", min: 0, max: 100, step: 1, default: 75, decimals: 0 },
 { key: "qpred", symbol: "Q", name: "Network Pred", min: 0, max: 100, step: 1, default: 60, decimals: 0 }
 ],
 calculate: (vals, get) => Math.pow(get("target", 75) - get("qpred", 60), 2),
 insights: [
 "Target = R + γ max Q(s',a';θ_target).",
 "Theta (θ) are the network parameters.",
 "DQN brought RL into the deep learning era."
 ]
 }
 ]
 },
 "PolicyGradient": {
 title: "Policy Gradients: Direct Action Learning",
 content: `
 <p><strong>Policy Gradients</strong> directly optimize the agent's policy (π) rather than the value function. This works better for continuous action spaces.</p>
 <div class="equation">∇J(θ) = E[ ∇ log π(a|s;θ) * G_t ]</div>
 `,
 interactiveFormulas: [
 {
 name: "REINFORCE Update",
 components: [
 { symbol: "Step", key: "step", name: "Update Step", description: "Gradient ascent on policy" },
 { symbol: " = lr * log_prob * return", key: "formula", name: "Formula", description: "Reinforce correct actions" }
 ],
 variables: [
 { key: "prob", symbol: "π(a|s)", name: "Action Prob", min: 0.01, max: 1.0, step: 0.01, default: 0.4, decimals: 2 },
 { key: "ret", symbol: "G", name: "Return", min: -10, max: 10, step: 0.1, default: 5, decimals: 1 },
 { key: "lr", symbol: "η", name: "Learning Rate", min: 0.001, max: 0.1, step: 0.001, default: 0.01, decimals: 3 }
 ],
 calculate: (vals, get) => get("lr", 0.01) * Math.log(get("prob", 0.4)) * get("ret", 5),
 insights: [
 "Positive return (G) increases the probability of the chosen action.",
 "Negative return (G) decreases the probability.",
 "Suffers from high variance in gradients."
 ]
 }
 ]
 },
 "PPO": {
 title: "PPO: Proximal Policy Optimization",
 content: `
 <p><strong>PPO</strong> is a state-of-the-art RL algorithm that stabilizes training by clipping policy updates.</p>
 <h4>Clipping Mechanism</h4>
 <p>PPO prevents the policy from changing too much in a single step, ensuring stable convergence.</p>
 `,
 interactiveFormulas: [
 {
 name: "PPO Clipped Objective",
 components: [
 { symbol: "L", key: "loss", name: "Clipped Loss", description: "Prevent large updates" },
 { symbol: " = min(ratio*A, clip(ratio)*A)", key: "formula", name: "Formula", description: "Clipping ratio between (1-ε) and (1+ε)" }
 ],
 variables: [
 { key: "ratio", symbol: "r(θ)", name: "Prob Ratio", min: 0.5, max: 1.5, step: 0.01, default: 1.2, decimals: 2 },
 { key: "adv", symbol: "A", name: "Advantage", min: -5, max: 5, step: 0.1, default: 2, decimals: 1 },
 { key: "eps", symbol: "ε", name: "Clip Eps", min: 0.05, max: 0.3, step: 0.01, default: 0.2, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const r = get("ratio", 1.2);
 const A = get("adv", 2);
 const e = get("eps", 0.2);
 const clipped = Math.min(Math.max(r, 1 - e), 1 + e);
 return Math.min(r * A, clipped * A);
 },
 insights: [
 "If the update is too large (outside ε range), the gradient is zeroed out.",
 "Advantage (A) measures how much better an action is than average.",
 "Reliable, robust, and widely used in robotics and LLM alignment (RLHF)."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "InfoNCE Contrastive Loss",
 components: [
 { symbol: "L", key: "loss", name: "Contrastive Loss", description: "NCE approximation to mutual information" },
 { symbol: " = -log(exp(sim(pos)/τ) / sum(exp(sim(all)/τ)))", key: "formula", name: "Formula", description: "Temperature-scaled softmax" }
 ],
 variables: [
 { key: "sim_pos", symbol: "sim+", name: "Positive Sim", min: 0, max: 2, step: 0.1, default: 1.2, decimals: 2 },
 { key: "sim_neg1", symbol: "sim-1", name: "Negative 1", min: 0, max: 2, step: 0.1, default: 0.3, decimals: 2 },
 { key: "sim_neg2", symbol: "sim-2", name: "Negative 2", min: 0, max: 2, step: 0.1, default: 0.4, decimals: 2 },
 { key: "temp", symbol: "τ", name: "Temperature", min: 0.01, max: 1, step: 0.01, default: 0.1, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const sp = get("sim_pos", 1.2);
 const sn1 = get("sim_neg1", 0.3);
 const sn2 = get("sim_neg2", 0.4);
 const t = get("temp", 0.1);
 const pos = Math.exp(sp / t);
 const neg = Math.exp(sn1 / t) + Math.exp(sn2 / t);
 return (-Math.log(pos / (pos + neg))).toFixed(4);
 },
 insights: [
 "Lower temperature = sharper distribution (harder contrastive).",
 "Higher temperature = softer distribution (easier learning).",
 "0.07-0.1 is common for contrastive learning."
 ]
 }
 ]
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
  <strong>Original Authors</strong>: Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan Gomez, Lukasz Kaiser, Illia Polosukhin — 8 co-authors, all from Google.<br/>
  <strong>Impact</strong>: BERT, GPT, T5, ViT, RAG, Claude, ChatGPT — all built on Transformers. 95%+ of modern LLMs are decoder-only Transformers.</p>
  
  <h4>Why Transformers?</h4>
  <p>Parallelizable on GPU. Captures long-range dependencies. Scales beautifully with data and compute.</p>
 `,
 visualizer: "Transformer",
 interactiveFormulas: [
 {
 name: "Attention Weights",
 components: [
 { symbol: "a_ij", key: "attn", name: "Attention", description: "How much position i attends to j" },
 { symbol: " = softmax(Q_i · K_j / sqrt(d))", key: "formula", name: "Formula", description: "Scaled dot-product attention" }
 ],
 variables: [
 { key: "q_k", symbol: "Q·K", name: "Query-Key Score", min: -5, max: 10, step: 0.1, default: 3.2, decimals: 1 },
 { key: "d", symbol: "d", name: "Dim", min: 16, max: 512, step: 16, default: 64, decimals: 0 },
 { key: "other1", symbol: "other1", name: "Other Scores", min: -5, max: 5, step: 0.1, default: 0.5, decimals: 1 },
 { key: "other2", symbol: "other2", name: "Other 2", min: -5, max: 5, step: 0.1, default: 0.3, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const qk = get("q_k", 3.2);
 const d = get("d", 64);
 const o1 = get("other1", 0.5);
 const o2 = get("other2", 0.3);
 const scale = Math.sqrt(d);
 const e1 = Math.exp(qk / scale);
 const e2 = Math.exp(o1 / scale);
 const e3 = Math.exp(o2 / scale);
 return (e1 / (e1 + e2 + e3)).toFixed(3);
 },
 insights: [
 "sqrt(d) prevents gradients from vanishing for large d.",
 "Higher attention = stronger relationship between positions.",
 "Visual attention maps show what the model focuses on."
 ]
 },
 {
 name: "Parameters vs Layer Count",
 components: [
 { symbol: "M params", key: "params", name: "Model Size", description: "In millions" },
 { symbol: " = L * (4d^2 + 2d^2)", key: "formula", name: "Formula", description: "Attention + FFN per layer" }
 ],
 variables: [
 { key: "layers", symbol: "L", name: "Layers", min: 1, max: 100, step: 1, default: 12, decimals: 0 },
 { key: "hidden", symbol: "d", name: "Hidden Dim", min: 128, max: 1024, step: 64, default: 768, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const L = get("layers", 12);
 const d = get("hidden", 768);
 const params = L * (4 * d * d + 2 * d * d);
 return (params / 1000000).toFixed(1);
 },
 insights: [
 "GPT-3: 96 layers, 175B params. Huge!",
 "Feed-forward often 4x attention size.",
 "Scaling laws: more data + params = better performance."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Patch Count Calculator",
 components: [
 { symbol: "N", key: "patches", name: "Patch Count", description: "Tokens to process" },
 { symbol: " = (H/p) * (W/p)", key: "formula", name: "Formula", description: "Image dims / patch dims" }
 ],
 variables: [
 { key: "height", symbol: "H", name: "Image Height", min: 64, max: 512, step: 16, default: 224, decimals: 0 },
 { key: "width", symbol: "W", name: "Image Width", min: 64, max: 512, step: 16, default: 224, decimals: 0 },
 { key: "patch", symbol: "p", name: "Patch Size", min: 8, max: 32, step: 4, default: 16, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const h = get("height", 224);
 const w = get("width", 224);
 const p = get("patch", 16);
 return (h / p) * (w / p);
 },
 insights: [
 "16x16 is common patch size (14x14=196 tokens).",
 "Smaller patches = more tokens = more compute.",
 "ViT needs more data than CNNs to train well."
 ]
 }
 ]
 },
 "LoRA": {
 title: "LoRA: Low-Rank Adaptation",
 content: `
 <p><strong>LoRA</strong> fine-tunes large models by only training small, low-rank matrices. This allows fine-tuning an LLM on consumer hardware.</p>
 <div class="equation">W = W₀ + ΔW = W₀ + B * A</div>
 <p>A (d×r) and B (r×d) are much smaller than W₀ (d×d) when the rank <strong>r</strong> is small (e.g., 8 vs 4096).</p>
 `,
 visualizer: "LoRA",
 interactiveFormulas: [
 {
 name: "LoRA Parameter Savings",
 components: [
 { symbol: "Params", key: "p", name: "Trainable Params", description: "Count of weights in A and B" },
 { symbol: " = 2 * d * r", key: "formula", name: "Formula", description: "Low-rank approximation count" }
 ],
 variables: [
 { key: "dim", symbol: "d", name: "Model Dim", min: 128, max: 8192, step: 128, default: 1024, decimals: 0 },
 { key: "rank", symbol: "r", name: "Rank", min: 1, max: 64, step: 1, default: 8, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const d = get("dim", 1024);
 const r = get("rank", 8);
 const lora = 2 * d * r;
 const full = d * d;
 return (lora / full * 100).toFixed(2) + "% of original";
 },
 insights: [
 "A rank of 8 is often enough to adapt a 1024-dim layer.",
 "Reduces VRAM requirements for fine-tuning by 10,000x.",
 "Weights A and B can be merged back into W₀ for zero-latency inference."
 ]
 }
 ]
 },
 "Diffusion": {
 title: "Diffusion Models: Iterative Denoising",
 content: `
 <p><strong>Diffusion models</strong> generate images by iteratively denoising. Start with noise, gradually clean up!</p>
 
 <h4>Forward Process</h4>
 <p>Add noise to image over T steps. Eventually becomes pure Gaussian noise.</p>
 
 <h4>Reverse Process</h4>
 <p>Neural network learns to reverse: denoise from step t to t-1. This is generation!</p>
 
 <h4>Why Diffusion Works</h4>
 <p>Implicitly learns the data distribution. Stable training. Amazing quality (DALL-E, Stable Diffusion).</p>
 `,
 interactiveFormulas: [
 {
 name: "Noise Schedule (Linear)",
 components: [
 { symbol: "β_t", key: "beta", name: "Noise at Step t", description: "Variance schedule" },
 { symbol: " = β_start + (β_end - β_start) * t / T", key: "formula", name: "Formula", description: "Linear interpolation" }
 ],
 variables: [
 { key: "start", symbol: "β_start", name: "Start", min: 0.0001, max: 0.01, step: 0.0001, default: 0.0001, decimals: 4 },
 { key: "end", symbol: "β_end", name: "End", min: 0.01, max: 0.2, step: 0.01, default: 0.02, decimals: 3 },
 { key: "t", symbol: "t", name: "Step", min: 0, max: 1000, step: 1, default: 500, decimals: 0 },
 { key: "T", symbol: "T", name: "Total Steps", min: 100, max: 2000, step: 100, default: 1000, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const s = get("start", 0.0001);
 const e = get("end", 0.02);
 const t = get("t", 500);
 const T = get("T", 1000);
 return (s + (e - s) * t / T).toFixed(6);
 },
 insights: [
 "Cosine schedule often works better than linear.",
 "More steps = better quality but slower generation.",
 "DDPM, DDIM, Stable Diffusion - different samplers."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Zero-Shot Prediction",
 components: [
 { symbol: "pred", key: "pred", name: "Predicted Class", description: "Argmax of similarities" },
 { symbol: " = argmax(I · T_i / τ)", key: "formula", name: "Formula", description: "Image-text similarity" }
 ],
 variables: [
 { key: "img", symbol: "I", name: "Image Embed", min: -1, max: 1, step: 0.1, default: 0.8, decimals: 1 },
 { key: "txt1", symbol: "T1", name: "Text 1", min: -1, max: 1, step: 0.1, default: 0.6, decimals: 1 },
 { key: "txt2", symbol: "T2", name: "Text 2", min: -1, max: 1, step: 0.1, default: 0.2, decimals: 1 },
 { key: "temp", symbol: "τ", name: "Temp", min: 0.01, max: 1, step: 0.01, default: 0.1, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const img = get("img", 0.8);
 const t1 = get("txt1", 0.6);
 const t2 = get("txt2", 0.2);
 const temp = get("temp", 0.1);
 const s1 = Math.exp(img * t1 / temp);
 const s2 = Math.exp(img * t2 / temp);
 return s1 > s2 ? "Class 1" : "Class 2";
 },
 insights: [
 "CLIP can classify anything you can describe in text!",
 "Prompt engineering matters: 'a photo of a [class]' works better than just [class].",
 "Multi-prompt ensembles improve robustness."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "IoU (Intersection over Union)",
 components: [
 { symbol: "IoU", key: "iou", name: "Overlap", description: "Box overlap measure" },
 { symbol: " = area(intersection) / area(union)", key: "formula", name: "Formula", description: "0= no overlap, 1= perfect" }
 ],
 variables: [
 { key: "intersection", symbol: "inter", name: "Intersection", min: 0, max: 100, step: 1, default: 64, decimals: 0 },
 { key: "union", symbol: "union", name: "Union", min: 1, max: 200, step: 1, default: 100, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const inter = get("intersection", 64);
 const union = get("union", 100);
 return union > 0 ? (inter / union).toFixed(3) : 0;
 },
 insights: [
 "IoU >= 0.5 is usually considered a 'detection' (mAP@0.5).",
 "Strict IoU (0.75) used for more precise evaluation.",
 "COCO uses multiple IoU thresholds (0.5:0.95)."
 ]
 }
 ]
 },
 "AnchorBoxes": {
 title: "Anchor Boxes: Predefined Shapes",
 content: `
 <p><strong>Anchor boxes</strong> are predefined bounding boxes with different aspect ratios and scales. Instead of predicting boxes from scratch, the network predicts offsets from these anchors.</p>
 <div class="equation">x = x_anchor + offset_x * w_anchor</div>
 <p>This provides a useful prior for the model, helping it handle objects of varying sizes and shapes (e.g., tall pedestrians vs. wide cars).</p>
 `,
 interactiveFormulas: [
 {
 name: "Box Decoding",
 components: [
 { symbol: "w_pred", key: "w", name: "Predicted Width", description: "Final box width" },
 { symbol: " = w_anchor * exp(offset_w)", key: "formula", name: "Formula", description: "Log-space offset" }
 ],
 variables: [
 { key: "w_anc", symbol: "w_a", name: "Anchor Width", min: 10, max: 100, step: 1, default: 50, decimals: 0 },
 { key: "off_w", symbol: "off", name: "Offset", min: -1, max: 1, step: 0.1, default: 0.2, decimals: 1 }
 ],
 calculate: (vals, get) => get("w_anc", 50) * Math.exp(get("off_w", 0.2)),
 insights: [
 "Using log-space for width/height offsets prevents negative sizes.",
 "Different anchors at each grid cell handle overlapping objects.",
 "The model learns to choose the best-fitting anchor."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Upsampling (Transposed Conv)",
 components: [
 { symbol: "out", key: "out", name: "Output Size", description: "After transposed conv" },
 { symbol: " = s * (in - 1) + k - 2p", key: "formula", name: "Formula", description: "Upsampling formula" }
 ],
 variables: [
 { key: "input", symbol: "in", name: "Input", min: 1, max: 50, step: 1, default: 7, decimals: 0 },
 { key: "stride", symbol: "s", name: "Stride", min: 1, max: 4, step: 1, default: 2, decimals: 0 },
 { key: "kernel", symbol: "k", name: "Kernel", min: 1, max: 5, step: 2, default: 3, decimals: 0 },
 { key: "pad", symbol: "p", name: "Padding", min: 0, max: 3, step: 1, default: 1, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const inVal = get("input", 7);
 const s = get("stride", 2);
 const k = get("kernel", 3);
 const p = get("pad", 1);
 return s * (inVal - 1) + k - 2 * p;
 },
 insights: [
 "Transposed conv 'reverses' spatial shrinking of conv.",
 "Also called deconvolution (misnomer - not actual deconv).",
 "Alternative: upsampling + conv (often better quality)."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Study Time Estimator",
 components: [
 { symbol: "hours", key: "hours", name: "Total Hours", description: "To complete path" },
 { symbol: " = phase * weeks * hours_per_week", key: "formula", name: "Formula", description: "Simple estimation" }
 ],
 variables: [
 { key: "phases", symbol: "P", name: "Phases", min: 1, max: 4, step: 1, default: 4, decimals: 0 },
 { key: "weeks", symbol: "W", name: "Weeks/Phase", min: 2, max: 8, step: 1, default: 4, decimals: 0 },
 { key: "weekly", symbol: "h", name: "Hours/Week", min: 5, max: 30, step: 1, default: 10, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const P = get("phases", 4);
 const W = get("weeks", 4);
 const h = get("weekly", 10);
 return P * W * h;
 },
 insights: [
 "16 weeks at 10 hrs/week = 160 hours.",
 "Consistency matters more than intensity.",
 "Build projects along the way - learning by doing!"
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "CFG Scale Impact",
 components: [
 { symbol: "cond", key: "cond", name: "Guided Prediction", description: "With classifier-free guidance" },
 { symbol: " = (1+w)*cond - w*uncond", key: "formula", name: "Formula", description: "Guidance formula" }
 ],
 variables: [
 { key: "cond", symbol: "c", name: "Conditional", min: -2, max: 2, step: 0.1, default: 0.8, decimals: 1 },
 { key: "uncond", symbol: "u", name: "Unconditional", min: -2, max: 2, step: 0.1, default: 0.2, decimals: 1 },
 { key: "scale", symbol: "w", name: "CFG Scale", min: 1, max: 20, step: 0.5, default: 7.5, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const c = get("cond", 0.8);
 const u = get("uncond", 0.2);
 const w = get("scale", 7.5);
 return ((1 + w) * c - w * u).toFixed(3);
 },
 insights: [
 "w=0: no guidance (random). w=7-12: good balance.",
 "Too high w: oversaturated, artifacts.",
 "Lower w (1-3): more creative, diverse."
 ]
 }
 ]
 },
 "TSNE": {
 title: "t-SNE: Visualizing High-Dim Data",
 content: `
 <p><strong>t-SNE</strong> (t-distributed Stochastic Neighbor Embedding) is a nonlinear dimensionality reduction technique well-suited for embedding high-dimensional data for visualization in a low-dimensional space of two or three dimensions.</p>
 `,
 interactiveFormulas: [
 {
 name: "Perplexity Impact",
 components: [
 { symbol: "Neighbors", key: "neighbors", name: "Effective Neighbors", description: "Soft neighborhood size" },
 { symbol: " = log₂(Perplexity)", key: "formula", name: "Formula", description: "Shannon entropy relation" }
 ],
 variables: [
 { key: "perp", symbol: "Perp", name: "Perplexity", min: 2, max: 100, step: 1, default: 30, decimals: 0 }
 ],
 calculate: (vals, get) => Math.log2(get("perp", 30)).toFixed(1),
 insights: [
 "Perplexity roughly balances attention between local and global data aspects.",
 "Low perplexity focuses on small clusters, high perplexity on overall shape.",
 "Unlike PCA, t-SNE distances in 2D don't always reflect real-world distances."
 ]
 }
 ]
 },
 "UMAP": {
 title: "UMAP: Faster Nonlinear Embedding",
 content: `
 <p><strong>UMAP</strong> (Uniform Manifold Approximation and Projection) is a faster alternative to t-SNE that often preserves more of the global structure of the data.</p>
 `,
 interactiveFormulas: [
 {
 name: "Min Distance",
 components: [
 { symbol: "Tightness", key: "tight", name: "Cluster Tightness", description: "How closely points pack" },
 { symbol: " = f(min_dist)", key: "formula", name: "Parameter", description: "Lower = more crowded" }
 ],
 variables: [
 { key: "min_dist", symbol: "d_min", name: "Min Distance", min: 0.001, max: 1, step: 0.01, default: 0.1, decimals: 2 }
 ],
 calculate: (vals, get) => get("min_dist", 0.1) < 0.05 ? "Very dense clusters" : "Loose clusters",
 insights: [
 "Min Distance controls how tightly UMAP packs points together.",
 "Lower values emphasize fine structure; higher values emphasize global shape.",
 "UMAP is mathematically grounded in Riemannian geometry and algebraic topology."
 ]
 }
 ]
 },
 "WGAN": {
 title: "WGAN: Wasserstein GAN",
 content: `
 <p><strong>WGAN</strong> uses the Earth Mover's (Wasserstein) distance to improve GAN stability and provide a meaningful loss metric that correlates with image quality.</p>
 `,
 interactiveFormulas: [
 {
 name: "Critic Loss (Minimax)",
 components: [
 { symbol: "L", key: "loss", name: "Wasserstein Loss", description: "Critic score difference" },
 { symbol: " = E[C(x)] - E[C(G(z))]", key: "formula", name: "Formula", description: "Real score - Fake score" }
 ],
 variables: [
 { key: "real", symbol: "C(x)", name: "Real Score", min: -10, max: 10, step: 0.1, default: 5, decimals: 1 },
 { key: "fake", symbol: "C(G)", name: "Fake Score", min: -10, max: 10, step: 0.1, default: -2, decimals: 1 }
 ],
 calculate: (vals, get) => get("real", 5) - get("fake", -2),
 insights: [
 "Unlike standard GANs, the Critic (C) doesn't use a sigmoid (it's not a classifier).",
 "WGAN loss avoids mode collapse and provides stable gradients.",
 "Requires 1-Lipschitz continuity (often enforced via Gradient Penalty)."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Leaky ReLU in DCGAN",
 components: [
 { symbol: "f(x)", key: "out", name: "Activation", description: "Prevents dying neurons" },
 { symbol: " = max(αx, x)", key: "formula", name: "Formula", description: "Slope α for x < 0" }
 ],
 variables: [
 { key: "x", symbol: "x", name: "Input", min: -5, max: 5, step: 0.1, default: -2, decimals: 1 },
 { key: "alpha", symbol: "α", name: "Alpha", min: 0.01, max: 0.3, step: 0.01, default: 0.2, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const x = get("x", -2);
 const a = get("alpha", 0.2);
 return x < 0 ? (a * x).toFixed(2) : x.toFixed(2);
 },
 insights: [
 "DCGAN standardizes α=0.2 for the Discriminator.",
 "Allowing a small gradient for negative inputs helps the Generator learn even from 'rejected' samples.",
 "Strided convolutions are essential for the Generator to learn its own upsampling."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Mask Generation",
 components: [
 { symbol: "masks", key: "masks", name: "Output Masks", description: "Multiple predictions" },
 { symbol: " = decode(image_emb + prompt_emb)", key: "formula", name: "Formula", description: "Transformer decoder" }
 ],
 variables: [
 { key: "img_emb", symbol: "I", name: "Image Embed", min: 0, max: 1, step: 0.1, default: 0.7, decimals: 1 },
 { key: "pt_emb", symbol: "P", name: "Prompt Embed", min: 0, max: 1, step: 0.1, default: 0.5, decimals: 1 },
 { key: "iou", symbol: "iou", name: "IoU Score", min: 0, max: 1, step: 0.01, default: 0.85, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const I = get("img_emb", 0.7);
 const P = get("pt_emb", 0.5);
 const iou = get("iou", 0.85);
 // 'combined' was unused, calculating score directly
 const score = (I + P) / 2;
 return iou > 0.8 && score > 0.5 ? "High quality mask!" : "Low quality - try more prompts";
 },
 insights: [
 "SAM works zero-shot on new object types.",
 "Can be automated: segment everything in image.",
 "Foundation model for many downstream tasks."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Token Generation Probability",
 components: [
 { symbol: "P(token | context)", key: "prob", name: "Next Token Prob", description: "Model's prediction" },
 { symbol: " = softmax(logits / T)", key: "formula", name: "Formula", description: "Temperature-scaled softmax" }
 ],
 variables: [
 { key: "logit1", symbol: "logit1", name: "Top Logit", min: -10, max: 20, step: 0.5, default: 8.5, decimals: 1 },
 { key: "logit2", symbol: "logit2", name: "2nd Logit", min: -10, max: 20, step: 0.5, default: 5.2, decimals: 1 },
 { key: "temp", symbol: "T", name: "Temperature", min: 0.1, max: 2, step: 0.1, default: 1.0, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const l1 = get("logit1", 8.5);
 const l2 = get("logit2", 5.2);
 const T = get("temp", 1.0);
 const e1 = Math.exp(l1 / T);
 const e2 = Math.exp(l2 / T);
 return ((e1 / (e1 + e2)) * 100).toFixed(1) + '%';
 },
 insights: [
 "T=1: normal distribution. T<1: peaky (deterministic).",
 "T>1: more random, creative outputs.",
 "Top-k and top-p (nucleus) sampling also used."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Retrieval Score (Cosine Similarity)",
 components: [
 { symbol: "sim", key: "sim", name: "Similarity", description: "Query-document match" },
 { symbol: " = (A · B) / (|A| * |B|)", key: "formula", name: "Formula", description: "Cosine similarity" }
 ],
 variables: [
 { key: "a1", symbol: "a1", name: "Query 1", min: -1, max: 1, step: 0.1, default: 0.8, decimals: 1 },
 { key: "a2", symbol: "a2", name: "Query 2", min: -1, max: 1, step: 0.1, default: 0.3, decimals: 1 },
 { key: "b1", symbol: "b1", name: "Doc 1", min: -1, max: 1, step: 0.1, default: 0.7, decimals: 1 },
 { key: "b2", symbol: "b2", name: "Doc 2", min: -1, max: 1, step: 0.1, default: 0.4, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const a1 = get("a1", 0.8), a2 = get("a2", 0.3);
 const b1 = get("b1", 0.7), b2 = get("b2", 0.4);
 const dot = a1*b1 + a2*b2;
 const magA = Math.sqrt(a1*a1 + a2*a2);
 const magB = Math.sqrt(b1*b1 + b2*b2);
 return (dot / (magA * magB)).toFixed(3);
 },
 insights: [
 "Similarity > 0.7 usually relevant. < 0.5 not relevant.",
 "Embedding models: BERT, Sentence-transformers, OpenAI ada.",
 "Chunk size matters for retrieval quality."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Cross-Modal Attention",
 components: [
 { symbol: "fused", key: "fused", name: "Fused Representation", description: "Combined vision+text" },
 { symbol: " = attention(V · W_v, T · W_t, V · W_v)", key: "formula", name: "Formula", description: "Query from text, keys/values from image" }
 ],
 variables: [
 { key: "v_feat", symbol: "V", name: "Vision Features", min: 0, max: 1, step: 0.1, default: 0.8, decimals: 1 },
 { key: "t_feat", symbol: "T", name: "Text Features", min: 0, max: 1, step: 0.1, default: 0.6, decimals: 1 },
 { key: "attn", symbol: "A", name: "Attention Score", min: 0, max: 1, step: 0.05, default: 0.75, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const V = get("v_feat", 0.8);
 const T = get("t_feat", 0.6);
 const A = get("attn", 0.75);
 return ((V * A + T * (1-A)) * 100).toFixed(1) + '%';
 },
 insights: [
 "Multimodal models often need aligned pre-training.",
 "Can learn without explicit labels (self-supervised).",
 "Emerging: any-to-any models (text->image, image->audio)."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Volume Rendering (Simplified)",
 components: [
 { symbol: "C", key: "color", name: "Pixel Color", description: "Accumulated along ray" },
 { symbol: " = sum(T_i * α_i * c_i)", key: "formula", name: "Formula", description: "Transmittance * density * color" }
 ],
 variables: [
 { key: "c1", symbol: "c1", name: "Color 1", min: 0, max: 1, step: 0.1, default: 0.8, decimals: 1 },
 { key: "t1", symbol: "T1", name: "Trans 1", min: 0, max: 1, step: 0.1, default: 0.9, decimals: 1 },
 { key: "alpha", symbol: "α", name: "Density", min: 0, max: 1, step: 0.1, default: 0.6, decimals: 1 },
 { key: "c2", symbol: "c2", name: "Color 2", min: 0, max: 1, step: 0.1, default: 0.3, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const c1 = get("c1", 0.8);
 const T1 = get("t1", 0.9);
 const alpha = get("alpha", 0.6);
 const c2 = get("c2", 0.3);
 const t2 = T1 * (1 - alpha);
 return ((T1 * alpha * c1 + t2 * c2) * 255).toFixed(0);
 },
 insights: [
 "NeRF needs many posed images (typically 20-100).",
 "Training takes hours on GPU. Instant-NGP is faster.",
 "Gaussian splatting: explicit instead of implicit."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Video Patches Calculation",
 components: [
 { symbol: "N", key: "patches", name: "Patch Count", description: "Tokens per frame" },
 { symbol: " = (T/p_t) * (H/p) * (W/p)", key: "formula", name: "Formula", description: "Spatiotemporal patch grid" }
 ],
 variables: [
 { key: "frames", symbol: "T", name: "Frames", min: 1, max: 100, step: 1, default: 60, decimals: 0 },
 { key: "height", symbol: "H", name: "Height", min: 64, max: 1024, step: 64, default: 256, decimals: 0 },
 { key: "width", symbol: "W", name: "Width", min: 64, max: 1024, step: 64, default: 256, decimals: 0 },
 { key: "patch", symbol: "p", name: "Patch Size", min: 8, max: 32, step: 4, default: 16, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const T = get("frames", 60);
 const H = get("height", 256);
 const W = get("width", 256);
 const p = get("patch", 16);
 const pt = 2;
 return Math.ceil(T/pt) * Math.ceil(H/p) * Math.ceil(W/p);
 },
 insights: [
 "More frames = more tokens = more compute.",
 "Sora uses 16 frames at a time, generates 60.",
 "Still limited: can't interact with generated world."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "ReAct: Reasoning + Acting",
 components: [
 { symbol: "trajectory", key: "traj", name: "Steps Taken", description: "Thought-action-observation chain" },
 { symbol: " = n * (thought + action + observation)", key: "formula", name: "Formula", description: "ReAct cycle count" }
 ],
 variables: [
 { key: "thought", symbol: "T", name: "Thought Quality", min: 0, max: 1, step: 0.1, default: 0.8, decimals: 1 },
 { key: "action", symbol: "A", name: "Action Validity", min: 0, max: 1, step: 0.1, default: 0.9, decimals: 1 },
 { key: "obs", symbol: "O", name: "Observation Help", min: 0, max: 1, step: 0.1, default: 0.7, decimals: 1 },
 { key: "steps", symbol: "n", name: "Steps", min: 1, max: 10, step: 1, default: 5, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const T = get("thought", 0.8);
 const A = get("action", 0.9);
 const O = get("observation", 0.7);
 const n = get("steps", 5);
 const score = (T * A * O) * n;
 return score > 2 ? "Task likely completed!" : "May need more steps";
 },
 insights: [
 "Agents can use external memory for multi-step tasks.",
 "Hallucinations less problematic when can verify with tools.",
 "Self-critique / reflection improves reliability."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Memory Savings Calculator",
 components: [
 { symbol: "savings", key: "savings", name: "Reduction", description: "How much smaller" },
 { symbol: " = (1 - new_bits / 32) * 100%", key: "formula", name: "Formula", description: "Percentage reduction" }
 ],
 variables: [
 { key: "bits", symbol: "bits", name: "Quantized To", min: 2, max: 16, step: 1, default: 8, decimals: 0 },
 { key: "model_gb", symbol: "GB", name: "Model Size (FP32)", min: 1, max: 500, step: 1, default: 70, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const bits = get("bits", 8);
 const reduction = (1 - bits / 32) * 100;
 const newSize = get("model_gb", 70) * (bits / 32);
 return `${reduction.toFixed(0)}% smaller! New size: ${newSize.toFixed(1)}GB`;
 },
 insights: [
 "INT8 = 4x smaller, ~2x faster. Usually <1% accuracy drop.",
 "GPTQ, AWQ: sophisticated quantization methods.",
 "Hardware support matters: TensorRT, llama.cpp."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Distillation Loss",
 components: [
 { symbol: "L_distill", key: "loss", name: "Distillation Loss", description: "Combined training loss" },
 { symbol: " = α * H(y,s) + (1-α) * T^2 * H(σ(q/t), σ(p/t))", key: "formula", name: "Formula", description: "Hard + soft targets" }
 ],
 variables: [
 { key: "alpha", symbol: "α", name: "Alpha", min: 0, max: 1, step: 0.1, default: 0.5, decimals: 1 },
 { key: "temp", symbol: "T", name: "Temperature", min: 1, max: 20, step: 1, default: 4, decimals: 0 },
 { key: "h_hard", symbol: "H_hard", name: "Hard Loss", min: 0, max: 5, step: 0.1, default: 0.8, decimals: 2 },
 { key: "h_soft", symbol: "H_soft", name: "Soft Loss", min: 0, max: 5, step: 0.1, default: 1.2, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const alpha = get("alpha", 0.5);
 const T = get("temp", 4);
 const H_hard = get("h_hard", 0.8);
 const H_soft = get("h_soft", 1.2);
 return (alpha * H_hard + (1 - alpha) * T * T * H_soft).toFixed(3);
 },
 insights: [
 "High T (>2) softens predictions, more info transfer.",
 "α=0.5 is a common starting point.",
 "Distilled models can approach teacher performance!"
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Active Parameters Calculation",
 components: [
 { symbol: "active", key: "active", name: "Active Params", description: "Per token computation" },
 { symbol: " = total / experts * top_k", key: "formula", name: "Formula", description: "Sparsely activated" }
 ],
 variables: [
 { key: "total", symbol: "Total", name: "Total Params (B)", min: 1, max: 1000, step: 1, default: 400, decimals: 0 },
 { key: "experts", symbol: "E", name: "Experts", min: 2, max: 256, step: 1, default: 16, decimals: 0 },
 { key: "topk", symbol: "k", name: "Top-K", min: 1, max: 8, step: 1, default: 2, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const total = get("total", 400);
 const E = get("experts", 16);
 const k = get("topk", 2);
 const perExpert = total / E;
 return (perExpert * k).toFixed(1) + "B active params";
 },
 insights: [
 "MoE enables massive models without proportional compute.",
 "Load balancing: ensure all experts get used.",
 "Expert choice routing can be learned or random."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Compute Scaling Law",
 components: [
 { symbol: "perf", key: "perf", name: "Performance", description: "Relative capability" },
 { symbol: " = a * log(compute) + b", key: "formula", name: "Formula", description: "Log-linear relationship" }
 ],
 variables: [
 { key: "compute", symbol: "C", name: "Compute (GFlops)", min: 1, max: 1000000, step: 1, default: 10000, decimals: 0 },
 { key: "a", symbol: "a", name: "Scale Factor", min: 0.1, max: 1, step: 0.1, default: 0.5, decimals: 1 },
 { key: "b", symbol: "b", name: "Offset", min: 0, max: 10, step: 0.5, default: 2, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const C = get("compute", 10000);
 const a = get("a", 0.5);
 const b = get("b", 2);
 const logC = Math.log10(C);
 return (a * logC + b).toFixed(2);
 },
 insights: [
 "More compute generally = better model (power law).",
 "Data quality and algorithm matter too!",
 "Diminishing returns at very large scale."
 ]
 }
 ]
 },
 "LinearRegression": {
 title: "Linear Regression: The First ML Algorithm",
 content: `
 <p><strong>Linear Regression</strong> fits a straight line through data to predict continuous values. It's the simplest ML model and the foundation of everything else.</p>
 
 <h4>The Model</h4>
 <p>Prediction = slope × input + intercept. In higher dimensions: y = Wx + b. The goal: minimize the distance between predictions and true values.</p>
 <div class="equation">
 ŷ = w₁x₁ + w₂x₂ + ... + b
 </div>
 
 <h4>Training via Gradient Descent</h4>
 <p>Compute ∂Loss/∂w for each weight. Update weights in the opposite direction of the gradient. Repeat until convergence.</p>
 
 <h4>R² Score</h4>
 <p>Measures how much variance the model explains. R²=1 is perfect. R²=0 means no better than predicting the mean.</p>
 `,
 interactiveFormulas: [
 {
 name: "Simple Linear Prediction",
 parts: [
 { symbol: "ŷ", key: "pred", name: "Prediction", description: "Model output" },
 { symbol: " = ", key: null },
 { symbol: "w × x + b", key: "formula", name: "Formula", description: "Slope times input plus intercept" }
 ],
 variables: [
 { key: "w", symbol: "w", name: "Weight (slope)", min: -3, max: 3, step: 0.1, default: 1.5, decimals: 1 },
 { key: "x", symbol: "x", name: "Input", min: -5, max: 5, step: 0.1, default: 2.0, decimals: 1 },
 { key: "b", symbol: "b", name: "Bias (intercept)", min: -3, max: 3, step: 0.1, default: 0.5, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const w = get("w", 1.5);
 const x = get("x", 2.0);
 const b = get("b", 0.5);
 return w * x + b;
 },
 insights: [
 "With w=0, the model always predicts the bias — no learning from input.",
 "Negative weight means prediction decreases as input increases.",
 "Multiple features means multiple weights — one per input dimension."
 ]
 },
 {
 name: "R² Score",
 parts: [
 { symbol: "R²", key: "r2", name: "R-Squared", description: "Proportion of variance explained" },
 { symbol: " = 1 - ", key: null },
 { symbol: "SS_res / SS_tot", key: "formula", name: "Formula", description: "Residual vs total sum of squares" }
 ],
 variables: [
 { key: "ss_res", symbol: "SS_res", name: "Residual SS", min: 0.1, max: 50, step: 0.5, default: 5, decimals: 1 },
 { key: "ss_tot", symbol: "SS_tot", name: "Total SS", min: 1, max: 100, step: 1, default: 40, decimals: 0 }
 ],
 calculate: (vals, get) => {
 const res = get("ss_res", 5);
 const tot = get("ss_tot", 40);
 return tot > 0 ? 1 - res / tot : 0;
 },
 insights: [
 "R²=1.0 → perfect fit (all variance explained by model).",
 "R²=0.0 → model is no better than the mean baseline.",
 "R² can be negative if the model performs worse than baseline!"
 ]
 }
 ]
 },
 "LogisticRegression": {
 title: "Logistic Regression: From Lines to Probabilities",
 content: `
 <p><strong>Logistic Regression</strong> takes a linear model and squeezes the output through a sigmoid, converting it to a probability between 0 and 1.</p>
 
 <h4>Log-Odds (Logit)</h4>
 <p>The raw linear score z = Wx + b is called the logit. The sigmoid maps it to probability: P = 1/(1+e^(-z)).</p>
 <div class="equation">
 P(y=1|x) = σ(w₁x₁ + w₂x₂ + b) = 1 / (1 + e^(-z))
 </div>
 
 <h4>Decision Boundary</h4>
 <p>The threshold where P = 0.5 (z = 0). Adjusting the threshold trades precision for recall.</p>
 
 <h4>Why Not Linear Regression?</h4>
 <p>Linear regression can predict values outside [0,1]. Logistic regression ensures valid probabilities and uses cross-entropy loss, not MSE.</p>
 `,
 interactiveFormulas: [
 {
 name: "Sigmoid Decision",
 parts: [
 { symbol: "P(y=1)", key: "prob", name: "Probability", description: "Probability of positive class" },
 { symbol: " = σ(", key: null },
 { symbol: "w·x + b", key: "logit", name: "Logit", description: "Raw linear score" },
 { symbol: ")", key: null }
 ],
 variables: [
 { key: "w", symbol: "w", name: "Weight", min: -5, max: 5, step: 0.1, default: 2.0, decimals: 1 },
 { key: "x", symbol: "x", name: "Input", min: -5, max: 5, step: 0.1, default: 0.5, decimals: 1 },
 { key: "b", symbol: "b", name: "Bias", min: -3, max: 3, step: 0.1, default: -1.0, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const w = get("w", 2.0);
 const x = get("x", 0.5);
 const b = get("b", -1.0);
 const z = w * x + b;
 return 1 / (1 + Math.exp(-z));
 },
 insights: [
 "When z=0, sigmoid outputs exactly 0.5 (the decision boundary).",
 "Large positive z → probability near 1.0 (confident positive).",
 "Large negative z → probability near 0.0 (confident negative)."
 ]
 },
 {
 name: "Threshold Tuning",
 parts: [
 { symbol: "class", key: "class", name: "Predicted Class", description: "Based on threshold" },
 { symbol: " = P ≥ τ ? 1 : 0", key: "formula", name: "Decision Rule", description: "Compare probability to threshold" }
 ],
 variables: [
 { key: "prob", symbol: "P", name: "Probability", min: 0, max: 1, step: 0.01, default: 0.65, decimals: 2 },
 { key: "threshold", symbol: "τ", name: "Threshold", min: 0.1, max: 0.9, step: 0.05, default: 0.5, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const p = get("prob", 0.65);
 const t = get("threshold", 0.5);
 return p >= t ? "Class 1 " : "Class 0 ";
 },
 insights: [
 "τ=0.5 is the default. Lower it to catch more positives (higher recall).",
 "Raise τ to reduce false positives (higher precision).",
 "Medical screening: use low τ (don't miss diseases). Spam filter: use high τ (don't block good email)."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Medical Test Calculator",
 parts: [
 { symbol: "P(disease|+test)", key: "posterior", name: "Posterior", description: "Probability of disease given positive test" },
 { symbol: " = ", key: null },
 { symbol: "P(+|disease) × P(disease) / P(+)", key: "formula", name: "Bayes", description: "Prior × Likelihood / Evidence" }
 ],
 variables: [
 { key: "prior", symbol: "P(D)", name: "Disease Prevalence", min: 0.001, max: 0.3, step: 0.001, default: 0.01, decimals: 3 },
 { key: "sensitivity", symbol: "P(+|D)", name: "Sensitivity (TPR)", min: 0.5, max: 1.0, step: 0.01, default: 0.95, decimals: 2 },
 { key: "specificity", symbol: "P(-|¬D)", name: "Specificity (TNR)", min: 0.5, max: 1.0, step: 0.01, default: 0.90, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const prior = get("prior", 0.01);
 const sens = get("sensitivity", 0.95);
 const spec = get("specificity", 0.90);
 const fp = 1 - spec;
 const pPositive = sens * prior + fp * (1 - prior);
 return pPositive > 0 ? sens * prior / pPositive : 0;
 },
 insights: [
 "With 1% prevalence and 95% sensitivity, a positive test → only ~9% chance of disease!",
 "Base rate neglect is a common cognitive bias — Bayes corrects it.",
 "Higher prevalence (prior) dramatically increases posterior probability."
 ]
 },
 {
 name: "Prior Update (General)",
 parts: [
 { symbol: "P(H|E)", key: "posterior", name: "Posterior", description: "Updated belief" },
 { symbol: " = ", key: null },
 { symbol: "P(E|H) × P(H) / P(E)", key: "formula", name: "Formula", description: "Likelihood × Prior / Evidence" }
 ],
 variables: [
 { key: "prior", symbol: "P(H)", name: "Prior Belief", min: 0.01, max: 0.99, step: 0.01, default: 0.3, decimals: 2 },
 { key: "likelihood", symbol: "P(E|H)", name: "Likelihood", min: 0.01, max: 1.0, step: 0.01, default: 0.8, decimals: 2 },
 { key: "evidence", symbol: "P(E)", name: "Evidence", min: 0.01, max: 1.0, step: 0.01, default: 0.4, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const prior = get("prior", 0.3);
 const likelihood = get("likelihood", 0.8);
 const evidence = get("evidence", 0.4);
 return evidence > 0 ? (likelihood * prior / evidence) : 0;
 },
 insights: [
 "Strong evidence (high likelihood, low P(E)) shifts posterior dramatically.",
 "With equal prior and likelihood, posterior equals prior — no update.",
 "Bayesian inference is the foundation of spam filters, medical diagnosis, and Naive Bayes classifiers."
 ]
 }
 ]
 },
 "RNN": {
 title: "Recurrent Neural Networks: Memory in Sequences",
 content: `
 <p><strong>RNNs</strong> process sequences by maintaining a hidden state that acts as memory, updated at each time step.</p>
 
 <h4>Hidden State Update</h4>
 <p>At each time step t, the hidden state combines the previous state with the new input:</p>
 <div class="equation">
 h_t = tanh(W_hh × h_{t-1} + W_xh × x_t + b)
 </div>
 
 <h4>Sequence Processing</h4>
 <p>The same weights W are reused at every step — this is weight sharing. The network "unfolds" across time steps.</p>
 
 <h4>The Vanishing Gradient Problem</h4>
 <p>During backpropagation through time (BPTT), gradients are multiplied by W at each step. If |W| < 1, gradients vanish exponentially. If |W| > 1, they explode.</p>
 `,
 interactiveFormulas: [
 {
 name: "Hidden State Update",
 parts: [
 { symbol: "h_t", key: "ht", name: "Hidden State", description: "Current memory" },
 { symbol: " = tanh(", key: null },
 { symbol: "W_h × h_{t-1} + W_x × x_t", key: "formula", name: "Recurrence", description: "Combine past and present" },
 { symbol: ")", key: null }
 ],
 variables: [
 { key: "wh", symbol: "W_h", name: "Recurrent Weight", min: -2, max: 2, step: 0.1, default: 0.8, decimals: 1 },
 { key: "h_prev", symbol: "h_{t-1}", name: "Previous Hidden", min: -1, max: 1, step: 0.1, default: 0.5, decimals: 1 },
 { key: "wx", symbol: "W_x", name: "Input Weight", min: -2, max: 2, step: 0.1, default: 1.2, decimals: 1 },
 { key: "xt", symbol: "x_t", name: "Current Input", min: -1, max: 1, step: 0.1, default: 0.3, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const wh = get("wh", 0.8);
 const hPrev = get("h_prev", 0.5);
 const wx = get("wx", 1.2);
 const xt = get("xt", 0.3);
 return Math.tanh(wh * hPrev + wx * xt);
 },
 insights: [
 "tanh squashes the output to [-1, 1], keeping the hidden state bounded.",
 "W_h controls how much past information is retained at each step.",
 "The same W_h and W_x are used at EVERY time step (weight sharing)."
 ]
 },
 {
 name: "Vanishing Gradient (BPTT)",
 parts: [
 { symbol: "∂L/∂h₀", key: "grad", name: "Gradient at t=0", description: "Signal reaching earliest step" },
 { symbol: " ≈ ", key: null },
 { symbol: "(W_h)^T × ∂L/∂h_T", key: "formula", name: "Chain Rule", description: "Multiplied T times" }
 ],
 variables: [
 { key: "wh", symbol: "W_h", name: "Weight Magnitude", min: 0.1, max: 2.0, step: 0.1, default: 0.7, decimals: 1 },
 { key: "T", symbol: "T", name: "Sequence Length", min: 1, max: 50, step: 1, default: 20, decimals: 0 },
 { key: "grad_T", symbol: "∂L/∂h_T", name: "Final Gradient", min: 0.1, max: 2, step: 0.1, default: 1.0, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const w = get("wh", 0.7);
 const T = get("T", 20);
 const gT = get("grad_T", 1.0);
 return (gT * Math.pow(w, T)).toExponential(3);
 },
 insights: [
 "W=0.7 after 20 steps: gradient is 0.7²⁰ ≈ 0.0008 — vanished!",
 "W=1.5 after 20 steps: gradient is 1.5²⁰ ≈ 3325 — exploded!",
 "This is why LSTMs and GRUs were invented — they solve the vanishing gradient with gates."
 ]
 }
 ]
 },
 "LSTM": {
 title: "LSTM: Long Short-Term Memory",
 content: `
 <p><strong>LSTM</strong> solves the vanishing gradient problem with three gates that control information flow through a cell state.</p>
 
 <h4>Forget Gate</h4>
 <p>Decides what information to discard from the cell state. σ(W_f · [h_{t-1}, x_t] + b_f). Output near 0 = forget, near 1 = remember.</p>
 
 <h4>Input Gate</h4>
 <p>Decides what new information to store. Two parts: σ(W_i) decides which values to update, tanh(W_c) creates candidate values.</p>
 
 <h4>Output Gate</h4>
 <p>Decides what to output from the cell state. σ(W_o) filters the cell, producing the new hidden state.</p>
 
 <h4>Cell State: The Highway</h4>
 <p>The cell state runs through the entire chain with only minor linear interactions — gradients flow freely! This is the key innovation.</p>
 `,
 interactiveFormulas: [
 {
 name: "Forget Gate",
 parts: [
 { symbol: "f_t", key: "forget", name: "Forget Gate", description: "How much to keep from past" },
 { symbol: " = σ(", key: null },
 { symbol: "W_f · [h, x] + b_f", key: "formula", name: "Gate Activation", description: "Sigmoid of weighted input" },
 { symbol: ")", key: null }
 ],
 variables: [
 { key: "wf_h", symbol: "W_f·h", name: "Past Contribution", min: -3, max: 3, step: 0.1, default: 0.5, decimals: 1 },
 { key: "wf_x", symbol: "W_f·x", name: "Input Contribution", min: -3, max: 3, step: 0.1, default: 1.2, decimals: 1 },
 { key: "bf", symbol: "b_f", name: "Forget Bias", min: -3, max: 3, step: 0.1, default: 1.0, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const wfh = get("wf_h", 0.5);
 const wfx = get("wf_x", 1.2);
 const bf = get("bf", 1.0);
 return 1 / (1 + Math.exp(-(wfh + wfx + bf)));
 },
 insights: [
 "Bias is typically initialized to 1.0 — start by remembering everything.",
 "Gate output near 1.0 means 'keep this memory', near 0.0 means 'forget it'.",
 "The forget gate is the most important gate — it controls long-term memory."
 ]
 },
 {
 name: "Cell State Update",
 parts: [
 { symbol: "C_t", key: "cell", name: "Cell State", description: "Updated long-term memory" },
 { symbol: " = ", key: null },
 { symbol: "f_t × C_{t-1} + i_t × C̃_t", key: "formula", name: "Formula", description: "Forget old + add new" }
 ],
 variables: [
 { key: "ft", symbol: "f_t", name: "Forget Gate", min: 0, max: 1, step: 0.05, default: 0.8, decimals: 2 },
 { key: "c_prev", symbol: "C_{t-1}", name: "Previous Cell", min: -2, max: 2, step: 0.1, default: 1.5, decimals: 1 },
 { key: "it", symbol: "i_t", name: "Input Gate", min: 0, max: 1, step: 0.05, default: 0.6, decimals: 2 },
 { key: "ct_cand", symbol: "C̃_t", name: "Candidate", min: -2, max: 2, step: 0.1, default: 0.9, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const ft = get("ft", 0.8);
 const cPrev = get("c_prev", 1.5);
 const it = get("it", 0.6);
 const ctCand = get("ct_cand", 0.9);
 return ft * cPrev + it * ctCand;
 },
 insights: [
 "f_t=1, i_t=0: cell state unchanged — perfect memory.",
 "f_t=0, i_t=1: cell state completely replaced — full reset.",
 "Additive cell update (not multiplicative) is why gradients don't vanish."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "KL for Two Bernoulli Distributions",
 parts: [
 { symbol: "D_KL", key: "kl", name: "KL Divergence", description: "Bits of information lost" },
 { symbol: "(P || Q)", key: null },
 { symbol: " = p·log(p/q) + (1-p)·log((1-p)/(1-q))", key: "formula", name: "Formula", description: "Binary KL" }
 ],
 variables: [
 { key: "p", symbol: "p", name: "P (true dist)", min: 0.01, max: 0.99, step: 0.01, default: 0.7, decimals: 2 },
 { key: "q", symbol: "q", name: "Q (approx dist)", min: 0.01, max: 0.99, step: 0.01, default: 0.4, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const p = get("p", 0.7);
 const q = get("q", 0.4);
 const kl = p * Math.log(p / q) + (1 - p) * Math.log((1 - p) / (1 - q));
 return kl;
 },
 insights: [
 "When P = Q, KL = 0 (distributions match perfectly).",
 "KL is asymmetric: D_KL(P||Q) penalizes where P is high but Q is low.",
 "Used in VAE loss: ELBO = Reconstruction Loss + β × KL(q(z|x) || p(z))."
 ]
 },
 {
 name: "ELBO (VAE Loss)",
 parts: [
 { symbol: "ELBO", key: "elbo", name: "Evidence Lower Bound", description: "VAE training objective" },
 { symbol: " = ", key: null },
 { symbol: "recon_loss + β × KL", key: "formula", name: "Formula", description: "Reconstruction + regularization" }
 ],
 variables: [
 { key: "recon", symbol: "L_recon", name: "Recon Loss", min: 0, max: 10, step: 0.1, default: 2.5, decimals: 1 },
 { key: "kl", symbol: "KL", name: "KL Term", min: 0, max: 5, step: 0.1, default: 1.2, decimals: 1 },
 { key: "beta", symbol: "β", name: "Beta Weight", min: 0, max: 5, step: 0.1, default: 1.0, decimals: 1 }
 ],
 calculate: (vals, get) => {
 const recon = get("recon", 2.5);
 const kl = get("kl", 1.2);
 const beta = get("beta", 1.0);
 return recon + beta * kl;
 },
 insights: [
 "β=1: Standard VAE. β>1: β-VAE (disentangled representations).",
 "High KL penalty → latent space is smooth but reconstructions are blurry.",
 "Low KL penalty → sharp reconstructions but latent space has holes."
 ]
 }
 ]
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
 interactiveFormulas: [
 {
 name: "Feature Importance (Simplified SHAP)",
 parts: [
 { symbol: "φᵢ", key: "shap", name: "SHAP Value", description: "Feature i's contribution to prediction" },
 { symbol: " = ", key: null },
 { symbol: "f(with feature) - f(without)", key: "formula", name: "Marginal Contribution", description: "Impact of adding feature" }
 ],
 variables: [
 { key: "f_with", symbol: "f(+)", name: "Prediction With", min: 0, max: 1, step: 0.01, default: 0.85, decimals: 2 },
 { key: "f_without", symbol: "f(-)", name: "Prediction Without", min: 0, max: 1, step: 0.01, default: 0.60, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const fWith = get("f_with", 0.85);
 const fWithout = get("f_without", 0.60);
 return fWith - fWithout;
 },
 insights: [
 "Positive SHAP = feature pushes prediction higher (toward positive class).",
 "Negative SHAP = feature pushes prediction lower.",
 "Sum of all SHAP values = (prediction) - (base value). They always add up!"
 ]
 },
 {
 name: "Gradient Saliency",
 parts: [
 { symbol: "saliency", key: "sal", name: "Pixel Importance", description: "Gradient magnitude per pixel" },
 { symbol: " = |", key: null },
 { symbol: "∂output / ∂pixel", key: "formula", name: "Gradient", description: "How much output changes per pixel change" },
 { symbol: "|", key: null }
 ],
 variables: [
 { key: "grad", symbol: "∂y/∂x", name: "Raw Gradient", min: -5, max: 5, step: 0.1, default: 2.3, decimals: 1 },
 { key: "pixel", symbol: "x", name: "Pixel Value", min: 0, max: 1, step: 0.01, default: 0.8, decimals: 2 }
 ],
 calculate: (vals, get) => {
 const grad = get("grad", 2.3);
 return Math.abs(grad);
 },
 insights: [
 "High |gradient| = small change in this pixel greatly affects classification.",
 "Saliency maps can be noisy — SmoothGrad averages over perturbations.",
 "Grad-CAM uses gradients at conv layers for more localized explanations."
 ]
 }
 ]
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
  interactiveFormulas: [
  {
    name: "Training Time Comparison (AlexNet vs Modern)",
    parts: [
      { symbol: "speedup", key: "speed", name: "GPU Speedup", description: "Time saved by modern hardware" },
      { symbol: " = (GPU_2012 / GPU_2024) × (opt_2024 / opt_2012)", key: "formula", name: "Formula", description: "Hardware × software gains" }
    ],
    variables: [
      { key: "gpu2012", symbol: "GPU_2012", name: "AlexNet Time", min: 1, max: 14, step: 1, default: 6, decimals: 0 },
      { key: "gpu2024", symbol: "GPU_2024", name: "Modern Time", min: 0.001, max: 0.5, step: 0.001, default: 0.02, decimals: 3 },
      { key: "opt2012", symbol: "opt_2012", name: "Old Optimizer", min: 0.5, max: 2, step: 0.1, default: 1, decimals: 1 },
      { key: "opt2024", symbol: "opt_2024", name: "Adam/AdamW", min: 1, max: 5, step: 0.1, default: 2, decimals: 1 }
    ],
    calculate: (vals, get) => {
      const g12 = get("gpu2012", 6);
      const g24 = get("gpu2024", 0.02);
      const o12 = get("opt2012", 1);
      const o24 = get("opt2024", 2);
      return ((g12 / g24) * (o24 / o12)).toFixed(0) + "x faster";
    },
    insights: [
      "Modern GPUs (A100, H100) are 300x faster than K20x used for AlexNet.",
      "Adam converges 2-3x faster than vanilla SGD.",
      "Combined: ~3000x speedup enables training that took weeks in days."
    ]
  }
  ]
  },
  "ActivationAdvanced": {
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
